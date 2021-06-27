const { sendPhotoToUser, randomInt } = require("./functions.js");
const predefinedMessages = require("./messages.js");
const renderVideoAndAudio = require("./ytapp");
const getAIResponse = require("./smartAI.js");
module.exports = async function handleMessage(
  msg,
  ctx,
  availableCodesArray,
  availableCodesArrayLength
) {
  var userMessage = msg.join(" ");
  userMessage = userMessage.trimEnd().trimStart();
  //   console.log(msg.length);
  // msg is array
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
    } /* else if (
      userMessage.includes("youtube.com/") ||
      userMessage.includes("youtu.be/")
    ) {
      console.log(userMessage);
      try {
        renderVideoAndAudio(userMessage);
        ctx.reply("ok i will download that");
      } catch (e) {
        ctx.reply("sorry!! an error occured");
        console.error("error occured while downloading...");
        console.log(e);
      }
    } */ else {
      getAIResponse(userMessage, (res, err) => {
        if (err) {
          console.log(err);
          ctx.reply("some error occured");
        } else {
          console.log("smart ai replies : " + res["cnt"]);
          ctx.reply(res["cnt"]);
        }
      });
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
      // same smart reply
      getAIResponse(userMessage, (res, err) => {
        if (err) {
          console.log(err);
          ctx.reply("some error occured");
        } else {
          console.log("smart ai replies : " + res["cnt"]);
          ctx.reply(res["cnt"]);
        }
      });
    }
    //   do something
  } else {
    throw "invalid argument type only string and array is allowed";
  }
};
