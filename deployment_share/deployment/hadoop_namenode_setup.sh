#!/bin/bash

# NAMENODE
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

sudo yum install -y expect
KEYGEN=$(expect -c "
    set timeout 5
    spawn ssh-keygen
    expect \"Enter file in which to save the key (/home/ec2-user/.ssh/id_rsa): \"
    send \"\r\"
    expect \"Enter passphrase (empty for no passphrase): \"
    send \"\r\"
    expect \"Enter same passphrase again: \"
    send \"\r\"
    expect eof
")
echo "$KEYGEN"

cd ../
NAMENODE_DNS=$(cat "hadoop/hadoop_namenode_dns.txt")
NAMENODE_PRIVATE_IP=$(cat "hadoop/hadoop_namenode_privateipaddress.txt")

echo "" >> hadoop/namenode/hosts
echo "${NAMENODE_PRIVATE_IP} node-master" >> hadoop/namenode/hosts
echo "${NAMENODE_PRIVATE_IP}" > hadoop/namenode/masters
for ((i=1;i<=$1;i++)); do 
    DATANODE_PRIVATE_IP=$(cat "hadoop/hadoop_datanode_privateipaddress_$i.txt")
    echo "${DATANODE_PRIVATE_IP} node$i" >> hadoop/namenode/hosts
done
cat hadoop/namenode/hosts

KEYPAIR=$2
# sed -i "s/<nnode>/${NAMENODE_DNS}/g" hadoop/namenode/config
for ((i=1;i<=$1;i++)); do 
    pathname="hadoop/hadoop_datanode_dns_$i.txt"
    # echo ${pathname}
    DATANODE_DNS=$(cat "hadoop/hadoop_datanode_dns_$i.txt")
    # echo ${DATANODE_DNS}
    scp -o StrictHostKeyChecking=no -i ${KEYPAIR} .ssh/id_rsa.pub ec2-user@${DATANODE_DNS}:/home/ec2-user/id_rsa.pub
    echo "${DATANODE_DNS}" >> hadoop/namenode/workers
done
cat hadoop/namenode/workers

# # TODO: Namenode: Setup HDFS Properties
sed -i "s/<nnode>/${NAMENODE_DNS}/g" hadoop/namenode/mapred-site.xml
sed -i "s/<nnode>/${NAMENODE_DNS}/g" hadoop/namenode/yarn-site.xml
sed -i "s/<nnode>/${NAMENODE_DNS}/g" hadoop/namenode/core-site.xml
sed -i "s/<numnodes>/$1/g" hadoop/namenode/hdfs-site.xml

sudo mv hadoop/namenode/hadoop-env.sh server/hadoop-3.1.2/etc/hadoop/hadoop-env.sh
sudo mv hadoop/namenode/hdfs-site.xml server/hadoop-3.1.2/etc/hadoop/hdfs-site.xml
sudo mv hadoop/namenode/core-site.xml server/hadoop-3.1.2/etc/hadoop/core-site.xml
sudo mv hadoop/namenode/mapred-site.xml server/hadoop-3.1.2/etc/hadoop/mapred-site.xml
sudo mv hadoop/namenode/yarn-site.xml server/hadoop-3.1.2/etc/hadoop/yarn-site.xml
sudo mv hadoop/namenode/workers server/hadoop-3.1.2/etc/hadoop/workers
sudo mv hadoop/namenode/masters server/hadoop-3.1.2/etc/hadoop/masters
sudo mv hadoop/namenode/hosts /etc/hosts
sudo mv hadoop/namenode/.profile server/hadoop-3.1.2/.profile
sudo mv hadoop/namenode/.bashrc server/hadoop-3.1.2/.bashrc