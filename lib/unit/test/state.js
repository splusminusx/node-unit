unit.test.case('state', function(test, clean) {
  var iWantToStoreSomeState = 'state';

  test(function(input, complete, cancel) {
    this.addAssertion(new unit.result.Assertion(
        iWantToStoreSomeState === 'state', 'initial state'));
    iWantToStoreSomeState = 'new state';
    complete(input);
  });

  clean(function(input, complete, cancel) {
    this.addAssertion(new unit.result.Assertion(
        iWantToStoreSomeState === 'new state', 'changed state'));
    complete(input);
  });

}, 1000);
