MYSQL_DNS=$(cat "mysql_dns.txt")

# Configuring environment for Linux machine
ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@${MYSQL_DNS} << EOF
    echo "Changing environment file..."
    echo "LANG=en_US.UTF-8" > environment
    echo "" >> environment
    echo "LC_ALL=en_US.UTF-8" >> environment
    sudo mv environment /etc/environment
    exit
EOF

# Copying necessary files into instance for setup
scp -i $1 get_data_mysql.sh ec2-user@${MYSQL_DNS}:/home/ec2-user/get_data_mysql.sh
scp -i $1 mysql_setup.sh ec2-user@${MYSQL_DNS}:/home/ec2-user/mysql_setup.sh
scp -i $1 load_sql.sql ec2-user@${MYSQL_DNS}:/home/ec2-user/load_sql.sql
scp -i $1 my.cnf ec2-user@${MYSQL_DNS}:/home/ec2-user/my.cnf

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@${MYSQL_DNS} << EOF
    echo "Updating Linux Machine...\n"
    sudo yum history sync
    yes | sudo yum update
    # get original .csv file to populate MySQL from Dropbox
    chmod 755 get_data_mysql.sh
    ./get_data_mysql.sh
    chmod 755 mysql_setup.sh
    ./mysql_setup.sh
    exit
EOF