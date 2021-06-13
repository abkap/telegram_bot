const { sendPhotoToUser, randomInt } = require("./functions.js");
const predefinedMessages = require("./messages.js");
module.exports = async function handleMessage(msg, ctx) {
  var userMessage = "";
  msg.forEach((item) => {
    if (msg.length) userMessage += item + " ";
  });
  userMessage = userMessage.trimEnd();
  console.log(msg.length);
  if (msg.length == 1 || predefinedMessages[userMessage]) {
    if (userMessage == "poll") {
      try {
        await ctx.telegram.sendPoll(ctx.message.from.id, "how are you", [
          "fine",
          "not fine",
          "none of your business",
        ]);
      } catch (err) {
        // console.log("error occured for poll : " + err);
      }
    } else if (
      userMessage.includes("photo") ||
      userMessage.includes("image") ||
      userMessage.includes("wallpaper")
    ) {
      ctx.reply("fetching...");

      sendPhotoToUser(ctx);
      // }
    } else if (predefinedMessages[userMessage]) {
      // var index = getRandomInt(predefinedMessages[userMessage]);
      // getRandomInt function replaced with randomInt() function

      var index = randomInt(0, predefinedMessages[userMessage].length);

      await ctx.reply(predefinedMessages[userMessage][index]);
    } else {
      ctx.reply("command not found !");
    }
  } else if (msg instanceof Array) {
    console.log("param is an array");
    // for something like 'wallpaper 10'
    if (
      (msg[0].includes("wallpaper") ||
        msg[0].includes("image") ||
        msg[0].includes("photo")) &&
      !isNaN(Number(msg[1]))
    ) {
      console.log("this is what i want");
      //   wallpaper 10
      var limit = Number(msg[1]);
      ctx.reply(`fetching ${limit} photos...`);
      for (var i = 0; i < limit; i++) {
        //   sending limit no of photos
        sendPhotoToUser(ctx);
      }
    } else {
      console.log("not what i want");
      ctx.reply("command not found !!");
    }
    //   do something
  } else {
    throw "invalid argument type only string and array is allowed";
  }
};