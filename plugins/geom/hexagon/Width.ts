const SQRT3 = Math.sqrt(3);

var Width = function(hexagon?: any) {
    return (hexagon.type === 0) ? (2 * hexagon.size) : (SQRT3 * hexagon.size);
};

export default Width;