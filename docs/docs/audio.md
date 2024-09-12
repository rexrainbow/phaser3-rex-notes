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
// scene.load.audio(key, urls, {instances: 1}, xhrSettings);
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

#### Decoded events

- Finished decoding an audio data
    ```javascript
    scene.sound.on('decoded', key);
    ```
- Finished decoding all audio data
    ```javascript
    scene.sound.on('decodedall');
    ```

### Unlock audio

Unlocks Web Audio API/HTML5 Audio loading on the initial input event.

```javascript
scene.sound.unlock();
```

### Play sound

Sound instance will be destroyed when playback ends.

```javascript
scene.sound.play(key);
```

or

```javascript
scene.sound.play(key, config);
/*
var sound = scene.sound.add(key);
sound.play(config);
*/
```

### Position of the Spatial Audio listener

```javascript
scene.sound.setListenerPosition(x, y)
```

- `x`, `y` : The x/y position of the Spatial Audio listener. Default value is center of the game canvas.

!!! note
    Web audio only

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
    delay: 0,

    // source of the spatial sound
    source: {
        x: 0,
        y: 0,
        z: 0,
        panningModel: 'equalpower',
        distanceModel: 'inverse',
        orientationX: 0,
        orientationY: 0,
        orientationZ: -1,
        refDistance: 1,
        maxDistance: 10000,
        rolloffFactor: 1,
        coneInnerAngle: 360,
        coneOuterAngle: 0,
        coneOuterGain: 0,
        follow: undefined
    }
}
```

- `source` : Source of the spatial sound
    - `x`, `y` : The horizontal/vertical position of the audio in a right-hand Cartesian coordinate system.
    - `z` : Represents the longitudinal (back and forth) position of the audio in a right-hand Cartesian coordinate system.
    - `panningModel` : An enumerated value determining which spatialization algorithm to use to position the audio in 3D space.
        - `'equalpower'`
        - `'HRTF'`
    - `orientationX`, `orientationY` : The horizontal/vertical position of the audio source's vector in a right-hand Cartesian coordinate system.
    - `orientationZ` : Represents the longitudinal (back and forth) position of the audio source's vector in a right-hand Cartesian coordinate system.
    - `refDistance` : A double value representing the reference distance for reducing volume as the audio source moves further from the listener. For distances greater than this the volume will be reduced based on `rolloffFactor` and `distanceModel`.
    - `maxDistance` : The maximum distance between the audio source and the listener, after which the volume is not reduced any further.
    - `rolloffFactor` : A double value describing how quickly the volume is reduced as the source moves away from the listener. This value is used by all distance models.
    - `coneInnerAngle` : The angle, in degrees, of a cone inside of which there will be no volume reduction.
    - `coneOuterAngle` : The angle, in degrees, of a cone outside of which the volume will be reduced by a constant value, defined by the `coneOuterGain` property.
    - `coneOuterGain` : The amount of volume reduction outside the cone defined by the `coneOuterAngle` attribute. Its default value is `0`, meaning that no sound can be heard. A value between `0` and `1`.
    - `follow` : Set this Sound object to automatically track the x/y position of this object. Can be a Phaser Game Object, Vec2 or anything that exposes public x/y properties.

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
    var duration = music.duration;
    ```
- Is playing
    ```javascript
    var isPlaying = music.isPlaying;
    ```
- Is paused
    ```javascript
    var isPaused = music.isPaused;
    ```
- Asset key
    ```javascript
    var key = music.key;
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

#### Mute

- Set
    ```javascript
    scene.sound.setMute(mute); // mute: true/false
    // scene.sound.mute = mute;
    ```
- Get
    ```javascript
    var mute = scene.sound.mute;
    ```

#### Volume

- Set
    ```javascript
    scene.sound.setVolume(volume); // volume: 0 to 1
    // scene.sound.volume = volume;
    ```
- Get
    ```javascript
    var volume = scene.sound.volume;
    ```

#### Detune

- Set
    ```javascript
    scene.sound.setDetune(detune); // detune: -1200 to 1200
    // scene.sound.detune = detune;
    ```
- Get
    ```javascript
    var detune = scene.sound.detune;
    ```

#### Play-rate

- Set
    ```javascript
    scene.sound.setRate(rate); // rate: 1.0(normal speed), 0.5(half speed), 2.0(double speed)
    // scene.sound.rate = rate;
    ```
- Get
    ```javascript
    var rate = scene.sound.rate;
    ```

#### Get music instance

- Get first by key
    ```javascript
    var music = scene.sound.get(key); // music instance, or null
    ```
- Get all by key
    ```javascript
    var musicArray = scene.sound.getAll(key); // music instance, or null
    ```
- Get all
    ```javascript
    var musicArray = scene.sound.getAll();
    ```
- Get all playing
    ```javascript
    var musicArray = scene.sound.getAllPlaying();
    ```

#### Is playing

- Is any sound playing
    ```javascript
    var isPlaying = scene.sound.isPlaying();
    ```
- Is any sound playing by key
    ```javascript
    var isPlaying = scene.sound.isPlaying(key);
    ```

#### Remove music instance

- Remove by key
    ```javascript
    var removed = scene.sound.removeByKey(key);
    ```
    - `removed` : The number of matching sound objects that were removed.
- Remove all
    ```javascript
    scene.sound.removeAll();
    ```

#### Stop music instance

- Stop by key
    ```javascript
    var stopped = scene.sound.stopByKey(key);
    ```
    - `stopped` : How many sounds were stopped.
- Stop all
    ```javascript
    scene.sound.stopAll();
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
