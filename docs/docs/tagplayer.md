## Introduction

Text commands to control sprites, texts, sound effect or backgroun music.

- Author: Rex
- Member of scene

## Live demos

- [Sprite](https://codepen.io/rexrainbow/pen/JjLdbQr)
- [Textbox](https://codepen.io/rexrainbow/pen/zYWGjvJ)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/tagplayer)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rextagplayerplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rextagplayerplugin.min.js', true);
    ```
- Add tag-player object
    ```javascript
    var tagPlayer = scene.plugins.get('rextagplayerplugin').add(scene, config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import TagPlayerPlugin from 'phaser3-rex-plugins/plugins/tagplayer-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexTagPlayerPlugin',
                plugin: TagPlayerPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add tag-player object
    ```javascript
    var tagPlayer = scene.plugins.get('rexTagPlayerPlugin').add(scene, config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import TagPlayer from 'phaser3-rex-plugins/plugins/tagplayer.js';
    ```
- Add tag-player object
    ```javascript
    var tagPlayer = new TagPlayer(scene, config);
    ```

### Create instance

```javascript
var tagPlayer = scene.plugins.get('rexTagPlayerPlugin').add(scene, {
    parser: {
        delimiters: '[]',
        comment: '//'
    }

    sprites: {
        // createCallback: 'sprite',
        fade: 500
    }, 

    texts: {
        // createCallback: undefined,        
        fade: 500
    }
    
    sounds: {
        bgm: {
            initial: undefinied,
            loop: true,
            fade: 500
        }
    },

    clickTarget: scene,
});
```

- `parser` : Configuration of parser.
    - `parser.delimiters` : Delimiters of tag. Default value is `'[]'`.
    - `parser.comment` : Start word of a comment line. Default value is `'//'`.
        - `null`, or `false` : No comment line.
- `sprites` : Configuration of sprites.
    - `sprites.createCallback` : 
        - `'sprite'` : Create sprite game object. Default behavior.
        - `'image'` : Create image game object.
        - Callback to return a game object            
            ```javascript
            function(scene, a, b, c) {
                // return gameObject;
            }
            ```
            - `a`, `b`, `c` : Parameters pass from `[sprite.name=a,b,c]` 
    - `sprites.fade` :
        - `0` : No fade-in or fade-out when adding or removing a sprite.
        - A number : Tint-fade-in or Tint-fade-out when adding or removing a sprite. Default value is `500`.
- `texts` : Configuration of texts.
    - `texts.createCallback` : 
        - `undefined`, or `'text'` : Create text game object. Default behavior.
        - Callback to return a game object            
            ```javascript
            function(scene, a, b, c) {
                // return gameObject;
            }
            ```
            - `a`, `b`, `c` : Parameters pass from `[text.name=a,b,c]` 
    - `texts.fade` :
        - `0` : No fade-in or fade-out when adding or removing a sprite.
        - A number : Tint-fade-in or Tint-fade-out when adding or removing a sprite. Default value is `500`.
- `sounds` : Configuration of sound effect, or background music.
    - `sounds.bgm.initial` : Initial music instance created by `scene.sound.add(key)` before starting playing content.
        - `undefined` : No initial music instance, default value.
    - `sounds.bgm.loop` :
        - `true` : Loop background music, default behavior.
        - `false` : Play background music once.
    - `sounds.bgm.fade` :
        - `0` : No fade-in or fade-out when starting or stopping a background music.
        - A number : Fade-in or fade-out (cross-fade) when starting or stopping a background music. Default value is `500`.
- `clickTarget` : Click target.
    - `scene` : Any pointer down on this scene. Default target.

### Custom class

- Define class
    ```javascript
    class MyTagPlayer extends TagPlayer {
        constructor(scene, config) {
            super(scene, config);
            // ...
        }
        // ...
    }
    ```    
- Create instance
    ```javascript
    var tagPlayer = new MyTagPlayer(scene, config);
    ```

### Execute commands

```javascript
tagPlayer.play(commands);
```

or

```javascript
tagPlayer.playPromise(commands)
    .then(function(){
        // Typing content complete
    })
```

#### Time scale

Time scale of typing, typing animation, sprite animation and easing of sprite's properties.

- Get
    ```javascript
    var timeScale = tagPlayer.timeScale;
    ```
- Set
    ```javascript
    tagPlayer.setTimeScale(timeScale);    
    ```
    ```javascript
    tagPlayer.timeScale = timeScale;
    ```

#### Events

- On typing content complete
    ```javascript
    tagPlayer.on('complete', function() {

    })
    ```

### Tags of content

#### Text

- Add text : `[text.name]`
    - Tint-fade-in if `text.fade` is not `0`
- Remove text : `[/text.name]`
    - Tint-fade-out if `text.fade` is not `0`
- Remove all texts : `[/text]`
    - Tint-fade-out if `text.fade` is not `0`
- Call method : `[text.name.methodName=value0,value1,value2]`
- Set property : `[text.name.x=value]`, `[text.name.alpha=value]`, ....
- Ease property : 
    ```
    [text.name.x.to=value,duration]
    ```
    ```
    [text.name.x.to=value,duration,repeat]
    ```
    ```
    [text.name.x.to=value,duration,easeFunction,repeat]
    ```
    ```
    [text.name.x.to=value]
    ```
    - `duration` : Default value is `1000`
    - `easeFunction` : Default value is `'Linear'`
    - `repeat` : Default value is `0`
- Yoyo ease property : 
    ```
    [text.name.x.yoyo=value,duration]
    ```
    ```
    [text.name.x.yoyo=value,duration,repeat]
    ```
    ```
    [text.name.x.yoyo=value,duration,easeFunction,repeat]
    ```
    ```
    [text.name.x.yoyo=value]
    ```
- Set text
    ```
    [text.name.text]
    content\\n
    newline\\n
    newline
    ```
- Typing text
    ```
    [text.name.typing]
    // [text.name.typing=speed]
    content\\n
    newline\\n
    newline
    ```

#### Sprite

- Add sprite : `[sprite.name=textureKey,frameKey]`
    - Tint-fade-in if `sprite.fade` is not `0`
- Remove sprite : `[/sprite.name]`
    - Tint-fade-out if `sprite.fade` is not `0`
- Remove all sprites : `[/sprite]`
    - Tint-fade-out if `sprite.fade` is not `0`
- Call method : `[sprite.name.methodName=value0,value1,value2]`
- Set property : `[sprite.name.x=value]`, `[sprite.name.alpha=value]`, ....
- Ease property : 
    ```
    [sprite.name.x.to=value,duration]
    ```
    ```
    [sprite.name.x.to=value,duration,repeat]
    ```
    ```
    [sprite.name.x.to=value,duration,easeFunction,repeat]
    ```
    ```
    [sprite.name.x.to=value]
    ```
    - `duration` : Default value is `1000`
    - `easeFunction` : Default value is `'Linear'`
    - `repeat` : Default value is `0`
- Yoyo ease property : 
    ```
    [sprite.name.x.yoyo=value,duration]
    ```
    ```
    [sprite.name.x.yoyo=value,duration,repeat]
    ```
    ```
    [sprite.name.x.yoyo=value,duration,easeFunction,repeat]
    ```
    ```
    [sprite.name.x.yoyo=value]
    ```
- Set texture : `[sprite.name.texture=textureKey,frameKey]`
- Play animation : `[sprite.name.play=animationKey]`, or `[sprite.name.play=animationKey0,animationKey1,...]`
    - Can play animation without adding sprite first.
- Stop animation : `[/sprite.name.play]`, or `[sprite.name.stop]`
- Pause animation : `[sprite.name.pause]`

#### Sound effect

- Play : `[se=key]`
    - Sound effect will be destroyed when complete
- Play with fade in volume : `[se=key,1000]`
- Fade in volume : `[se.fadein=1000]`
- Fade out volume : `[se.fadeout=1000]`
- Fade out volume then stop : `[se.fadeout=1000,stop]`
- Set volume : `[se.volume=1]`

#### Background music

- Play, stop : `[bgm=key]`, `[/bgm]`
    - Previous background music will be stopped and destroyed.
    - Cross fade to next background music if `sounds.bgm.fade` is not `0`
- Play with fade in volume : `[bgm=key,1000]`
- Pause, resume : `[bgm.pause]`, `[/bgm.pause]`
- Fade in volume : `[bgm.fadein=1000]`
- Fade out volume : `[bgm.fadeout=1000]`
- Fade out volume then stop : `[bgm.fadeout=1000,stop]`
- Cross fade to another background music : `[bgm.cross=key,10000]`
- Set volume : `[bgm.volume=1]`

#### Camera

- Fade-in effect : `[camera.fadein]`, `[camera.fadein=1000]`, or `[camera.fadein=duration,red,green,blue]`
- Fade-out effect : `[camera.fadeout]`, `[camera.fadeout=1000]`, or `[camera.fadeout=duration,red,green,blue]`
- Flash effect : `[camera.flash]`, `[camera.flash=1000]`, or `[camera.flash=duration,red,green,blue]`
- Shake effect : `[camera.shake]`, `[camera.shake=1000]`, or `[camera.shake=duration,intensity]`
- Zoom
    - Set zoom : `[camera.zoom=2]`
    - Zoom to : `[camera.zoom.to=1,1000]`, or `[camera.zoom.to=zoomValue,duration,Cubic]`
- Rotate
    - Set angle : `[camera.rotate=90]`, angle in degrees
    - Rotate to : `[camera.rotate.to=0,1000]`, or `[camera.rotate.to=deg,duration,Cubic]`, angle in degrees
- Scroll
    - Scroll x,y : `[camera.scroll=0,200]`
    - Scroll x,y to : `[camera.scroll.to=0,200,1000]`, or `[camera.rotate.to=x,y,duration,Cubic]`

#### Wait conditions

- Wait click : `[wait=click]`, `[click]`
    - Also fire event `'wait.click'`
       ```javascript
        tagPlayer.on('wait.click', function() {
        })
       ```
- Wait key-down : `[wait=enter]`, `[wait=space]`, ....
    - Also fire event `'wait.keydown'`
       ```javascript
        tagPlayer.on('wait.keydown', function(keyName) {
        })
       ```
- Wait time : `[wait=1000]`
    - Also fire event `'wait.time'`
       ```javascript
        tagPlayer.on('wait.time', function(time) {
        })
       ```
- Wait sound effect : `[wait=se]`
    - Also fire event `'wait.music'`
       ```javascript
        tagPlayer.on('wait.music', function(music) {
            // var key = music.key;
        })
       ```
- Wait background music : `[wait=bgm]`
    - Also fire event `'wait.music'`
       ```javascript
        tagPlayer.on('wait.music', function(music) {
            // var key = music.key;
        })
       ```
- Wait camera effect : `[wait=camera.fadein]`, `[wait=camera.fadeout]`, `[wait=camera.flash]`, `[wait=camera.shake]`, `[wait=camera.zoom]`, `[wait=camera.rotate]`, `[wait=camera.scroll]`
    - Also fire event `'wait.camera'`
       ```javascript
        tagPlayer.on('wait.camera', function(effectName) {
            // effectName : 'camera.fadein', 'camera.fadeout', 'camera.flash', 'camera.shake', 'camera.zoom', 'camera.rotate', 'camera.scroll'
        })
       ```
- Wait ease task of sprite's property : `[wait=sprite.name.prop]`
    - Also fire event `'wait.sprite'`
       ```javascript
        tagPlayer.on('wait.sprite', function(name, prop) {
        })
       ```
- Wait all sprites are destroyed : `[wait=sprite]`
    - Also fire event `'wait.sprite'`
       ```javascript
        tagPlayer.on('wait.sprite', function(name, prop) {
            // name and prop parameter are `undefined` here
        })
       ```       
- Wait callback : `[wait]`, or `[wait=xxx]` (`xxx` is any string which not been used in above case)
    - Fire event `'wait'`
        ```javascript
        tagPlayer.on('wait', function(callback) {
            // Invoke `callback()` to continue typing
        })
        ```
    - Fire event `'wait.xxx'`
        ```javascript
        tagPlayer.on('wait.xxx', function(callback) {
            // Invoke `callback()` to continue typing
        })
        ```    
- Combine conditions : `[wait=cond0|cond1|...]`
    - Wait click, or enter key down : `[wait=click|enter]`
    - Wait click, enter key down, or 100ms : `[wait=click|enter|1000]`

#### Custom tag

Assume that adding a custom tag : `[custom=10,20][/custom]`

- On parse a `+custom` tag, will add a custom command child 
    ```javascript
    tagPlayer.on('parser.+custom', function(parser, a, b, params) {
        // console.log('Parse +custom tag:', a, b)
    })
    ```
    - `a`, `b`, ... : Parameters after `=`
    - `params` : Arguments array used when executing `+custom`. Equal to `[a, b]` in this case.
    - Disable content after this start tag
        ```javascript
        parser.setContentOutputEnable(false);
        ```
- On execute a `+custom` command child
    ```javascript
    tagPlayer.on('tag.+custom', function(a, b) {
        // console.log('Execute +custom tag:', a, b)
    })
    ```
    - `a`, `b`, ... : Parameters passed from `params` in `'parser.+custom'` event.
- On parse a `-custom` tag, will add a custom command child 
    ```javascript
    tagPlayer.on('parser.-custom', function(parser, params) {
        // console.log('Parse -custom tag')
    })
    ```
    - `params` : Arguments array used when executing `-custom`. Equal to `[]` in this case.
    - Enable content after this start tag
        ```javascript
        parser.setContentOutputEnable(true);
        ```
- On execute a `-custom` command child
    ```javascript
    tagPlayer.on('tag.-custom', function(...params) {
        // console.log('Execute -custom tag')
    })
    ```
    - `params` : Parameters passed from `params` in `'parser.-custom'` event.
