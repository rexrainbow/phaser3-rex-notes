import MarkedEventSheets from '../../plugins/logic/markedeventsheets/MarkedEventSheets';
import EventEmitter from 'eventemitter3';

var content = `\
# Title

## Condition

coin > 5

## Condition

hp > 0

## Script

print
  text=Hello

\`\`\`print
World


World
\`\`\`

`;

class TaskHandlers extends EventEmitter {
    print(config, blackboard) {
        console.log(config.text);
        this.wait(1000);
        return this;
        // Task will be running until 'complete' event fired
    }

    wait(config, blackboard) {
        if (typeof (config) === 'number') {
            config = { duration: config };
        }

        var self = this;
        setTimeout(function () {
            self.complete();
        }, config.duration)
        return this;
    }

    complete() {
        this.emit('complete');
        return this;
    }
}
var taskHandlers = new TaskHandlers();

var manager = new MarkedEventSheets({
    taskHandlers: taskHandlers
});
manager.addEventSheet(content);
console.log(manager.dumpTree())

manager
    .setData('coin', 1)
    .setData('hp', 4)
    .tick()

console.log(manager.dumpData())
