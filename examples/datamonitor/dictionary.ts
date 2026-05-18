import EventEmitter from 'eventemitter3';
import AddDataMonitor from '../../plugins/utils/proxy/datamonitor/AddDataMonitor';

var eventEmitter = new EventEmitter();
eventEmitter
    .on('add', function (path, value) {
        console.log(`add key ${path} = ${value}`);
    })
    .on('set', function (path, value) {
        console.log(`set key ${path} = ${value}`);
    })

var data = {
    c: { a: 10, b: 20 },
};
data = AddDataMonitor({
    data: data,
    eventEmitter: eventEmitter
});

console.log(JSON.stringify(data));

console.log('----')
data.c.a = 10;
data.c.a = 30;

data.e = { a: 100, b: 200 }
data.e.a = 300;

console.log(JSON.stringify(data));