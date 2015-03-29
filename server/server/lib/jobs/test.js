// Test Worker
//
//        ┌─────────────────────┐
//        │   Test Job Worker   │                    ┌───────────────────────────────────┐
//        │                     │                    │                                   │
//        │                     │                    │           Yahoo Finance           │
//        │                     │                    │                GET                │
//        │                     │                    │http://download.finance.yahoo.com/d│
//        │                     │                    │                 /                 │
//        │                     │◀─────────────────▶│    With the following params:     │
//        │                     │                    │         s = ticker symbol         │
//        │                     │                    │          f = data points          │
//        │                     │                    │            e = format             │
//        │                     │                    │                                   │
//        │                     │                    │                                   │
//        └─────────────────────┘                    └───────────────────────────────────┘
//
// Reference:
// http://www.canbike.org/information-technology/yahoo-finance-url-download-to-a-csv-file.html
// https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=
var yahooRequest = require('request');

console.log("test jobs");

module.exports = function(agenda) {
  agenda.define('just testing', function(job, done) {
    //User.get(job.attrs.data.userId, function(err, user) {
    //   if(err) return done(err);
    //   email(user.email(), 'Thanks for registering', 'Thanks for registering ' + user.name(), done);
    // });
    console.log("making request");
    yahooRequest('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quote%20where%20symbol%20in%20(%22YHOO%22%2C%22AAPL%22%2C%22GOOG%22%2C%22MSFT%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=', function (error, response, body) {
      console.log("callback");
      console.log(response.statusCode);
      if (!error && response.statusCode == 200) {
        console.log(body) // Show the HTML for the Google homepage.
      } else {
        console.log(response.statusCode)
      }
      done();
    });
    //console.log("Hello everybody");
  });

  agenda.define('check my stocks',function(job, done) {

  });
  //agenda.define('reset password', function(job, done) {
    // etc etc
  //})

  agenda.every('10 minutes', 'just testing');
  //agenda.every('4 seconds', 'just testing');
  // More email related jobs
}
