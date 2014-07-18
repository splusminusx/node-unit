


/**
 * @implements {unit.IRunner}
 * @param {string=} opt_name
 * @constructor
 */
unit.Suite = function(opt_name) {

  /**
   * @type {unit.report.FlatReporter}
   */
  this.__reporter = new unit.report.FlatReporter(opt_name);

  /**
   * @type {unit.Runner}
   */
  this.__runner = new unit.Runner(this.__reporter);

  /**
   * @type {Array.<!unit.ICase>}
   */
  this.__cases = [];

};


/**
 * @inheritDoc
 */
unit.Suite.prototype.addCase = function(testCase) {
  this.__cases.push(testCase);
};


/**
 * @inheritDoc
 */
unit.Suite.prototype.call = function(context, input, complete, cancel) {
  for (var i = 0; i < this.__cases.length; i += 1) {
    this.__runner.addCase(this.__cases[i]);
  }
  this.__runner.call(this.__reporter, input, complete, cancel);
};


/**
 * @param {function(!unit.ICase)|object} testCase
 */
unit.Suite.prototype.case = function(testCase) {
  if (typeof testCase === 'function') {
    this.__cases.push(testCase(new unit.Case()));
  } else if (typeof testCase === 'object') {
    var unitCase = new unit.Case();

    var name = testCase['name'] || unit.DEFAULT_NAME;
    if (typeof name === 'string') {
      unitCase.setName(name);
    }

    var timeout = testCase['timeout'] || unit.DEFAULT_TIMEOUT;
    if (typeof name === 'number') {
      unitCase.setTimeout(testCase['timeout'] || unit.DEFAULT_NAME);
    }

    var test = testCase['test'] || async.nop;
    if (typeof test === 'function') {
      unitCase.setTest(async.wrap(test));
    }

    var clean = testCase['clean'] || async.nop;
    if (typeof test === 'function') {
      unitCase.setClean(async.wrap(clean));
    }

    this.__cases.push(unitCase);
  }
};
