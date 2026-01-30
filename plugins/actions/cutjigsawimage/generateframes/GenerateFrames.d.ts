export default GenerateFrames;

declare namespace GenerateFrames {
    /**
     * Edge mode values for a piece.
     */
    type EdgeModeType = {
        left: number,
        right: number,
        top: number,
        bottom: number,
    };

    /**
     * 2D array of edge modes.
     */
    type EdgesType = (EdgeModeType | string)[][];
    /**
     * Callbacks for edge generation.
     */
    type GetEdgeCallbacksType = {
        getRightEdge?: (c: number, r: number) => number,
        getBottomEdge?: (c: number, r: number) => number,
    }

    /**
     * Callback to draw a piece shape.
     *
     * @param graphics - Graphics object.
     * @param width - Frame width.
     * @param height - Frame height.
     * @param edgeWidth - Edge width.
     * @param edgeHeight - Edge height.
     * @param edgeMode - Edge mode values.
     */
    type DrawShapeCallbackType = (
        graphics: Phaser.GameObjects.Graphics,
        width: number,
        height: number,
        edgeWidth: number,
        edgeHeight: number,
        edgeMode: EdgeModeType
    ) => void;

    /**
     * Configuration options for GenerateFrames.
     */
    interface IConfig {
        /**
         * Source texture key.
         */
        sourceKey: string,
        /**
         * Destination texture key.
         */
        destinationKey: string,
        /**
         * Number of columns.
         */
        columns: number,
        /**
         * Number of rows.
         */
        rows: number,
        /**
         * Frame padding.
         */
        framePadding?: number,
        /**
         * Edge width.
         */
        edgeWidth?: number,
        /**
         * Edge height.
         */
        edgeHeight?: number,
        /**
         * Edge definitions or callbacks.
         */
        edges?: EdgesType | GetEdgeCallbacksType,
        /**
         * Shape draw callback.
         */
        drawShapeCallback?: DrawShapeCallbackType,
        /**
         * Use dynamic texture.
         */
        useDynamicTexture?: boolean,
    }

    /**
     * Generated frame data result.
     */
    interface IResult {
        /**
         * Source texture key.
         */
        sourceKey: string,
        /**
         * Destination texture key.
         */
        destinationKey: string,
        /**
         * Number of columns.
         */
        columns: number,
        /**
         * Number of rows.
         */
        rows: number,
        /**
         * Frame width.
         */
        frameWidth: number,
        /**
         * Frame height.
         */
        frameHeight: number,
        /**
         * Edge width.
         */
        edgeWidth: number,
        /**
         * Edge height.
         */
        edgeHeight: number,
        /**
         * Frame name callback.
         */
        getFrameNameCallback: DrawShapeCallbackType,
    }
}

/**
 * Generate jigsaw frames for a texture.
 *
 * @param scene - Scene instance.
 * @param config - Configuration options.
 * @returns Generated frame data.
 */
declare function GenerateFrames(
    scene: Phaser.Scene,
    config: GenerateFrames.IConfig
): GenerateFrames.IResult;
