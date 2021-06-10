function getRandomInt(msg) {
  var randomInt = Math.floor(Math.random() * 10);
  if (randomInt < msg.length) {
    console.log(randomInt);
    return randomInt;
  } else {
    return 0;
  }
}

async function sendPhotoToUser(obj) {
  var imageId = Math.floor(Math.random() * 100000000);

  // imageId = 8051965;
  var imageFile = `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  try {
    await obj.replyWithPhoto(imageFile);
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

// [0-9]+\.\s[a-zA-Z\s,\(\)0-9;\.\?'\-":!]+
// exporting functions
module.exports = { getRandomInt, sendPhotoToUser };
