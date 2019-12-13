#!/bin/bash

# Get Kindle reviews
wget -c https://www.dropbox.com/s/wg4y0etqwml0dgg/kindle-reviews.zip?dl=0 -O kindle-reviews.zip
unzip kindle-reviews.zip
rm -rf kindle_reviews.json

# Clean up
rm -rf *.zip
rm -rf __MACOSX