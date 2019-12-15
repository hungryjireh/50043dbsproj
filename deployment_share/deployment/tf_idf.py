import pyspark
from pyspark.sql import SparkSession
import pyspark.sql.functions
from operator import add
import math
import sys

NAMENODE_DNS = sys.argv[1]

# Create Spark Session and Context
spark_context = "spark://" + NAMENODE_DNS + ":7077"
sc = pyspark.SparkContext(spark_context, "test")
spark = SparkSession(sc)

csv_path = "hdfs://" + NAMENODE_DNS + ":9000/mysql_download.csv"
csv_data = spark.read.csv(csv_path, inferSchema=True, header=True)

# ---- PART 2 ----
# # NLTK clean text library function 
# import nltk
# from nltk.corpus import stopwords
# import re
# from bs4 import BeautifulSoup

# # load a list of stop words
# nltk.download('stopwords')

# REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|@,;]')
# BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')
# STOPWORDS = set(stopwords.words('english'))

# def clean_text(text):
#     """
#         text: a string 
#         return: modified initial string
#     """
#     text = BeautifulSoup(text, 'html.parser').text # HTML decoding
#     text = text.lower() # lowercase text
#     text = REPLACE_BY_SPACE_RE.sub(' ', text) # replace REPLACE_BY_SPACE_RE symbols by space in text
#     text = BAD_SYMBOLS_RE.sub('', text) # delete symbols which are in BAD_SYMBOLS_RE from text
#     text = ' '.join(word for word in text.split() if word not in STOPWORDS) # delete stopwors from text
#     return text

# Select review text
from pyspark.ml.feature import HashingTF, IDF, Tokenizer, CountVectorizer
from pyspark.ml.feature import StringIndexer
from pyspark.ml import Pipeline
import numpy as np

# Remove rows with null values
reviewText_data = csv_data.select('reviewText').limit(50000)
# reviewText_data = csv_data.select('reviewText')
reviewText_data = reviewText_data.na.drop()

# Register a 'function' to clean text
# cleantext = spark.udf.register("cleantext", clean_text)

# Cleaned reviewText data
# clean_reviewText_data = reviewText_data.select(cleantext("reviewText").alias("reviewText"))
clean_reviewText_data = reviewText_data

# Convert sentences into discrete words
tokenizer = Tokenizer(inputCol="reviewText", outputCol="words")

# Calculate term frequency for each word
tf = CountVectorizer(inputCol="words", outputCol="tf", vocabSize=2**6, minDF=0.05, minTF=2)
# tf = HashingTF(numFeatures=2**8, inputCol="words", outputCol='tf')

# Calculate IDF given the term frequency
idf = IDF(inputCol='tf', outputCol="features", minDocFreq=1) #minDocFreq: remove sparse terms

# Fit the cleaned reviewText data through the pipeline
pipeline = Pipeline(stages=[tokenizer, tf, idf])
pipelineFit = pipeline.fit(clean_reviewText_data)
train_df = pipelineFit.transform(clean_reviewText_data)

# TF_IDF Calculations
results = train_df.collect()

# TF_IDF Format: Document/Word/TF_IDF
# tf_idf_list = []
# count = 0
# for i in range(len(results)):    
# 	count+=1
#     # document = results[i][0]
#     length = len(results[i][2].values)
#     for j in range(length):               
#         word = results[i][1][j]
#         tf = results[i][2].values[j]
#         idf = results[i][3].values[j]
#         tf_idf = round(float(tf)*float(idf),3)
#         # tf_idf_temp_list = [document, word, tf_idf]
#         tf_idf_temp_list = [count, word, tf_idf]        
#         tf_idf_list.append(tf_idf_temp_list)

# TF_IDF Format: Document/List of Words/List of TF_IDF
tf_idf_list = []
count = 0
for i in range(len(results)):    
    document = results[i][0]
    length = len(results[i][2].values)
    word = np.asarray(results[i][1][:length])
    tf = np.asarray(results[i][2].values)
    idf = np.asarray(results[i][3].values)
    tf_idf = np.multiply(tf,idf)
    tf_idf_temp_list = [count, word, tf_idf]
    count+=1
    tf_idf_list.append(tf_idf_temp_list)  
         
tf_idf_list = np.asarray(tf_idf_list)

with open('tf_idf_results.txt', 'w') as f:
    print(tf_idf_list, file=f)  # Python 3.x

print("Results written to tf_idf_results.txt.")

sc.stop()