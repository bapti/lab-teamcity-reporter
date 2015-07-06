var internals = {};
var log = console.log;

exports = module.exports = internals.Reporter = function (options) {
    this.settings = options;
};

internals.Reporter.prototype.start = function (notebook) {

};

internals.Reporter.prototype.test = function (test) {
  log("##teamcity[testStarted name='" + escape(test.title) + "' captureStandardOutput='true']")

  if (test.err) {
    log("##teamcity[testFailed name='" + escape(test.title) + "' message='" + escape(err.message) + "' captureStandardOutput='true']");
  }
  else if (test.skipped) {
    log("##teamcity[testIgnored name='" + escape(test.title) + "' message='pending']");
  }
  else if (test.todo) {
    log("##teamcity[testIgnored name='" + escape(test.title) + "' message='pending']");
  }
  else {
    log("##teamcity[testFinished name='" + escape(test.title) + "' duration='" + test.duration + "']");
  }
};

internals.Reporter.prototype.end = function (notebook) {
  log("##teamcity[testSuiteFinished name='lab.suite' duration='" + notebook.ms + "']");
};

function escape(str) {
  if (!str) return '';
  return str
    .toString()
    .replace(/\|/g, "||")
    .replace(/\n/g, "|n")
    .replace(/\r/g, "|r")
    .replace(/\[/g, "|[")
    .replace(/\]/g, "|]")
    .replace(/\u0085/g, "|x")
    .replace(/\u2028/g, "|l")
    .replace(/\u2029/g, "|p")
    .replace(/'/g, "|'");
}
