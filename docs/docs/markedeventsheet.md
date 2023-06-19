## Introduction

Event sheets contains main condition(s) and actions, in simple markdown format.

- Author: Rex
- Member of scene

## Live demos

- [Command executor](https://codepen.io/rexrainbow/pen/eYPLVmM)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/markedeventheets)

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
- `parallel` :
    - `false` : Test condition then execute event sheet one by one. Default behavior.
    - `true` : Test all condition of event sheets then execute event sheets one by one.


### Add event sheet

```javascript
eventSheetManager.addEventSheet(content, {
    commentLineStart: '\/\/',
    lineBreak: '\\',
    parallel: undefined
})
```

or

```javascript
eventSheetManager.addEventSheet(content, groupName, {
    commentLineStart: '\/\/',
    lineBreak: '\\',
    parallel: undefined
})
```

- `content` : See [structure of event sheet](markedeventsheet.md#structure-of-event-sheet)
- `commentLineStart` : Content line start by this symobl (default value is `//`) will be ignored as a comment line.
- `lineBreak` : Markdown will use `\` as line break. So the last character `\` will be discarded.
- `parallel` : 
    - `undefined` : Use default `parallel` property.
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

- Dump state of event sheets in default group
    ```javascript
    var states = eventSheetManager.dumpState();
    ```
- Dump state of event sheets in a specific group
    ```javascript
    var states = eventSheetManager.dumpState(groupName);
    ```
- Load state of event sheet in default group
    ```javascript
    eventSheetManager.loadState(states);
    ```
- Load state of event sheet in a specific group
    ```javascript
    eventSheetManager.loadState(states, groupName);
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

```md
# Title

## [Condition]

coin > 5

## Script

## [Catch]

```

- H1 heading: Title of this event sheet
- H2 heading with `[Condition]` : Main condition.    
    - Each line under `[Condition]` is a boolean equation, composed of `AND` logic.
    - Can have many `[Condition]` heading, each `[Condition]` heading will be composed of `OR` logic.
    - Read data from [local memory](markedeventsheet.md#local-memory)
- H2 headings between `[Condition]` and `[Catch]` : Actions when main condition is `true`.
    - [Flow control instructions of headings](markedeventsheet.md#flow-control-instructions)
    - Actions : [Custom command](markedeventsheet.md#custom-command)
- H2 heading with `[Catch]` : Actions when main condition is `false`.

#### Flow control instructions

##### Simple branch

```md
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

##### While loop

```md
## [While]

loopCount > 0

### Label

```

- H2/H3/... heading with `[While]` : While loop
    - Each line under `[While]` is a boolean equation, composed of `AND` logic.
    - Read data from [local memory](markedeventsheet.md#local-memory)
- H3/H4/... heading under `[While]` : Actions running when condition is `true`

##### Break

```md
[break]
```

- Action line with `[break]` : Ignore remainder actions in current label (heading).

##### Exit

```md
[exit]
```

- Action line with `[exit]` : Skip remainder label (heading) and actions.

#### Custom command

```md

commandName
  param0=value
  param1=value

```

- Each command is divided by space line. i.e. add space lines above and below command.
- First line is the command name.
    1. Invoke `commandExecutor.commandName` method if this `commandName` method is existed.
        ```javascript
        commandName(config, manager) {
            // return eventEmitter;
        }
        ``` 
        - `config` : Parameter and value in a dictionary.
        - `manager` : This event mangager.
        - Return value :
            - `undefined`, `null` : Run next command immediately.
            - `eventEmitter` : Run next command until `eventEmitter` emits `'complete'` event.
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

