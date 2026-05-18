var Delay = function(time?: any, result?: any) {
    if (time === undefined) {
        time = 0;
    }
    return new Promise(function(resolve?: any, reject?: any) {
        setTimeout(function() {
            resolve(result)
        }, time);
    });
};

export default Delay;