// problem: view badge count and points
// solution: use node.js to connect to treehouse API to get profile info

const profile = require('./profile.js')

// allow users to run code like this: node badgecount.js username1 username2
const users = process.argv.slice(2);
users.forEach(profile.getProfile);

/* previously, the code looked like this to loop through an array of usernames:
  const users = ["chalkers", "melocollo", "davemcfarland"];
  users.forEach(getProfile);
*/
