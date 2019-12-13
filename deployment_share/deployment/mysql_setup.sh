#!/bin/bash
MYSQL_LOG_FILE=/var/log/mysqld.log

echo "Downloading MySQL...\n"
wget http://dev.mysql.com/get/mysql57-community-release-el7-8.noarch.rpm
yes | sudo yum localinstall mysql57-community-release-el7-8.noarch.rpm
yes | sudo yum install -y mysql-community-server
echo "Removing .rpm file...\n"
rm -rf mysql57-community-release-el7-8.noarch.rpm
echo "Starting MySQL@5.7...\n"
sudo service mysqld start
sudo -i grep -oP '(?<=A temporary password is generated for root@localhost: )[^ ]+' ${MYSQL_LOG_FILE} > mysql_pw.txt
MYSQL_PWD=$(cat "mysql_pw.txt")
sudo yum install -y expect
echo "Modifying database...\n"
MYSQL_UPDATE=$(expect -c "
    set timeout 5
    spawn mysql -u root -p
    expect \"Enter password: \"
    send \"${MYSQL_PWD}\r\"
    expect \"mysql>\"
    send \"ALTER USER 'root'@'localhost' IDENTIFIED BY 'MySQL!57';\r\"
    expect \"mysql>\"
    send \"uninstall plugin validate_password;\r\"
    expect \"mysql>\"
    send \"ALTER USER 'root'@'localhost' IDENTIFIED BY '';\r\"
    expect \"mysql>\"
    send \"CREATE DATABASE if not exists dbs_proj;\r\"
    expect \"mysql>\"
    send \"create user 'test' identified by 'password';\r\"
    expect \"mysql>\"
    send \"grant all on dbs_proj.* to 'test';\r\"
    expect \"mysql>\"
    send \"FLUSH PRIVILEGES;\r\"
    expect \"mysql>\"
    send \"quit;\r\"
    expect eof
")
echo "$MYSQL_UPDATE"
echo "Populating database...\n"
mysql -u root -b dbs_proj < load_sql.sql
rm -rf load_sql.sql
rm -rf kindle-reviews.csv
echo "Removing temporary password file...\n"
rm -rf mysql_pw.txt
echo "Allowing external access to MySQL...\n"
sudo mv my.cnf /etc/my.cnf
echo "Restarting MySQL...\n"
sudo service mysqld restart