/**
 * @param {unit.report.IReporter} reporter
 */
unit.report.print = function(reporter) {
  console.log(reporter.getComment() + '\n\n');
  console.log('Tests started:', reporter.getResults().length);
  console.log('Tests failed:', unit.result.filterAssertions(
      reporter.getResults(), false).length);
  console.log('Assertions:', reporter.getAssertions().length);
  console.log('Assertions failed:', unit.result.filterAssertions(
      reporter.getAssertions(), false).length);
};


/**
 * @typedef {function(string): !unit.report.IReporter}
 */
unit.report.ReporterCreator;


/**
 * @param {string} name
 * @return {!unit.report.Reporter}
 */
unit.report.REPORTER = function(name) {
  return new unit.report.Reporter(name);
};


/**
 * @param {string} name
 * @return {!unit.report.FlatReporter}
 */
unit.report.FLAT_REPORTER = function(name) {
  return new unit.report.FlatReporter(name);
};
