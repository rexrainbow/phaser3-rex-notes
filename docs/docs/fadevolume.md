## Introduction

Fade-in/fade-out volume of sound.

- Author: Rex
- Method only

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/sound-fade)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexsoundfadeplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsoundfadeplugin.min.js', true);
    ```
- Sound fade-in/fade-out
    ```javascript
    var sound = scene.plugins.get('rexsoundfadeplugin').fadeIn(scene, sound, duration);
    var sound = scene.plugins.get('rexsoundfadeplugin').fadeOut(scene, sound, duration);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import SoundFadePlugin from 'phaser3-rex-plugins/plugins/soundfade-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexSoundFade',
                plugin: SoundFadePlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Sound fade-in/fade-out
    ```javascript
    var sound = scene.plugins.get('rexSoundFade').fadeIn(scene, sound, duration);
    var sound = scene.plugins.get('rexSoundFade').fadeOut(scene, sound, duration);
    ```

#### Import method

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import method
    ```javascript
    import SoundFade from 'phaser3-rex-plugins/plugins/soundfade.js';
    ```
- Sound fade-in/fade-out
    ```javascript
    var sound = SoundFade.fadeIn(scene, sound, duration);
    var sound = SoundFade.fadeOut(scene, sound, duration);
    ```

### Fade in

- Play and fade in voluem.
    ```javascript
    var sound = scene.plugins.get('rexSoundFade').fadeIn(scene, sound, duration);
    // var sound = scene.plugins.get('rexSoundFade').fadeIn(scene, sound, duration, endVolume, startVolume);
    ```
    - `sound` : Sound instance, or a key of audio cache.

### Fade out

- Fade out volume then destroy it
    ```javascript
    scene.plugins.get('rexSoundFade').fadeOut(scene, sound, duration);
    ```
    - `sound` : Sound instance.
- Fade out volume then stop it
    ```javascript
    scene.plugins.get('rexSoundFade').fadeOut(scene, sound, duration, false);
    ```
    - `sound` : Sound instance.