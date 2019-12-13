MYSQL_DNS=$(cat "mysql_dns.txt")

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@${MYSQL_DNS} << EOF
    sudo mysql -u root -D dbs_proj
    SELECT 'asin','helpful','overall','reviewText','reviewTime','reviewerID','reviewerName','summary'
    UNION ALL
    SELECT * FROM Kindle INTO OUTFILE '/var/lib/mysql-files/mysql_download.csv' FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"' ESCAPED BY '"' LINES TERMINATED BY '\n';
    exit
    sudo chmod 770 /var/lib/mysql-files/mysql_download.csv
    sudo mv /var/lib/mysql-files/mysql_download.csv /home/ec2-user/mysql_download.csv
    sudo chown -R ec2-user: /home/ec2-user/mysql_download.csv
    exit
EOF

scp -i $1 ec2-user@${MYSQL_DNS}:/home/ec2-user/mysql_download.csv mysql_download.csv

