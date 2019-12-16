#!/bin/bash

# DATANODE setup
unzip hadoop.zip
rm -rf hadoop.zip
rm -rf __MACOSX
yes | sudo yum install java-1.8.0-openjdk-headless
mkdir server
cd server
# download Hadoop
wget -c https://archive.apache.org/dist/hadoop/common/hadoop-3.1.2/hadoop-3.1.2.tar.gz -O hadoop-3.1.2.tar.gz
tar xvzf hadoop-3.1.2.tar.gz
# clean up files
rm -rf hadoop-3.1.2.tar.gz
rm -rf __MACOSX

cd ../
# copy public key of namenode to authorized_keys
cat id_rsa.pub >> .ssh/authorized_keys

NAMENODE_DNS=$(cat "hadoop/hadoop_namenode_dns.txt")
NAMENODE_PRIVATE_IP=$(cat "hadoop/hadoop_namenode_privateipaddress.txt")

# replace variables in file with predefined variables
sed -i "s/<numnodes>/$1/g" hadoop/datanode/hdfs-site.xml
sed -i "s/<nnode>/${NAMENODE_DNS}/g" hadoop/datanode/mapred-site.xml
sed -i "s/<nnode>/${NAMENODE_DNS}/g" hadoop/datanode/yarn-site.xml
sed -i "s/<nnode>/${NAMENODE_DNS}/g" hadoop/datanode/core-site.xml

# add all namenode and datanodes to hosts file
echo "" >> hadoop/datanode/hosts
echo "${NAMENODE_PRIVATE_IP} node-master" >> hadoop/datanode/hosts
echo "${NAMENODE_PRIVATE_IP}" > hadoop/datanode/masters
for ((i=1;i<=$1;i++)); do 
    DATANODE_DNS=$(cat "hadoop/hadoop_datanode_dns_$i.txt")
    DATANODE_PRIVATE_IP=$(cat "hadoop/hadoop_datanode_privateipaddress_$i.txt")
    echo "${DATANODE_PRIVATE_IP} node$i" >> hadoop/datanode/hosts
    echo "${DATANODE_DNS}" >> hadoop/datanode/workers
done
cat hadoop/datanode/hosts

# move required files to proper locations
sudo mv hadoop/datanode/hdfs-site.xml server/hadoop-3.1.2/etc/hadoop/hdfs-site.xml
sudo mv hadoop/datanode/mapred-site.xml server/hadoop-3.1.2/etc/hadoop/mapred-site.xml
sudo mv hadoop/datanode/hadoop-env.sh server/hadoop-3.1.2/etc/hadoop/hadoop-env.sh
sudo mv hadoop/datanode/core-site.xml server/hadoop-3.1.2/etc/hadoop/core-site.xml
sudo mv hadoop/datanode/yarn-site.xml server/hadoop-3.1.2/etc/hadoop/yarn-site.xml
sudo mv hadoop/datanode/hosts /etc/hosts
sudo mv hadoop/datanode/.profile server/hadoop-3.1.2/.profile
sudo mv hadoop/datanode/.bashrc server/hadoop-3.1.2/.bashrc
sudo mv hadoop/datanode/workers server/hadoop-3.1.2/etc/hadoop/workers
sudo mv hadoop/datanode/masters server/hadoop-3.1.2/etc/hadoop/masters
sudo mv id_rsa.pub .ssh