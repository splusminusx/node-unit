/**
 * @param {!unit.result.IResult} result
 * @param {function(!unit.result.IResult): Array} func
 * @return {Array}
 */
unit.result.flatMap = function(result, func) {
  var values = func(result);

  var nestedResults = result.getResults();
  for (var i = 0; i < nestedResults.length; i += 1) {
    values = values.concat(unit.result.flatMap(nestedResults[i], func));
  }

  return values;
};


/**
 * @param {Array.<!unit.result.IAssertion>} assertions
 * @param {boolean} isOk
 * @return {Array.<!unit.result.IAssertion>}
 */
unit.result.filterAssertions = function(assertions, isOk) {
  var filteredAssertions = [];
  for (var i = 0; i < assertions.length; i += 1) {
    if (assertions[i].get() === isOk) {
      filteredAssertions.push(assertions[i]);
    }
  }

  return filteredAssertions;
};
