var { range } = require('lodash');
var mongoose = require('mongoose');

/**
 * Make any changes you need to make to the database here
 */


var StageSchema = new mongoose.Schema({
  endDate: {
    type: Date,
  },
  step: {
    type: Number,
    default: Step.ChooseInstructor,
    required: true,
    unique: true,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
}); 

exports.up = function up (done) {
  return mongoose.connect(process.env.MIGRATE_dbConnectionUri, { useUnifiedTopology: true, useNewUrlParser: true }).then(() => {
    const Stage = mongoose.model('stage', StageSchema)
    const steps = range(9);
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

