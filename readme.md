# Steps to run this Shit

## Configuration

Make sure to add your own `DEV_MONGO_DB` and `DEV_LOGS_MONGODB` from your [mLab](http://mlab.com) database in `.env` file. 
Also ass your own `DEV_SQL_*` parameters


## Quick Start
Install [nodejs](https://nodejs.org/en/) v10+

Run
```sh
npm install
npm run dev  # Server runs on http://localhost:5000 and client on http://localhots:3000 (brovser will automatically open)
```

## To run seed file
`node store-seed.js`