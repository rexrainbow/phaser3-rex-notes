var Sum = function (array) {
    return array.reduce(Add, 0);
}

var Add = function (a, b) {
    return a + b;
}

export default Sum;