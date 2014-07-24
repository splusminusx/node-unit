


/**
 * @constructor
 * @implements {unit.ISuite}
 * @implements {async.IStep}
 * @param {string} name
 */
unit.Suite = function(name) {

  /**
   * @type {!unit.report.FlatReporter}
   */
  this.__reporter = new unit.report.FlatReporter(name);

  /**
   * @type {!unit.Runner}
   */
  this.__runner = new unit.Runner();

  /**
   * @type {Array.<!unit.ICase>}
   */
  this.__cases = [];

};


/**
 * @param {!unit.ICase} testCase
 */
unit.Suite.prototype.addCase = function(testCase) {
  this.__cases.push(testCase);
};


/**
 * @inheritDoc
 */
unit.Suite.prototype.call = function(_, input, complete, cancel) {
  for (var i = 0; i < this.__cases.length; i += 1) {
    this.__runner.addCase(this.__cases[i]);
  }
  this.__runner.call(this.__reporter, input, complete, cancel);
};


/**
 * @param {string} name
 * @param {function(function(!async.Step), function(!async.Step))} testCase
 * @param {number=} opt_timeout
 */
unit.Suite.prototype.case = function(name, testCase, opt_timeout) {
  var unitCase = new unit.Case();
  unitCase.setName(name);
  unitCase.setTimeout(opt_timeout || unit.DEFAULT_TIMEOUT);

  /**
   * @param {!async.Step} testStep
   */
  function test(testStep) {
    unitCase.setTest(testStep);
  }

  /**
   * @param {!async.Step} cleanStep
   */
  function clean(cleanStep) {
    unitCase.setClean(cleanStep);
  }

  testCase(test, clean);
  this.__cases.push(unitCase);
};


/**
 * @return {!unit.report.FlatReporter}
 */
unit.Suite.prototype.getReporter = function() {
  return this.__reporter;
};
