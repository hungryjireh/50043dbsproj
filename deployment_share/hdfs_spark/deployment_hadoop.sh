#!/bin/bash

NAMENODE_DNS=$(cat "hadoop/hadoop_namenode_dns.txt")

ssh -o StrictHostKeyChecking=no -tt -i $2 ec2-user@${NAMENODE_DNS} << EOF
    echo "Changing environment file..."
    echo "LANG=en_US.UTF-8" > environment
    echo "LC_ALL=en_US.UTF-8" >> environment
    sudo mv environment /etc/environment
    exit
EOF

scp -i $2 hadoop.zip ec2-user@${NAMENODE_DNS}:/home/ec2-user/hadoop.zip
scp -i $2 hadoop_namenode_setup.sh ec2-user@${NAMENODE_DNS}:/home/ec2-user/hadoop_namenode_setup.sh
scp -i $2 $2 ec2-user@${NAMENODE_DNS}:/home/ec2-user/$2
scp -i $2 spark_setup.sh ec2-user@${NAMENODE_DNS}:/home/ec2-user/spark_setup.sh

ssh -o StrictHostKeyChecking=no -tt -i $2 ec2-user@${NAMENODE_DNS} << EOF
    echo "Updating Linux Machine...\n"
    sudo yum history sync
    yes | sudo yum update
    curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
    sudo yum install -y nodejs
    curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
    sudo rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg
    sudo yum install -y yarn
    chmod 755 hadoop_namenode_setup.sh
    ./hadoop_namenode_setup.sh "$1" "$2"
    exit
EOF

for ((i=1;i<=$1;i++)); do 
    DATANODE_DNS=$(cat "hadoop/hadoop_datanode_dns_$i.txt")
    ssh -o StrictHostKeyChecking=no -tt -i $2 ec2-user@${DATANODE_DNS} << EOF
        echo "Changing environment file..."
        echo "LANG=en_US.UTF-8" > environment
        echo "" >> environment
        echo "LC_ALL=en_US.UTF-8" >> environment
        sudo mv environment /etc/environment
        exit
EOF
    scp -o StrictHostKeyChecking=no -i $2 hadoop.zip ec2-user@${DATANODE_DNS}:/home/ec2-user/hadoop.zip
    scp -o StrictHostKeyChecking=no -i $2 hadoop_datanode_setup.sh ec2-user@${DATANODE_DNS}:/home/ec2-user/hadoop_datanode_setup.sh
    scp -o StrictHostKeyChecking=no -i $2 spark_setup.sh ec2-user@${DATANODE_DNS}:/home/ec2-user/spark_setup.sh
    ssh -o StrictHostKeyChecking=no -tt -i $2 ec2-user@${DATANODE_DNS} << EOF
        echo "Updating Linux Machine...\n"
        sudo yum history sync
        yes | sudo yum update
        curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
        sudo yum install nodejs -y
        curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
        sudo rpm --import https://dl.yarnpkg.com/rpm/pubkey.gpg
        sudo yum install yarn -y
        chmod 755 hadoop_datanode_setup.sh
        ./hadoop_datanode_setup.sh "$1"
        chmod 755 spark_setup.sh
        ./spark_setup.sh
        exit
EOF
done

ssh -o StrictHostKeyChecking=no -tt -i $2 ec2-user@${NAMENODE_DNS} << EOF
    cat .ssh/id_rsa.pub >> .ssh/authorized_keys
    # ssh -o StrictHostKeyChecking=no -tt localhost
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