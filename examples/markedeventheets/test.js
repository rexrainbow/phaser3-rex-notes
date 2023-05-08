import MarkedEventSheets from '../../plugins/logic/eventsheets/markedeventsheets/MarkedEventSheets.js';
import EventEmitter from 'eventemitter3';
import mustache from 'mustache';
import content from 'raw-loader!/assets/markedeventsheet/sample.md';

class TaskHandlers extends EventEmitter {
    print({ text = '' } = {}, manager) {
        text = mustache.render(text, manager.memory);
        console.log(text);
        this.wait({ duration: 1000 });
        return this;
        // Task will be running until 'complete' event fired
    }

    set(config, manager) {
        for (var name in config) {
            var value = manager.evalExpression(config[name]);
            manager.setData(name, value);
        }
    }

    wait({ duration = 1000 } = {}, manager) {
        var self = this;
        setTimeout(function () {
            self.complete();
        }, duration)
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
console.log(manager.dumpTrees())

manager
    .setData('coin', 1)
    .setData('hp', 4)
    .start()

console.log(manager.dumpData())
