'use strict'

var Width = function (hexagon) {
    return (hexagon.type === 0) ? (2 * hexagon.size) : (Math.sqrt(3) * hexagon.size);
};

export default Width;