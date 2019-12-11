MONGODB_DNS=$(cat "mongodb_dns.txt")

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@${MONGODB_DNS} << EOF
    echo "Changing environment file..."
    echo "LANG=en_US.UTF-8" > environment
    echo "" >> environment
    echo "LC_ALL=en_US.UTF-8" >> environment
    sudo mv environment /etc/environment
    exit
EOF

scp -i $1 get_data_mongodb.sh ec2-user@${MONGODB_DNS}:/home/ec2-user/get_data_mongodb.sh
scp -i $1 mongodb_setup.sh ec2-user@${MONGODB_DNS}:/home/ec2-user/mongodb_setup.sh
scp -i $1 mongodb-org-4.2.repo ec2-user@${MONGODB_DNS}:/home/ec2-user/mongodb-org-4.2.repo
scp -i $1 mongo_commands.js ec2-user@${MONGODB_DNS}:/home/ec2-user/mongo_commands.js
scp -i $1 mongod.conf ec2-user@${MONGODB_DNS}:/home/ec2-user/mongod.conf

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@${MONGODB_DNS} << EOF
    echo "Updating Linux Machine...\n"
    sudo yum history sync
    yes | sudo yum update
    chmod 755 get_data_mongodb.sh
    ./get_data_mongodb.sh
    chmod 755 mongodb_setup.sh
    ./mongodb_setup.sh
    exit
EOF