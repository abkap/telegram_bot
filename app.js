const { Telegraf } = require("telegraf");
const { getRandomInt, sendPhotoToUser } = require("./functions.js");
const predefinedMessages = require("./messages.js");
// constants and variables
const AUTH_TOKEN = require("./private.js");
var userMessage;

// func

// end func
const bot = new Telegraf(AUTH_TOKEN);

bot.command("start", (ctx) => {
  // console.log("form is : " + ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "welcome to my bot yourFavoriteBuddy!!! "
  );
});
bot.catch((err, ctx) => {
  console.log(
    `Ooops, encountered an error for ${ctx.updateType}\n *and* `,
    err
  );
});
bot.use(async (ctx, next) => {
  // console.log(ctx.message);
  await next();
});

bot.on("text", async (ctx) => {
  userMessage = ctx.message.text;
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
  } else if (userMessage == "photo") {
    ctx.reply("fetching...");
    sendPhotoToUser(ctx);
    // }
  } else if (predefinedMessages[userMessage]) {
    var index = getRandomInt(predefinedMessages[userMessage]);

    await ctx.reply(predefinedMessages[userMessage][index]);
  } else {
    ctx.reply(userMessage);
  }
});

// final
bot.launch();
