import AddMonitor from './AddMonitor.js';

var AddDataMonitor = function ({
    data = {},
    eventEmitter,
    eventNames,
    parentPath = '',
}) {

    if (!eventNames) {
        eventNames = {};
    } else {
        eventNames = { ...eventNames };
    }

    if (!eventNames.hasOwnProperty('addKey')) {
        eventNames.addKey = 'add';
    }
    if (!eventNames.hasOwnProperty('setKey')) {
        eventNames.setKey = 'set';
    }
    if (!eventNames.hasOwnProperty('deleteKey')) {
        eventNames.deleteKey = 'del';
    }

    var proxyData = AddMonitor(data, eventEmitter, eventNames, parentPath);

    return proxyData;
}

export default AddDataMonitor;