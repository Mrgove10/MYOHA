const Sound = require('node-aplay');

exports.playActivationSound = function() {
    var music = new Sound('fire.wav');
    music.play();
    music.on('complete', () => {
        console.log('Done with playback!');
    });
}

