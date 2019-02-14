# VisionQL #

VisionQL is a project to explore the use of declarative queries on top of ML based computer vision. Think SQL for computer vision. It is written in TypeScript.

# Backend #

There are many good computer vision system available.

First backend is [Google Vision API](https://cloud.google.com/vision/).

Next backend to try:

[TensorFlow.js](https://js.tensorflow.org/)

# How To Run #

``` bash

git clone git@github.com:sami-badawi/visionql.git

cd visionql

export GOOGLE_APPLICATION_CREDENTIALS=

npm run build

node dist/call_label.js 

node dist/call_face_detect.js

```

# Status #

Pre alpha.
Setting up a play ground for experimenting.

# Short Term Goals #

* Get Google Vision API working better with TypeScritp defintions
* Systematic way of handling images and output of images
