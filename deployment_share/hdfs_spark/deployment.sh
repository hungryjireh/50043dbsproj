#!/bin/bash

MYSQL_DNS=$(cat "mysql_dns.txt")

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@${MYSQL_DNS} << EOF
    echo "Changing environment file..."
    echo "LANG=en_US.UTF-8" > environment
    echo "" >> environment
    echo "LC_ALL=en_US.UTF-8" >> environment
    sudo mv environment /etc/environment
    exit
EOF

scp -i $1 get_data.sh ec2-user@${MYSQL_DNS}:/home/ec2-user/get_data.sh
scp -i $1 mysql_setup.sh ec2-user@${MYSQL_DNS}:/home/ec2-user/mysql_setup.sh
scp -i $1 mongodb_setup.sh ec2-user@${MYSQL_DNS}:/home/ec2-user/mongodb_setup.sh
scp -i $1 load_sql.sql ec2-user@${MYSQL_DNS}:/home/ec2-user/load_sql.sql
scp -i $1 mongodb-org-4.2.repo ec2-user@${MYSQL_DNS}:/home/ec2-user/mongodb-org-4.2.repo
scp -i $1 mongo_commands.js ec2-user@${MYSQL_DNS}:/home/ec2-user/mongo_commands.js
scp -i $1 mongod.conf ec2-user@${MYSQL_DNS}:/home/ec2-user/mongod.conf
scp -i $1 my.cnf ec2-user@${MYSQL_DNS}:/home/ec2-user/my.cnf

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@${MYSQL_DNS} << EOF
    echo "Updating Linux Machine...\n"
    sudo yum history sync
    yes | sudo yum update
    chmod 755 get_data.sh
    ./get_data.sh
    chmod 755 mysql_setup.sh
    ./mysql_setup.sh
    chmod 755 mongodb_setup.sh
    ./mongodb_setup.sh
    exit
EOF