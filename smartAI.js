const { apiKey, queryKey } = require("./private.js");
var unirest = require("unirest");

module.exports = function getAIResponse(msg, callback) {
  var req = unirest("GET", "https://acobot-brainshop-ai-v1.p.rapidapi.com/get");
  req.query({
    bid: "178",
    key: queryKey,
    uid: "mashape",
    msg: msg,
  });

  req.headers({
    "x-rapidapi-key": apiKey,
    "x-rapidapi-host": "acobot-brainshop-ai-v1.p.rapidapi.com",
    useQueryString: true,
  });

  req.end(function (res) {
    if (res.error) {
      callback(null, res.error);
      throw new Error(res.error);
    } else {
      callback(res.body, null);
    }
  });
};
