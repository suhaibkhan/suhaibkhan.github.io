---
title: "Real-time Object Tracking for Autonomous Vehicles"
date:   2012-05-13 21:00:00 +0530
---

![Autonomous Vehicle](/images/project.jpg)

Real-time Object Tracking for Autonomous Vehicles, its the title of our B.Tech final year project, just completed. The project focuses on unsupervised tracking of objects in a video based on their color histogram. Apart from a B.Tech final year project, it was a thrilling experience for me. It was my decision to do a project related to image processing and other members in my project group also agreed to go with image processing as it’s an interesting domain. This project helped us a lot in familiarizing some important concepts in image processing and we learned a lot about image processing through this project.

We used a lot of frameworks/technologies such as Arduino, Android, Qt, OpenCV and languages c, c++, and java to complete our project. You must be wondering why we used this much frameworks to complete a project in an image processing domain. Actually our project consists of two parts, first part is the object tracking system and the other part is a robot car which demonstrates tracking.

The robot is miniature of a computer controlled vehicle. It has an android phone fixed in it. This android phone serves as the remote control unit as well as the visual unit of the robot. Remote control unit, in the sense that the control bytes from the remote PC are received by this android phone via wireless internet connection. These control bytes are send to the microcontroller board(Arduino) of the robot via Bluetooth, which in turn drives the robot. An android application developed for this purpose, which runs in the background as an android service handles all these remote controlling functionality. Another android application is also developed for the purpose of receiving video in front of the robot. This application uses camera of the phone to receive the video and performs live streaming of that video.

The core part of the project is the development of a tracking system. We used an improved version of a popular color based object tracking algorithm called CAMShift as the base of the tracking system. It tracks the selected object in the video received from the robot and outputs commands to drive the robot to follow the specified object. We used OpenCV + Qt combination for developing the tracking system. Qt framework is mainly used for creating the GUI of the tracking system and the system also used the network module in Qt for handling networking related functionality. In the image processing part, OpenCV helped us a lot. It’s an awesome library for image processing because it’s easy to use(cross-platform, available for C, C++, Python, Android, etc), properly documented, it has optimized implementations of most of the popular algorithms in image processing, machine learning and related domains and another important feature is it’s open source.

Even though the tracking algorithm is subjected to improvements in future, the algorithm yielded an output with considerable accuracy in our case, that is it was working fine for a robot that follows a selected object.
