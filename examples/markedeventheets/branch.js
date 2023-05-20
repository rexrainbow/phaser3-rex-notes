import MarkedEventSheets from '../../plugins/markedeventsheets.js';
import EventEmitter from 'eventemitter3';
import beforeEventSheet from 'raw-loader!/assets/markedeventsheet/branch/0.before.md';
import ifAEventSheet from 'raw-loader!/assets/markedeventsheet/branch/1.if-a.md';
import ifBEventSheet from 'raw-loader!/assets/markedeventsheet/branch/2.if-b.md';
import elseEventSheet from 'raw-loader!/assets/markedeventsheet/branch/3.else.md';
import afterEventSheet from 'raw-loader!/assets/markedeventsheet/branch/4.after.md';

class TaskHandlers extends EventEmitter {
    constructor({
        waitDuration = 1000
    } = {}) {
        super();

        this.defaultWaitDuration = waitDuration;
    }

    print({
        text = '',
        template
    } = {}, manager) {
        text = manager.renderString(text);
        console.log(text);
    }

    set(config, manager) {
        for (var name in config) {
            manager.setData(name, config[name]);
        }
    }

    wait({
        duration = this.defaultWaitDuration
    } = {}, manager) {
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

var manager = new MarkedEventSheets({
    commandExecutor: new TaskHandlers(),
    // parallel: true
});

manager
    .addEventSheet(beforeEventSheet)
    .addEventSheet(ifAEventSheet)
    .addEventSheet(ifBEventSheet)
    .addEventSheet(elseEventSheet)
    .addEventSheet(afterEventSheet)

console.log(manager.dumpTrees())

manager
    .setData('coin', 8)
    .on('eventsheet.enter', function (title) {
        console.log(`..Enter event sheet '${title}'..`)
    })
    .on('eventsheet.exit', function (title) {
        console.log(`..Exit event sheet '${title}'..`)
    })
    .on('eventsheet.catch', function (title) {
        console.log(`..Fail event sheet '${title}'..`)
    })
    .on('complete', function () {
        console.log('..Execute events complete..')
    })
    .start()

console.log(manager.memory)
