## INSTRUCTIONS ON AUTOMATIC DEPLOYMENT

# HADOOP & SPARK
1. Follow instructions on https://stackabuse.com/automating-aws-ec2-management-with-python-and-boto3/ to obtain credentials.csv. This should be placed in deployment_share/hdfs_spark.
2. Create an empty AWS instance (settings: t2.micro, no security groups, us-east-1). Make sure you obtain your private key file (ie. key.pem). Place your private key file in deployment_share/hdfs_spark.
3. Change directory to deployment_share/hdfs_spark and run "python aws.py <number_of_nodes> <private_key_filename>" (found in deployment_share/hdfs_spark)