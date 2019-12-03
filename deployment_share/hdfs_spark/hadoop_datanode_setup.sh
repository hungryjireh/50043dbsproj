#!/bin/bash

# DATANODE
unzip hadoop.zip
rm -rf hadoop.zip
rm -rf __MACOSX
yes | sudo yum install java-1.8.0-openjdk-headless
mkdir server
cd server
wget -c https://archive.apache.org/dist/hadoop/common/hadoop-3.1.2/hadoop-3.1.2.tar.gz -O hadoop-3.1.2.tar.gz
tar xvzf hadoop-3.1.2.tar.gz
rm -rf hadoop-3.1.2.tar.gz
rm -rf __MACOSX

cd ../
cat id_rsa.pub >> .ssh/authorized_keys

NAMENODE_DNS=$(cat "hadoop/hadoop_namenode_dns.txt")
NAMENODE_PRIVATE_IP=$(cat "hadoop/hadoop_namenode_privateipaddress.txt")

sed -i "s/<numnodes>/$1/g" hadoop/datanode/hdfs-site.xml
sed -i "s/<nnode>/${NAMENODE_DNS}/g" hadoop/datanode/mapred-site.xml
sed -i "s/<nnode>/${NAMENODE_DNS}/g" hadoop/datanode/yarn-site.xml
sed -i "s/<nnode>/${NAMENODE_DNS}/g" hadoop/datanode/core-site.xml

echo "" >> hadoop/datanode/hosts
echo "${NAMENODE_PRIVATE_IP} node-master" >> hadoop/datanode/hosts
for ((i=1;i<=$1;i++)); do 
    DATANODE_DNS=$(cat "hadoop/hadoop_datanode_dns_$i.txt")
    DATANODE_PRIVATE_IP=$(cat "hadoop/hadoop_datanode_privateipaddress_$i.txt")
    echo "${DATANODE_PRIVATE_IP} node$i" >> hadoop/datanode/hosts
    echo "${DATANODE_DNS}" >> hadoop/datanode/workers
done
cat hadoop/datanode/hosts

sudo mv hadoop/datanode/hdfs-site.xml server/hadoop-3.1.2/etc/hadoop/hdfs-site.xml
sudo mv hadoop/datanode/mapred-site.xml server/hadoop-3.1.2/etc/hadoop/mapred-site.xml
sudo mv hadoop/datanode/hadoop-env.sh server/hadoop-3.1.2/etc/hadoop/hadoop-env.sh
sudo mv hadoop/datanode/core-site.xml server/hadoop-3.1.2/etc/hadoop/core-site.xml
sudo mv hadoop/datanode/yarn-site.xml server/hadoop-3.1.2/etc/hadoop/yarn-site.xml
sudo mv hadoop/datanode/hosts /etc/hosts
sudo mv hadoop/datanode/.profile server/hadoop-3.1.2/.profile
sudo mv hadoop/datanode/.bashrc server/hadoop-3.1.2/.bashrc
sudo mv hadoop/datanode/workers server/hadoop-3.1.2/etc/hadoop/workers
sudo mv id_rsa.pub .ssh