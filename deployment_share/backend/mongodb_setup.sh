#!/bin/bash

sudo mv mongodb-org-4.2.repo /etc/yum.repos.d/mongodb-org-4.2.repo
sudo yum install -y mongodb-org
sudo service mongod start
mongoimport --db test --collection KindleMetadata --file /home/ec2-user/meta_kindle_exported.json
rm -rf meta_kindle_exported.json
mongo < mongo_commands.js
sudo mv mongod.conf /etc/mongod.conf
sudo service mongod restart