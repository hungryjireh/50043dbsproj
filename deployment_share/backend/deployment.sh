#!/bin/bash

scp -i 50043.pem get_data.sh ec2-user@"$1":/home/ec2-user/get_data.sh
scp -i 50043.pem mysql_setup.sh ec2-user@"$1":/home/ec2-user/mysql_setup.sh
scp -i 50043.pem mongodb_setup.sh ec2-user@"$1":/home/ec2-user/mongodb_setup.sh
scp -i 50043.pem load_sql.sql ec2-user@"$1":/home/ec2-user/load_sql.sql
scp -i 50043.pem mongodb-org-4.2.repo ec2-user@"$1":/home/ec2-user/mongodb-org-4.2.repo
scp -i 50043.pem mongo_commands.js ec2-user@"$1":/home/ec2-user/mongo_commands.js
scp -i 50043.pem mongod.conf ec2-user@"$1":/home/ec2-user/mongod.conf
scp -i 50043.pem my.cnf ec2-user@"$1":/home/ec2-user/my.cnf

ssh -o StrictHostKeyChecking=no -tt -i 50043.pem ec2-user@"$1" << EOF
    echo "Updating Linux Machine...\n"
    yes | sudo yum update
    # yes | sudo yum install python37
    chmod 755 get_data.sh
    ./get_data.sh
    chmod 755 mysql_setup.sh
    ./mysql_setup.sh
    chmod 755 mongodb_setup.sh
    ./mongodb_setup.sh
    exit
EOF