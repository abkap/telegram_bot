module.exports = {
  // obj start

  run: () => {
    console.log("wroking");
  },
  getRandomInt: (msg) => {
    var randomInt = Math.floor(Math.random() * 10);
    if (randomInt < msg.length) {
      console.log(randomInt);
      return randomInt;
    } else {
      return getRandomInt(msg);
    }
  },

  // obj end
};
