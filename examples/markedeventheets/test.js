import MarkedEventSheets from '../../plugins/logic/markedeventsheets/MarkedEventSheets';
import EventEmitter from 'eventemitter3'

var content = `\
# Title

## Condition

coin > 5

## Condition

hp > 0

## Script

print
  text=Hello

`;

class TaskHandlers extends EventEmitter {
    print(config, blackboard) {
        console.log(config.text);
        return this;
        // Task will be running until 'complete' event fired
    }
}
var taskHandlers = new TaskHandlers();

var manager = new MarkedEventSheets({
    taskHandlers: taskHandlers
});
manager.addEventSheet(content);
console.log(manager.dump())

manager
    .setData('coin', 1)
    .setData('hp', 4)
    .tick()
console.log(manager.isRunning);
