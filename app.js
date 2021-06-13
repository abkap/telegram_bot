const { Telegraf } = require("telegraf");
const { sendPhotoToUser, randomInt } = require("./functions.js");
const predefinedMessages = require("./messages.js");

const AUTH_TOKEN = require("./private.js");

// constants and variables
var userMessage;
const bot = new Telegraf(AUTH_TOKEN);
const helpCommand = [
  "welcome to yourFavoriteBuddy",
  "use 'wallpaper' or 'image' or 'photo'  to download a photo",
];

bot.command("start", (ctx) => {
  // console.log("form is : " + ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "welcome to  bot yourFavoriteBuddy!!! "
  );
});

bot.command("help", (ctx) => {
  helpCommand.forEach((msg) => {
    bot.telegram.sendMessage(ctx.chat.id, msg);
  });
});
bot.catch((err, ctx) => {
  console.log(
    `Ooops, encountered an error for ${ctx.updateType}\n *and* `,
    err
  );
});

bot.use(async (ctx, next) => {
  console.log(ctx.message);
  await next();
});

bot.on("text", async (ctx) => {
  userMessage = ctx.message.text;
  splitUserMessage = userMessage.split(" ");
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
});

// final
bot.launch();
