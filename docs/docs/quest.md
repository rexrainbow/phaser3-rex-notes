## Introduction

Question manager.

- Author: Rex
- Member of scene, or game object

## Source code

[Plugin](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/quest-plugin.js), [minify](https://github.com/rexrainbow/phaser3-rex-notes/blob/master/plugins/dist/rexquestplugin.min.js)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/quest)

User could import class directly, or install it by global plugin.

### Import class

```javascript
import rexQuest from './plugins/quest.js';
```

### Install global plugin

Install plugin in [configuration of game](game.md#configuration)

```javascript
import QuestPlugin from './plugins/quest-plugin.js';

var config = {
    // ...
    plugins: {
        global: [{
            key: 'rexQuest',
            plugin: QuestPlugin,
            start: true
        },
        // ...
        ]
    }
    // ...
};
var game = new Phaser.Game(config);
```

### Question manager

#### Create question manager instance

```javascript
var questionManager = scene.plugins.get('rexQuest').add({
    questions: undefined,
    // delimiter: ',',
    // types: {
    //     question: 'q',
    //     option: '',
    // },
    // convert: true,

    quest: undefined,
    // quest: {
    //     shuffleQuestions: false,
    //     shuffleOptions: false,
    // }
});
```

- `questions` : An array of question objects, or a csv string.
    - An array : Question items array.
        ```javascript
        [
            {
                key: q0,
                param0: value0,
                param1: value1,
                param2: value2,
                options: [
                    {
                        key: o0,
                        param0: value0,
                        param1: value1,
                        // ...
                    },
                    {
                        key: o1,
                        param0: value0,
                        param1: value1,
                        // ...
                    }
                ]
            },
            {
                key: q1,
                param0: value0,
                param1: value1,
                param2: value2,
                options: [
                    {
                        key: o0,
                        param0: value0,
                        param1: value1,
                        // ...
                    },
                    {
                        key: o1,
                        param0: value0,
                        param1: value1,
                        // ...
                    }
                ]
            },
        ]
        ```
        - Question object : `{key, options, param, ...}`
            - `key` : An unique key string. Create a key string `'_' + serialNumber` if not given.
            - `options` : An array of option objects.
            - Other key-value parameters.
        - Option object : `{key, param, ...}`
           - `key` : An unique key string. Create a key string `'_' + serialNumber` if not given.
           - Other key-value parameters.
    - A csv string :
        ```raw
        type,key,param0,param1,...
        q,q0,value0,value1,...
        ,o0,value0,value1,...
        ,o1,value0,value1,...
        q,q1,value0,value1,...
        ,o0,value0,value1,...
        ,o1,value0,value1,...
        ```
        - Fields in first row
            - `type` : Type of this row. These values can be redefined via `types` in configuration object.
               - `q` : A row of question object.
               - Empty string : A row of option object belong a question object.
            - `key` : Unique key string. Create a key string `'_' + serialNumber` if this field does not exist.
            - Other fields.
- `delimiter` : Delimiter of csv string. Default value is `','`
- `types` : Define value of row type.
    - `types.question` : Define value of question row. Default value is `q`.
    - `types.option` : Define value of option row. Default value is `''` (empty string).
- `convert` : Convert string values to other types.
    - Default type converting : Convert string to *number*, *boolean*, *null*, or *string*
        - `'0'`, `'1'`, ... (number string) -> number
        - `'true'`, or `'false'` -> `true` or `false`
        - `''` (empty string) -> `null`
        - Others : string.
    - Set `false` to ignore types converting, i.e. all values are string.
    - A custom type converting function :
        ```javascript
        function(stringValue, key) {
            // return value;
        }
        ```
- `quest` : Create a private quest task object.
   - `undefined` : Don't create a private quest task object.
   - `true` : Create a private quest task object with default configuration.
   - Configuration of quest task :
       - `quest.shuffleQuestions` : Set `true` to shuffle questions.
       - `quest.shuffleOptions` : Set `true` to shuffle options.

#### Add questions

```javascript
questionManager.add(questions, config);
```

- `questions` : An array of question objects, or a csv string. See `questions` section in [Create question manager instance](quest.md#create-question-manager-instance) section.
- `config` :
    - `delimiter` : Delimiter of csv string. Default value is `','`
    - `types` : Define value of row type.
        - `types.question` : Define value of question row. Default value is `q`.
        - `types.option` : Define value of option row. Default value is `''` (empty string).
    - `convert` : Convert string values to other types.
        - Default type converting : Convert string to *number*, *boolean*, *null*, or *string*
            - `'0'`, `'1'`, ... (number string) -> number
            - `'true'`, or `'false'` -> `true` or `false`
            - `''` (empty string) -> `null`
            - Others : string.
        - Set `false` to ignore types converting, i.e. all values are string.
        - A custom type converting function :
            ```javascript
            function(stringValue, key) {
                // return value;
            }
            ```

#### Remove question

- Remove a question object
    ```javascript
    questionManager.remove(key);
    ```
    - `key` : An unique key string.
- Remove all question objects
    ```javascript
    questionManager.removeAll(key);
    ```

#### Get question

- Get a question object
    ```javascript
    var question = questionManager.get(key);
    ```
- Get all keys of question objects
    ```javascript
    var questionKeys = questionManager.getKeys();
    // var out = questionManager.getKeys(out);
    ```
    - `questionKeys` : Array of question key string.

#### Question is existed

```javascript
var isExisted = questionManager.has(key);
```

#### Array of questions

```javascript
var questions = questionManager.questions;
```

Rearrange items of this `questions` array to reorder questions in quest task.

#### Get option

```javascript
var option = questionManager.getOption(question, optionKey);
```

- `question` : A question object, or a question key string.
- `optionKey` : A option key string.

#### Private quest task

##### Create private quest task

Each question manager can hava a private quest task object, created when [creating question manager](quest.md#create-question-manager-instance), or

```javascript
questionManager.startQuest(config);
```

- `config` : 
    - `shuffleQuestions` : Set `true` to shuffle questions.
    - `shuffleOptions` : Set `true` to shuffle options.

##### Get next question object

- Get next question object
    ```javascript
    var question = questionManager.getNextQuestion();
    ```
- Get next question object via question key
    ```javascript
    var question = questionManager.getNextQuestion(questionKey);
    ```

###### Event

- Fire `'quest'` when calling `questionManager.getNextQuestion()`
    ```javascript
    questionManager.on('quest', function(question, questionManager, quest){
        // questionManager.getNextQuestion();
    })
    ```
    - `question` : Question object.
        - `question.options` : Option objects of this question.
    - `questionManager` : Question manager.
    - `quest` : Quest task.

##### Is last question

```javascript
var isLast = questionManager.isLastQuestion();
```

##### Restart quest task

```javascript
questionManager.restartQuest();
```

##### Private data

- Get data
    ```javascript
    var value = questionManager.getData(key, defaultValue);
    ```
- Get all data
    ```javascript
    var data = questionManager.getData();
    ```
- Set value
    ```javascript
    questionManager.setData(key, value);
    ```
- Increase value
    ```javascript
    questionManager.incData(key, inc, defaultValue);
    ```
- Multiple value
    ```javascript
    questionManager.mulData(key, inc, defaultValue);
    ```
- Clear all data
    ```javascript
    questionManager.clearData();
    ```

### Quest task

Create new quest task if user needs more then 1 quest task.

#### Create quest task

```javascript
var quest = questionManager.newQuest(config);
```

- `config` : 
    - `shuffleQuestions` : Set `true` to shuffle questions.
    - `shuffleOptions` : Set `true` to shuffle options.

#### Get next question object

- Get next question object
    ```javascript
    var question = quest.getNextQuestion();
    ```
- Get next question object via question key
    ```javascript
    var question = quest.getNextQuestion(questionKey);
    ```

##### Event

- Fire `'quest'` when calling `questionManager.getNextQuestion()`
    ```javascript
    quest.on('quest', function(question, questionManager, quest){
        // questionManager.getNextQuestion();
    })
    ```
    - `question` : Question object.
        - `question.options` : Option objects of this question.
    - `questionManager` : Question manager.
    - `quest` : Quest task.

#### Is last question

```javascript
var isLast = quest.isLastQuestion();
```

#### Restart quest task

```javascript
quest.start();
```

#### Private data

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

#### Get option

```javascript
var option = quest.getOption(question, optionKey);
```

- `question` : A question object, or a question key string, or `undefined` to get current question object.
- `optionKey` : A option key string.
