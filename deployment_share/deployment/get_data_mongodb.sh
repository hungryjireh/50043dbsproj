#!/bin/bash

# Get meta data (.json file) from Dropbox
wget -c https://www.dropbox.com/s/bu6li4yauyk3ght/meta_kindle_exported.json.zip?dl=0 -O meta_kindle_exported.json.zip
unzip meta_kindle_exported.json.zip
rm -rf meta_kindle_exported.json.zip

# Clean up
rm -rf *.zip
rm -rf __MACOSX