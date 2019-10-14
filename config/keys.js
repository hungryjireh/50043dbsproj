module.exports = {
  mongoURI: "mongodb://phangster:1234@education-shard-00-00-x2lxj.mongodb.net:27017,education-shard-00-01-x2lxj.mongodb.net:27017,education-shard-00-02-x2lxj.mongodb.net:27017/edu_hack?ssl=true&replicaSet=education-shard-0&authSource=admin&retryWrites=true&w=majority",
  // mongoURI:"mongodb://myUser2:password@3.214.81.197/test",
  secretOrKey: "secret",
  mySQLParams: {host: "localhost", user: "root", password:"password", database:"test"}
};