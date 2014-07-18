


/**
 * @interface
 */
unit.IRunner = function() {};


/**
 * @param {!unit.ICase} unitCase
 */
unit.IRunner.prototype.addCase = function(unitCase) {};


/**
 * @param {!unit.IContext} context
 * @param {async.Input} input
 * @param {!async.CompleteHandler} complete
 * @param {!async.ErrorHandler} cancel
 */
unit.IRunner.prototype.call = function(context, input, complete, cancel) {};
