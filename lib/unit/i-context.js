


/**
 * @interface
 */
unit.IContext = function() {};


/**
 * @param {!unit.result.IAssertion} assertion
 */
unit.IContext.prototype.addAssertion = function(assertion) {};


/**
 * @param {!unit.result.IResult} result
 */
unit.IContext.prototype.addResult = function(result) {};
