

$(function(){

  var $window = $(window);
  var $container = $('#container');
  var $containerOverlay = $('#containerOverlay');
  var $sidebar = $('#sidebar');

  var bannerPresent = false, $bannerTitle = null, $bannerContent = null;
  var $banner = $('#banner');
  if ($banner.length > 0){
    bannerPresent = true;
    $bannerTitle = $banner.find('h2');
    $bannerContent = $banner.find('#bannercontent');
  }

  var contentPresent = false;
  var $containerContent = $('#containerContent');
  if ($containerContent.length > 0){
    contentPresent = true;
  }

  $('#menuBtn').click(function(){
    $sidebar.addClass('visible');
    $containerOverlay.show();
    if (bannerPresent){
      $banner.addClass('blur');
    }
    if(contentPresent){
      $containerContent.addClass('blur');
    }
  });

  $('#menuCloseBtn').click(function(){
    $sidebar.removeClass('visible');
    $containerOverlay.hide();
    if (bannerPresent){
      $banner.removeClass('blur');
    }
    if(contentPresent){
      $containerContent.removeClass('blur');
    }
  });

  $containerOverlay.click(function(){
    $('#menuCloseBtn').trigger('click');
  });

  $window.load(function() {

    var $containerBac = $('#containerBac');
    var bacImagePresent = false, aspectRatio = 0;
    if ($containerBac.length > 0){
      bacImagePresent = true;
      aspectRatio = $containerBac.width() / $containerBac.height();
    }

    $window.resize(function(){
      if (bacImagePresent){
        if (($window.width() / $window.height()) < aspectRatio){
          $containerBac.css('width', '');
          $containerBac.css('height', '100%');
        }else{
          $containerBac.css('height', '');
          $containerBac.css('width', '100%');
        }
      }

      var sideCenterAdjust = Math.max($('#menuCloseBtn').outerHeight(true),
        Math.floor(($sidebar.height()/2) - ($sidebar.find('#sidebar-content').height()/2)));
      $sidebar.find('#sidebar-content').css('top', sideCenterAdjust + 'px');

      if (bannerPresent){
        var subTitleCenterAdjust = Math.max($bannerTitle.outerHeight(true),
          Math.floor((($banner.height() - $bannerContent.outerHeight(true))/2)));
        $bannerContent.css('top', subTitleCenterAdjust + 'px');
      }

    }).trigger('resize');

    if (bannerPresent){
      var subTitle = $bannerTitle.find('a').text();
      $bannerTitle.find('a').html('').css('opacity', 1);
      $bannerTitle.find('a').typed({
        strings: [subTitle],
        cursorChar: '|',
        typeSpeed: 150,
        onStringTyped: function() {
          $bannerTitle.find('.typed-cursor').hide();
          $bannerContent.animate({'opacity' : 1});
        }
      });
    }

  });

});
