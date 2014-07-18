


/**
 * @implements {unit.report.IReporter}
 * @param {string} name
 * @constructor
 */
unit.report.FlatReporter = function(name) {

  /**
   * @type {unit.report.Reporter}
   */
  this.__reporter = new unit.report.Reporter(name);

};


/**
 * @return {unit.report.Reporter}
 */
unit.report.FlatReporter.prototype.getReporter = function() {
  return this.__reporter;
};


/**
 * @inheritDoc
 */
unit.report.FlatReporter.prototype.addAssertion = function(assertion) {
  this.__reporter.addAssertion(assertion);
};


/**
 * @inheritDoc
 */
unit.report.FlatReporter.prototype.addResult = function(result) {
  this.__reporter.addResult(result);
};


/**
 * @inheritDoc
 */
unit.report.FlatReporter.prototype.get = function() {
  var result = this.__reporter.get();
  var results = this.__reporter.getResults();

  for (var i = 0; i < results.length; i += 1) {
    result = result && results[i].get();
  }

  return result;
};


/**
 * @inheritDoc
 */
unit.report.FlatReporter.prototype.getComment = function() {
  var comments = [this.__reporter.getComment()];
  var results = this.__reporter.getResults();

  for (var i = 0; i < results.length; i += 1) {
    comments.push(results[i].getComment());
  }

  return comments.join('\n');
};


/**
 * @inheritDoc
 */
unit.report.FlatReporter.prototype.getAssertions = function() {
  var assertions = this.__reporter.getAssertions();
  var results = this.__reporter.getResults();
  for (var i = 0; i < results.length; i += 1) {
    assertions = assertions.concat(results[i].getAssertions());
  }

  return assertions;
};


/**
 * @inheritDoc
 */
unit.report.FlatReporter.prototype.getResults = function() {
  var results = this.__reporter.getResults();
  for (var i = 0; i < results.length; i += 1) {
    results = results.concat(results[i].getResults());
  }
  return results;
};
