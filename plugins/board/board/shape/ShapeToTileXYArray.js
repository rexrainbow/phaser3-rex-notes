var ShapeToTileXYArray = function (shape, containsCallback, config, out) {
    if (Array.isArray(config)) {
        out = config;
        config = undefined;
    }

    if (out === undefined) {
        out = [];
    }

    this.forEachTileXYInShape(
        shape,
        containsCallback,
        function (tileXY) {
            out.push({ x: tileXY.x, y: tileXY.y });
        },
        undefined,
        config
    );

    return out;
};

export default ShapeToTileXYArray;