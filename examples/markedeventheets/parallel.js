import MarkedEventSheets from '../../plugins/logic/eventsheets/markedeventsheets/MarkedEventSheets.js';
import EventEmitter from 'eventemitter3';
import eventSheet0 from 'raw-loader!/assets/markedeventsheet/parallel0.md';
import eventSheet1 from 'raw-loader!/assets/markedeventsheet/parallel1.md';

class TaskHandlers extends EventEmitter {
    print(config, manager) {
        console.log(config.text);
    }

    set(config, manager) {
        for (var name in config) {
            manager.setData(name, config[name]);
        }
    }

    wait(config, manager) {
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
