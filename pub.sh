#!/bin/sh

node convertcsv.js
node combine.js
mv index.html www
