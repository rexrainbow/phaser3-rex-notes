## Introduction

Fade-in/fade-out volume of sound.

- Author: Rex
- Method only

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/soundfade-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexsoundfadeplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/sound-fade)

### Import functions

```javascript
import rexSoundFade from './plugins/soundfade.js';
var soundFadeIn = rexSoundFade.fadeIn;
var soundFadeOut = rexSoundFade.fadeOut;
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import SoundFadePlugin from './plugins/soundfade-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexSoundFade',
            plugin: SoundFadePlugin,
            start: true
        }
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

Get functions

```javascript
var soundFadeIn = scene.get('rexSoundFade').fadeIn;
var soundFadeOut = scene.get('rexSoundFade').fadeOut;
```

### Fade in

- Play and fade in voluem.
    ```javascript
    var sound = soundFadeIn(scene, sound, duration);  // sound: sound instance, or a key of audio cache
    // var sound = soundFadeIn(scene, sound, duration, endVolume, startVolume);
    ```

### Fade out

- Fade out volume then destroy it
    ```javascript
    soundFadeOut(scene, sound, duration);  // sound: sound instance
    ```
- Fade out volume then stop it
    ```javascript
    soundFadeOut(scene, sound, duration, false);  // sound: sound instance
    ```