---
title: "Storing a tree hierarchy in database"
date:   2013-03-20 20:00:00 +0530
---
Last week, I was searching the web about possibilities of writing recursive SQL queries to traverse an n-ary tree which is stored in the database. There was no option other than recursion as the hierarchy was stored by means of adjacency list method. By adjacency list method each node will be storing only its direct parent. So without recursion, I don’t think it’s possible to get all children/parents of a particular node.

Even though writing recursive SQL queries is possible, it seems pretty odd and much costly compared to normal queries. So I started searching for better practices regarding the storage of tree structure in database. Another approach which found to be apt for my case was Modified Preorder Tree Traversal (MPTT) method. This method stores a starting and end point which makes the traversal easy and cheap.

Both adjacency list method and MPTT method has its own advantages as well as disadvantages. With MPTT method retrieval of children/parents of a node is cheap, which is costly in the case of adjacency list method. When it comes to insertion/updation, adjacency list method has the advantage as these operations are costly with MPTT method. So depending on our scenario we have to select an appropriate method. That means if the frequency of modifications to the tree is low and traversal is high, then MPTT is the best otherwise we should go for adjacency list method.

Go through this sitepoint article ([Storing Hierarchical Data in a Database][sitepoint-article]) to know more about these methods.

[sitepoint-article]: http://www.sitepoint.com/hierarchical-data-database/
