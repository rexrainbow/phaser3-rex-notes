import ComponentBase from '../../utils/componentbase/ComponentBase';
import Board from '../board/LogicBoard';

export default ChessData;

/**
 * Chess data component for board tiles.
 */
declare class ChessData<BoardType = Board> extends ComponentBase {
    /**
     * Unique id of this chess piece.
     */
    readonly $uid: number;

    /**
     * Board instance.
     */
    readonly board: BoardType;

    /**
     * Current tile coordinates.
     */
    readonly tileXYZ: {
        /**
         * Tile x.
         */
        x: number,
        /**
         * Tile y.
         */
        y: number,
        /**
         * Tile z or layer.
         */
        z: number
    };

    /**
     * Set tile z value.
     * @param tileZ - Tile z or layer.
     * @returns This instance.
     */
    setTileZ(tileZ: number): this;

    /**
     * Get direction to a tile.
     * @param tileX - Target tile x.
     * @param tileY - Target tile y.
     * @returns Direction value.
     */
    getTileDirection(
        tileX: number,
        tileY: number
    ): this;

    /**
     * Set blocker flag.
     * @param value - True to set as blocker.
     * @returns This instance.
     */
    setBlocker(value?: boolean): this;
}
