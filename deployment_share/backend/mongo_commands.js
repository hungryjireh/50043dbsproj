use admin
db.createUser({user: "admin", pwd: "password", roles: [{ role: "userAdminAnyDatabase", db: "admin" }, { role: "readWriteAnyDatabase", db: "admin" }, { role: "dbAdminAnyDatabase",   db: "admin" }]});
db.createUser({user: "myUser2", pwd: "password", roles: [{ role: "readWrite", db: "test" }, { role: "readWrite", db: "logs" }, { role: "dbAdmin",   db: "test" },  { role: "dbAdmin",   db: "logs" }]});
use logs
db.logs.insert({1: "hello!"})
use test
db.users.insert({1: "hello!"})
use test
db.users.insert({1: "hello!"})
use test
db.users.insert({1: "hello!"})