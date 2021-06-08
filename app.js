const { Telegraf } = require("telegraf");
const { getRandomInt } = require("./functions.js");
const messages = require("./messages.js");
const AUTH_TOKEN = require("./private.js");

const bot = new Telegraf(AUTH_TOKEN);

bot.command("start", (ctx) => {
  console.log("form is : " + ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "welcome to my bot yourFavoriteBuddy!!! "
  );
});
bot.catch((err, ctx) => {
  console.log(`Ooops, encountered an error for ${ctx.updateType}`, err);
});
bot.use(async (ctx, next) => {
  console.log(ctx.message);
  await next();
});
var message;
bot.on("text", async (ctx) => {
  message = ctx.message.text;
  if (message == "poll") {
    try {
      await ctx.telegram.sendPoll(ctx.message.from.id, "how are you", [
        "fine",
        "not fine",
        "none of your business",
      ]);
    } catch (err) {
      console.log("error occured: " + err);
    }
  } else if (messages[message]) {
    var index = getRandomInt(messages[message]);
    ctx.reply(messages[message][index]);
  } else {
    ctx.reply(message);
  }
});

bot.launch();
