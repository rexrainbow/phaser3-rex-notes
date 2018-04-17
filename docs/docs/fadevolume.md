## Introduction

Fade-in/fade-out volume of sound.

- Author: Rex
- Method only

## Source code

- [Fade-in](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/sound-fade-in.js)
- [Fade-out](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/sound-fade-out.js)

## Usage

- Play and fade in voluem
    ```javascript
    var sound = soundFadeIn(scene, sound, duration);  // sound: sound instance, or a key of audio cache
    // var sound = soundFadeIn(scene, sound, duration, endVolume, startVolume);
    ```
- Fade out volume then destroy it
    ```javascript
    soundFadeOut(scene, sound, duration);  // sound: sound instance
    ```
- Fade out volume then stop it
    ```javascript
    soundFadeOut(scene, sound, duration, false);  // sound: sound instance
    ```