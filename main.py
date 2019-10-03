from flask import Flask, render_template, request
from flask_pymongo import PyMongo
from flask_mysqldb import MySQL

app = Flask(__name__)

#MongoDB setup
app.config["MONGO_URI"] = "mongodb://localhost:27017/dbs_proj"
mongo = PyMongo(app)

#MySQL setup
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_DB'] = 'dbs_proj'
mysql = MySQL(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == "POST":
        details = request.form
        if 'search-form' in details:
            search = details['search']
            task = mongo.db.KindleMetadata.find({"asin": search})
            if task.count() == 0:
                return "Not Found"
            else:
                return render_template('book_metadata.html', search_results=task)
        else:
            asin = details['asin']
            helpful = details['helpful']
            overall = details['overall']
            reviewText = details['reviewText']
            reviewTime = details['reviewTime']
            reviewerID = details['reviewerID']
            reviewerName = details['reviewerName']
            summary = details['summary']
            cur = mysql.connection.cursor()
            cur.execute("INSERT INTO testKindle(asin, helpful, overall, reviewText, reviewTime, reviewerID, reviewerName, summary) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", [asin, helpful, int(overall), reviewText, reviewTime, reviewerID, reviewerName, summary])
            mysql.connection.commit()
            cur.close()
            return 'success'
    return render_template('index.html')

@app.route('/add-book', methods=['GET', 'POST'])
def add_book():
    return render_template('add_book.html')

@app.route('/book/<variable>', methods=['GET'])
def get_book(variable):
    task = mongo.db.KindleMetadata.find({"asin": variable})
    if task.count() == 0:
        return "Not Found"
    else:
        return render_template('book_metadata.html', search_results=list(task))

if __name__ == '__main__':
    app.run()