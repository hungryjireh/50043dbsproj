import os
import sys

if __name__ == "__main__":
	print("Changing permissions for analyse_db.sh...")
	permissions_script = "chmod 755 analyse_db.sh"
	os.system(permissions_script)
	print("Running analyse_db.sh...")
	deploy_command = "./analyse_db.sh " + sys.argv[1]
	os.system(deploy_command)