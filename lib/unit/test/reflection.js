unit.test.case('reflection', function(test, clean) {
  test(function(input, complete, cancel) {
    var failedTest = new unit.Case('failed test case');
    var successTest = new unit.Case('failed test case');
    var timeoutTest = new unit.Case('timeout test case');

    var reporter = new unit.report.FlatReporter('inner reporter');
    var runner = new unit.Runner();
    var self = this;

    failedTest.setTest(function(input, complete, cancel) {
      this.addAssertion(new unit.result.Assertion(false,
          'inner case test was failed'));
      complete(input);
    });

    failedTest.setClean(function(input, complete, cancel) {
      this.addAssertion(new unit.result.Assertion(true,
          'clean was called'));
      complete(input);
    });

    successTest.setTest(function(input, complete, cancel) {
      this.addAssertion(new unit.result.Assertion(true,
          'inner case test was success'));
      complete(input);
    });

    successTest.setClean(function(input, complete, cancel) {
      this.addAssertion(new unit.result.Assertion(true,
          'clean was called'));
      complete(input);
    });

    timeoutTest.setTimeout(1000);

    timeoutTest.setTest(function(input, complete, cancel) {
      this.addAssertion(new unit.result.Assertion(true,
          'inner case test was success'));
      var self = this;
      setTimeout(function() {
        self.addAssertion(new unit.result.Assertion(true,
            'inner case test was success'));
        complete(input);
      }, 2000);
    });

    timeoutTest.setClean(function(input, complete, cancel) {
      this.addAssertion(new unit.result.Assertion(true,
          'clean was called'));
      complete(input);
    });

    function end() {
      var assertions = reporter.getAssertions();
      var results = reporter.getResults();
      var failedAssertions = unit.result.filterAssertions(assertions, false);
      var failedResults = unit.result.filterAssertions(results, false);

      self.addAssertion(new unit.result.Assertion(assertions.length === 7,
          'there were 7 assertions'));
      self.addAssertion(new unit.result.Assertion(failedAssertions.length === 2,
          '2 assertions were failed'));
      self.addAssertion(new unit.result.Assertion(results.length === 3,
          '3 tests were ran'));
      self.addAssertion(new unit.result.Assertion(failedResults.length === 2,
          '2 tests were failed'));

      complete(input);
    }

    runner.addCase(failedTest);
    runner.addCase(successTest);
    runner.addCase(timeoutTest);
    runner.call(reporter, null, end, end);
  });

  clean(function(input, complete, cancel) {
    complete(input);
  });

});
