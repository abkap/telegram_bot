module.exports = {
  // obj start

  getRandomInt: (msg) => {
    var randomInt = Math.floor(Math.random() * 10);
    if (randomInt < msg.length) {
      console.log(randomInt);
      return randomInt;
    } else {
      return 0;
    }
  },

  // obj end
};
