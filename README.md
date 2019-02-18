# VisionQL #

VisionQL is a project to explore the use of declarative queries on top of ML based computer vision. Think SQL for computer vision. 

It is a Node.js application written in TypeScript. 
There is currently not a webserver, Node.js is a thin wrappers around the Google Vision api call. 

It has been choosen so TypeScript can be used to process the response.

# Interesting Queries #

What kind of query would be interesting?

* Select areas where there is red human hair.
* Count number visible eyes in women with blue jeans.



# How To Run #

Currently the can do 2 Google Vision API calls. For both you need to have a file with service account credentials.

If you want to try it do the following:

``` bash

git clone git@github.com:sami-badawi/visionql.git

cd visionql

export GOOGLE_APPLICATION_CREDENTIALS=/home/yourname/yourpath/key.json 

npm i

npm run build

node dist/call_image_label.js --file_path resources/wakeupcat.jpg --query yes

node dist/call_face_detect.js --gs_path gs://sami-vision-project/AI-panel-2018-02-15.jpg --query yes

```

### Label Results ###

Result of running call_image_label will be store in file:

`output/wakeupcat_jpg/label_detect_result.json`

If the label program was run with `--query yes` it will output if the picture has cats, dogs and internet memes.

```
for image: ./resources/wakeupcat.jpg: isMeme: true, hasCat: true, hasDog: false
```

### Face Detect Results ###

Result of running face detect will be store in file:

`output/AI-panel-2018-02-15_jpg/face_detect_result.json`

The project has an example file:

`output/example_face_detect_result.json`

If the face detect program was run with `--query yes` it will count number of faces and number of happy faces:

```
for image: gs://sami-vision-project/AI-panel-2018-02-15.jpg: faceCount: 4; happyFaceCount: 1
```

# Current Queries Technology #

Currently the application is just doing a few canned queries.

It is easier to write a new canned query due to the help from TypeScripts types.

# Next Queries Technology #

The point of VisionQL is that it should work with a more declarative queries.
Here is a short discussion of a few candidates for this:

**SQL** does not lend itself well to this, since it is dealing with flat relational data.

[**PostGIS**](https://postgis.net) is a SQL frontend to a lot of computational geometry code written in C++. It is well suited for dealing with geometric operations on point, lines and polygons. However it is missing hierarchical nature of computer vision.

[**Mini Kanaren**](https://en.wikipedia.org/wiki/MiniKanren) is a logic programming language with several implementation in JavaScritp. That is an option that is worth exploring.


# Backend #

There are many good computer vision system available.

## Google Vision API ##

First backend for VisionQL is [Google Vision API](https://cloud.google.com/vision/).

It is high quality. You have to be a user of Google Cloud Platform, but it is relatively easy and cheap to get setup to experiment.

## TensorFlow.js ##

[**TensorFlow.js**](https://js.tensorflow.org/) will be the next backend to try. The model can running directly in the browser. So there is no need to set up API keys.


### TensorFlow.js models ###

TensorFlow.js has the following 2 models:

* [**PoseNet**](https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5) for human pose estimation.
* [**BodyPix**](https://github.com/tensorflow/tfjs-models/tree/master/body-pix) for person segmentation.


## Ensemble ML methods ##

It is natural for a declarative system to use ML ensemble methods. So have more than one backend and possibly look for different features in the results from different backends.


# Status #

Pre alpha.
This project is currently a playground for experimenting with Google Vision API results in TypeScript.


