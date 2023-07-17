## Introduction

Attach properties to a game object or camera, to enable/disable/control [builtin preFX or postFX effects](shader-builtin.md).

- Author: Rex
- Method only
- Pre-fx, and Post-fx shader effects

!!! warning "WebGL only"
    Only work in WebGL render mode.

## Live demos

- [Color effects](https://codepen.io/rexrainbow/pen/JjeLYQb)
- [Reveal](https://codepen.io/rexrainbow/pen/MWzVKEK)
- [Interactive](https://codepen.io/rexrainbow/pen/LYXdxYP)
- [Camera](https://codepen.io/rexrainbow/pen/zYMWENW)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/examples/effect-properties)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexeffectpropertiesplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexeffectpropertiesplugin.min.js', true);
    ```
- Attach properties to a game object/camera.
    ```javascript
    scene.plugins.get('rexeffectpropertiesplugin').add(gameObject);
    ```
    ```javascript
    scene.plugins.get('rexeffectpropertiesplugin').add(camera);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import EffectPropertiesPlugin from 'phaser3-rex-plugins/plugins/effectproperties-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexEffectProperties',
                plugin: EffectPropertiesPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Attach properties to a game object/camera.
    ```javascript
    scene.plugins.get('rexEffectProperties').add(gameObject);
    ```
    ```javascript
    scene.plugins.get('rexEffectProperties').add(camera);
    ```

#### Import method

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import method
    ```javascript
    import AddEffectPropertiesProperties from 'phaser3-rex-plugins/plugins/effectproperties.js';
    ```
- Attach properties to a game object/camera.
    ```javascript
    AddEffectPropertiesProperties(gameObject);
    ```
    ```javascript
    AddEffectPropertiesProperties(camera);
    ```

### Attach properties

Supported effects are `barrel`, `blackWhite`, `bloom`, `blur`, `bokeh`, `brightness`, `brown`,
`circle`, `contrast`,  `desaturate`, `desaturateLuminance`, `displacement`, 
`glow`, `gradient`, `grayscale`, `hue`, `kodachrome`, `lsd`, `negative`, `pixelate`, `polaroid`, 
`reveal`, `saturate`, `sepia`, `shadow`, `shiftToBGR`, `shine`, `technicolor`, `tiltShift`, 
`vignette`, `vintagePinhole`, `wipe`.

- Attatch properties of all effects to a game object/camera.
    ```javascript
    scene.plugins.get('rexEffectProperties').add(gameObject);
    ```
    ```javascript
    scene.plugins.get('rexEffectProperties').add(camera);
    ```
- Attatch properties of some preFX/postFX effects to a game object/camera.
    ```javascript
    scene.plugins.get('rexEffectProperties').add(gameObject, {
        barrel: true,
        blackWhite: true,
        bloom: true,
        blur: true,
        bokeh: true,
        brightness: true,
        brown: true,
        circle: true,
        contrast: true,
        desaturate: true,
        desaturateLuminance: true,
        displacement: true,
        glow: true,
        gradient: true,
        grayscale: true,
        hue: true,
        kodachrome: true,
        lsd: true,
        negative: true,
        pixelate: true,
        polaroid: true,
        reveal: true,
        saturate: true,
        sepia: true,
        shadow: true,
        shiftToBGR: true,
        shine: true,
        technicolor: true,
        tiltShift: true,
        vignette: true,
        vintagePinhole: true,
        wipe: true,
    });
    ```
    or
    ```javascript
    scene.plugins.get('rexEffectProperties').add(gameObject, [
        'barrel', 'blackWhite', 'bloom', 'blur', 'bokeh', 'brightness', 'brown',
        'circle', 'contrast',
        'desaturate', 'desaturateLuminance', 'displacement',
        'glow', 'gradient', 'grayscale',
        'hue',
        'kodachrome',
        'lsd',
        'negative',
        'pixelate', 'polaroid',
        'reveal',
        'saturate', 'sepia', 'shadow', 'shiftToBGR', 'shine',
        'technicolor', 'tiltShift',
        'vignette', 'vintagePinhole',
        'wipe'
    ]);
    ```
    or
    ```javascript
    scene.plugins.get('rexEffectProperties').add(gameObject, effectName);
    ```    
    - A plain object with effect names.
    - A list of effect name string.
    - A effect name string.

### Effect properties

Will try to create preFX effect if gameObject has preFX, otherwise, try to create postFX effect.

#### [Barrel](shader-builtin.md#barrel)

- `barrel` : 
    - A number : Enable this effect and set intensity of barrel (1: origin).
    - `null` : Remove this effect

#### [BlackWhite](shader-builtin.md#colormatrix)

- `blackWhite` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [Bloom](shader-builtin.md#bloom)

- `bloomColor` : 
    - A number : Enable this effect and set color of bloom (0xffffff).
    - `null` : Remove this effect
- `bloomOffsetX`, `bloomOffsetY`, `bloomBlurStrength`, `bloomStrength`, `bloomSteps` : 
    - A number

#### [Blur](shader-builtin.md#blur)

- `blurColor` : 
    - A number : Enable this effect and set color of blur (0xffffff).
    - `null` : Remove this effect
- `blurQuality`, `blurX`, `blurY`, `blurStrength`, `blurSteps` : 
    - A number

#### [Bokeh](shader-builtin.md#bokeh)

- `bokehRadius` : 
    - A number : Enable this effect and set radius of bokeh (0~1).
    - `null` : Remove this effect
- `bokehAmount`, `bokehContrast` : 
    - A number

#### [Brightness](shader-builtin.md#colormatrix)

- `brightness` : 
    - A number : Enable this effect and set brightness (0~1).
    - `null` : Remove this effect

#### [Brown](shader-builtin.md#colormatrix)

- `brown` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [Circle](shader-builtin.md#circle-outline)

- `circleColor` : 
    - A number : Enable this effect and set color of circle (0xffffff).
    - `null` : Remove this effect
- `circleThickness`, `circleBackgroundColor`, `circleBackgroundAlpha`, `circleScale`, `circleFeather` : 
    - A number

#### [Contrast](shader-builtin.md#colormatrix)

- `contrast` : 
    - A number : Enable this effect and set contrast (0~1).
    - `null` : Remove this effect

#### [Desaturate](shader-builtin.md#colormatrix)

- `desaturate` : 
    - A number : Enable this effect and set desaturate (0~1).
    - `null` : Remove this effect

#### [DesaturateLuminance](shader-builtin.md#colormatrix)

- `desaturateLuminance` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [Displacement](shader-builtin.md#displacement)

- `displacementKey` : 
    - A string : Enable this effect and set displacement reference texture.
    - `null` : Remove this effect
- `displacementX`, `displacementY` : 
    - A number

#### [Glow](shader-builtin.md#glow)

- `glowColor` : 
    - A number : Enable this effect and set color of glow (0xffffff).
    - `null` : Remove this effect
- `glowOuterStrength`, `glowInnerStrength` : 
    - A number

#### [Gradient](shader-builtin.md#gradient)

- `gradientColor` : 
    - `[number, number]` : Enable this effect and set gradient color1 and gradient color2 (0xffffff).
    - `null` : Remove this effect
- `gradientAlpha`, `gradientFromX`, `gradientFromY`, `gradientToX`, `gradientToY`, `gradientSize` : 
    - A number

#### [Grayscale](shader-builtin.md#colormatrix)

- `grayscale` : 
    - A number : Enable this effect and set intensity of grayscale (0~1).
    - `null` : Remove this effect

#### [Hue](shader-builtin.md#colormatrix)

- `hue` : 
    - A number : Enable this effect and set hue rotation, in degrees.
    - `null` : Remove this effect

#### [Kodachrome](shader-builtin.md#colormatrix)

- `kodachrome` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [Lsd](shader-builtin.md#colormatrix)

- `lsd` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [Negative](shader-builtin.md#colormatrix)

- `negative` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [Pixelate](shader-builtin.md#pixelate)

- `pixelate` : 
    - A number : Enable this effect and set size of pixelate, in pixels.
    - `null` : Remove this effect

#### [Polaroid](shader-builtin.md#colormatrix)

- `polaroid` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [Reveal](shader-builtin.md#reveal)

- `revealLeft`, `revealRight`, `revealUp`, or `revealDown` :
    - A number : Enable this effect with specific reveal direction and set progress (0~1).
    - `null` : Remove this effect
- `revealWidth` :
    - A number

#### [Saturate](shader-builtin.md#colormatrix)

- `saturate` : 
    - A number : Enable this effect and set saturate (0~1).
    - `null` : Remove this effect

#### [Sepia](shader-builtin.md#colormatrix)

- `sepia` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [Shadow](shader-builtin.md#shadow)

- `shadowColor` : 
    - A number : Enable this effect and set color of shadow (0xffffff).
    - `null` : Remove this effect
- `shadowX`, `shadowY`, `shadowDecay`, `shadowPower`, `shadowSamples`, `shadowIntensity` : 
    - A number

#### [ShiftToBGR](shader-builtin.md#colormatrix)

- `shiftToBGR` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [Shine](shader-builtin.md#shine)

- `shineSpeed` : 
    - A number : Enable this effect and set speed of shine, in seconds.
    - `null` : Remove this effect
- `shineLineWidth`, `shineGradient` : 
    - A number

#### [Technicolor](shader-builtin.md#colormatrix)

- `technicolor` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [TiltShift](shader-builtin.md#tilt-shift)

- `tiltShiftRadius` : 
    - A number : Enable this effect and set radius of tiltShift (0~1).
    - `null` : Remove this effect
- `tiltShiftAmount`, `tiltShiftContrast`, `tiltShiftBlurX`, `tiltShiftBlurY`, `tiltShiftStrength` : 
    - A number

#### [Vignette](shader-builtin.md#vignette)

- `vignetteRadius` : 
    - A number : Enable this effect and set radius of vignette (0~1).
    - `null` : Remove this effect
- `vignetteX`, `vignetteY`, `vignetteStrength` : 
    - A number

#### [VintagePinhole](shader-builtin.md#colormatrix)

- `vintagePinhole` : 
    - `true`, or `1` : Enable this effect.
    - `null` : Remove this effect

#### [Wipe](shader-builtin.md#wipe)

- `wipeLeft`, `wipeRight`, `wipeUp`, or `wipeDown` :
    - A number : Enable this effect with specific wipe direction and set progress (0~1).
    - `null` : Remove this effect
- `wipeWidth` :
    - A number

### Clear all effects

```javascript
gameObject.clearAllEffects();
```