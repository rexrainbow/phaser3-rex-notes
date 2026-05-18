var JigsawPieceBase = function(GOClass?: any) {
    class BassClass extends (GOClass) {
    edgeHeight: any;
    edgeWidth: any;

    drawShapeCallback: any;
    sourceKey: any;


        init(config?: any) {

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

        setBaseKey(key?: any) {
            this.sourceKey = key;
            return this;
        }

        setDrawShapeCallback(callback?: any) {
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