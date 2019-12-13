#!/bin/bash

source server/hadoop-3.1.2/.profile
source server/hadoop-3.1.2/.bashrc
cd server/hadoop-3.1.2
wget https://www-eu.apache.org/dist/spark/spark-2.4.4/spark-2.4.4-bin-hadoop2.7.tgz
tar -xvf spark-2.4.4-bin-hadoop2.7.tgz
rm -rf spark-2.4.4-bin-hadoop2.7.tgz
sudo mv spark-2.4.4-bin-hadoop2.7 spark
cd ../
cd ../
sudo mv hadoop/spark/spark-defaults.conf server/hadoop-3.1.2/spark/conf/spark-defaults.conf
cd server/hadoop-3.1.2
cp etc/hadoop/workers spark/conf/slaves
cp etc/hadoop/workers etc/hadoop/slaves