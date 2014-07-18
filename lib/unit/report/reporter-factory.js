


/**
 * @implements {unit.report.IReporterFactory}
 * @constructor
 */
unit.report.ReporterFactory = function() {};


/**
 * @inheritDoc
 */
unit.report.ReporterFactory.prototype.create = function(name) {
  return new unit.report.Reporter(name);
};
