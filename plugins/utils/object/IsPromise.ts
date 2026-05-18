var IsPromise = function(obj?: any) {
    return obj && (typeof obj.then === 'function');
}

export default IsPromise;