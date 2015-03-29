var Agenda = require('agenda');
//console.log("loading");

var agenda = new Agenda({db: { address: 'localhost:27017/agenda-test', collection: 'agendaJobs' }});

var myErr = function(err, numRemoved) {
  console.log("Purging");
};

// PURGING ALL JOBS FOR THE TESTS!!!
agenda.purge(myErr);

var jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : ['test'];

jobTypes.forEach(function(type) {
  require('./jobs/' + type)(agenda);
})

if(jobTypes.length) {
  agenda.start();
} else {
  console.log("no jobs found");
}

module.exports = agenda;
