import boto3
import os
import sys

def new_session(session_type, access_key, secret_key, region):
    ec2 = boto3.client(session_type, 
                aws_access_key_id=access_key, 
                aws_secret_access_key=secret_key, 
                region_name=region
            )
    return ec2

def create_bucket(ec2, bucket_name, region):
    s3.create_bucket(Bucket=bucket_name, CreateBucketConfiguration={'LocationConstraint': region})
    return "Bucket {} created".format(str(bucket_name))

def insert_bucket(ec2, bucket_name, filename):
    target_location = '/tmp/{}'.format(str(filename))
    s3.Object(bucket_name, filename).put(Body=open(target_location, 'rb'))
    return "{} inserted into S3 Bucket {}".format(str(filename), str(bucket_name))

if __name__ == "__main__":
    user_df = pd.read_csv('credentials.csv')
    user_cred = user_df.iloc[0]
    ec2 = new_session('ec2', user_cred['Access key ID'], user_cred['Secret access key'], sys.argv[4])
