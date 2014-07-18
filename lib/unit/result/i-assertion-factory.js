


/**
 * @interface
 */
unit.result.IAssertionFactory = function() {};


/**
 * @param {boolean} value
 * @param {string=} opt_comment
 * @return {!unit.result.IAssertion}
 */
unit.result.IAssertionFactory.prototype.create =
    function(value, opt_comment) {};
