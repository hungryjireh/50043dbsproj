import os
import sys

if __name__ == "__main__":
	print("Changing permissions for analyse_db.sh...")
	permissions_script = "chmod 755 analyse_db.sh"
	os.system(permissions_script)
	print("Running analyse_db.sh...")
	deploy_command = "./analyse_db.sh " + sys.argv[1]
	os.system(deploy_command)
	print("Question 1: Pearson correlation output saved to pearson_correlation_results.txt and placed in HDFS.")
	print("Question 2: Run \'server/hadoop-3.1.2/bin/hdfs dfs -ls /output_tfidf/\' to view TF-IDF output.")