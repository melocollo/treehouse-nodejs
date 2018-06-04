// Note: REST API = interact with objects and methods via https requests instead of js directly

// require https module
const https = require('https');
const http = require('http');

// print error messages
function printError(error) {
  console.error(error.message);
}

// function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  try { // make sure url is valid
    // connect to the API URL (https://teamtreehouse.com/username.json)
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
                            if (response.statusCode === 200) {
                              let body = "";
                              // read data
                              response.on('data', data => {
                                body += data.toString();
                              });

                              response.on('end', () => { // wait until the data is fininshed loading before parsing data
                                try { // make sure JSON response is valid
                                  // parse data
                                  const profile = JSON.parse(body);
                                  // print data
                                  printMessage(username, profile.badges.length, profile.points.JavaScript);
                                } catch (error) {
                                  printError(error);
                                }
                              });
                            } else {
                                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                                const statusCodeError = new Error(message);
                                printError(statusCodeError);
                            }
                    });
    request.on('error', printError); // make sure url is valid
  } catch (error) {
    printError(error);
  }
}

// API. allows other js files to access the getProfile method. You can use whatever name you want in the module.exports.<choose a name>
module.exports.getProfile = getProfile;
