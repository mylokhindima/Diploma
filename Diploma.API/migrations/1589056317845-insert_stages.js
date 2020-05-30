var { range } = require('lodash');
var mongoose = require('mongoose');
var { StageSchema } = require("../dist/schemas/stage.schema");
/**
 * Make any changes you need to make to the database here
 */

exports.up = function up (done) {
  return mongoose.connect(process.env.MIGRATE_dbConnectionUri, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    const Stage = mongoose.model('stage', StageSchema);
    const steps = range(10);
    return Stage.create(steps.map(s => ({ step: s })));
  }).then(function() { done(); })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */

exports.down = function down (done) {
  return mongoose.connect(process.env.MIGRATE_dbConnectionUri, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    const Stage = mongoose.model('stage', StageSchema);
    return Stage.remove({});
  }).then(function() { done(); })
}

