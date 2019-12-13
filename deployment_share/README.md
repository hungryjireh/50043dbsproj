## INSTRUCTIONS ON AUTOMATIC DEPLOYMENT

1. Follow instructions on https://stackabuse.com/automating-aws-ec2-management-with-python-and-boto3/ to obtain credentials.csv. This should be placed in deployment_share/deployment.
2. Create an empty AWS instance (settings: t2.medium, no security groups, us-east-1). Make sure you obtain your private key file (ie. key.pem). Place your private key file in deployment_share/deployment.
3. Change directory to deployment_share/deployment and run "python3 aws.py <number_of_nodes> <private_key.pem> <instance_size> <availability-region>"
eg. python3 aws.py 2 50043_new.pem t2.medium us-east-1

Take note to configure according to what you wish to deploy (final deployment will trigger all installation).

```
# deployment_share/deployment/aws.py

# DEPLOY HADOOP/SPARK
print(deploy_hadoop_cluster(ec2, int(sys.argv[1]), sys.argv[2], sys.argv[3]))
# DEPLOY MYSQL
#print(deploy_mysql(ec2, sys.argv[2], sys.argv[3]))
# DEPLOY MONGODB
#print(deploy_mongodb(ec2, sys.argv[2], sys.argv[3]))
# DEPLOY NODEJS
#print(deploy_nodejs(ec2, sys.argv[2], sys.argv[3]))
```