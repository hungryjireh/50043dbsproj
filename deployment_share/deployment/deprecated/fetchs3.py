import boto3
import os
import sys
import pandas as pd
import json
import logging
from botocore.exceptions import ClientError


if __name__ == "__main__":
    user_df = pd.read_csv('credentials.csv')
    user_cred = user_df.iloc[0]