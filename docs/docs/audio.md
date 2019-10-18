## Introduction

Play sounds, built-in object of phaser.

- Author: Richard Davey

## Usage

### Configuration

#### Web audio

Web audio is the default audio context.

#### Html5 audio

```javascript
var config = {
    // ....
    audio: {
        disableWebAudio: true
    }
    // ....
};
var game = new Phaser.Game(config);
```

#### No audio

```javascript
var config = {
    // ....
    audio: {
        noAudio: true
    }
    // ....
};
var game = new Phaser.Game(config);
```

### Load audio file

```javascript
scene.load.audio(key, urls);  // urls: an array of file url
```

See [loader](loader.md#audio)

#### Decode audio

```javascript
scene.sound.decodeAudio(key, audioData);
```

- `audioData` : Audio data
    - A base64 encoded string
    - An audio media-type data uri
    - An ArrayBuffer instance


Or

```javascript
scene.sound.decodeAudio(audioFiles);
```

- `audioFiles` : An array of `{key, data}`
    - `data` : Audio data
        - A base64 encoded string
        - An audio media-type data uri
        - An ArrayBuffer instance

##### Decoded events

- Finished decoding an audio data
    ```javascript
    scene.sound.on('decoded', key);
    ```
- Finished decoding all audio data
    ```javascript
    scene.sound.on('decodedall');
    ```

### Play sound

Sound instance will be destroyed when playback ends.

```javascript
scene.sound.play(key);
```

### Sound instance

#### Create sound instance

```javascript
var music = scene.sound.add(key);
```

```javascript
var music = scene.sound.add(key, config);
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
    - [config](audio.md#configuration_1)
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

#### Methods

##### Mute

- Set
    ```javascript
    music.setMute(mute); // mute: true/false
    // music.mute = mute;
    ```
- Get
    ```javascript
    var mute = music.mute;
    ```

##### Volume

- Set
    ```javascript
    music.setVolume(volume); // volume: 0 to 1
    // music.volume = volume;
    ```
- Get
    ```javascript
    var volume = music.volume;
    ```

##### Detune

- Set
    ```javascript
    music.setDetune(detune); // detune: -1200 to 1200
    // music.detune = detune;
    ```
- Get
    ```javascript
    var detune = music.detune;
    ```

##### Play-rate

- Set
    ```javascript
    music.setRate(rate); // rate: 1.0(normal speed), 0.5(half speed), 2.0(double speed)
    // music.rate = rate;
    ```
- Get
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

- Set
    ```javascript
    music.setLoop(loop); // loop: true/false
    // music.loop = loop;
    ```
- Get
    ```javascript
    var loop = music.loop;
    ```

#### Properties

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
    music.once('complete', function(music){});
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

[Marker](audio.md#marker)

#### Play marked sound

```javascript
music.play(markerName);
```

```javascript
music.play(markerName, config);
```

[config](audio.md#configuration_1)

### Audio sprite

#### Load audio sprite

```javascript
scene.load.audioSprite(key, urls, markersConfig, config);
```

See [loader](loader.md#audio-sprite)

Format of markersConfig
```javascript
{
    resources: urls, // an array of audio files
    spritemap: {
        markerName0: {
            start: 0,
            end: 0
        },
        markerName1: {
            start: 0,
            end: 0
        }
        // ...
    }
}
```

#### Play sound

Create a sound instance then play the marked section, this sound instance will be destroyed when playback ends.

```javascript
scene.sound.playAudioSprite(key, markerName, config);
```

[config](audio.md#configuration_1)

#### Sound instance

Create a sound instance with markers.

```javascript
var music = scene.sound.addAudioSprite(key, config);
```

[config](audio.md#configuration_1)

#### Play sound instance

```javascript
music.play(markerName);
```

```javascript
music.play(markerName, config);
```

[config](audio.md#configuration_1)

### Sound manager

#### Methods

##### Mute

- Set
    ```javascript
    scene.sound.setMute(mute); // mute: true/false
    // scene.sound.mute = mute;
    ```
- Get
    ```javascript
    var mute = scene.sound.mute;
    ```

##### Volume

- Set
    ```javascript
    scene.sound.setVolume(volume); // volume: 0 to 1
    // scene.sound.volume = volume;
    ```
- Get
    ```javascript
    var volume = scene.sound.volume;
    ```

##### Detune

- Set
    ```javascript
    scene.sound.setDetune(detune); // detune: -1200 to 1200
    // scene.sound.detune = detune;
    ```
- Get
    ```javascript
    var detune = scene.sound.detune;
    ```

##### Play-rate

- Set
    ```javascript
    scene.sound.setRate(rate); // rate: 1.0(normal speed), 0.5(half speed), 2.0(double speed)
    // scene.sound.rate = rate;
    ```
- Get
    ```javascript
    var rate = scene.sound.rate;
    ```

### Analyser

[Analyser node](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API) is only available in **Web audio mode**.

1. Create analyser node
    ```javascript
    var analyser = scene.sound.context.createAnalyser();
    ```
1. Configure analyser node
    ```javascript
    analyser.smoothingTimeConstant = 1;
    analyser.fftSize = 8192;
    analyser.minDecibels = -90;
    analyser.maxDecibels = -10;
    ```
    - `smoothingTimeConstant` : Averaging constant with the last analysis frame.
        - `0`(no time averaging) ~ `1`. Default value is `0.8`.
    - `fftSize` : Window size. 
        - `32`, `64`, `128`, `256`, `512`, `1024`, `2048`, `4096`, `8192`, `16384`, and `32768`. Defaults to `2048`.
    - `minDecibels` : Minimum *decibel* value for scaling the FFT analysis data.
        - `0` dB is the loudest possible sound, `-10` dB is a 10th of that, etc. The default value is `-100` dB
    - `maxDecibels` : Maximum *decibel* value for scaling the FFT analysis data.
        - The default value is `-30` dB.
1. Set source of analyser node
    - Global volume nodee -> analyser node
        ```javascript
        scene.sound.masterVolumeNode.connect(analyser);
        ```
    - A sound instance -> analyser node
        ```javascript
        music.volumeNode.connect(analyser);
        ```
1. Ouput analyser node to audio context
    ```javascript
    analyser.connect(scene.sound.context.destination);
    ```
1. Create output data array
    ```javascript
    var dataArrayLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(dataArrayLength);
    ```
1. Get output data
    ```javascript
    analyser.getByteTimeDomainData(dataArray);
    ```
    - Retrieve output data
        ```javascript
        for(var i= 0; i < dataArrayLength; i++) {
            var data = dataArray[i];
        }
        ```
