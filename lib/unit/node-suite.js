


/**
 * @constructor
 * @implements {unit.ISuite}
 * @implements {async.IStep}
 * @param {string} name
 * @param {!unit.Suite=} opt_suite
 */
unit.NodeSuite = function(name, opt_suite) {
  /**
   * @type {unit.Suite}
   */
  this.__suite = opt_suite || new unit.Suite(name);
};


/**
 * @inheritDoc
 */
unit.NodeSuite.prototype.addCase = function(testCase) {
  this.__suite.addCase(testCase);
};


/**
 * @inheritDoc
 */
unit.NodeSuite.prototype.call = function() {
  var reporter = this.__suite.getReporter();
  function exit() {
    var exitCode = reporter.get() ? 0 : 1;
    unit.report.print(reporter);
    process.exit(exitCode);
  }

  process.addListener('uncaughtException', function(error) {
    reporter.addAssertion(new unit.result.Assertion(false,
        'Error [uncaughtException ' + error.code + ']:' + error.message));
    exit();
  });

  this.__suite.call(null, null, exit, exit);
};


/**
 * @param {string} name
 * @param {function(function(!async.Step), function(!async.Step))} testCase
 * @param {number=} opt_timeout
 */
unit.NodeSuite.prototype.case = function(name, testCase, opt_timeout) {
  this.__suite.case(name, testCase, opt_timeout);
};


/**
 * @return {!unit.report.FlatReporter}
 */
unit.NodeSuite.prototype.getReporter = function() {
  return this.__suite.getReporter();
};
