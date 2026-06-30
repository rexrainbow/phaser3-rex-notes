const IsPromiseLike = function (value) {
    return value && (typeof value.then === 'function');
}

const AwaitCallback = async function (callback, ...args) {
    var result = callback(...args);
    if (IsPromiseLike(result)) {
        await result;
    }
    return result;
}

export default AwaitCallback;
