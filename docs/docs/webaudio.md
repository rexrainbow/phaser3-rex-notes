## Introduction

Play sounds, built-in object of phaser.

- Author: Richard Davey

## Usage

### Configuration

Web audio is the default audio context.

### Load audio file

```javascript
scene.load.audio(key, urls);  // urls: an array of file url
```

See [loader](loader.md#audio)

### Play audio

```javascript
var music = this.sound.add('key');
music.play();
```

### Load audio sprite

```javascript
scene.load.audioSprite(key, urls, json, config);
```

See [loader](loader.md#audio-sprite)
