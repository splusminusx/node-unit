


/**
 * @implements {unit.result.IAssertionFactory}
 * @constructor
 */
unit.result.AssertionFactory = function() {};


/**
 * @inheritDoc
 */
unit.result.AssertionFactory.prototype.create = function(value, opt_comment) {
  return new unit.result.Assertion(value, opt_comment);
};
