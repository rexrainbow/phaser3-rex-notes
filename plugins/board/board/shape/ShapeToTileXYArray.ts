var ShapeToTileXYArray = function(shape?: any, config?: any, out?: any) {
    if (typeof (config) === 'number') {
        config = {
            testMode: config
        }
    }

    if (Array.isArray(config)) {
        out = config;
        config = undefined;
    }

    if (out === undefined) {
        out = [];
    }

    this.forEachTileXYInShape(
        shape,
        function(tileXY?: any) {
            out.push({ x: tileXY.x, y: tileXY.y });
        },
        undefined,
        config
    );

    return out;
};

export default ShapeToTileXYArray;