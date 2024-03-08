## Introduction

Event sheets contains main condition(s) and actions, in simple markdown format (headings, code block).

- Author: Rex
- Member of scene

## Live demos

- [Command executor](https://codepen.io/rexrainbow/pen/eYPLVmM)

## Usage

- [Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/markedeventheets)
- [Event sheets](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/assets/markedeventsheet)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexmarkedeventsheetsplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexmarkedeventsheetsplugin.min.js', true);
    ```
- Add event-sheet-manager object
    ```javascript
    var eventSheetManager = scene.plugins.get('rexmarkedeventsheetsplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import MarkedEventSheetsPlugin from 'phaser3-rex-plugins/plugins/markedeventsheets-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexMarkedEventSheets',
                plugin: MarkedEventSheetsPlugin,
                start: true
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add event-sheet-manager object
    ```javascript
    var eventSheetManager = scene.plugins.get('rexMarkedEventSheets').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import MarkedEventSheets from 'phaser3-rex-plugins/plugins/markedeventsheets.js';
    ```
- Add event-sheet-manager object
    ```javascript
    var eventSheetManager = new MarkedEventSheets(config);
    ```

### Create instance

```javascript
var eventSheetManager = scene.plugins.get('rexMarkedEventSheets').add({
    commandExecutor: Object,
    parallel: false
});
```

- `commandExecutor` : Command executor of [actions](markedeventsheet.md#custom-command).
    - This plugin provides a built-in [command executor](markedeventsheet.md#command-executor).
- `parallel` :
    - `false` : Test condition then execute event sheet one by one. Default behavior.
    - `true` : Test all condition of event sheets then execute event sheets one by one.


### Add event sheet

```javascript
eventSheetManager.addEventSheet(content, {
    commentLineStart: '\/\/',
    lineBreak: '\\',
    parallel: undefined,
    active: true,
    once: false
})
```

or

```javascript
eventSheetManager.addEventSheet(content, groupName, {
    commentLineStart: '\/\/',
    lineBreak: '\\',
    parallel: undefined,
    active: true,
    once: false
})
```

- `content` : See [structure of event sheet](markedeventsheet.md#structure-of-event-sheet)
- `commentLineStart` : Content line start by this symobl (default value is `//`) will be ignored as a comment line.
- `lineBreak` : Markdown will use `\` as line break. So the last character `\` will be discarded.
- `parallel` : 
    - `undefined` : Use default `parallel` property.
- `active` : 
    - `true` : Eval condition of this event sheet every round. Default behavior.
    - `false` : Skip this event sheet.
- `once` :
    - `true` : Set `active` of this event sheet to `false` when exection of this event sheet is complete.
    - `false` : Do nothing when exection of this event sheet is complete. Default behavior.
- `groupName` : Each event sheet belong a group. Ignore this parameter to use default group.
    - `'_'` : Default group name.

### Remove event sheet

- Remove an event sheet in default group
    ```javascript
    eventSheetManager.removeEventSheet(title);
    ```
- Remove an event sheet in a specific group
    ```javascript
    eventSheetManager.removeEventSheet(title, groupName);
    ```
- Remove all event sheets in default group
    ```javascript
    eventSheetManager.removeAllEventSheets();
    ```
- Remove all event sheets in a specific group
    ```javascript
    eventSheetManager.removeAllEventSheets(groupName);
    ```

### Start running

- Start running default group
    ```javascript
    eventSheetManager.start();
    ```
- Start running a specific group of event sheets
    ```javascript
    eventSheetManager.start(groupName);
    ```
- Start running an event sheet (indexed by `title`) without condition testing, in default group.
    ```javascript
    eventSheetManager.start(title);
    ```
- Start running an event sheet (indexed by `title`) without condition testing, in a specific group.
    ```javascript
    eventSheetManager.start(title, groupName);
    ```
- Start running an event sheet (indexed by `title`) with condition testing, in default group.
    ```javascript
    eventSheetManager.start(title, false);
    ```
- Start running an event sheet (indexed by `title`) with condition testing, in a specific group.
    ```javascript
    eventSheetManager.start(title, groupName, false);
    ```

### Round counter

- Increase round counter
    ```javascript
    eventSheetManager.updateRoundCounter();
    // eventSheetManager.$roundCounter += 1;
    ```
- Set round counter
    ```javascript
    eventSheetManager.updateRoundCounter(value);
    // eventSheetManager.$roundCounter = value;
    ```
- Get round counter
    ```javascript
    var roundCounter = eventSheetManager.getRoundCounter();
    // var roundCounter = eventSheetManager.$roundCounter;
    ```

### Active

- Activate state of event sheet (indexed by `title`)
    ```javascript
    eventSheetManager.setTreeActiveState(title);
    // eventSheetManager.setTreeActiveState(title, true);
    ```
- Inactivate state of event sheet (indexed by `title`)
    ```javascript
    eventSheetManager.setTreeActiveState(title, false);
    ```
- Get active state of event sheet (indexed by `title`)
    ```javascript
    var active = eventSheetManager.getTreeActiveState(title);
    ```

!!! note
    Event sheet which has `once` property will set `active` property to `false`
    when exection of this event sheet is complete. 


### Stop running

- Stop running default group
    ```javascript
    eventSheetManager.stop();
    ```
- Stop running a specific group of event sheets
    ```javascript
    eventSheetManager.stop(groupName);
    ```

### Local memory

Local memory is shared for all event sheets.

- Set value
    ```javascript
    eventSheetManager.setData(key, value);
    ```
- Toggle value
    ```javascript
    eventSheetManager.toggleData(key, value);
    ```
- Increase value
    ```javascript
    eventSheetManager.incData(key, inc);
    ```
- Get value
    ```javascript
    var value = eventSheetManager.getData(key);
    ```
- Has key
    ```javascript
    var hasData = eventSheetManager.hasData(key);
    ```
- Local memory as a dictionary
    ```javascript
    var data = eventSheetManager.memory;
    ```

### States

- Dump state of event sheets of all groups
    ```javascript
    var states = eventSheetManager.dumpState();
    ```
- Load state of event sheet of all groups
    ```javascript
    eventSheetManager.loadState(states);
    ```

### Events

- A group of event sheets has been executed completed
    ```javascript
    eventSheetManager.on('complete', function(groupName, eventSheetManager){ 

    });
    ```
- Enter an event sheet
    ```javascript
    eventSheetManager.on('eventsheet.enter', function(title, groupName, eventSheetManager){ 

    });
    ```
- Exit an event sheet
    ```javascript
    eventSheetManager.on('eventsheet.exit', function(title, groupName, eventSheetManager){ 

    });
    ```
- Enter a label (any heading) an event sheet
    ```javascript
    eventSheetManager.on('label.enter', function(labelTitle, treeTitle, groupName, eventSheetManager){ 

    });
    ```
- Exit a label (any heading) of an event sheet
    ```javascript
    eventSheetManager.on('label.exit', function(labelTitle, treeTitle, groupName, eventSheetManager){ 

    });
    ```
- Test condition of an event sheet failed
    ```javascript
    eventSheetManager.on('eventsheet.catch', function(title, groupName, eventSheetManager){ 

    });
    ```

### Structure of event sheet

[Sample](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/assets/markedeventsheet/sample.md?plain=1)

#### Main headings

```
# Title

parallel
active=false
once

## [Condition]

coin > 5

## Script

## [Catch]

```

- H1 heading : Title of this event sheet
- Content under Title (H1 heading) : Setting of this event sheet, optional.
    - `parallel` : Set `parallel` property of this event sheet to `true`.
    - `active=false` : Set `active` property of this event sheet to `false`.
    - `once` : Set `once` property of this event sheet to `true`.
- H2 heading with `[Condition]` : Main condition.
    - Each line under `[Condition]` is a boolean equation, composed of `AND` logic.
    - Can have many `[Condition]` heading, each `[Condition]` heading will be composed of `OR` logic.
    - Read data from [local memory](markedeventsheet.md#local-memory)
- H2/H3/... headings between `[Condition]` and `[Catch]` : Actions when main condition is `true`.
    - [Flow control instructions of headings](markedeventsheet.md#flow-control-instructions)
    - Actions : [Custom command](markedeventsheet.md#custom-command)
- H2 heading with `[Catch]` : Actions when main condition is `false`.

#### Flow control instructions

##### Simple branch

```
## [If]

coin > 5

### Label

```

- H2/H3/... heading with `[If]` : Internal branch
    - Each line under `[If]` is a boolean equation, composed of `AND` logic.
    - Read data from [local memory](markedeventsheet.md#local-memory)
- H3/H4/... heading under `[If]` : Actions when condition is `true`.

##### Complex branch

Does not support complex branch (if... else if ... else) inside an event sheet.  
User can build complex branch by mutiple event sheets with main condition (`[Condition]` H2 heading).  
[Example](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/assets/markedeventsheet/branch)


##### While loop

```
## [While]

loopCount > 0

### Label

```

- H2/H3/... heading with `[While]` : While loop
    - Each line under `[While]` is a boolean equation, composed of `AND` logic.
    - Read data from [local memory](markedeventsheet.md#local-memory)
- H3/H4/... heading under `[While]` : Actions running when condition is `true`

##### Break

```

[break]

```

- Action line with `[break]` : Ignore remainder actions in current label (heading).

##### Exit

```

[exit]

```

- Action line with `[exit]` : Skip remainder label (heading) and actions.


##### Next round

```

[next round]

```

- Action line with `[next round]` : Run remainder actions at next round.


Invoke 

```javascript
eventSheetManager.updateRoundCounter().start()
```

to start next round.


#### Custom command

```

commandName
  param0=value
  param1=value

```

- Each command is divided by space line. i.e. add space lines above and below command.
- First line is the command name.
    1. Invoke `commandExecutor.commandName` method if this `commandName` method is existed.
        ```javascript
        commandName(config, eventSheetManager) {
            // return eventEmitter;
        }
        ``` 
        - `config` : Parameter and value in a dictionary.
        - `eventSheetManager` : This event mangager.
        - Return value :
            - `undefined`, `null` : Run next command immediately.
            - `eventEmitter` : Run next command after `eventEmitter` emitting `'complete'` event.
    1. Otherwise, invoke `commandExecutor.defaultHandler`.
        ```javascript
        defaultHandler(commandName, config, manager) {
            // return eventEmitter;
        }
        ```
        - `commandName` : Command name.
        - `config` : Parameter and value in a dictionary.
        - `manager` : This event mangager.
        - Return value :
            - `undefined`, `null` : Run next command immediately.
            - `eventEmitter` : Run next command after `eventEmitter` emitting `'complete'` event.
- Remainder lines are parameter composed of parameter name and value, with `=`
    - Space characters at line start will be discarded.
    - Value will be parsed to number, boolean, or string.
        - String value contains `{{`, and `}}` will be interpolation by [mustache](https://mustache.github.io/mustache.5.html) template syntax, return a string value.
        - String value wrapped by `#(` `)` will be treated as expression, return a number value.
- Any line start with `//` will be ignored as comment line.


For multiple lines parameter :

~~~
```commandName,param0=value,param1=value
line0
line1
line2
```
~~~

- Lines in code block will be assigned to `text` parameter.

So it will be equal to

```

commandName
  text=...
  param0=value
  param1=value

```

### Command executor

A command executor for phaser3 engine.

#### Create command executor instance

```javascript
var commandExecutor = scene.plugins.get('rexMarkedEventSheets').addCommandExecutor(scene, {
    layers: []
});

// Add to event sheet manager
// var eventSheetManager = scene.plugins.get('rexMarkedEventSheets').add({
//     commandExecutor: commandExecutor
// });
```

- `layers` : Pre-create [layer](layer.md) game object indexed by array of string names.

#### Game object

##### Register custom game object

```javascript
commandExecutor.addGameObjectManager({
    name: GOTYPE,

    viewportCoordinate: false,
    // viewportCoordinate: { viewport: new Phaser.Geom.Rectangle() },
    
    fade: 500,
    // fade: {mode: 'tint', time: 500},
    
    defaultLayer: layerName,
    
    commands: {
        commandName(config, eventSheetManager) {
            // commandExecutor.waitEvent(eventEmitter, eventName);
        }
    }
})
```

- `name` : A string name of game object's type. Will [register command](markedeventsheet.md#add-custom-command) `GOTYPE` to this command executor.
- `createGameObject` : A callback for creating game object
    ```javascript
    function(scene, config) {
        return gameObject;
    }
    ```
    - `config` : Parameters passed from [event sheet](markedeventsheet.md#create-custom-game-object).
        - `id` : Parameter `id` is reserved.
- `viewportCoordinate` : Apply [viewportCoordinate behavior](viewport-coordinate.md) to game object.
    - `true` : Attach `vpx`, `vpy`, `vp` to sprite game object.
        - `vpx`, `vpy` : Number between `0`~`1`. Proportion of viewport.
        - `vp` : Viewport in [rectangle](geom-rectangle.md)
    - `false` : Do nothing, default behavior.
- `fade` :
    - `0` : No fade-in or fade-out when adding or removing a sprite.
    - A number : Duration of fading. Default value is `500`.
    - A plain object contains `mode`, `time`
        - `fade.mode` : Fade mode
            - `'tint'`, or `0` : Fade-in or fade-out via `tint` property.
            - `'alpha'`, or `1` : Fade-in or fade-out via `alpha` property. 
            - `'revealUp'`, or `2` : [Reveal](shader-builtin.md#reveal) up for fade-in.
            - `'revealDown'`, or `3` : [Reveal](shader-builtin.md#reveal) down for fade-in.
            - `'revealLeft'`, or `4` : [Reveal](shader-builtin.md#reveal) left for fade-in.
            - `'revealRight'`, or `5` : [Reveal](shader-builtin.md#reveal) right for fade-in.
        - `fade.time` : Duration of fading. Default value is `500`.
- `defaultLayer` : A layer name defined in `layers` parameter of [`addCommandExecutor` method](markedeventsheet.md#create-command-executor-instance)
- `commands` : Custom commands, each command is a callback indexed by command name
    ```javascript
    commandName: function(gameObject, config, commandExecutor) {
        // commandExecutor.waitEvent(eventEmitter, eventName);
    }
    ```
    - `commandName` : Command name. These command names are reserved : [`to`](markedeventsheet.md#ease-properties-of-custom-game-object), [`yoyo`](markedeventsheet.md#ease-properties-of-custom-game-object), [`destroy`](markedeventsheet.md#destroy-custom-game-object)
    - `gameObject` : Game object instance.
    - `config` : Parameters passed from [event sheet](markedeventsheet.md#invoke-custom-command).
    - `commandExecutor` : This command executor instance.
        - `commandExecutor.waitEvent(eventEmitter, eventName)` : Invoke this method to 
          Run next command after `eventEmitter` emitting event `eventName`.

##### Create custom game object

```

GOTYPE
  id=NAME
  param0=value
  param1=value

```

- Create custom game object `GOTYPE` with config `{param0, param1}`, indexed by `id`

##### Set properties of custom game object

```

NAME
  x=
  vpx=
  y=
  vpy=
  alpha=

```

- `vpx`, `vpy` : [viewportCoordinate properties](viewport-coordinate.md) injected if `viewportCoordinate` is `true`.

##### Ease properties of custom game object

```

NAME.to
  x=
  vpx=
  y=
  vpy=
  alpha=
  duration=1000
  ease=Linear
  repeat=0
  wait=

```

```

NAME.yoyo
  x=
  vpx=
  y=
  vpy=
  alpha=
  duration=1000
  ease=Linear
  repeat=0
  wait=

```

- These properties are reserved : `id`, `duration`, `ease`, `repeat`, `yoyo`, `wait`
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after playing sound complete.

##### Invoke custom command 

```

NAME.commandName
  param0=value
  param1=value

```

- Invoke custom command `commandName` method with these parameters
    - `gameObject` : Indexed by `NAME`
    - `config` : `{param0, param1}`

Do nothing if gameObject or commandName is not found.

##### Destroy custom game object

```

NAME.destroy

```

#### Wait

##### Wait click

```

click

```

- Run next command after clicking.

##### Wait any

```

wait
  click
  key=keyName
  time=

```

- `click` : Run next command after clicking.
- `key` : Run next command after key down
- `time` : Run next command after time-out.

Emit these events from eventSheetManager

- Wait click or key down
    ```javascript
    eventSheetManager.on('pause.input', function(){ 

    });
    ```
    - Resume (run next command)
         ```javascript
            eventSheetManager.on('resume.input', function(){ 
        
            });
            ```
- Wait click only
    ```javascript
    eventSheetManager.on('pause.click', function(){ 

    });
    ```
- Wait key down only
    ```javascript
    eventSheetManager.on('pause.key', function(keyName){ 

    });
    ```

#### Sound

This command executor provides 

- 2 background music tracks : `bgm`, `bgm2`
- 2 sound effects : `se`, `se2`.

##### Sound properties

```

bgm
  volume
  mute
  unmute
```

- Command name : `bgm`, `bgm2`, `se`, `se2`

##### Play sound

```
bgm.play
  key=
  // volume
  // detune
  // rate
  fadeIn=0
  // loop
  wait=false
```

- Command name : `bgm.play`, `bgm2.play`, `se.play`, `se2.play`
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after playing sound complete.

##### Cross fade in sound

```

bgm.cross
  key=
  duration=500
  wait=false

```

- Command name : `bgm.cross`, `bgm2.cross`
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after playing sound complete.

##### Stop sound

```
bgm.stop
```

- Command name : `bgm.stop`, `bgm2.stop`, `se.stop`, `se2.stop`

##### Fade out sound

```

bgm.fadeOut
  duration=500
  stop=true
  wait=false

```

- Command name : `bgm.fadeOut`, `bgm2.fadeOut`, `se.fadeOut`, `se2.fadeOut`
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after playing sound complete.

##### Fade in sound

```

bgm.fadeIn
  duration=500

```

- Command name : `bgm.fadeIn`, `bgm2.fadeIn`

##### Pause sound

```

bgm.pause

```

- Command name : `bgm.pause`, `bgm2.pause`

##### Resume sound

```

bgm.resume

```

- Command name : `bgm.resume`, `bgm2.resume`

##### Mute sound

```

bgm.mute

```

- Command name : `bgm.mute`, `bgm2.mute`, `se.mute`, `se2.mute`

##### Unmute sound

```

bgm.unmute

```

- Command name : `bgm.unmute`, `bgm2.unmute`, `se.unmute`, `se2.unmute`

#### Camera

##### Camera properties

```

camera
  x=
  y=
  rotate=
  zoom=

```

- `x`, `y` : Scroll
- `rotate` : Rotate in degree
- `zoom` : Zoom

Run next command immediately.

##### Fade in

```

camera.fadeIn
  duration=1000
  red
  green
  blue
  wait=false

```

- `duration`, `red`, `green`, `blue` : See [fade effect](camera-effects.md/#fade)
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Fade out

```

camera.fadeOut
  duration=1000
  red
  green
  blue
  wait=false

```

- `duration`, `red`, `green`, `blue` : See [fade effect](camera-effects.md/#fade)
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Flash

```

camera.flash
  duration=1000
  red
  green
  blue
  wait=false

```

- `duration`, `red`, `green`, `blue` : See [flash effect](camera-effects.md/#flash)
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Shake

```

camera.shake
  duration=1000
  intensity
  wait=false

```

- `duration`, `intensity` : See [shake effect](camera-effects.md/#shake)
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Zoom

```
camera.zoomTo
  duration=1000
  zoom
  wait=false
```

- `duration`, `zoom` : See [zoom effect](camera-effects.md/#zoom)
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Rotate to

```

camera.rotateTo
  duration=1000
  rotate
  ease
  wait=false

```

- `duration`, `rotate`, `ease` : See [rotateTo effect](camera-effects.md/#rotate-to)
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Scroll to

```

camera.scrollTo
  duration=1000
  x
  y
  ease
  wait=false

```

- `duration`, `x`, `y`, `ease` : Scroll to position.
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

#### Add custom command

```javascript
commandExecutor.addCommand(commandName, function(config, eventSheetManager){
    // return eventEmitter;
}, scope);
```

- `config` : Parameters passed from [event sheet](markedeventsheet.md#custom-command).
- `eventSheetManager` : This event mangager.
- Return value :
    - `undefined`, `null` : Run next command immediately.
    - `eventEmitter` : Run next command after `eventEmitter` emitting `'complete'` event.
