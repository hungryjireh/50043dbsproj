This web application is developed using Flask.
# 50.043 Databases Project

## Dependencies

1. PyMongo
```
$ pip install PyMongo
```

2. MySQL
```
$ pip install flask-mysqldb
```

## Databases

1. From shell, run:
```
$ mongorestore --db database_name path_to_bson_file
```
After downloading mongodump file (KindleMetadata.bson)

2. From shell, run:
```
$ mysql -u root -p dbs_proj < dump.sql
```
After downloading MySQL file (dump.sql)

## Misc
1. To dump MongoDB:
```
$ mongodump --db database_name --collection collection_name
```
2. To dump MySQL:
```
$ mysqldump -u root --databases [database-name] > dump.sql
```
