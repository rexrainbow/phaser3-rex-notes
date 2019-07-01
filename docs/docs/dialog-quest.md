## Introduction

Flow control of [question manager](quest.md) with a [dialog](ui-dialog.md).

- Author: Rex
- Template

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/templates/dialog-quest/DialogQuest.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexdialogquest.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/dialog-quest)

### Create dialog-quest object

```javascript
var quest = new DialogQuest({
    dialog: dialog,

    questions: undefined,
    // delimiter: ',',
    // types: {
    //     question: 'q',
    //     option: '',
    // },
    // convert: true,

    quest: true,
    // quest: {
    //     shuffleQuestions: false,
    //     shuffleOptions: false,
    // }
});
```

- `dialog` : A [dialog](ui-dialog.md) game object.
    - **UI plugin does not included in this template**, [install](ui-dialog.md#install-scene-plugin) it before creating a dialog game object.
    - Reuse/update dialog game object for each question.
    - The number of choice buttons should be equal or larger than the maximun number of options. 
- Other parameters : See [quest](quest.md#create-question-manager-instance)

### Flow chart

```mermaid
graph TB

Start["quest.start()"] --> EventUpdateChoice["quest.emit('update-choice', choice, option, quest)<br>----<br>Update each choice button via question.option[i]"]

EventUpdateChoice --> EventUpdateDialog["quest.emit('update-dialog', dialog, question, quest)<br>----<br>Update dialog, action button via question"]

EventUpdateDialog --> EventClickChoice["quest.emit('click-choice', choice, dialog, quest)<br>----<br>Click any choice button"]

EventClickChoice --> EventClickAction["quest.emit('click-action', action, dialog, quest)<br>----<br>Click any action button"]

EventClickAction --> IsLast{"quest.isLast()"}
EventClickChoice --> IsLast

IsLast --> |No| Next["quest.next()"]
IsLast --> |Yes| Complete("Complete")

Next --> EventUpdateChoice
```

### Events

- Update dialog events
    - Update each choice button via question.option[i]
        ```javascript
        quest.on('update-choice', function(choice, option, quest){
        }, scope);
        ```
        - `choice` : Choice button game object.
            - Unused choice button game object will be hideen.
        - `option` : Option object.
        - `quest` : Quest object.
    - Update dialog, action buttos via question
        ```javascript
        quest.on('update-dialog', function(dialog, question, quest){
        }, scope);
        ```
        - `dialog` : Dialog game object.
            - Call `dialog.layout()` if needs.
        - `question` : Question object.
        - `quest` : Quest object.
- Button clicking events
    - Click choice button
        ```javascript
        quest.on('click-choice', function(choice, dialog, quest) {

        }, scope);
        ```
        - `choice` : Clicked choice button game object.
        - `dialog` : Dialog game object.
        - `quest` : Quest object.
    - Click choice button
        ```javascript
        quest.on('click-action', function(action, dialog, quest) {

        }, scope);
        ```
        - `choice` : Clicked action button game object.
        - `dialog` : Dialog game object.
        - `quest` : Quest object.

### Quest methods

- Start quest
    ```javascript
    quest.start();
    ```
- Next quest
    ```javascript
    quest.next();
    ```
    or
    ```javascript
    quest.next(key);
    ```
- Is last question
    ```javascript
    var isLast = quest.isLast();
    ```

### Private data methods

- Get data
    ```javascript
    var value = quest.getData(key, defaultValue);
    ```
- Get all data
    ```javascript
    var data = quest.getData();
    ```
- Set value
    ```javascript
    quest.setData(key, value);
    ```
- Increase value
    ```javascript
    quest.incData(key, inc, defaultValue);
    ```
- Multiple value
    ```javascript
    quest.mulData(key, inc, defaultValue);
    ```
- Clear all data
    ```javascript
    quest.clearData();
    ```