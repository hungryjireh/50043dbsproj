#!/bin/sh
echo "Hello I'm gonna deploy your webapp to an Amazon EC2 instance!"

NODEJS_DNS=$(cat "nodejs_dns.txt")
MYSQL_DNS=$(cat "mysql_dns.txt")
MONGODB_DNS=$(cat "mongodb_dns.txt")

GITHUB_URL="https://github.com/hungryjireh/50043dbsproj.git"

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@${MONGODB_DNS} << EOF
    echo "Changing environment file..."
    echo "LANG=en_US.UTF-8" > environment
    echo "" >> environment
    echo "LC_ALL=en_US.UTF-8" >> environment
    sudo mv environment /etc/environment
    exit
EOF

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@${NODEJS_DNS} << EOF
	echo "Updating Linux Machine...\n"
	sudo yum history sync
	yes | sudo yum update
	echo "Installing NVM and Node.js...\n"
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
	. ~/.nvm/nvm.sh
	nvm install node
	echo "Getting the code from github...\n"
	sudo yum install -y git
	git clone ${GITHUB_URL}
	echo "Installing dependencies...\n"
	cd 50043dbsproj
	sed -i "s/<mysql_dns>/${MYSQL_DNS}/g" .env
	sed -i "s/<mongodb_dns>/${MONGODB_DNS}/g" .env
	sed -i "s/<nodejs_dns>/${NODEJS_DNS}/g" .env
	npm install
	echo "Running app on pm2...\n"
	npm install -g pm2
	pm2 start npm --name "start_app" -- start
	sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v13.3.0/bin/home/ec2user/.nvm/versions/node/v13.3.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
	pm2 save
	
	echo "App is up and running on ${NODEJS_DNS}:5000! Check back in after 1 minute :)"
	exit
EOF