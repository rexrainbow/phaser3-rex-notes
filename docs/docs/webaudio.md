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

### Play sound

Sound instance will be destroyed when playback ends.

```javascript
scene.sound.play(key);
```

### Sound instance

#### Create sound instance

```javascript
var music = this.sound.add(key);
```

```javascript
var music = this.sound.add(key, config);
```

##### Configuration

```javascript
{
    mute: false,
    volume: 1,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: false,
    delay: 0
}
```

#### Play sound instance

- Start playing
    ```javascript
    music.play();
    ```
- Start playing with configuration
    ```javascript
    music.play(config);
    ```
    - [config](webaudio.md#configuration_1)
- Stop
    ```javascript
    music.stop();
    ```
- Pause
    ```javascript
    music.pause();
    ```
- Resume
    ```javascript
    music.resume();
    ```

#### Other methods

##### Mute

- Set mute
    ```javascript
    music.setMute(mute); // mute: true/false
    // music.mute = mute;
    ```
- Get mute
    ```javascript
    var mute = music.mute;
    ```

##### Volume

- Set volume
    ```javascript
    music.setVolume(volume); // volume: 0 to 1
    // music.volume = volume;
    ```
- Get volume
    ```javascript
    var volume = music.volume;
    ```

##### Detune

- Set detune
    ```javascript
    music.setDetune(detune); // detune: -1200 to 1200
    // music.detune = detune;
    ```
- Get detune
    ```javascript
    var detune = music.detune;
    ```

##### Play-rate

- Set play-rate
    ```javascript
    music.setRate(rate); // rate: 1.0(normal speed), 0.5(half speed), 2.0(double speed)
    // music.rate = rate;
    ```
- Get play-rate
    ```javascript
    var rate = music.rate;
    ```

##### Seek to

- Seek to
    ```javascript
    music.setSeek(time); // seek: playback time
    // music.seek = seek;
    ```
- Get current playback time
    ```javascript
    var time = music.seek;  // return 0 when playback ends
    ```

##### Loop

- Set loop
    ```javascript
    music.setLoop(loop); // loop: true/false
    // music.loop = loop;
    ```
- Get loop
    ```javascript
    var loop = music.loop;
    ```

#### Other properties

- Duration : duration of this sound
    ```javascript
    var duratuin = music.duration;
    ```
- Is playing
    ```javascript
    var isPlaying = music.isPlaying;
    ```
- Is paused
    ```javascript
    var isPaused = music.isPaused;
    ```

#### Events

- Start playing
    ```javascript
    music.once('play', function(music){});
    ```
- Playback end
    ```javascript
    music.once('ended', function(music){});
    ```
- Looping
    ```javascript
    music.once('looped', function(music){});
    ```
- Pause
    ```javascript
    music.once('pause', function(music){});
    ```
- Resume
    ```javascript
    music.once('resume', function(music){});
    ```
- Stop
    ```javascript
    music.once('stop', function(music){});
    ```
- Set mute
    ```javascript
    music.once('mute', function(music, mute){});
    ```
- Set volume
    ```javascript
    music.once('volume', function(music, volume){});
    ```
- Set detune
    ```javascript
    music.once('detune', function(music, detune){});
    ```
- Set play-rate
    ```javascript
    music.once('rate', function(music, rate){});
    ```
- Seek to
    ```javascript
    music.once('seek', function(music, time){});
    ```
- set loop
    ```javascript
    music.once('loop', function(music, loop){});
    ```

### Play marked sound

Sound instance will be destroyed when playback ends.

```javascript
scene.sound.play(key, marker);
```

#### Marker

```javascript
{
    name: '',
    start: 0,
    duration: music.duration,
    config: {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    }
}
```

### Markers in sound instance

#### Add marker

```javascript
music.addMarker(marker);
```

[Marker](webaudio.md#marker)

#### Play marked sound

```javascript
music.play(markerName);
```

```javascript
music.play(markerName, config);
```

[config](webaudio.md#configuration_1)

### Load audio sprite

```javascript
scene.load.audioSprite(key, urls, json, config);
```

See [loader](loader.md#audio-sprite)

### Methods in sound manager

#### Mute

- Set mute
    ```javascript
    scene.sound.setMute(mute); // mute: true/false
    // scene.sound.mute = mute;
    ```
- Get mute
    ```javascript
    var mute = scene.sound.mute;
    ```

#### Volume

- Set volume
    ```javascript
    scene.sound.setVolume(volume); // volume: 0 to 1
    // scene.sound.volume = volume;
    ```
- Get volume
    ```javascript
    var volume = scene.sound.volume;
    ```

#### Detune

- Set detune
    ```javascript
    scene.sound.setDetune(detune); // detune: -1200 to 1200
    // scene.sound.detune = detune;
    ```
- Get detune
    ```javascript
    var detune = scene.sound.detune;
    ```

#### Play-rate

- Set play-rate
    ```javascript
    scene.sound.setRate(rate); // rate: 1.0(normal speed), 0.5(half speed), 2.0(double speed)
    // scene.sound.rate = rate;
    ```
- Get play-rate
    ```javascript
    var rate = scene.sound.rate;
    ```
