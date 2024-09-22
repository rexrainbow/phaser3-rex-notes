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
    a: 10,
    b: 'hello',
    c: true
};
data = AddDataMonitor({
    data: data,
    eventEmitter: eventEmitter
});

console.log(JSON.stringify(data));

console.log('----')

data.a += 30;
data.b += ' world';
data.c = !data.c;
data.e = 100;
data.e -= 30;

console.log(JSON.stringify(data));