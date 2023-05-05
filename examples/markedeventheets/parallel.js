import MarkedEventSheets from '../../plugins/logic/eventsheets/markedeventsheets/MarkedEventSheets.js';
import EventEmitter from 'eventemitter3';
import eventSheet0 from 'raw-loader!/assets/markedeventsheet/parallel0.md';
import eventSheet1 from 'raw-loader!/assets/markedeventsheet/parallel1.md';

class TaskHandlers extends EventEmitter {
    print(config, blackboard) {
        console.log(config.text);
    }

    set(config, blackboard) {
        for (var name in config) {
            blackboard.set(name, config[name]);
        }
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
}
var taskHandlers = new TaskHandlers();

var manager = new MarkedEventSheets({
    taskHandlers: taskHandlers,
    parallel: true
});
manager
    .addEventSheet(eventSheet0)
    .addEventSheet(eventSheet1);

console.log(manager.dumpTrees())

manager
    .setData('coin', 10)
    .tick()

console.log(manager.dumpData())
