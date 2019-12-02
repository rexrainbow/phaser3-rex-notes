var Delay = function (s) {
    if (s === undefined) {
        s = 0;
    }
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, s);
    });
};

export default Delay;