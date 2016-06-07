---
title: "Motion detection using webcam"
date:   2011-08-11 18:44:00 +05:30
---
Recently I found an interesting article about Motion Detection Algorithms at [CodeProject][codeproject-link]. It discusses about some approaches for motion detection in a continuous video stream.

{% include image.html src="images/motion_detect.jpg" align="center" caption="Screenshot of the Motion Detector application programmed by me" imgstyle="max-width: 480px" %}

Inspired by this article, i decided to program an application that can detect motion in video from a webcam. Selected C#.net as the programming language and used a framework, which is specified in that article called AForge.net for image processing. [AForge.net][aforge] is a C# framework designed for developers and researchers in the fields of Computer Vision and Artificial Intelligence – image processing, neural networks, genetic algorithms, fuzzy logic, machine learning, robotics, etc. Its an awesome framework which can even be used by someone who doesn’t know anything about image processing.

This application works by calculating the difference between the background frame and the current frame. The resultant image is binarized using a specific threshold value. The number of white pixels in the binarized image is calculated and if this number exceeds a predetermined value, then motion is detected. These operations on image can be done easily with the help of AForge.net framework.

[codeproject-link]: http://www.codeproject.com/KB/audio-video/Motion_Detection.aspx
[aforge]: http://www.aforgenet.com/framework/
