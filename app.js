const { Telegraf } = require("telegraf");
const { sendPhotoToUser, randomInt } = require("./functions.js");
const predefinedMessages = require("./messages.js");
const handleMessage = require("./handleMessage");
const AUTH_TOKEN = require("./private.js");

// constants and variables
var userMessage;
const bot = new Telegraf(AUTH_TOKEN);

bot.command("start", (ctx) => {
  // console.log("form is : " + ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "welcome to  bot yourFavoriteBuddy!!! "
  );
});
// help command msg
const helpMessage = `
>Welcome to yourFavoriteBuddy,
>type 'photo' or 'wallpaper' or 'image' to get wallpapers
`;
bot.command("help", (ctx) => {
  bot.telegram.sendMessage(ctx.chat.id, helpMessage);
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
  // function
  handleMessage(splitUserMessage, ctx);
});

// final
bot.launch();
