const fs = require ('fs')

const { auth, postReplyWithMedia } = require('./config.js');

const client = auth();

client.stream('statuses/filter', { track: '@pelicanstairs take me to #pelicanstairs' }, function (stream) {
  console.log("Searching for tweets...");

  // when a tweet is found
  stream.on('data', function (tweet) {
    console.log("Found one!");
    console.log("Recieved tweet reading...", tweet.text);

    const path = './pelican-images';

    fs.readdir(path, function (error, files) {
      if (error) {return};
      console.log(files);
      const file = path+'/'+files[Math.floor (Math.random()*files.length)]
      console.log(file);
    postReplyWithMedia(client, file, tweet);

    })


    stream.on('error', function (error) {
      console.log(error);
    });
  });
});
