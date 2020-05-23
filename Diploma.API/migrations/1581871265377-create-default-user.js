var User = require("../bin/api/schemas/user.schema").default;
var mongoose = require('mongoose');

exports.up = function up (done) {
    return mongoose.connect(process.env.MIGRATE_dbConnectionUri, { useUnifiedTopology: true, useNewUrlParser: true }).then(
        function() {
            return User.create({
              name: 'Admin',
              email: '123456@gmail.com',
              password: '123456',
              roles: [9],
          });
        }
    ).then(function() { done(); });
};

exports.down = function down (done) {
    mongoose.connect(process.env.DB_URL, { useUnifiedTopology: true, useNewUrlParser: true }).then(
        function() {
            return User.deleteOne({
              email: '123456@gmail.com',
          });
        }
    ).then(function() { done(); });
};
