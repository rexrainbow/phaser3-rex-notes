var WaitEvent = function(eventEmitter?: any, eventName?: any) {
    return new Promise(function(resolve?: any, reject?: any) {
        eventEmitter.once(eventName, function() {
            resolve();
        });
    });
}

var WaitComplete = function(eventEmitter?: any) {
    return WaitEvent(eventEmitter, 'complete');
}

export { WaitEvent, WaitComplete };