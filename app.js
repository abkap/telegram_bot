const { Telegraf } = require("telegraf");

const handleMessage = require("./handleMessage");
const AUTH_TOKEN = require("./private.js");
const fs = require("fs");

// constants and variables
var userMessage;
const bot = new Telegraf(AUTH_TOKEN);

bot.telegram.getMe().then((botInfo) => {
  bot.options.username = botInfo.username;
});

bot.command("start", (ctx) => {
  // console.log("form is : " + ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "welcome to  bot yourFavoriteBuddy!!! \n /help to know more"
  );
});
// loading file containing image_id data
var availableCodesArrayLength;
var availableCodesArray;
availableCodesArray = fs
  .readFileSync("./availableCodes.txt")
  .toString()
  .split(",");
availableCodesArrayLength = availableCodesArray.length;

// help command msg
const helpMessage = `
>Welcome to yourFavoriteBuddy,
>type 'photo' or 'wallpaper' or 'image' to get wallpapers
(eg., wallpaper)
>type wallpaper count to get count no of photos
(eg., wallpaper 10)
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
  userMessage = ctx.message.text.toLocaleLowerCase();

  splitUserMessage = userMessage.split(" ");
  // function
  handleMessage(
    splitUserMessage,
    ctx,
    availableCodesArray,
    availableCodesArrayLength
  );
});

// final
bot.launch();
