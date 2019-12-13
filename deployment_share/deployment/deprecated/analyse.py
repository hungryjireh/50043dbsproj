import boto3
import os
import sys
import pandas as pd
import json
import logging
from botocore.exceptions import ClientError

def create_bucket(access_key, secret_key, bucket_name, region=None):
    try:
        if region is None:
            s3_client = boto3.client('s3', 
                aws_access_key_id=access_key, 
                aws_secret_access_key=secret_key, 
            )
            s3_client.create_bucket(ACL='private', Bucket=bucket_name)
        else:
            s3_client = boto3.client('s3', region_name=region)
            location = {'LocationConstraint': region}
            s3_client.create_bucket(ACL='private', Bucket=bucket_name,
                                    CreateBucketConfiguration=location)
    except ClientError as e:
        logging.error(e)
        return False
    return True


def insert_mongo_bucket(bucket_name, key_name, filename, region):
    print("Exporting books from MongoDB as {}...".format(str(filename)))
    #os.system("./mongodb_download.sh")
    print("Books exported. Now inserting books into {}".format(str(bucket_name)))
    data = []
    with open(filename) as f:
        for line in f:
            data.append(json.loads(line))
    try:
        if region is None:
            s3_client = boto3.client('s3', 
                aws_access_key_id=access_key, 
                aws_secret_access_key=secret_key, 
            )
            s3_client.put_object(Bucket=bucket_name, Key='key0', Body=json.dumps(data))
        else:
            s3_client = boto3.client('s3', region_name=region)
            s3_client.put_object(Bucket=bucket_name, Key='key0', Body=json.dumps(data))
    except ClientError as e:
        logging.error(e)
        return False
    print("{} inserted into S3 Bucket {}".format(str(filename), str(bucket_name)))
    return True

if __name__ == "__main__":
    user_df = pd.read_csv('credentials.csv')
    user_cred = user_df.iloc[0]
    output_bucket = create_bucket(user_cred['Access key ID'], user_cred['Secret access key'], "output50043jireh2")
    if output_bucket:
        print("Bucket created successfully.")
    else:
        print("Bucket not created. It may already exist.")
    # INSERT INTO MONGODB
    insert_mongo_bucket("output50043jireh2", "mongodb_store_download.json", "mongodb_store_download.json", 'us-east-1')



