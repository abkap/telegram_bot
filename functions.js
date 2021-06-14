// required
const fs = require("fs");

// all functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function sendPhotoToUser(
  obj,
  availableCodesArray,
  availableCodesArrayLength
) {
  var intForPhoto = randomInt(0, availableCodesArrayLength);
  var imageId = Number(availableCodesArray[intForPhoto]);

  // valid imageId = 8051965;
  var imageFile = `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  try {
    await obj.replyWithPhoto(imageFile);
    console.log(`image send seccessfully (imageId=${imageId})`);
  } catch (err) {
    console.log("e is : ", err.response.error_code);
    if (err.response.error_code == 400) {
      console.log("recalling sendPhotoToUser...");
      sendPhotoToUser(obj);
    } else {
      console.log("photo send>>>");
    }
  }
}

// exporting functions
module.exports = { sendPhotoToUser, randomInt };
