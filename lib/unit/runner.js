


/**
 * @implements {unit.IRunner}
 * @implements {unit.ISuite}
 * @constructor
 * @param {!unit.report.ReporterCreator=} opt_reporterCreator
 * @param {!unit.result.AssertionCreator=} opt_assertionCreator
 */
unit.Runner = function(opt_reporterCreator, opt_assertionCreator) {

  /**
   * @type {!unit.report.ReporterCreator}
   */
  this.__reporterCreator = opt_reporterCreator || unit.report.FLAT_REPORTER;

  /**
   * @type {!unit.result.AssertionCreator}
   */
  this.__assertionCreator = opt_assertionCreator || unit.result.ASSERTION;

  /**
   * @type {Array.<!unit.ICase>}
   */
  this.__cases = [];

};


/**
 * @inheritDoc
 */
unit.Runner.prototype.addCase = function(unitCase) {
  this.__cases.push(unitCase);
};


/**
 * @inheritDoc
 */
unit.Runner.prototype.call = function(context, input, complete, cancel) {
  var steps = [];

  for (var i = 0; i < this.__cases.length; i += 1) {
    steps.push(this.__build(context, this.__cases[i]));
  }

  async.sequence(steps).call(context, input, complete, complete);
};


/**
 * @param {!unit.IContext} context
 * @param {!unit.ICase} testCase
 * @return {!async.Step}
 */
unit.Runner.prototype.__build = function(context, testCase) {
  var reporter = this.__reporterCreator(testCase.getName());
  var self = this;

  /**
   * @this {async.Context}
   * @param {async.Input} input
   * @param {!async.CompleteHandler} complete
   * @param {!async.ErrorHandler} cancel
   */
  function report(input, complete, cancel) {
    context.addResult(reporter);
    complete(input);
  }

  /**
   * @this {async.Context}
   * @param {async.Input} input
   * @param {!async.CompleteHandler} complete
   * @param {!async.ErrorHandler} cancel
   */
  return function(input, complete, cancel) {
    async.sequence([
      self.__safe(reporter,
          self.__timeout(testCase.getTimeout(), testCase.test())),
      self.__safe(reporter,
          self.__timeout(testCase.getTimeout(), testCase.clean())),
      report
    ]).call(reporter, input, complete, cancel);
  }
};


/**
 * @param {unit.IContext} context
 * @param {!async.Step} step
 * @return {!async.Step}
 */
unit.Runner.prototype.__safe = function(context, step) {
  var self = this;
  /**
   * @this {async.Context}
   * @param {async.Input} input
   * @param {!async.CompleteHandler} complete
   * @param {!async.ErrorHandler} cancel
   */
  return function(input, complete, cancel) {
    function localCancel(error, opt_code) {
      var code = opt_code || 'Unknown Code';
      context.addAssertion(self.__assertionCreator(false,
          'Scenario was cancelled. Error [' + code + ']: ' + error));
      complete(input);
    }
    try {
      step.call(context, input, complete, localCancel);
    } catch (error) {
      localCancel(error.message, error.code);
    }
  };
};


/**
 * @param {number} timeout
 * @param {!async.Step} step
 * @return {!async.Step}
 */
unit.Runner.prototype.__timeout = function(timeout, step) {
  var isComplete = false;
  var timeoutId;
  /**
   * @param {async.Input} input Входные данные.
   * @param {!async.CompleteHandler} complete Обработчик результата.
   * @param {!async.ErrorHandler} cancel Обработчик ошибки.
   */
  var timeoutStep = function(input, complete, cancel) {
    timeoutId = setTimeout(function() {
      if (!isComplete) {
        cancel('Timeout Error');
      }
    }, timeout);
    complete(input);
  };

  /**
   * @param {async.Input} input
   * @param {!async.CompleteHandler} complete
   * @param {!async.ErrorHandler} cancel
   */
  var completeStep = function(input, complete, cancel) {
    isComplete = true;
    clearTimeout(timeoutId);
    complete(input);
  };

  return async.sequence([
    timeoutStep,
    step,
    completeStep
  ]);
};
