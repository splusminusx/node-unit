unit.test.addCase(function(c) {
  c.name = 'test';

  c.timeout = 1000;

  c.test = function(input, complete, cancel) {
    console.log('test was started');
    complete(input);
  };

  c.clean = function(input, complete, cancel) {
    console.log('test was cleaned');
    complete(input);
  };

});
