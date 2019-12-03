Connecting manually:

1) Move dbs1.pem file into .ssh folder in user directory

# open command opens given path using the default system application for file type
$ open ~/.ssh 

2) Change permissions

# for Linux users
$ chmod 400 ~/.ssh/dbs1.pem

# for Windows users
$path = "~\.ssh\dbs1.pem"
# Reset to remove explict permissions
icacls.exe $path /reset
# Give current user explicit read-permission
icacls.exe $path /GRANT:R "$($env:USERNAME):(R)"
# Disable inheritance and remove inherited permissions
icacls.exe $path /inheritance:r

3) Connect SSH
$ ssh -i ~\.ssh\dbs1.pem ec2-user@ec2-3-17-12-213.us-east-2.compute.amazonaws.com

4) Update
$ sudo yum update
