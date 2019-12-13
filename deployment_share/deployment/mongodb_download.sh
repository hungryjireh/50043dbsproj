#!/bin/bash

MONGODB_DNS=$(cat "mongodb_dns.txt")

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@${MONGODB_DNS} << EOF
    mongoexport -u myUser2 -p password -d test --collection store --out /home/ec2-user/mongodb_store_download.json
    sudo chmod 770 /home/ec2-user/mongodb_store_download.json
    sudo chown -R ec2-user: /home/ec2-user/mongodb_store_download.json
    exit
EOF

scp -r -i $1 ec2-user@${MONGODB_DNS}:/home/ec2-user/mongodb_store_download.json mongodb_store_download.json
