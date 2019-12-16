## INSTRUCTIONS ON AUTOMATIC DEPLOYMENT

1. Follow instructions on https://stackabuse.com/automating-aws-ec2-management-with-python-and-boto3/ to obtain credentials.csv. This should be placed in deployment_share/deployment.
2. Make sure you obtain your private key file (ie. key.pem). Place your private key file in deployment_share/deployment.
3. Change directory to deployment_share/deployment and run "python3 aws.py <number_of_nodes> <private_key.pem> <instance_size> <availability-region>" (values are optimised for t2.medium instance size)  
eg. python3 aws.py 2 50043_new.pem t2.medium us-east-1  
eg. python3 aws.py 4 50043_new.pem t2.medium us-east-1  
eg. python3 aws.py 8 50043_new.pem t2.medium us-east-1  

Take note to configure according to what you wish to deploy (final deployment script triggers all installation).

```
# deployment_share/deployment/aws.py

# DEPLOY MYSQL
#print(deploy_mysql(ec2, sys.argv[2], sys.argv[3]))
# DEPLOY MONGODB
#print(deploy_mongodb(ec2, sys.argv[2], sys.argv[3]))
# DEPLOY NODEJS
#print(deploy_nodejs(ec2, sys.argv[2], sys.argv[3]))
# DEPLOY HADOOP/SPARK
print(deploy_hadoop_cluster(ec2, int(sys.argv[1]), sys.argv[2], sys.argv[3]))
```

## INSTRUCTIONS ON ANALYSIS

After setting up all instances, running the analyse_db.sh script will export a .csv file from the MySQL instance and a .json file from the MongoDB instance into the namenode of the Hadoop/Spark cluster (ETL). Analysis will then be run via PySpark, the results of which will be printed on the console.

1. Analysis will be run on the namenode of the Hadoop/Spark cluster. Obtain the private key of the namenode.
2. Run "python3 analyse_db.py <private_key.pem>"
3. Results of analysis is saved as pearson_correlation_results.txt and tf_idf_results.txt respectively for question 1 and question 2.