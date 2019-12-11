#!/bin/bash

# Get Kindle reviews
wget -c https://www.dropbox.com/s/wg4y0etqwml0dgg/kindle-reviews.zip?dl=0 -O kindle-reviews.zip
unzip kindle-reviews.zip
rm -rf kindle_reviews.json

# Get meta data
wget -c https://www.dropbox.com/s/bu6li4yauyk3ght/meta_kindle_exported.json.zip?dl=0 -O meta_kindle_exported.json.zip
unzip meta_kindle_exported.json.zip
rm -rf meta_kindle_exported.json.zip

# Clean up
rm -rf *.zip
rm -rf __MACOSX