import MarkedEventSheets from '../../plugins/logic/eventsheets/markedeventsheets/MarkedEventSheets.js';
import EventEmitter from 'eventemitter3';
import mustache from 'mustache';
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
        text = mustache.render(text, manager.memory);
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
    taskHandlers: new TaskHandlers(),
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
    .on('enter', function (title) {
        console.log(`..Enter event sheet '${title}'..`)
    })
    .on('exit', function (title) {
        console.log(`..Exit event sheet '${title}'..`)
    })
    .on('catch', function (title) {
        console.log(`..Fail event sheet '${title}'..`)
    })
    .on('complete', function () {
        console.log('..Execute events complete..')
    })
    .start()

console.log(manager.dumpData())
