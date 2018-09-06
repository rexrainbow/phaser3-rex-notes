'use strict'

var Height = function (hexagon) {
    return (hexagon.type === 0) ? (Math.sqrt(3) * hexagon.size) : (2 * hexagon.size);
};

export default Height;