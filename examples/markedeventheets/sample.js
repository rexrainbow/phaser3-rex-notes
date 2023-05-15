import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import content from 'raw-loader!/assets/markedeventsheet/sample.md';

class TaskHandlers extends EventEmitter {
    print({ text = '' } = {}, manager) {
        text = manager.renderString(text);
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

manager.
    on('label.enter', function (title) {
        console.log(`Enter label '${title}'`)
    })
    .on('label.exit', function (title) {
        console.log(`Exit label '${title}'`)
    })

manager
    .setData('金幣', 1)
    .setData('hp', 4)
    .start()

console.log(manager.memory)
