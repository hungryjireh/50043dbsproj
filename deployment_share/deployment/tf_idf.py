import pyspark
from pyspark.sql import SparkSession
import pyspark.sql.functions
from operator import add
import math
import sys
import os

NAMENODE_DNS = sys.argv[1]

# Create Spark Session and Context
spark_context = "spark://" + NAMENODE_DNS + ":7077"
sc = pyspark.SparkContext(spark_context, "test")
spark = SparkSession(sc)

csv_path = "hdfs://" + NAMENODE_DNS + ":9000/mysql_download.csv"
csv_data = spark.read.csv(csv_path, inferSchema=True, header=True)

# ---- PART 2 ----
# NLTK clean text library function 
import nltk
from nltk.corpus import stopwords
import re
from bs4 import BeautifulSoup

# load a list of stop words
nltk.download('stopwords')

REPLACE_BY_SPACE_RE = re.compile('[/(){}\[\]\|@,;]')
BAD_SYMBOLS_RE = re.compile('[^0-9a-z #+_]')
STOPWORDS = set(stopwords.words('english'))

def clean_text(text):
    """
        text: a string 
        return: modified initial string
    """
    text = BeautifulSoup(text, 'html.parser').text # HTML decoding
    text = text.lower() # lowercase text
    text = REPLACE_BY_SPACE_RE.sub(' ', text) # replace REPLACE_BY_SPACE_RE symbols by space in text
    text = BAD_SYMBOLS_RE.sub('', text) # delete symbols which are in BAD_SYMBOLS_RE from text
    text = ' '.join(word for word in text.split() if word not in STOPWORDS) # delete stopwors from text
    return text

# Select review text
from pyspark.ml.feature import HashingTF, IDF, Tokenizer, CountVectorizer
from pyspark.ml.feature import StringIndexer
from pyspark.ml import Pipeline
import numpy as np

# Remove rows with null values
reviewText_data = csv_data.select('reviewText')
reviewText_data = reviewText_data.na.drop()

# Register a 'function' to clean text
cleantext = spark.udf.register("cleantext", clean_text)

# Cleaned reviewText data
clean_reviewText_data = reviewText_data.select(cleantext("reviewText").alias("reviewText"))

# Convert sentences into discrete words
tokenizer = Tokenizer(inputCol="reviewText", outputCol="words")

# Calculate term frequency for each word
tf = CountVectorizer(inputCol="words", outputCol="tf", vocabSize=2**6, minDF=0.05, minTF=1)

# Calculate IDF given the term frequency
idf = IDF(inputCol='tf', outputCol="features", minDocFreq=1) #minDocFreq: remove sparse terms

# Fit the cleaned reviewText data through the pipeline
pipeline = Pipeline(stages=[tokenizer, tf, idf])
pipelineFit = pipeline.fit(clean_reviewText_data)
train_df = pipelineFit.transform(clean_reviewText_data)

# Save TF_IDF as text files in datanodes
try:
    save_path = "hdfs://" + NAMENODE_DNS + ":9000/output_tfidf/"
    train_df.rdd.saveAsTextFile(save_path)
except:
    os.system("server/hadoop-3.1.2/bin/hdfs dfs -rm -r -f /output_tfidf")
    save_path = "hdfs://" + NAMENODE_DNS + ":9000/output_tfidf/"
    train_df.rdd.saveAsTextFile(save_path)

sc.stop()