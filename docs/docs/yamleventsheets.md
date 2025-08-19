## Introduction

Event sheets contains main condition(s) and actions, in YAML format.

- Author: Rex
- Member of scene

## Live demos

- [Command executor](https://codepen.io/rexrainbow/pen/eYPLVmM)

## Usage

- [Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/yamleventheets)
- [Event sheets](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/assets/yamleventsheet)

### Install plugin

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.plugin('rexyamleventsheetsplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexyamleventsheetsplugin.min.js', true);
    ```
- Add event-sheet-manager object
    ```javascript
    var eventSheetManager = scene.plugins.get('rexyamleventsheetsplugin').add(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import YAMLEventSheetsPlugin from 'phaser3-rex-plugins/plugins/yamleventsheets-plugin.js';
    var config = {
        // ...
        plugins: {
            global: [{
                key: 'rexYAMLEventSheets',
                plugin: YAMLEventSheetsPlugin,
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
    var eventSheetManager = scene.plugins.get('rexYAMLEventSheets').add(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import YAMLEventSheets from 'phaser3-rex-plugins/plugins/yamleventsheets.js';
    ```
- Add event-sheet-manager object
    ```javascript
    var eventSheetManager = new YAMLEventSheets(config);
    ```

### Create instance

```javascript
var eventSheetManager = scene.plugins.get('rexYAMLEventSheets').add({
    commandExecutor: Object,
    parallel: false
});
```

- `commandExecutor` : Command executor of [actions](yamleventsheets.md#custom-command).
    - This plugin provides a built-in [command executor](yamleventsheets.md#command-executor).
- `parallel` :
    - `false` : Test condition then execute event sheet one by one. Default behavior.
    - `true` : Test all condition of event sheets then execute event sheets one by one.


### Add event sheet

Each event sheet belong a group.

```javascript
eventSheetManager.addEventSheet(content, {
    parallel: undefined,
    active: true,
    once: false
})
```

or

```javascript
eventSheetManager.addEventSheet(content, groupName, {
    parallel: undefined,
    active: true,
    once: false
})
```

or

```javascript
eventSheetManager.addEventSheet(content, {
    groupName: '_',
    parallel: undefined,
    active: true,
    once: false
})
```

- `content` : See [structure of event sheet](yamleventsheets.md#structure-of-event-sheet)
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

Starting command will be ignored if group is running.

#### Start running a group of event sheets

- Start running default group
    ```javascript
    eventSheetManager.startGroup();
    ```
- Start running a specific group of event sheets
    ```javascript
    eventSheetManager.startGroup(groupName);
    ```

##### Flow chart

```mermaid
graph TD

    startGroup{{"startGroup()"}}  ------>  eventstart>Fire event\nstart]
    eventstart --> foreacheventsheet((For each\nevent sheet))
    foreacheventsheet --> |Next| activate{activate}
    
    subgraph Event sheet
    activate --> |True| condition{"Test\n[condition]"}
    condition --> |True| enterevent>Fire event\neventsheet.enter]
    condition --> |False| eventcatch>Fire event\neventsheet.catch] 

    subgraph Run
    enterevent --> actions[Run\nactions\n...\n...]
    actions --> exitevent>Fire event\neventsheet.exit]    
    end

    subgraph Catch
    eventcatch --> catch["Run\n[catch]"]
    end
   
    end

    exitevent --> foreacheventsheet
    catch --> foreacheventsheet

    activate --> |False| foreacheventsheet

    foreacheventsheet --> eventcomplete>Fire event\ncomplete]
    eventcomplete --> endnode{{End}}
```

#### Start running a event sheet in a group

- Start running default group
    ```javascript
    eventSheetManager.start();
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

#### Start running a group by event

```javascript
eventSheetManager.startGroup(eventName, groupName);
// eventSheetManager.startGroup(eventName, groupName, once);
```

or

```javascript
eventSheetManager.startGroup({
    eventName:
    groupName:
    once: false
});
```

### Round counter

Round counter is started from `0`.

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
    eventSheetManager.setEventSheetActiveState(title);
    // eventSheetManager.setEventSheetActiveState(title, true);
    ```
- Inactivate state of event sheet (indexed by `title`)
    ```javascript
    eventSheetManager.setEventSheetActiveState(title, false);
    ```
- Get active state of event sheet (indexed by `title`)
    ```javascript
    var active = eventSheetManager.getEventSheetActiveState(title);
    ```

!!! note
    Event sheet which has `once` property will set `active` property to `false`
    when exection of this event sheet is complete. 


### Stop running

Stop running a group of event sheet, also fires `'eventsheet.exit'` event. 
And game objects with `'autoClear'` will be destroyed.

- Stop running default group
    ```javascript
    eventSheetManager.stopGroup();
    ```
    or
    ```javascript
    eventSheetManager.stop();
    ```
- Stop running a specific group of event sheets
    ```javascript
    eventSheetManager.stopGroup(groupName);
    ```
    or
    ```javascript
    eventSheetManager.stop(groupName);
    ```

### Local memory

Local memory is shared for all event sheets.

- Set value
    ```javascript
    eventSheetManager.setData(key, value);
    ```
    or
    ```javascript
    eventSheetManager.setData(data);  // data : a plain json object
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

### Custom expression

```javascript
eventSheetManager.addExpression(name, callback);
```

- `name` : A string value
- `callback` : A function object retuen a number
    ```javascript
    function(a, b, c, ...) { return x; }
    ```

For example :

```javascript
eventSheetManager.addExpression('randomInt', function (a, b) {
    return Math.floor(a + Math.random() * (b - a + 1));
});
```

Expression will store at [local memory](#local-memory)

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

- Start A group of event sheets
    ```javascript
    eventSheetManager.on('start', function(groupName, eventSheetManager){ 

    });
    ```
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
- Enter a [label](yamleventsheets.md#label) an event sheet
    ```javascript
    eventSheetManager.on('label.enter', function(headingTitle, eventSheetTitle, groupName, eventSheetManager){ 

    });
    ```
- Exit a [label](yamleventsheets.md#label) of an event sheet
    ```javascript
    eventSheetManager.on('label.exit', function(headingTitle, eventSheetTitle, groupName, eventSheetManager){ 

    });
    ```
- Test condition of an event sheet failed
    ```javascript
    eventSheetManager.on('eventsheet.catch', function(title, groupName, eventSheetManager){ 

    });
    ```

### Structure of event sheet

[Sample](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/assets/yamleventsheet/sample.md?plain=1)

#### Main headings

```yaml
title: Title

groupName: 
parallel: 
active: false
once: false

condition: expression

script:

fallback:

```

- `title` : Title of this event sheet
- `groupName` : Assign `groupName` in event sheet, put this event sheet in to that group.
- `parallel` : Set `parallel` property of this event sheet to `true`.
- `active=false` : Set `active` property of this event sheet to `false`.
- `once` : Set `once` property of this event sheet to `true`.
- `condition` : Main condition.
    - A string : Single boolean expression
        ```yaml
        condition: "hp > 0 && mp > 0"
        ```
    - An array : Represents OR, elements can be
        - A string : Single expression
        - An array : Represents AND, e.g., `["a", "b"]` -> `(a) && (b)`
        - Object `{and: [...]}`: Equivalent to AND
            ```yaml
            condition:
              - "score > 0"                    # (score > 0)
              - ["hp > 0", "mp > 0"]           # OR ((hp > 0) && (mp > 0))
              - and: ["stage == 1", "boss"]    # OR ((stage == 1) && (boss))
            ```
        - When omitted or malformed, defaults to `"true"`
    - Read data from [local memory](yamleventsheets.md#local-memory)
- `script` : Actions when main condition is `true`.
    - [Flow control instructions](yamleventsheets.md#flow-control-instructions)
    - Actions : [Custom command](yamleventsheets.md#custom-command)
- `fallback` : Actions when main condition is `false`.

#### Flow control instructions

##### If, Else if, Else

```yaml
- type: if
  branches:
    - condition: coin > 10  # IF
    - actions:
      # - name: 

    - condition: (coin > 5) && (coin <10)  # ELSE IF
    - actions:
      # - name:

    - actions:  # ELSE
      # - name:
```

- `type: if` with `branches:`, each branch contains `condition: expression`, and `actions: `
    - `condition: expression`
        - Read data from [local memory](yamleventsheets.md#local-memory)
        - Boolean expression AND/OR : `&&`.
        - Boolean expression OR : `||`.
        - No `condition` : ELSE part
    - And `actions: `, run actions when expression is `true`.

!!! note Single if condition
   Using [Label](yamleventsheets.md#label) with `condition: expression` for single if condition

##### Repeat loop

```yaml
- type: repeat
  times: 3
  actions:
    # - name:
```

or

```yaml
- type: repeat
  times: loopCount
  actions:
    # - name:
```

or

```yaml
- times: 3
  actions:
    # - name:
```

##### For loop

```yaml
- type: for
  init:
    # - name:
  condition: expression
  step:
    # - name:
  actions:
    # - name:
```

- `type: for`
    - `init` : Actions executed at the beginning
    - `condition: expression` : Evaluate the condition at the beginning of each loop.
        - Read data from [local memory](yamleventsheets.md#local-memory)
        - Boolean expression AND/OR : `&&`.
        - Boolean expression OR : `||`.
        - No `condition` : ELSE part
    - `step` : Actions executed at the end of each loop
    - And `actions: `, the loop body.


##### While loop

```yaml
- type: while
  condition: loopCount > 0
  actions:
    # - name:
```


##### Label

```yaml
- title: labelTitle
  actions:
    # - name: 
```

or

```yaml
- actions:
    # - name: 
```

or

```yaml
- title: labelTitle
  type: label
  actions:
    # - name: 
```

or

```yaml
- title: labelTitle
  condition: expression
  type: label
  actions:
    # - name: 
```

or

```yaml
- condition: expression
  actions:
    # - name: 
```

- `title: labelTitle` : Optional title name.
- `actions` : Run commands sequentially
- `condition: expression` : Run commands if `expression` return `true`, optional
    - Each custom command can have this `condition` property, including all command in [Command executor](yamleventsheets.md#command-executor)


##### Break

```yaml
- type: break
```

or

```yaml
- type: break
  condition: expression
```

- Action `type: break` : Ignore remainder actions in current level.


##### Continue

```yaml
- type: continue
```

or

```yaml
- type: continue
  condition: expression
```

- Action `type: continue` : Simulate `continue` instruction of programming language.


##### Exit

```yaml
- type: exit
```

or

```yaml
- type: exit
  condition: expression
```

- Action `type: exit` : Skip remainder instructions.

##### Deactivate

```yaml
- type: deactivate
```

or


```yaml
- type: deactivate 
  target: eventSheetTitle
```

or

```yaml
- type: deactivate
  condition: expression
  target: eventSheetTitle
```

- Action `type: deactivate` : Deactivate this event sheet, or deactivate event sheet by title in the same tree group. i.e. Set `active` property of this event shhet to `false`.

##### Activate

```yaml
- type: activate
```

or

```yaml
- type: activate
  target: eventSheetTitle
```

or

```yaml
- type: activate
  condition: expression
  target: eventSheetTitle
```

- Action `type: activate` : Activate this event sheet, or activate event sheet by title in the same tree group. i.e. Set `active` property of this event shhet to `true`.


#### Custom command

```yaml
- type: command
  name: commandName
  parameters:
    param0: value
    param1: value
```

or

```yaml
- name: commandName
  parameters: 
    param0: value, 
    param1: value
```

or

```yaml
- condition: expression
  name: commandName
  parameters:
    param0: value
    param1: value
```

- `name: commandName` :
    1. Invoke `commandExecutor.commandName` method if this `commandName` method is existed.
        ```javascript
        commandName(config, eventSheetManager) {
            // var resumeCallback = eventSheetManager.pauseEventSheet();
            // ... 
            // resumeCallback()
        }
        ``` 
        - `config` : Parameter and value in a dictionary.
        - `eventSheetManager` : This event mangager.
            - Pause running of current event sheet
                ```javascript
                var resumeCallback = eventSheetManager.pauseEventSheet();  
                //  resumeCallback();  // Resume running of current event sheet      
                ```
            - Pause running of current event sheet until another `eventName` firing from `eventEmitter`
                ```javascript
                eventSheetManager.pauseEventSheetUnitlEvent(eventEmitter, eventName);
                ```
    1. Otherwise, invoke `commandExecutor.defaultHandler`.
        ```javascript
        defaultHandler(commandName, config, eventSheetManager) {
            // var resumeCallback = eventSheetManager.pauseEventSheet();
            // ... 
            // resumeCallback()
        }
        ```
        - `commandName` : Command name.
        - `config` : Parameter and value in a dictionary.
        - `eventSheetManager` : This event mangager.
            - Pause running of current event sheet
                ```javascript
                var resumeCallback = eventSheetManager.pauseEventSheet(); 
                //  resumeCallback();  // Resume running of current event sheet
                ```
            - Pause running of current event sheet until another `eventName` firing from `eventEmitter`
                ```javascript
                eventSheetManager.pauseEventSheetUnitlEvent(eventEmitter, eventName);
                ```
- `condition: expression` : Run command if `expression` return `true`, optional
    - Each custom command can have this `condition` property, including all command in [Command executor](yamleventsheets.md#command-executor)


### Command executor

A command executor for phaser3 engine.

#### Create command executor instance

```javascript
var commandExecutor = scene.plugins.get('rexYAMLEventSheets').addCommandExecutor(scene, {
    // layers: ['layer0', 'layer1', ...]
    // layers: [{name, cameraName}, ...]

    // layerDepth: undefined,
    // rootLayer: undefined,

    log: {
        delimiters: '[]'
        enable: true
    }
});

// Add to event sheet manager
// var eventSheetManager = scene.plugins.get('rexYAMLEventSheets').add({
//     commandExecutor: commandExecutor
// });
```

or

```javascript
// import YAMLEventSheets from 'phaser3-rex-plugins/plugins/yamleventsheets.js';
// import CommandExecutor from 'phaser3-rex-plugins/plugins/commandexecutor.js';

var commandExecutor = new CommandExecutor(scene, config);

// var eventSheetManager = new YAMLEventSheets({
//     commandExecutor: commandExecutor
// });
```


- `layers` : Add some initial [layers](layer.md)
    - A string array : Add layers by string name
    - A array of plain object `{ name, cameraName }`
        1. Add layer by string name
        1. Bind this layer to dedicate camera (indexed by `cameraName`), ignore other cameras
           Add a new camera if this target camera is not existing
- `layerDepth` : Set `depth` to each [layer](layer.md) game object.
    - `undefined` : Keep default `depth` value (`0`)
- `rootLayer` : Add all layer game objects created by layer-manager into this root layer.
- `log` : Configuration of BBCodeLog
    - `log.delimiters` : String of left-delimiter and right-delimiter.
        - A single string with 2 characters. Default value is `'[]'`.
        - A array with 2 strings
    - `log.enable` :
        - `true` : Can [print message on console](#bbcode-log). Default behavior.
        - `false` : Don't print any message on console.

#### Local memory of event sheet manager

- Set value by key
    ```yaml
    - name: setData
      parameters: { key: value }      
    ```
- Increase value of key
    ```yaml
    - name: incData
      parameters: { key: value }
    ```
    or
    ```yaml
    - name: setData
      parameters: { key: "#(key+value)" }
    ```
- Toggle value of key
    ```yaml
    - name: toggleData
      parameters: { key: true }
    ```


See [Local memory](#local-memory)


#### BBCode Log

##### Print message on console

```yaml
- name: log
  parameters: { text: "..." }
```

or

```yaml
- name: log  
  parameters:
    logType: log
    showTitle: true
    titleL : "..."
    titleColor: green
    text: "..."
  # condition: expression
```

- `text` : Message with bbcode format.
    - `[color=gold]...[/color]`
    - `[bgcolor=green]...[/bgcolor]`
    - `[b]...[/b]`
    - `[i]...[/i]`
    - `[u]...[/u]`
- `logType` : 
    - `'log'` : `console.log`. Default value.
    - `'warn'`: `console.warn`
- `showTitle`
    - `true` : Show title before text message. Default behavior.
    - `false` : Don't show title.
- `title`
    - `undefined` : Using title of current event sheet. Default behavior.
    - A string, custom string before text message.
- `titleColor` : Background color of title block, default value is `'green'`


##### Disable console message

```yaml
- name: log.disable
```

- Disable console message of current event sheet.

or

```yaml
- name: log.disable
  parameters: {title: "..." }
  # condition: expression
```

- `title` : Disable console message of event sheet by title.


##### Enable console message

```yaml
- name: log.enable
```

- Enable console message of current event sheet.

or

```yaml
- name: log.enable
  paramterers : { title: "..." }
  # condition: expression
```

- `title` : Enable console message of event sheet by title.


##### Dump memory

```yaml
- name: log.memory
```

- Dump all key in memory

or

```yaml
- name: log.memory
  parameters:
    text: "..."
    keys: "a,b,c"
  # condition: expression
```

- `keys` : Dump part of memory by keys.
- `text` : Message with bbcode format.


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

    autoClear: true,
    
    commands: {
        commandName(gameObject, config, commandExecutor, eventSheetManager, eventSheet) {
            // commandExecutor.waitEvent(eventEmitter, eventName);
        }
    }
})
```

- `name` : A string name of game object's type. Will [register command](yamleventsheets.md#add-custom-command) `GOTYPE` to this command executor.
- `createGameObject` : A callback for creating game object
    ```javascript
    function(scene, config) {
        return gameObject;
    }
    ```
    - `config` : Parameters passed from [event sheet](yamleventsheets.md#create-custom-game-object).
        - `id`, `layer`, `autoClear`, `eventSheetManager`, `eventsheet` : These parameters are reserved.
        - `eventSheetManager` : This event sheet manager.
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
            - `'revealUp'`, or `2` : [Reveal](shader-p3fx.md#reveal) up for fade-in.
            - `'revealDown'`, or `3` : [Reveal](shader-p3fx.md#reveal) down for fade-in.
            - `'revealLeft'`, or `4` : [Reveal](shader-p3fx.md#reveal) left for fade-in.
            - `'revealRight'`, or `5` : [Reveal](shader-p3fx.md#reveal) right for fade-in.
        - `fade.time` : Duration of fading. Default value is `500`.
- `defaultLayer` : A layer name defined in `layers` parameter of [`addCommandExecutor` method](yamleventsheets.md#create-command-executor-instance)
- `autoClear` : 
    - `true` : Clear game objects when exiting current event sheet. Default behavior.
    - `false` : Ignore this behavior.
- `commands` : Custom commands, each command is a callback indexed by command name
    ```javascript
    commandName: function(gameObject, config, commandExecutor, eventSheetManager) {
        // commandExecutor.waitEvent(eventEmitter, eventName);
    }
    ```
    - `commandName` : Command name. These command names are reserved : [`to`](yamleventsheets.md#ease-properties-of-custom-game-object), [`yoyo`](yamleventsheets.md#ease-properties-of-custom-game-object), [`destroy`](yamleventsheets.md#destroy-custom-game-object)
    - `gameObject` : Game object instance.
    - `config` : Parameters passed from [event sheet](yamleventsheets.md#invoke-custom-command).
    - `commandExecutor` : This command executor instance. [See also](#methods-used-in-command)
    - `eventSheetManager` : This event sheet manager instance.
        - Store variable into blackboard of eventSheetManager : `eventSheetManager.setData(key, value)`

##### Create custom game object

```yaml
- name: GOTYPE
  parameters:
    id: NAME
    layer:
    autoClear:
    param0: value
    param1: value
  # condition: expression
```

- Create custom game object `GOTYPE` with config `{param0, param1}`, indexed by `id`
- `layer` : Put this game object at `layer`. 
    - `undefined` : Put this game object at default layer
- `autoClear` : Clear game objects when exiting current event sheet.
    - `undefined` : Use default value of `autoClear`


Reserved id : `time`, `click`, `key`, `bgm`, `bgm2`, `se`, `se2`, `camera`.

Will store reference of this game object into memory at key `@NAME`, 
can see it by `log.memory`, or get property of game object via `#(@NAME.x + 3)`.


##### Set properties of custom game object

- Set properties of a game object indexing by `NAME`
    ```yaml    
    - name: NAME.set
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
      # condition: expression
    ```
    - `vpx`, `vpy` : [viewportCoordinate properties](viewport-coordinate.md) injected if `viewportCoordinate` is `true`.
    - Add empty line above and below this command block.
- Set properties of all game objects belong GOTYPE
    ```yaml
    - name: GOTYPE.set
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
      # condition: expression
    ```
- Set properties of all game objects belong GOTYPE excluding `NAME`
    ```yaml
    - name: "!NAME.set"
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
      # condition: expression 
    ```

##### Ease properties of custom game object

- Ease properties of a game object indexing by `NAME`
    ```yaml
    - name: NAME.to
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
        duration: 1000
        delay: 0
        ease: Linear
        repeat: 0
        wait:
      # condition: expression
    ```
    ```yaml
    - name: NAME.from
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
        duration: 1000
        delay: 0
        ease: Linear
        repeat: 0
        wait:
      # condition: expression
    ```
    ```yaml
    - name: NAME.yoyo
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
        duration: 1000
        delay: 0
        ease: Linear
        repeat: 0
        wait:
      # condition: expression
    ```
    - These properties are reserved : `id`, `duration`, `delay`, `ease`, `repeat`, `yoyo`, `wait`
    - `wait` :
        - `false` : Run next command immediately. Default behavior.
        - `true` : Run next command after playing sound complete.
    - Add empty line above and below this command block.
- Ease properties of all game objects belong GOTYPE
    ```yaml
    - name: GOTYPE.to
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
        duration: 1000
        delay: 0
        ease: Linear
        repeat: 0
        wait:
      # condition: expression
    ```
    ```yaml
    - name: GOTYPE.from
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
        duration: 1000
        delay: 0
        ease: Linear
        repeat: 0
        wait:
      # condition: expression
    ```
    ```yaml
    - name: GOTYPE.yoyo
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
        duration: 1000
        delay: 0
        ease: Linear
        repeat: 0
        wait:
      # condition: expression
    ```
- Ease properties of all game objects belong GOTYPE excluding `NAME`
    ```yaml
    - name: "!NAME.to"
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
        duration: 1000
        delay: 0
        ease: Linear
        repeat: 0
        wait:
      # condition: expression
    ```
    ```yaml
    - name: "!NAME.from"
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
        duration: 1000
        delay: 0
        ease: Linear
        repeat: 0
        wait:
      # condition: expression
    ```
    ```yaml
    - name: "!NAME.yoyo"
      parameters:
        x:
        vpx:
        y:
        vpy:
        alpha:
        duration: 1000
        delay: 0
        ease: Linear
        repeat: 0
        wait:
      # condition: expression
    ```

##### Invoke custom command 

- Invoke custom command of a game object indexing by `NAME`
    ```yaml
    - name: NAME.commandName
      parameters:
        param0: value
        param1: value
      # condition: expression
    ```
    - Invoke custom command `commandName` method with these parameters
        - `gameObject` : Indexed by `NAME`
        - `config` : `{param0, param1}`
    - Add empty line above and below this command block.
    - `value` :
        - For string value, characters `\n` (2 characters) will be replaced by `\n` new line character (1 character)
- Invoke custom command of all game objects belong GOTYPE
    ```yaml
    - name: GOTYPE.commandName
      parameters:
        param0: value
        param1: value
      # condition: expression 
    ```
- Invoke custom command of all game objects belong GOTYPE excluding `NAME`
    ```yaml
    - name: "!NAME.commandName"
      parameters:
        param0: value
        param1: value
      # condition: expression    
    ```


Do nothing if gameObject or commandName is not found.

##### Destroy custom game object

- Destroy game object indexing by `NAME`
    ```yaml
    - name: NAME.destroy    
      # condition: expression
    ```
- Destroy all game objects belong GOTYPE
    ```yaml
    - name: GOTYPE.destroy
      # condition: expression
    ```
- Destroy all game objects belong GOTYPE excluding `NAME`
    ```yaml
    - name: "!NAME.destroy"
      # condition: expression
    ```

##### Methods used in command

- Hold command execution until `eventEmitter` emits `eventName` event.
    ```javascript
    commandExecutor.waitEvent(eventEmitter, eventName);
    ```
- Apply value to property of 
    ```javascript
    commandExecutor.setGOProperty({
        goType, id, 
        property, ... 
    });
    ```
    - `goType` : GameObject type assigned by `commandExecutor.addGameObjectManager({name...})`.
    - `id` : `NAME` of game object, which will store in `gameObject.name`.
        - `gameObject.name` : Apply value to property of this game object.
        - `'!' + gameObject.name` : Apply value to property of all game objects exclude this game object.
        - `undefined` : All game objects.
    - `propertyName: value` : Assign value to property. Can assign one or many properties.
- Ease value of game object(s)' property
    ```javascript
    if (wait) {
        commandExecutor.setWaitEventFlag();
    }
    commandExecutor.easeGOProperty({
        goType, id, 
        duration, ease, repeat, yoyo, 
        wait, 
        property, ... 
    });
    ```
    - `goType` : GameObject type assigned by `commandExecutor.addGameObjectManager({name...})`.
    - `id` : `NAME` of game object, which will store in `gameObject.name`.
        - `gameObject.name` : Apply value to property of this game object.
        - `'!' + gameObject.name` : Apply value to property of all game objects exclude this game object.
        - `undefined` : All game objects.
    - `duration` : Duration of easing task.
    - `ease` : [Ease function](tween.md#ease-equations)
    - `repeat` : Repeat times.
    - `yoyo` : Yoyo flag.
    - `wait` : Wait until easing task complete.
        - Invoke `commandExecutor.setWaitEventFlag()`. 
    - `propertyName: value` : Ease value of property. Can assign one or many properties.


#### Wait

##### Wait click

```yaml
- name: click
  # condition: expression
```

- Run next command after clicking.

##### Wait any

Run next command after...

```yaml
- name: wait
  parameters:
    click: true
    key: keyName
    time: 
    GONAME.destroy: true
    GONAME.PROPNAME: true
    GONAME.DATAKEY: true
    GONAME.EVTNAME: true
    event: EVENTNAME
  # condition: expression
```

- `click` : Run next command after clicking.
- `key` : Run next command after key down
- `time` : Run next command after time-out.
- `GONAME.destroy` : Run next command after [game object](#create-custom-game-object) has destroyed.
- `GONAME.PROPNAME` (ex. `GONAME.x`) : Run next command after [game object](#create-custom-game-object)'s property tween complete
- `GONAME.DATAKEY`, `GONAME.!DATAKEY` (ex. `GONAME.!hp`) : Run next command after [game object](#create-custom-game-object)'s data is `true` (or `> 0`) or `false` (or `<= 0`). Will check PROPNAME first.
- `GONAME.EVTNAME` : Run next command after [game object](#create-custom-game-object)'s `EVTNAME` firing. Will check `PROPNAME` and `DATAKEY` first.
- `event` : Run next command after eventSheetManager firing `EVENTNAME` event.


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

```yaml
- name: bgm.set
  parameters:
    volume:
    mute:
    unmute:
  # condition: expression
```

- Command name : `bgm`, `bgm2`, `se`, `se2`

##### Play sound

```yaml
- name: bgm.play
  parameters:
    key:
    # volume:
    # detune:
    # rate:
    # fadeIn: 0
    # loop: false
    wait: false
  # condition: expression
```

- Command name : `bgm.play`, `bgm2.play`, `se.play`, `se2.play`
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after playing sound complete.

##### Cross fade in sound

```yaml
- name: bgm.cross
  parameters:
    key:
    duration: 500
    wait: false
  # condition: expression
```

- Command name : `bgm.cross`, `bgm2.cross`
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after playing sound complete.

##### Stop sound

```yaml
- name: bgm.stop
  # condition: expression
```

- Command name : `bgm.stop`, `bgm2.stop`, `se.stop`, `se2.stop`

##### Fade out sound

```yaml
- name: bgm.fadeOut
  parameters:
    duration: 500
    stop: true
    wait: false
  # condition: expression
```

- Command name : `bgm.fadeOut`, `bgm2.fadeOut`, `se.fadeOut`, `se2.fadeOut`
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after playing sound complete.

##### Fade in sound

```yaml
- name: bgm.fadeIn
  parameters: { duration: 500 }
  # condition: expression
```

- Command name : `bgm.fadeIn`, `bgm2.fadeIn`

##### Pause sound

```yaml
- name: bgm.pause
  # condition: expression
```

- Command name : `bgm.pause`, `bgm2.pause`

##### Resume sound

```yaml
- name: bgm.resume
  # condition: expression
```

- Command name : `bgm.resume`, `bgm2.resume`

##### Mute sound

```yaml
- name: bgm.mute
  # condition: expression
```

- Command name : `bgm.mute`, `bgm2.mute`, `se.mute`, `se2.mute`

##### Unmute sound

```yaml
- name: bgm.unmute
  # condition: expression
```

- Command name : `bgm.unmute`, `bgm2.unmute`, `se.unmute`, `se2.unmute`

#### Camera

##### Camera properties

```yaml
- name: camera.set
  parameters:
    x:
    y:
    rotate:
    zoom:
    name:
  # condition: expression
```

- `x`, `y` : Scroll
- `rotate` : Rotate in degree
- `zoom` : Zoom
- `name` : Target camera indexed by name. Default is main camera.

Run next command immediately.

##### Fade in

```yaml
- name: camera.fadeIn
  parameters:
    duration: 1000
    red:
    green:
    blue:
    name:
    wait: false
  # condition: expression
```

- `duration`, `red`, `green`, `blue` : See [fade effect](camera-effects.md/#fade)
- `name` : Target camera indexed by name. Default is main camera.
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Fade out

```yaml
- name: camera.fadeOut
  parameters:
    duration: 1000
    red:
    green:
    blue:
    name:
    wait: false
  # condition: expression
```

- `duration`, `red`, `green`, `blue` : See [fade effect](camera-effects.md/#fade)
- `name` : Target camera indexed by name. Default is main camera.
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Flash

```yaml
- name: camera.flash
  parameters:
    duration: 1000
    red:
    green:
    blue:
    name:
    wait: false
  # condition: expression
```

- `duration`, `red`, `green`, `blue` : See [flash effect](camera-effects.md/#flash)
- `name` : Target camera indexed by name. Default is main camera.
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Shake

```yaml
- name: camera.shake
  parameters:
    duration: 1000
    intensity:
    name:
    wait: false
  # condition: expression
```

- `duration`, `intensity` : See [shake effect](camera-effects.md/#shake)
- `name` : Target camera indexed by name. Default is main camera.
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Zoom

```yaml
- name: camera.zoomTo
  parameters:
    duration: 1000
    zoom:
    name:
    wait: false
  # condition: expression
```

- `duration`, `zoom` : See [zoom effect](camera-effects.md/#zoom)
- `name` : Target camera indexed by name. Default is main camera.
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Rotate to

```yaml
- name: camera.rotateTo
  parameters:
    duration: 1000
    rotate: 
    ease: 
    name: 
    wait: false
  # condition: expression
```

- `duration`, `rotate`, `ease` : See [rotateTo effect](camera-effects.md/#rotate-to)
- `name` : Target camera indexed by name. Default is main camera.
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

##### Scroll to

```yaml
- name: camera.scrollTo
  parameters:
    duration: 1000
    x: 
    y: 
    ease:
    name: 
    wait: false
  # condition: expression
```

- `duration`, `x`, `y`, `ease` : Scroll to position.
- `name` : Target camera indexed by name. Default is main camera.
- `wait` :
    - `false` : Run next command immediately. Default behavior.
    - `true` : Run next command after effect complete.

#### Add custom command

```javascript
commandExecutor.addCommand(commandName, function(config, eventSheetManager){
    // var resumeCallback = eventSheetManager.pauseEventSheet();
    // ... 
    // resumeCallback()
}, scope);
```

- `config` : Parameters passed from [event sheet](yamleventsheets.md#custom-command).
- `eventSheetManager` : This event mangager.
    - Pause running of current event sheet
        ```javascript
        var resumeCallback = eventSheetManager.pauseEventSheet();
        //  resumeCallback();  // Resume running of current event sheet
        ```
    - Pause running of current event sheet until another `eventName` firing from `eventEmitter`
        ```javascript
        eventSheetManager.pauseEventSheetUnitlEvent(eventEmitter, eventName);
        ```
