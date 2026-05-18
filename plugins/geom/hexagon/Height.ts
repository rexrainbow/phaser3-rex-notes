const SQRT3 = Math.sqrt(3);

var Height = function(hexagon?: any) {
    return (hexagon.type === 0) ? (SQRT3 * hexagon.size) : (2 * hexagon.size);
};

export default Height;