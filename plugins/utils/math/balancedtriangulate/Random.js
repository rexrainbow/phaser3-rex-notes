var Random = function (variation) {
    var a = 0.5 - variation;
    var b = 0.5 + variation;

    return a + (Math.random() * (b - a));
}

export default Random