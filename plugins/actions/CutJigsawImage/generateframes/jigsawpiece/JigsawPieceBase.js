var JigsawPieceBase = function (GOClass) {
    class BassClass extends (GOClass) {

        init(config) {

            this.setBaseKey(config.key);
            this.setDrawShapeCallback(config.drawShapeCallback);

            var edgeWidth = config.edgeWidth;
            if (edgeWidth === undefined) {
                edgeWidth = Math.floor(config.width / 7);
            }
            this.edgeWidth = edgeWidth;

            var edgeHeight = config.edgeHeight;
            if (edgeHeight === undefined) {
                edgeHeight = Math.floor(config.height / 7);
            }
            this.edgeHeight = edgeHeight;

            return this;
        }

        setBaseKey(key) {
            this.sourceKey = key;
            return this;
        }

        setDrawShapeCallback(callback) {
            this.drawShapeCallback = callback;
            return this;
        }

        // Override
        drawPiece({
            scrollX, scrollY,
            edgeMode,
        }) {

        }
    }

    return BassClass;
}

export default JigsawPieceBase;