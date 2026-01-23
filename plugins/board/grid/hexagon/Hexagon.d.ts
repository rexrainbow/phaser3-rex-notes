import { WorldXYType, TileXYType } from '../../types/Position';
import Rectangle from '../../../utils/geom/rectangle/Rectangle';

export default Hexagon;

declare namespace Hexagon {

    /**
     * Stagger axis types for hexagon grids.
     */
    type HexagonGridStaggerAxisTypes = 0 | 1 | 'y' | 'x';
    /**
     * Stagger index types for hexagon grids.
     */
    type HexagonGridStaggerindexTypes = 0 | 1 | 'even' | 'odd';

    /**
     * Hexagon grid configuration.
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
         * Cell radius.
         */
        size?: number,
        /**
         * Cell width.
         */
        cellWidth?: number,
        /**
         * Cell height.
         */
        cellHeight?: number,

        /**
         * Stagger axis.
         */
        staggeraxis?: HexagonGridStaggerAxisTypes,
        /**
         * Stagger index.
         */
        staggerindex?: HexagonGridStaggerindexTypes
    }

}

/**
 * Hexagon grid coordinate converter.
 */
declare class Hexagon {
    /**
     * Create a hexagon grid.
     * @param config - Hexagon grid configuration.
     */
    constructor(config?: Hexagon.IConfig);

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
     * Set cell radius.
     * @param size - Cell radius.
     * @returns This instance.
     */
    setCellRadius(size: number): this;
    /**
     * Cell radius.
     */
    readonly size: number;

    /**
     * Set grid type.
     * @param staggeraxis - Stagger axis.
     * @param staggerindex - Stagger index.
     * @returns This instance.
     */
    setType(
        staggeraxis: Hexagon.HexagonGridStaggerAxisTypes,
        staggerindex: Hexagon.HexagonGridStaggerindexTypes
    ): this;
    /**
     * Stagger axis value.
     */
    readonly staggeraxis: number;
    /**
     * Stagger index value.
     */
    readonly staggerindex: number;
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
     * @param out - Optional output object.
     * @returns Rectangle bounds.
     */
    getBounds(
        tileX: number,
        tileY: number,
        out?: Rectangle
    ): Rectangle;
}
