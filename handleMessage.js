const { sendPhotoToUser, randomInt } = require("./functions.js");
const predefinedMessages = require("./messages.js");
module.exports = async function handleMessage(
  msg,
  ctx,
  availableCodesArray,
  availableCodesArrayLength
) {
  var userMessage = "";
  msg.forEach((item) => {
    if (msg.length) userMessage += item + " ";
  });
  userMessage = userMessage.trimEnd().trimStart();
  //   console.log(msg.length);
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
      console.time("sending photo");
      await sendPhotoToUser(
        ctx,
        availableCodesArray,
        availableCodesArrayLength
      );
      console.timeEnd("sending photo");
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
    // this will be always true since we are passing array as argument in app.js
    // console.log("param is an array");
    // for something like 'wallpaper 10'
    if (
      (msg[0].includes("wallpaper") ||
        msg[0].includes("image") ||
        msg[0].includes("photo")) &&
      !isNaN(Number(msg[1]))
    ) {
      //   wallpaper 10
      var limit = Number(msg[1]);
      ctx.reply(`fetching ${limit} photos...`);

      for (var i = 0; i < limit; i++) {
        //   sending limit photos
        sendPhotoToUser(ctx, availableCodesArray, availableCodesArrayLength);
      }
    } else {
      ctx.reply("command not found !!");
    }
    //   do something
  } else {
    throw "invalid argument type only string and array is allowed";
  }
};
