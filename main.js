require('dotenv').config()
const Sonus = require('sonus')
const speech = require('@google-cloud/speech')
const client = new speech.SpeechClient({
   projectId: 'diy-290020',
   keyFilename: 'credentials.json'
})
const hotwords = [{ file: 'Hey Google.pmdl', hotword: 'Hey Google' }]
const detector = Sonus.init({ hotwords }, client)
const sounds = require('./sounds')
const say = require('say');

if (process.env.INITIAL_CREDITS_SST >= 240) {
   console.log("no more credits remaining")
}
Sonus.start(detector)
console.log('Running !')
console.log('Waiting for hotword !')
detector.on('hotword', function (index, hotword, buffer) {
   console.log('hotword', index, hotword);
   sounds.playActivationSound();
});

detector.on('silence', function () {
   //console.log('silence');
});

detector.on('sound', function (buffer) {
   //  console.log('sound');
});

detector.on('error', function () {
   console.log('error');
});

detector.on('final-result', (res) => {
   say.speak(res)
   console.log(res)
   if (res == "" || res == null) {
      say.speak("nothing")
   }
})

