#!/bin/sh
echo "Hello I'm gonna deploy your webapp to an Amazon EC2 instance!"

ssh -o StrictHostKeyChecking=no -tt -i $1 ec2-user@$2 << EOF
	echo "Updating Linux Machine...\n"
	yes | sudo yum update

	echo "Installing NVM and Node.js...\n"
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
	. ~/.nvm/nvm.sh
	nvm install node

	echo "Getting the code from github...\n"
	sudo yum install -y git
	git clone $3

	echo "Installing dependencies...\n"
	cd 50043dbsproj
	npm install

	echo "Running app on pm2...\n"
	npm install -g pm2
	pm2 start npm --name "start_app" -- start
	sudo env PATH=$PATH:/home/ec2-user/.nvm/versions/node/v13.3.0/bin/home/ec2user/.nvm/versions/node/v13.3.0/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
	pm2 save
	
	echo "App is up and running! Check back in after 1 minute :)"
	sudo reboot

