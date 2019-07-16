const PI = Math.PI;
var Sine = function (t) { // t: 0(0) - 1(pi)
    return (Math.cos(t * PI) + 1) / 2;
}

export default Sine;