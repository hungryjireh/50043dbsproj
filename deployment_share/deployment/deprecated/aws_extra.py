import boto3
import time
import pandas as pd
from botocore.exceptions import ClientError
import datetime
from dateutil.tz import tzutc
import os
import sys

def new_session(session_type, access_key, secret_key, region):
    ec2 = boto3.client(session_type, 
                aws_access_key_id=access_key, 
                aws_secret_access_key=secret_key, 
                region_name=region
            )
    return ec2


# Get the InstanceId and PublicIpAddress of all running instances
def list_ec2_instances(ec2):
    instances = {}
    res = ec2.describe_instances()
    for r in res['Reservations']:
        for ins in r['Instances']:
            if ins['State']['Name'] == 'running':
                instances[ins['InstanceId']] = ins['PublicIpAddress']
    return instances

# Get a list of PublicIpAddress of all running instances, with the exception of those in the exception_lst
def get_ip_addresses(ec2, instance_id, ip_filename, dns_filename, private_ip_filename):
    instances = {}
    cont = True
    while cont:
        res = ec2.describe_instances()
        for r in res['Reservations']:
            for ins in r['Instances']:
                if ins['InstanceId'] == instance_id:
                    ipaddress = ins.get('PublicIpAddress')
                    if ipaddress is not None:
                        pub_dns = ins.get('PublicDnsName')
                        private_ip = ins.get('PrivateIpAddress')
                        cont = False
    instances[ins['InstanceId']] = ipaddress
    with open(ip_filename, 'w') as f:
        f.write(ipaddress + '\n')
    with open(dns_filename, 'w') as f:
        f.write(pub_dns + '\n')
    with open(private_ip_filename, 'w') as f:
        f.write(private_ip + '\n')
    return instances

# Get image metadata of a specified image name
def get_image(ec2, img_name):
    res = ec2.describe_images(Owners=['self'])
    images = []
    for img in res['Images']:
        if img['Name'] == img_name:
            return {"name": img['Name'], "image_id": img['ImageId'], "description": img['Description'], 'region': ec2.meta.region_name}
        # print("Name: ",img['Name'])
        # print("Image: ", img['ImageId'])
        # print("Description: ", img['Description'])
        # print("----")

# create an image with an InstanceId
def save_image(ec2, ins, name, desc='My new image'):
    res = ec2.create_image(InstanceId=ins, Name=name, Description=desc)
    print("Created image: ",res['ImageId'])
    print("Waiting for it to be available...")
    
    # wait for it to be available
    available = 0
    while (not available):
        status = ec2.describe_images(ImageIds=[res['ImageId']])
        img = status['Images'][0]
        available = (img['State'] == 'available')
        time.sleep(1)

def share_image(ec2, img_name, aws_id):
    # Access the image that needs to be copied
    image = ec2.describe_images(ImageIds=[get_image('mongo_sql_replica')['image_id']])
    try:
        # Share the image with the destination account
        image.modify_attribute(
            ImageId = image.id,
            Attribute = 'launchPermission',
            OperationType = 'add',
            LaunchPermission = {
                'Add' : [{ 'UserId': aws_id }]
            }
        )
        return "successfully shared image with {}".format(aws_id)
    except ClientError as e:
        print(e)

# delete an image with the image name input
def delete_image(ec2, image_name):
    try:
        image_id = get_image(image_name)['image_id']
        response = ec2.deregister_image(
            ImageId=image_id
        )
        return response
    except:
        return "No image with name {} found".format(image_name)

def copy_image_to_account(ec2, img_name, source_region):
    image_info = get_image(ec2, img_name)
    response = ec2.copy_image(
        Description=image_info['description'],
        Name=image_info['name'],
        SourceImageId=image_info['image_id'],
        SourceRegion=source_region
    )
    print("Image successfully copied to {}".format(response["ImageId"]))
    return response["ImageId"]

# create a security group with associated permissions
def create_security_group(ec2, security_group_name, description):
    try:
        response = ec2.create_security_group(GroupName=security_group_name,
                                            Description=description)
        security_group_id = response['GroupId']
        print('Security Group Created %s.' % (security_group_id))

        data = ec2.authorize_security_group_ingress(
            GroupId=security_group_id,
            IpPermissions=[
                #MONGODB
                {'IpProtocol': 'tcp',
                'FromPort': 27017,
                'ToPort': 27017,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #MYSQL
                {'IpProtocol': 'tcp',
                'FromPort': 3306,
                'ToPort': 3306,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 9000,
                'ToPort': 9000,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 9001,
                'ToPort': 9001,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 9870,
                'ToPort': 9870,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 50030,
                'ToPort': 50030,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 50060,
                'ToPort': 50060,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 50070,
                'ToPort': 50070,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 50075,
                'ToPort': 50075,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 50095,
                'ToPort': 50095,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 8032,
                'ToPort': 8032,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 8088,
                'ToPort': 8088,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #HADOOP
                {'IpProtocol': 'tcp',
                'FromPort': 8042,
                'ToPort': 8042,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #SPARK
                {'IpProtocol': 'tcp',
                'FromPort': 8080,
                'ToPort': 8083,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #SPARK
                {'IpProtocol': 'tcp',
                'FromPort': 4040,
                'ToPort': 4040,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #SPARK
                {'IpProtocol': 'tcp',
                'FromPort': 7077,
                'ToPort': 7077,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #SPARK
                {'IpProtocol': 'tcp',
                'FromPort': 18080,
                'ToPort': 18080,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                #SPARK
                {'IpProtocol': 'tcp',
                'FromPort': 9866,
                'ToPort': 9866,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                 {'IpProtocol': 'tcp',
                'FromPort': 80,
                'ToPort': 80,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                {'IpProtocol': 'tcp',
                'FromPort': 22,
                'ToPort': 22,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                {'IpProtocol': 'icmp',
                'FromPort': -1,
                'ToPort': -1,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]}
            ])
        print('Ingress Successfully Set %s' % data)
    except ClientError as e:
        print(e)

# create a security group with associated permissions for MongoDB
def create_mongo_security_group(ec2, security_group_name, description):
    try:
        response = ec2.create_security_group(GroupName=security_group_name,
                                            Description=description)
        security_group_id = response['GroupId']
        print('Security Group Created %s.' % (security_group_id))

        data = ec2.authorize_security_group_ingress(
            GroupId=security_group_id,
            IpPermissions=[
                #MONGODB
                {'IpProtocol': 'tcp',
                'FromPort': 27017,
                'ToPort': 27017,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                 {'IpProtocol': 'tcp',
                'FromPort': 80,
                'ToPort': 80,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                {'IpProtocol': 'tcp',
                'FromPort': 22,
                'ToPort': 22,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                {'IpProtocol': 'icmp',
                'FromPort': -1,
                'ToPort': -1,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]}
            ])
        print('Ingress Successfully Set %s' % data)
    except ClientError as e:
        print(e)

# create a security group with associated permissions for MySQL
def create_mysql_security_group(ec2, security_group_name, description):
    try:
        response = ec2.create_security_group(GroupName=security_group_name,
                                            Description=description)
        security_group_id = response['GroupId']
        print('Security Group Created %s.' % (security_group_id))

        data = ec2.authorize_security_group_ingress(
            GroupId=security_group_id,
            IpPermissions=[
                #MYSQL
                {'IpProtocol': 'tcp',
                'FromPort': 3306,
                'ToPort': 3306,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                 {'IpProtocol': 'tcp',
                'FromPort': 80,
                'ToPort': 80,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                {'IpProtocol': 'tcp',
                'FromPort': 22,
                'ToPort': 22,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                {'IpProtocol': 'icmp',
                'FromPort': -1,
                'ToPort': -1,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]}
            ])
        print('Ingress Successfully Set %s' % data)
    except ClientError as e:
        print(e)

# create a security group with associated permissions for NodeJS
def create_nodejs_security_group(ec2, security_group_name, description):
    try:
        response = ec2.create_security_group(GroupName=security_group_name,
                                            Description=description)
        security_group_id = response['GroupId']
        print('Security Group Created %s' % (security_group_id))

        data = ec2.authorize_security_group_ingress(
            GroupId=security_group_id,
            IpPermissions=[
                {'IpProtocol': 'tcp',
                'FromPort': 5000,
                'ToPort': 5000,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                 {'IpProtocol': 'tcp',
                'FromPort': 80,
                'ToPort': 80,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                {'IpProtocol': 'tcp',
                'FromPort': 22,
                'ToPort': 22,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                {'IpProtocol': 'icmp',
                'FromPort': -1,
                'ToPort': -1,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]}
            ])
        print('Ingress Successfully Set %s' % data)
    except ClientError as e:
        print(e)

def obtain_ip_address(path):
    with open(path) as f:
        ip_add = f.read().strip()
    return {'IpProtocol': 'tcp',
    'FromPort': 0,
    'ToPort': 65553,
    'IpRanges': [{'CidrIp': ip_add}]}

# create a security group with associated permissions for Hadoop
def update_hadoop_security_group(ec2, security_group_name, num_nodes):
    response = ec2.describe_security_groups()['SecurityGroups']
    for item in response:
        if item["GroupName"] == groupname:
            ip_permissions = [
            {'IpProtocol': 'tcp',
                'FromPort': 80,
                'ToPort': 80,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                {'IpProtocol': 'tcp',
                'FromPort': 22,
                'ToPort': 22,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]},
                {'IpProtocol': 'icmp',
                'FromPort': -1,
                'ToPort': -1,
                'IpRanges': [{'CidrIp': '0.0.0.0/0'}]}
            ]
            ip_permissions.append(obtain_ip_address('hadoop/hadoop_namenode_privateipaddress'))
            for i in range(num_nodes):
                path = 'hadoop/hadoop_datanode_privateipaddress_' + str(i + 1)
                ip_permissions.append(obtain_ip_address(path))
            data = ec2.authorize_security_group_ingress(
            GroupId=item["GroupId"],
            IpPermissions=ip_permissions)            
            print(data)

# delete a security group with the input security group name
def delete_security_group(ec2, groupname):
    response = ec2.describe_security_groups()['SecurityGroups']
    for item in response:
        if item["GroupName"] == groupname:
            response = ec2.delete_security_group(
                GroupId=item["GroupId"],
            )
            print(response)

# get GroupId of a security group
def get_security_groupid(ec2, groupname="AUTOMATED_MONGO"):
    response = ec2.describe_security_groups()['SecurityGroups']
    for item in response:
        if item["GroupName"] == groupname:
            return item["GroupId"]

# Get VPC information
def get_vpc_info(ec2, key):
    response = ec2.describe_vpcs()
    vpc_info = []
    for dic in response['Vpcs']:
        vpc_info.append(dic[key])
    return vpc_info

# deploy an instance with an input image_id and return the IP addresses 
def deploy_instance(ec2, ip_filename, dns_filename, private_ip_filename, private_key_file, instance_size, security_group_id):
    security_group_id = get_security_groupid(ec2, security_group_id)
    private_key = private_key_file.split('.')[0]
    response = ec2.run_instances(ImageId="ami-00068cd7555f543d5", MinCount=1, MaxCount=1, InstanceType=instance_size, SecurityGroupIds=[security_group_id], KeyName=private_key,
        TagSpecifications=[
        {
            'ResourceType': 'instance',
            'Tags': [
                {"Key": "Name", "Value": ip_filename}
            ]
        },
    ])
    print("Deploying image as instance {}".format(response['Instances'][0]['InstanceId']))
    ip_addresses = get_ip_addresses(ec2, response['Instances'][0]['InstanceId'], ip_filename, dns_filename, private_ip_filename)
    cont = True
    print("Waiting for instance to be running...")
    while cont:
        res = ec2.describe_instances()
        for r in res['Reservations']:
            for ins in r['Instances']:
                if ins['State']['Name'] == 'running' and ins['InstanceId'] == response['Instances'][0]['InstanceId']:
                    cont = False
    return ip_addresses

# delete instances with the exception of InstanceIds in the exception_lst
def delete_instances(ec2, exception_lst):
    try:
        delete_lst = []
        for key, val in list_ec2_instances(ec2).items():
            if key not in exception_lst:
                delete_lst.append(key)
        print("Deleting instances: {}".format(str(delete_lst)))
        response = ec2.terminate_instances(InstanceIds=delete_lst)
        return response
    except ClientError as e:
        print(e)

# allocate IP addresses for an input InstanceId
def allocate_ip_address(ec2, instance_id):
    try:
        allocation = ec2.allocate_address(Domain='vpc')
        response = ec2.associate_address(AllocationId=allocation['AllocationId'],
                                        InstanceId=instance_id)
        return response
    except ClientError as e:
        print(e)

def deploy_mysql(ec2, private_key_file, instance_size):
    empty_img = get_image(ec2, "clean_instance")
    deploy_ins = deploy_instance(ec2, 'mysql_ipaddress.txt', 'mysql_dns.txt', 'mysql_privateipaddress.txt', private_key_file, instance_size, "AUTOMATED_MYSQL")
    protect_key_file = "chmod 400 " + private_key_file
    os.system(protect_key_file)
    permissions_script = "chmod 755 deployment_mysql.sh"
    os.system(permissions_script)
    deploy_command = "./deployment_mysql.sh " + private_key_file
    print(deploy_command)
    time.sleep(30)
    os.system(deploy_command)
    return "MySQL deployed."

def deploy_mongodb(ec2, private_key_file, instance_size):
    empty_img = get_image(ec2, "clean_instance")
    deploy_ins = deploy_instance(ec2, 'mongodb_ipaddress.txt', 'mongodb_dns.txt', 'mongodb_privateipaddress.txt', private_key_file, instance_size, "AUTOMATED_MONGODB")
    protect_key_file = "chmod 400 " + private_key_file
    os.system(protect_key_file)
    permissions_script = "chmod 755 deployment_mongodb.sh"
    os.system(permissions_script)
    deploy_command = "./deployment_mongodb.sh " + private_key_file
    print(deploy_command)
    time.sleep(30)
    os.system(deploy_command)
    return "MongoDB deployed."

def deploy_nodejs(ec2, private_key_file, instance_size):
    empty_img = get_image(ec2, "clean_instance")
    deploy_ins = deploy_instance(ec2, 'nodejs_ipaddress.txt', 'nodejs_dns.txt', 'nodejs_privateipaddress.txt', private_key_file, instance_size, "AUTOMATED_NODEJS")
    protect_key_file = "chmod 400 " + private_key_file
    os.system(protect_key_file)
    permissions_script = "chmod 755 deployment_nodejs.sh"
    os.system(permissions_script)
    deploy_command = "./deployment_nodejs.sh " + private_key_file
    print(deploy_command)
    time.sleep(30)
    os.system(deploy_command)
    return "NodeJS deployed."

def deploy_hadoop_cluster(ec2, num_nodes, private_key_file, instance_size):
    empty_img = get_image(ec2, "clean_instance")
    deploy_ins = deploy_instance(ec2, 'hadoop/hadoop_namenode_ipaddress.txt', 'hadoop/hadoop_namenode_dns.txt', 'hadoop/hadoop_namenode_privateipaddress.txt', private_key_file, instance_size, "AUTOMATED_MONGO")
    for i in range(1, num_nodes + 1):
        ipaddress_filename = "hadoop/hadoop_datanode_ipaddress_" + str(i) + ".txt"
        dns_filename = "hadoop/hadoop_datanode_dns_" + str(i) + ".txt"
        private_ipaddress_filename = "hadoop/hadoop_datanode_privateipaddress_" + str(i) + ".txt"
        deploy_ins = deploy_instance(ec2, ipaddress_filename, dns_filename, private_ipaddress_filename, private_key_file, instance_size, "AUTOMATED_MONGO")
    os.system('zip -r9 hadoop.zip hadoop')
    protect_key_file = "chmod 400 " + private_key_file
    os.system(protect_key_file)
    deploy_command = "./deployment_hadoop.sh " + str(num_nodes) + " " + private_key_file
    os.system(deploy_command)
    return "Hadoop cluster with {} nodes deployed.".format(str(num_nodes))

if __name__ == "__main__":
    user_df = pd.read_csv('credentials.csv')
    user_cred = user_df.iloc[0]
    ec2 = new_session('ec2', user_cred['Access key ID'], user_cred['Secret access key'], sys.argv[4])
     # CREATE SECURITY GROUPS
    create_security_group(ec2, "AUTOMATED_MONGO", "Security group for automated Mongo")
    create_mysql_security_group(ec2, "AUTOMATED_MYSQL", "Security group for automated MySQL")
    create_mongo_security_group(ec2, "AUTOMATED_MONGODB", "Security group for automated MongoDB")
    create_nodejs_security_group(ec2, "AUTOMATED_NODEJS", "Security group for automated NodeJS")
    # DEPLOY MYSQL
    #print(deploy_mysql(ec2, sys.argv[2], sys.argv[3]))
    # DEPLOY MONGODB
    #print(deploy_mongodb(ec2, sys.argv[2], sys.argv[3]))
    # DEPLOY NODEJS
    #print(deploy_nodejs(ec2, sys.argv[2], sys.argv[3]))
    # DEPLOY HADOOP/SPARK
    #print(deploy_hadoop_cluster(ec2, int(sys.argv[1]), sys.argv[2], sys.argv[3]))


# vpc_id = get_vpc_info(ec2, "VpcId")
# print("VPC ID: {}".format(str(vpc_id)))

# CREATE IMAGE
    # try:
    #     save_image(ec2, list(list_ec2_instances(ec2).keys())[0], 'clean_instance', 'clean_instance')
    # except:
    #     print("AMI image already saved. Deploying...")

# DEPLOY MONGODB AND MYSQL
# empty_img = get_image(ec2, "empty_instance")
# deploy_ins = deploy_instance(ec2, empty_img['image_id'], 'ipaddress.txt', 'dns.txt')
# print(deploy_ins)

## AUTOMATION
# instance_metadata = deploy_empty_instance(ec2, "mysql")
# print(instance_metadata)
# ipaddress = instance_metadata.values()[0]
# print("IP address: {}".format(ipaddress))
# print(ipaddress.replace('.', '-'))
# key_path = "50043.pem"
# filename = "dump.sql"
# os.system('scp -i {} {} ec2-user@ec2-{}.compute-1.amazonaws.com:/home/ec2-user/{}'.format(key_path, filename, ipaddress, filename))

# delete_security_group(ec2, "AUTOMATED_MONGO")
# save_image(ec2, 'i-0bb61058c66944c54', "mongo_sql_replica", "replica of 18.205.151.15")
# images = get_image(ec2, 'mongo_sql_replica')
# print(deploy_instance(ec2, images["image_id"], 1))
# print(get_ip_addresses(ec2, ['i-0bb61058c66944c54', 'i-07dca1a99de58bb77']))
# print(delete_instances(ec2, ['i-0bb61058c66944c54', 'i-07dca1a99de58bb77']))

## AUTOMATION PORTION (DEFUNCT)
# copy_image_to_account(target_ec2, 'mongo_sql_replica', target_ec2.meta.region_name)
# images = get_image(ec2, 'mongo_sql_replica')
# new_instances = deploy_instance(ec2, images["image_id"], 1)
# print(new_instances)