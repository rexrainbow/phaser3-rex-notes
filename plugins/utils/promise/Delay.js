var Delay = function (s, result) {
    if (s === undefined) {
        s = 0;
    }
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(result)
        }, s);
    });
};

export default Delay;