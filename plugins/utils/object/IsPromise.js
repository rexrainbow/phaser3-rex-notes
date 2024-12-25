var IsPromise = function (obj) {
    return obj && (typeof obj.then === 'function');
}

export default IsPromise;