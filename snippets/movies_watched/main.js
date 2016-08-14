(function(d3){

  var margin = {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    };

  var width = 0;
  var height = 0;
  var moviesData = null;

  function main(){
    d3.select('#vizBtn').on('click', function(){
      //
      d3.select('#canvas').selectAll('*').remove();
      fetchData(document.getElementById('accesTokenInput').value)
        .then(visualizeData, errorHandler);
    });
  }

  function fetchData(accesToken){
    var url = 'https://graph.facebook.com/v2.7/me/video.watches?limit=999&access_token=' + accesToken;
    //url='sample.json';

    // return a promise
    return new Promise(function(resolve, reject){
      // fetch data
      d3.json(url, function(error, json){
        if (error){
          reject(error);
        }else{
          resolve(json.data);
        };
      });

    });
  }

  function visualizeData(data){
    data = data.filter(function(d){
      return d.data.movie;
    });

    data = data.map(function(d){
      return {
        'title' : d.data.movie.title,
        'date' : new Date(Date.parse(d.start_time.replace('+0000', 'Z')))
      };
    });

    // save
    moviesData = data;
    console.log(moviesData);

    var svgGroup = initSVG();
    render(svgGroup, data);
  }

  function initSVG(){

    var canvasDiv = d3.select('#canvas');

    width = canvasDiv.node().offsetWidth - margin.left - margin.right;
    height = canvasDiv.node().offsetHeight - margin.top - margin.bottom;

    return canvasDiv.append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  }

  function renderTitle(svgGroup){
    var titleGroup = svgGroup.append('g')
      .attr('class', 'title');

    var titleText = titleGroup.append('text')
      .text('Movies I Have Watched');

    var textHeight = titleText.node().getBBox().height;
    var textWidth = titleText.node().getBBox().width;

    titleGroup.attr('transform', 'translate(' +
      (width - textWidth) + ' ' + textHeight + ')');
  }

  function render(svgGroup, data){

    var colorScale = d3.scale.category10();

    var timeScale = d3.time.scale()
      .domain(d3.extent(data, function(d){return d.date;}))
      .range([0, width]);

    var itemGroups = svgGroup.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('class', 'block');

    var axisTop = height - margin.bottom;

    itemGroups.append('line')
      .attr('y1', axisTop - 100)
      .attr('y2', axisTop)
      .attr('x1', function(d){
        return timeScale(d.date);
      })
      .attr('x2', function(d){
        return timeScale(d.date);
      })
      .style('stroke', function(d){return colorScale(d.title);});;

    itemGroups.append('text')
      .attr('transform', function(d){
        return 'translate(' + timeScale(d.date) + ' ' + (axisTop - 110) + ')rotate(-90)';
      })
      .attr('y', 0)
      .attr('x', 0)
      .text(function(d){
        return d.title;
      })
      .style('fill', function(d){return colorScale(d.title);});

    resolveCollision(itemGroups[0]);

    var timeAxis = d3.svg.axis()
      .scale(timeScale)
      .orient('bottom');

    svgGroup.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, ' + (height - margin.bottom) + ')')
      .call(timeAxis);

    renderTitle(svgGroup);

  }

  function resolveCollision(itemGroups){
    itemGroups = itemGroups.reverse();

    for (var i = 0; i < itemGroups.length - 1; i++){
      var itemText = d3.select(itemGroups[i + 1]).select('text');
      var nextItemText = d3.select(itemGroups[i]).select('text');
      if (!intersectRect(itemText, nextItemText)){
        continue;
      }

      var diff = (nextItemText.node().getBBox().width + 10);
      // move text
      var itemTextTransform = d3.transform(itemText.attr('transform'));
      itemTextTransform.translate[1] -= diff;
      itemText.attr('transform', itemTextTransform);

      // extend line
      var itemLine = d3.select(itemGroups[i + 1]).select('line');
      var newItemLineY1 = Number(itemLine.attr('y1')) - diff;
      itemLine.attr('y1', newItemLineY1);

    }
  }

  function intersectRect(r1, r2) {
    var r1 = r1.node().getBoundingClientRect();
    var r2 = r2.node().getBoundingClientRect();

    //CHECK IF THE TWO BOUNDING BOXES OVERLAP
    return !(r2.left > r1.right ||
           r2.right < r1.left ||
           r2.top > r1.bottom ||
           r2.bottom < r1.top);
  }

  function errorHandler(error){
    console.log(error);
    var errMsg = 'Error fetching data!';
    if (error instanceof XMLHttpRequest){
      errMsg += '<br />' + JSON.parse(error.responseText).error.message;
    }
    var canvasDiv = d3.select('#canvas');
    canvasDiv.selectAll('*').remove();
    canvasDiv.append('div').html(errMsg);
  }

  window.onload = main;
  window.onresize = function(){
    if (!moviesData) return;

    var canvasDiv = d3.select('#canvas');

    width = canvasDiv.node().offsetWidth - margin.left - margin.right;
    height = canvasDiv.node().offsetHeight - margin.top - margin.bottom;

    var svgGroup = canvasDiv.select('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .select('g');

    svgGroup.selectAll('*').remove();

    render(svgGroup, moviesData);
  };

})(window.d3);
