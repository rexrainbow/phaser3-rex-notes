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
    d: [1, 2, 3]
};
data = AddDataMonitor({
    data: data,
    eventEmitter: eventEmitter
});

console.log(JSON.stringify(data));

console.log('----')

data.d[0] = 100;
data.d.shift();
console.log(`data.d.length = ${data.d.length}`);

data.f = [5, 6, 7];
data.f[0] = 50;
data.f.shift();
console.log(`data.f.length = ${data.f.length}`);

console.log(JSON.stringify(data));