import Board from '../board/LogicBoard';
import { TileXYType } from '../types/Position';


export default Match;

declare namespace Match {

    /**
     * Match configuration.
     */
    interface IConfig {
        /**
         * Board instance.
         */
        board?: Board,
        /**
         * Wildcard symbol.
         */
        wildcard?: string | number,
        /**
         * Direction mask to include directions.
         */
        dirMask?: { [dir: number]: boolean },
    }

    /**
     * Match result data.
     */
    type MatchResultType = {
        /**
         * Matched tiles.
         */
        tileXY: TileXYType[],
        /**
         * Match direction.
         */
        direction: number,
        /**
         * Match pattern.
         */
        pattern: string | number | (string | number)[]
    }

    /**
     * Callback to refresh a tile symbol.
     */
    type RefreshSymbolsCallbackType = (
        /**
         * Tile coordinates.
         */
        tileXY: TileXYType,
        /**
         * Board instance.
         */
        board: Board
    ) => string | number | null;

    /**
     * Callback for iterating tiles.
     */
    type ForEachCallbackType = (
        /**
         * Tile coordinates.
         */
        tileXY: TileXYType,
        /**
         * Tile symbol.
         */
        symbol: string | number | null,
        /**
         * Board instance.
         */
        board: Board
    ) => void | boolean;

    /**
     * Callback for number pattern matches.
     */
    type MatchNumberCallbackType = (
        /**
         * Match result.
         */
        result: Match.MatchResultType,
        /**
         * Board instance.
         */
        board: Board
    ) => void | boolean;

    /**
     * Callback for array pattern matches.
     */
    type MatchArrayCallbackType = (
        /**
         * Match result.
         */
        result: Match.MatchResultType,
        /**
         * Board instance.
         */
        board: Board
    ) => void | boolean;

}

/**
 * Match patterns on a board.
 */
declare class Match {
    /**
     * Create a Match helper.
     * @param config - Match configuration.
     */
    constructor(config?: Match.IConfig);

    /**
     * Set board instance.
     * @param board - Board instance.
     * @returns This instance.
     */
    setBoard(board: Board): this;
    /**
     * Board instance.
     */
    readonly board: Board;

    /**
     * Refresh symbols from board.
     * @param callback - Symbol refresh callback.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    refreshSymbols(
        callback: Match.RefreshSymbolsCallbackType,
        scope?: object
    ): this;

    /**
     * Set symbol at tile.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param symbol - Symbol value.
     * @returns This instance.
     */
    setSymbol(
        tileX: number,
        tileY: number,
        symbol: string | number | null
    ): this;

    /**
     * Get symbol at tile.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @returns Symbol value.
     */
    getSymbol(
        tileX: number,
        tileY: number
    ): string | number | null;

    /**
     * Iterate tiles.
     * @param callback - Callback per tile.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    forEach(
        callback: Match.ForEachCallbackType,
        scope?: object
    ): this;

    /**
     * Set wildcard symbol.
     * @param symbol - Wildcard symbol value.
     * @returns This instance.
     */
    setWildcard(
        symbol: string | number
    ): this;
    /**
     * Wildcard symbol.
     */
    wildcard: string | number;

    /**
     * Set direction mask.
     * @param dir - Direction index.
     * @param value - True to enable the direction.
     * @returns This instance.
     */
    setDirMask(
        dir: number,
        value: boolean
    ): this;

    /**
     * Find matches with a fixed length.
     * @param n - Match length.
     * @param callback - Match callback.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    match(
        n: number,
        callback: Match.MatchNumberCallbackType,
        scope?: object
    ): this;


    /**
     * Find matches with a pattern array.
     * @param n - Match pattern.
     * @param callback - Match callback.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    match(
        n: (string | number)[],
        callback: Match.MatchArrayCallbackType,
        scope?: object
    ): this;

    /**
     * Test if any match exists for a length.
     * @param n - Match length.
     * @returns True if any match exists.
     */
    anyMatch(
        n: number
    ): boolean;

    /**
     * Test if any match exists for a pattern.
     * @param n - Match pattern.
     * @returns True if any match exists.
     */
    anyMatch(
        n: (string | number)[]
    ): boolean;

    /**
     * Get a group of connected tiles.
     * @param startTileX - Start tile x.
     * @param startTileY - Start tile y.
     * @param out - Optional output array.
     * @returns Group tile positions.
     */
    group(
        startTileX: number,
        startTileY: number,
        out?: TileXYType[]
    ): TileXYType[];
}
