


/**
 * @interface
 * @extends {unit.result.IAssertion}
 */
unit.result.IResult = function() {};


/**
 * @return {Array.<!unit.result.IAssertion>}
 */
unit.result.IResult.prototype.getAssertions = function() {};


/**
 * @return {Array.<!unit.result.IResult>}
 */
unit.result.IResult.prototype.getResults = function() {};
