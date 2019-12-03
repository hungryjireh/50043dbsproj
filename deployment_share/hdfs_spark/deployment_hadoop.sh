#!/bin/bash

NAMENODE_DNS=$(cat "hadoop/hadoop_namenode_dns.txt")

scp -i $2 hadoop.zip ec2-user@${NAMENODE_DNS}:/home/ec2-user/hadoop.zip
scp -i $2 hadoop_namenode_setup.sh ec2-user@${NAMENODE_DNS}:/home/ec2-user/hadoop_namenode_setup.sh
scp -i $2 $2 ec2-user@${NAMENODE_DNS}:/home/ec2-user/$2
scp -i $2 spark_setup.sh ec2-user@${NAMENODE_DNS}:/home/ec2-user/spark_setup.sh

ssh -o StrictHostKeyChecking=no -tt -i $2 ec2-user@${NAMENODE_DNS} << EOF
    echo "Updating Linux Machine...\n"
    yes | sudo yum update
    chmod 755 hadoop_namenode_setup.sh
    ./hadoop_namenode_setup.sh "$1" "$2"
    exit
EOF

for ((i=1;i<=$1;i++)); do 
    DATANODE_DNS=$(cat "hadoop/hadoop_datanode_dns_$i.txt")
    scp -o StrictHostKeyChecking=no -i $2 hadoop.zip ec2-user@${DATANODE_DNS}:/home/ec2-user/hadoop.zip
    scp -o StrictHostKeyChecking=no -i $2 hadoop_datanode_setup.sh ec2-user@${DATANODE_DNS}:/home/ec2-user/hadoop_datanode_setup.sh
    scp -o StrictHostKeyChecking=no -i $2 spark_setup.sh ec2-user@${DATANODE_DNS}:/home/ec2-user/spark_setup.sh
    ssh -o StrictHostKeyChecking=no -tt -i $2 ec2-user@${DATANODE_DNS} << EOF
        echo "Updating Linux Machine...\n"
        yes | sudo yum update
        chmod 755 hadoop_datanode_setup.sh
        ./hadoop_datanode_setup.sh "$1"
        chmod 755 spark_setup.sh
        ./spark_setup.sh
        exit
EOF
done

ssh -o StrictHostKeyChecking=no -tt -i $2 ec2-user@${NAMENODE_DNS} << EOF
    cat .ssh/id_rsa.pub >> .ssh/authorized_keys
    yes | ssh -tt localhost
    exit
    server/hadoop-3.1.2/bin/hdfs namenode -format
    chmod 755 spark_setup.sh
    ./spark_setup.sh
    ./server/hadoop-3.1.2/sbin/start-dfs.sh
    ./server/hadoop-3.1.2/sbin/start-yarn.sh
    server/hadoop-3.1.2/bin/hdfs dfs -mkdir /spark-logs
    ./server/hadoop-3.1.2/spark/sbin/start-history-server.sh
    ./server/hadoop-3.1.2/spark/sbin/start-all.sh
    exit
EOF