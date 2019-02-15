# VisionQL #

VisionQL is a project to explore the use of declarative queries on top of ML based computer vision. Think SQL for computer vision. 

It is a Node.js application written in TypeScript. 
There is currently not a webserver, Node.js is a thin wrappers around the Google Vision api call. 

It has been choosen so TypeScript can be used to process the response.

# Interesting Queries #

What kind of query would be interesting?

* Select areas where there is red human hair.
* Count number visible eyes in women with blue jeans.

# Queries Technology #

**SQL** does not lend itself well to this, since it is dealing with flat relational data.

[**PostGIS**](https://postgis.net) is a SQL frontend to a lot of computational geometry code written in C++. It is well suited for dealing with geometric operations on point, lines and polygons. However it is missing hierarchical nature of computer vision.

[**Mini Kanaren**](https://en.wikipedia.org/wiki/MiniKanren) is a logic programming language with several implementation in JavaScritp. That is an option that is worth exploring.


# Backend #

There are many good computer vision system available.

First backend for VisionQL is [Google Vision API](https://cloud.google.com/vision/).

It is high quality. You have to be a user of Google Cloud Platform, but it is relatively easy and cheap to get setup to experiment.

[TensorFlow.js](https://js.tensorflow.org/) will be the next backend to try since that can be called directly.

## Ensemble ML methods ##

It is natural for a declarative system to use ML ensemble methods. So have more than one backend and possibly look for different features in the results from different backends.


# How To Run #

Currently the can do 2 Google Vision API calls. For both you need to have a file with service account credentials.

If you want to try it do the following:

``` bash

git clone git@github.com:sami-badawi/visionql.git

cd visionql

export GOOGLE_APPLICATION_CREDENTIALS=/home/yourname/yourpath/key.json 

npm i

npm run build

node dist/call_label.js 

node dist/call_face_detect.js

```

Result of running face detect will be store in file:

`output/face_detect_result.json`

The project has checked in example file:

`output/example_face_detect_result.json`


# Status #

Pre alpha.
This project is currently a playground for experimenting with Google Vision API results in TypeScript.

# Short Term Goals #

* Get Google Vision API working better with TypeScript defintions
* Systematic way of handling images and output of images
