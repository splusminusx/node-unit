


/**
 * @interface
 */
unit.result.IResult = function() {};


/**
 * @return {boolean}
 */
unit.result.IResult.prototype.get = function() {};


/**
 * @return {string}
 */
unit.result.IResult.prototype.getComment = function() {};


/**
 * @return {Array.<!unit.result.IAssertion>}
 */
unit.result.IResult.prototype.getAssertions = function() {};


/**
 * @return {Array.<!unit.result.IResult>}
 */
unit.result.IResult.prototype.getResults = function() {};
