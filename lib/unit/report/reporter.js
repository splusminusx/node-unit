


/**
 * @implements {unit.report.IReporter}
 * @param {string} name
 * @constructor
 */
unit.report.Reporter = function(name) {

  /**
   * @type {string}
   */
  this.__name = name;

  /**
   * @type {boolean}
   */
  this.__result = true;

  /**
   * @type {Array.<!unit.result.IAssertion>}
   */
  this.__assertions = [];

  /**
    * @type {Array.<!unit.result.IResult>}
    */
  this.__results = [];

  /**
   * @type {Array.<string>}
   */
  this.__comments = [];
};


/**
 * @inheritDoc
 */
unit.report.Reporter.prototype.addAssertion = function(assertion) {
  this.__assertions.push(assertion);
  this.__result = this.__result && assertion.get();
  this.__comments.push(this.__name + ' | ' +
      assertion.getComment());
};


/**
 * @inheritDoc
 */
unit.report.Reporter.prototype.addResult = function(result) {
  this.__results.push(result);
};


/**
 * @inheritDoc
 */
unit.report.Reporter.prototype.get = function() {
  return this.__result;
};


/**
 * @inheritDoc
 */
unit.report.Reporter.prototype.getComment = function() {
  return this.__comments.join('\n');
};


/**
 * @inheritDoc
 */
unit.report.Reporter.prototype.getAssertions = function() {
  return this.__assertions;
};


/**
 * @inheritDoc
 */
unit.report.Reporter.prototype.getResults = function() {
  return this.__results;
};
