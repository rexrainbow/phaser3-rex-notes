var Sum = function() {
    return Array.prototype.reduce.call(arguments, Add, 0);
}

var Add = function(a?: any, b?: any) {
    return a + b;
}

export default Sum;