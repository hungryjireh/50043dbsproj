How to deploy an app:


1) Move permissions.pem file into .ssh folder in user directory

# open command opens given path using the default system application for file type
$ open ~/.ssh 

2) Change permissions

# for Linux users
$ chmod 400 ~/.ssh/permissions.pem

# for Windows users
$path = "~\.ssh\permissions.pem"
# Reset to remove explict permissions
icacls.exe $path /reset
# Give current user explicit read-permission
icacls.exe $path /GRANT:R "$($env:USERNAME):(R)"
# Disable inheritance and remove inherited permissions
icacls.exe $path /inheritance:r

3) Run the deploy_app.sh script
$ bash deploy_app.sh permissions.pem <PUBLIC_DNS> <github_url>
