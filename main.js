const Sonus = require('sonus')
const speech = require('@google-cloud/speech')
const client = new speech.SpeechClient({
   projectId: 'diy-290020',
   keyFilename: 'credentials.json'
})
const hotwords = [{ file: 'Hey Google.pmdl', hotword: 'Hey Google' }]
const detector = Sonus.init({ hotwords }, client)
const Sound = require('node-aplay');
const say = require('say');
Sonus.start(detector)
console.log('Running !')
detector.on('hotword', function (index, hotword, buffer) {
   console.log('hotword', index, hotword);
   var music = new Sound('fire.wav');
   music.play();
   music.on('complete', () => {
      console.log('Done with playback!');
   });
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

