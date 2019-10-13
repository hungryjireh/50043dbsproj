require('dotenv').config();

const env = process.env.NODE_ENV; // 'dev' or 'test' or 'prod'

const development = { 
  mongodb: { uri: process.env.DEV_MONGO_DB },
  mongodbLogs: { uri: process.env.DEV_LOGS_MONGODB }, 
  sqldb: { 
    host: process.env.DEV_SQL_HOST, 
    user: process.env.DEV_SQL_USER, 
    password: process.env.DEV_SQL_PASSWORD,
    dbName: process.env.DEV_SQL_NAME,
  },
  secretOrKey: "secret",
};

const test = { 
  mongodb: { uri: process.env.TEST_MONGO_DB },
  mongodbLogs: { uri: process.env.TEST_LOGS_MONGODB }, 
  sqldb: { 
    host: process.env.TEST_SQL_HOST, 
    user: process.env.TEST_SQL_USER, 
    password: process.env.TEST_SQL_PASSWORD,
    dbName: process.env.TEST_SQL_NAME,
  },
  secretOrKey: "secret",
};

const production = { 
  mongodb: { uri: process.env.PROD_MONGO_DB },
  mongodbLogs: { uri: process.env.PROD_LOGS_MONGODB }, 
  sqldb: { 
    host: process.env.PROD_SQL_HOST, 
    user: process.env.PROD_SQL_USER, 
    password: process.env.PROD_SQL_PASSWORD,
    dbName: process.env.PROD_SQL_NAME,
  },
  secretOrKey: "secret",
};

const config = {
  development,
  test,
  production
};

module.exports = config[env];
