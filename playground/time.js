var moment = require('moment');

var date = moment();
date.add(9, 'weeks');

// Format: Jan 1st 1970 00:00:10 am
console.log(date.format('MMM Do YYYY HH:mm:ss a'));

// Format: 10:35 am, 6:01 am
console.log(date.format('h:mm a'));

// create moment using vanilla JS timestamp
var createdAt = new Date().getTime();
// format timestamp and print to console
console.log(
  moment(createdAt)
    .add(3, 'minutes')
    .format('h:mm a')
);
// create equivalent time stamp using moment
var timeStamp = moment().valueOf();
console.log(createdAt, timeStamp);
