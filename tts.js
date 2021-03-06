const fs = require('fs');

// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

// The text to synthesize
const text = 'Google Cloud Text-to-Speech enables developers to synthesize natural-sounding speech with 30 voices';

// Construct the request
const request = {
  input: {text: text},
  // Select the language and SSML Voice Gender (optional)
    voice: {
        languageCode: 'en-US', 
        name: "en-US-Wavenet-F"
    },
  // Select the type of audio encoding
  audioConfig: {
      audioEncoding: "LINEAR16",   
      pitch: "1.00",
      speakingRate: "1.00"
    },
};

// Performs the Text-to-Speech request
client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('ERROR:', err);
    return;
  }

  // Write the binary audio content to a local file
  fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log('Audio content written to file: output.mp3');
  });
});