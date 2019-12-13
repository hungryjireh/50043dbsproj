#!/bin/bash

#scp -i $1 analyse_spark.py ec2-user@$2:/home/ec2-user/analyse_spark.py
scp -i $1 mongodb_download.sh ec2-user@$2:/home/ec2-user/mongodb_download.sh
scp -i $1 mysql_download.sh ec2-user@$2:/home/ec2-user/mysql_download.sh
scp -i $1 mysql_dns.txt ec2-user@$2:/home/ec2-user/mysql_dns.txt
scp -i $1 mongodb_dns.txt ec2-user@$2:/home/ec2-user/mongodb_dns.txt

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@$2 << EOF
    chmod 755 mongodb_download.sh
    ./mongodb_download.sh "$1"
    chmod 755 mysql_download.sh
    ./mysql_download.sh "$1"
    server/hadoop-3.1.2/bin/hdfs dfs -put mysql_download.csv /
    server/hadoop-3.1.2/bin/hdfs dfs -put mongodb_store_download.json /
    exit
EOF