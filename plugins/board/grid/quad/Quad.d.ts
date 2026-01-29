import { WorldXYType, TileXYType } from '../../types/Position';
import Rectangle from '../../../utils/geom/rectangle/Rectangle';

export default Quad;

declare namespace Quad {

    /**
     * Quad grid types.
     */
    type QuadGridTypes = 0 | 1 | 'orthogonal' | 'isometric';
    /**
     * Quad grid direction modes.
     */
    type QuadGridDirTypes = 4 | 8 | '4dir' | '8dir';

    /**
     * Quad grid configuration.
     */
    interface IConfig {
        /**
         * Origin x.
         */
        x?: number,
        /**
         * Origin y.
         */
        y?: number,
        /**
         * Cell width.
         */
        cellWidth?: number,
        /**
         * Cell height.
         */
        cellHeight?: number,

        /**
         * Grid type.
         */
        type?: QuadGridTypes,

        /**
         * Direction mode.
         */
        dir?: QuadGridDirTypes
    }

}

/**
 * Quad grid coordinate converter.
 */
declare class Quad {
    /**
     * Create a quad grid.
     * @param config - Quad grid configuration.
     */
    constructor(config?: Quad.IConfig);

    /**
     * Set origin position.
     * @param worldX - Origin world x.
     * @param worldY - Origin world y.
     * @returns This instance.
     */
    setOriginPosition(
        worldX: number,
        worldY: number
    ): this;
    /**
     * Origin world x.
     */
    x: number;
    /**
     * Origin world y.
     */
    y: number;

    /**
     * Set cell size.
     * @param width - Cell width.
     * @param height - Cell height.
     * @returns This instance.
     */
    setCellSize(
        width: number,
        height: number
    ): this;
    /**
     * Cell width.
     */
    width: number;
    /**
     * Cell height.
     */
    height: number;

    /**
     * Set grid type.
     * @param type - Grid type.
     * @returns This instance.
     */
    setType(
        type: Quad.QuadGridTypes
    ): this;
    /**
     * Grid mode value.
     */
    readonly mode: number;

    /**
     * Convert tile position to world position.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param out - Optional output object or true to create.
     * @returns World position.
     */
    getWorldXY(
        tileX: number,
        tileY: number,
        out?: WorldXYType | true
    ): WorldXYType;

    /**
     * Convert world position to tile position.
     * @param worldX - World x.
     * @param worldY - World y.
     * @param out - Optional output object or true to create.
     * @returns Tile position.
     */
    getTileXY(
        worldX: number,
        worldY: number,
        out?: TileXYType | true
    ): TileXYType;

    /**
     * Get grid points of a tile.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param points - Optional output array.
     * @returns Grid points in world coordinates.
     */
    getGridPoints(
        tileX: number,
        tileY: number,
        points?: WorldXYType[]
    ): WorldXYType[];

    /**
     * Get bounds of a tile.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param out - Optional output object or true to create.
     * @returns Rectangle bounds.
     */
    getBounds(
        tileX: number,
        tileY: number,
        out?: Rectangle | true
    ): Rectangle;
}
