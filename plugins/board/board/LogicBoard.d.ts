import EE from '../../utils/eventemitter/EventEmitter';
import QuadGrid from '../grid/quad/Quad';
import HexagonGrid from '../grid/hexagon/Hexagon';
import Quad from '../grid/quad/Quad';
import Hexagon from '../grid/hexagon/Hexagon';
import {
    TileXYZType, TileXYType, TileXYDirectionType,
    WorldXYType
} from '../types/Position';
import Line from '../../utils/geom/line/Line';
import Circle from '../../utils/geom/circle/Circle';
import Rectangle from '../../utils/geom/rectangle/Rectangle';
import Ellipse from '../../utils/geom/ellipse/Ellipse';
import Triangle from '../../utils/geom/triangle/Triangle';
import Polygon from '../../utils/geom/polygon/Polygon';

export default Board;

declare namespace Board {
    /**
     * Iteration order for tile traversal.
     */
    type ForEachTileXYOrderTypes = 0 | 1 | 2 | 3 | 'x+' | 'x-' | 'y+' | 'y-';

    /**
     * Quad grid config with explicit grid type.
     */
    interface IConfigQuadGrid extends Quad.IConfig {
        gridType: 'quadGrid',
    }

    /**
     * Hexagon grid config with explicit grid type.
     */
    interface IConfigHexagonGrid extends Hexagon.IConfig {
        gridType: 'hexagonGrid',
    }

    /**
     * Logic board configuration.
     */
    interface IConfig {
        /**
         * Grid instance or grid config.
         */
        grid?: QuadGrid | HexagonGrid | IConfigQuadGrid | IConfigHexagonGrid,
        /**
         * Board width in tiles.
         */
        width?: number,
        /**
         * Board height in tiles.
         */
        height?: number,

        /**
         * True to wrap around edges.
         */
        wrap?: boolean,
        /**
         * True to enable infinite board behavior.
         */
        infinity?: boolean
    }

    /**
     * Callback for mapping neighbor tiles.
     * @param tileXY - Neighbor tile position and direction.
     * @param index - Neighbor index.
     * @param tileXYArray - All neighbor tiles.
     * @returns Mapped value.
     */
    type MapNeighborsCallbackType = (
        tileXY: TileXYDirectionType,
        index: number,
        tileXYArray: TileXYDirectionType[]
    ) => any;

    namespace Events {
        /**
         * Callback for a chess piece being kicked out.
         */
        type KickOutCallbackType = (
            chessToAdd: unknown,
            occupiedChess: unknown,
            tileXYZ: TileXYZType
        ) => void;
    }

}

/**
 * Logic board for grid-based chess placement and queries.
 *
 * ChessType usually refers to a GameObject instance, but it can be any
 * object used as a chess piece (for example, a plain data object).
 */
declare class Board<ChessType = unknown> extends EE {
    /**
     * Create a logic board with a scene and config.
     * @param scene - Scene or owner object.
     * @param config - Logic board configuration.
     */
    constructor(scene: unknown, config?: Board.IConfig);
    /**
     * Create a logic board with config only.
     * @param config - Logic board configuration.
     */
    constructor(config?: Board.IConfig);

    /**
     * Scene or owner object.
     */
    scene: unknown;

    /**
     * Set grid instance or grid config.
     * @param grid - Grid instance or config.
     * @returns This instance.
     */
    setGrid(grid: QuadGrid | HexagonGrid | Board.IConfigQuadGrid | Board.IConfigHexagonGrid): this;
    /**
     * Current grid instance.
     */
    grid: QuadGrid | HexagonGrid;

    /**
     * Set board width.
     * @param width - Width in tiles.
     * @returns This instance.
     */
    setBoardWidth(width: number): this;
    /**
     * Board width in tiles.
     */
    readonly width: number;
    /**
     * Set board height.
     * @param height - Height in tiles.
     * @returns This instance.
     */
    setBoardHeight(height: number): this;
    /**
     * Board height in tiles.
     */
    readonly height: number;

    /**
     * Enable or disable wrap mode.
     * @param enable - True to enable wrap.
     * @returns This instance.
     */
    setWrapMode(enable?: boolean): this;
    /**
     * True if wrap mode is enabled.
     */
    wrapMode: boolean;

    /**
     * Enable or disable infinity mode.
     * @param enable - True to enable infinity.
     * @returns This instance.
     */
    setInfinityMode(enable?: boolean): this;
    /**
     * True if infinity mode is enabled.
     */
    infinityMode: boolean;

    /**
     * Add a chess piece to a tile.
     * @param chess - Chess object to add.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z/layer.
     * @param align - True to align to tile.
     * @returns This instance.
     */
    addChess(
        chess: ChessType,
        tileX: number,
        tileY: number,
        tileZ: number | string,
        align?: boolean
    ): this;

    /**
     * Remove a chess piece by instance.
     * @param chess - Chess object.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z/layer.
     * @param destroy - True to destroy chess.
     * @returns This instance.
     */
    removeChess(
        chess: ChessType,
        tileX?: null,
        tileY?: null,
        tileZ?: null,
        destroy?: boolean
    ): this;
    /**
     * Remove a chess piece by tile position.
     * @param chess - Null to remove by tile.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z/layer.
     * @param destroy - True to destroy chess.
     * @returns This instance.
     */
    removeChess(
        chess: null,
        tileX: number,
        tileY: number,
        tileZ: number | string,
        destroy?: boolean
    ): this;

    /**
     * Remove all chess pieces.
     * @param destroy - True to destroy chess.
     * @returns This instance.
     */
    removeAllChess(destroy?: boolean): this;

    /**
     * Move a chess piece to another tile.
     * @param chess - Chess object.
     * @param toTileX - Destination tile x.
     * @param toTileY - Destination tile y.
     * @param toTileZ - Destination tile z/layer.
     * @param align - True to align to tile.
     * @returns This instance.
     */
    moveChess(
        chess: ChessType,
        toTileX: number,
        toTileY: number,
        toTileZ: number | string,
        align?: boolean
    ): this;

    /**
     * Change a chess piece layer.
     * @param chess - Chess object.
     * @param toTileZ - Destination tile z/layer.
     * @param align - True to align to tile.
     * @returns This instance.
     */
    setChessTileZ(
        chess: ChessType,
        toTileZ: number | string,
        align?: boolean
    ): this;

    /**
     * Swap two chess pieces.
     * @param chessA - First chess.
     * @param chessB - Second chess.
     * @param align - True to align to tiles.
     * @returns This instance.
     */
    swapChess(
        chessA: ChessType,
        chessB: ChessType,
        align?: boolean
    ): this;

    /**
     * Get tile coordinates for a chess object or tile reference.
     * @param chess - Chess object or tile reference.
     * @returns Tile coordinates or null.
     */
    chessToTileXYZ(
        chess: ChessType | TileXYType | number | undefined | null
    ): TileXYZType | null;

    /**
     * Get chess at a tile.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z/layer.
     * @returns Chess at the tile or null.
     */
    tileXYZToChess(
        tileX: number,
        tileY: number,
        tileZ: number | string
    ): ChessType | null;

    /**
     * Get chess array at a tile x/y across all z.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param out - Optional output array.
     * @returns Chess array at the tile.
     */
    tileXYToChessArray(
        tileX: number,
        tileY: number,
        out?: ChessType[]
    ): ChessType[];

    /**
     * Get chess array on a z layer.
     * @param tileZ - Tile z/layer.
     * @param out - Optional output array.
     * @returns Chess array on the layer.
     */
    tileZToChessArray(
        tileZ: number,
        out?: ChessType[]
    ): ChessType[];

    /**
     * Map tile array to chess array on a z layer.
     * @param tileXYArray - Tile positions.
     * @param tileZ - Tile z/layer.
     * @param out - Optional output array.
     * @returns Chess array mapped from tiles.
     */
    tileXYArrayToChessArray(
        tileXYArray: TileXYType[],
        tileZ?: number | string,
        out?: ChessType[]
    ): ChessType[];
    /**
     * Map tile array to chess array across all z.
     * @param tileXYArray - Tile positions.
     * @param out - Optional output array.
     * @returns Chess array mapped from tiles.
     */
    tileXYArrayToChessArray(
        tileXYArray: TileXYType[],
        out?: ChessType[]
    ): ChessType[];

    /**
     * Get chess array at world position.
     * @param worldX - World x.
     * @param worldY - World y.
     * @param out - Optional output array.
     * @returns Chess array at world position.
     */
    worldXYToChessArray(
        worldX: number,
        worldY: number,
        out?: ChessType[]
    ): ChessType[];

    /**
     * Get chess at world position.
     * @param worldX - World x.
     * @param worldY - World y.
     * @param tileZ - Tile z/layer.
     * @returns Chess at world position.
     */
    worldXYToChess(
        worldX: number,
        worldY: number,
        tileZ?: number | string
    ): ChessType;

    /**
     * Check if tile coordinates are within board.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z/layer.
     * @returns True if the tile is within board bounds.
     */
    contains(
        tileX: number,
        tileY: number,
        tileZ?: number | string
    ): boolean;

    /**
     * Check if a chess piece exists on the board.
     * @param chess - Chess object.
     * @returns True if the chess exists on the board.
     */
    exists(
        chess: ChessType
    ): boolean;

    /**
     * Iterate all tile positions.
     * @param callback - Callback per tile.
     * @param scope - Callback scope.
     * @param order - Iteration order.
     * @returns This instance.
     */
    forEachTileXY(
        callback: (tileXY: TileXYType, board: Board<ChessType>) => void | boolean,
        scope?: object,
        order?: Board.ForEachTileXYOrderTypes
    ): this;

    /**
     * Convert tile position to world position.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param out - Optional output object or true to create.
     * @returns World position.
     */
    tileXYToWorldXY(
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
    worldXYToTileXY(
        worldX: number,
        worldY: number,
        out?: TileXYType | true
    ): TileXYType;

    /**
     * Snap world position to grid.
     * @param worldX - World x.
     * @param worldY - World y.
     * @param out - Optional output object or true to create.
     * @returns Snapped world position.
     */
    worldXYSnapToGrid(
        worldX: number,
        worldY: number,
        out?: WorldXYType | true
    ): WorldXYType;

    /**
     * Get distance between tiles.
     * @param tileA - Chess or tile reference.
     * @param tileB - Chess or tile reference.
     * @returns Distance between tiles.
     */
    getDistance(
        tileA: ChessType | TileXYType,
        tileB: ChessType | TileXYType
    ): number;

    /**
     * Get ring of tiles around a center.
     * @param centerTileXY - Center tile.
     * @param radius - Ring radius.
     * @param out - Optional output array.
     * @returns Tile positions in the ring.
     */
    ringToTileXYArray(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Get filled ring of tiles around a center.
     * @param centerTileXY - Center tile.
     * @param radius - Ring radius.
     * @param nearToFar - True for near-to-far order.
     * @param out - Optional output array.
     * @returns Tile positions in the filled ring.
     */
    filledRingToTileXYArray(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        nearToFar?: boolean,
        out?: TileXYType[]
    ): TileXYType[];
    /**
     * Get filled ring of tiles around a center.
     * @param centerTileXY - Center tile.
     * @param radius - Ring radius.
     * @param out - Optional output array.
     * @returns Tile positions in the filled ring.
     */
    filledRingToTileXYArray(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert a line to tile array.
     * @param line - Line geometry.
     * @param out - Optional output array.
     * @returns Tile positions on the line.
     */
    lineToTileXYArray(
        line: Line,
        out?: TileXYType[]
    ): TileXYType[];
    /**
     * Convert a line segment to tile array.
     * @param startWorldX - Start world x.
     * @param startWorldY - Start world y.
     * @param endWorldX - End world x.
     * @param endWorldY - End world y.
     * @param out - Optional output array.
     * @returns Tile positions on the line.
     */
    lineToTileXYArray(
        startWorldX: number,
        startWorldY: number,
        endWorldX: number,
        endWorldY: number,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert a circle to tile array.
     * @param circle - Circle geometry.
     * @param out - Optional output array.
     * @returns Tile positions in the circle.
     */
    circleToTileXYArray(
        circle: Circle,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert a circle to tile array with test mode.
     * @param circle - Circle geometry.
     * @param testMode - Test mode.
     * @param out - Optional output array.
     * @returns Tile positions in the circle.
     */
    circleToTileXYArray(
        circle: Circle,
        testMode?: number,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert a rectangle to tile array.
     * @param rectangle - Rectangle geometry.
     * @param out - Optional output array.
     * @returns Tile positions in the rectangle.
     */
    rectangleToTileXYArray(
        rectangle: Rectangle,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert a rectangle to tile array with test mode.
     * @param rectangle - Rectangle geometry.
     * @param testMode - Test mode.
     * @param out - Optional output array.
     * @returns Tile positions in the rectangle.
     */
    rectangleToTileXYArray(
        rectangle: Rectangle,
        testMode?: number,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert an ellipse to tile array.
     * @param ellipse - Ellipse geometry.
     * @param out - Optional output array.
     * @returns Tile positions in the ellipse.
     */
    ellipseToTileXYArray(
        ellipse: Ellipse,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert an ellipse to tile array with test mode.
     * @param ellipse - Ellipse geometry.
     * @param testMode - Test mode.
     * @param out - Optional output array.
     * @returns Tile positions in the ellipse.
     */
    ellipseToTileXYArray(
        ellipse: Ellipse,
        testMode?: number,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert a triangle to tile array.
     * @param triangle - Triangle geometry.
     * @param out - Optional output array.
     * @returns Tile positions in the triangle.
     */
    triangleToTileXYArray(
        triangle: Triangle,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert a triangle to tile array with test mode.
     * @param triangle - Triangle geometry.
     * @param testMode - Test mode.
     * @param out - Optional output array.
     * @returns Tile positions in the triangle.
     */
    triangleToTileXYArray(
        triangle: Triangle,
        testMode?: number,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert a polygon to tile array.
     * @param polygon - Polygon geometry.
     * @param out - Optional output array.
     * @returns Tile positions in the polygon.
     */
    polygonToTileXYArray(
        polygon: Polygon,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Convert a polygon to tile array with test mode.
     * @param polygon - Polygon geometry.
     * @param testMode - Test mode.
     * @param out - Optional output array.
     * @returns Tile positions in the polygon.
     */
    polygonToTileXYArray(
        polygon: Polygon,
        testMode?: number,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Get angle between two tiles.
     * @param tileA - Chess or tile reference.
     * @param tileB - Chess or tile reference.
     * @returns Angle in radians.
     */
    angleBetween(
        tileA: ChessType | TileXYType,
        tileB: ChessType | TileXYType
    ): number;

    /**
     * Check if angle from A to B is within a cone.
     * @param chessA - Chess or tile reference.
     * @param chessB - Chess or tile reference.
     * @param face - Facing angle.
     * @param cone - Cone angle.
     * @returns True if the angle is within the cone.
     */
    isAngleInCone(
        chessA: ChessType | TileXYType,
        chessB: ChessType | TileXYType,
        face: number,
        cone: number
    ): boolean;

    /**
     * Get direction between two tiles.
     * @param chessA - Chess or tile reference.
     * @param chessB - Chess or tile reference.
     * @param round - True to round direction.
     * @returns Direction value.
     */
    directionBetween(
        chessA: ChessType | TileXYType,
        chessB: ChessType | TileXYType,
        round?: boolean
    ): number;

    /**
     * Check if direction from A to B is within a cone.
     * @param chessA - Chess or tile reference.
     * @param chessB - Chess or tile reference.
     * @param face - Facing direction.
     * @param cone - Cone size.
     * @returns True if the direction is within the cone.
     */
    isDirectionInCone(
        chessA: ChessType | TileXYType,
        chessB: ChessType | TileXYType,
        face: number,
        cone: number
    ): boolean;

    /**
     * Get opposite direction from a tile.
     * @param tileX - Tile x or tile reference.
     * @param tileY - Tile y.
     * @param direction - Direction.
     * @returns Opposite direction.
     */
    getOppositeDirection(
        tileX: number | ChessType | TileXYType,
        tileY: number,
        direction?: number
    ): number;

    /**
     * Snap an angle to a direction.
     * @param tileXY - Tile reference.
     * @param angle - Angle in radians.
     * @returns Snapped direction.
     */
    angleSnapToDirection(
        tileXY: ChessType | TileXYType | undefined,
        angle: number
    ): number;

    /**
     * Align chess pieces to the grid.
     * @param chess - Optional chess object.
     * @returns This instance.
     */
    gridAlign(chess?: ChessType): this;

    /**
     * Check if world point overlaps any chess piece.
     * @param worldX - World x.
     * @param worldY - World y.
     * @param tileZ - Tile z/layer.
     * @returns True if any chess overlaps the point.
     */
    isOverlappingPoint(
        worldX: number,
        worldY: number,
        tileZ?: number | string
    ): boolean;

    /**
     * Get neighbor tile in a direction.
     * @param srcTileXY - Source tile.
     * @param direction - Direction index.
     * @param out - Optional output object or true to create.
     * @returns Neighbor tile position.
     */
    getNeighborTileXY(
        srcTileXY: ChessType | TileXYType,
        direction: number,
        out?: TileXYType | true
    ): TileXYDirectionType;
    /**
     * Get neighbor tiles by directions.
     * @param srcTileXY - Source tile.
     * @param direction - Direction or directions.
     * @param out - Optional output array.
     * @returns Neighbor tile position(s).
     */
    getNeighborTileXY(
        srcTileXY: ChessType | TileXYType,
        direction: number | number[] | string | null,
        out?: TileXYType[]
    ): TileXYDirectionType | TileXYDirectionType[];

    /**
     * Get direction from source tile to neighbor tile.
     * @param srcTile - Source tile.
     * @param neighborTileXY - Neighbor tile.
     * @returns Direction or null if not neighbors.
     */
    getNeighborTileDirection(
        srcTile: ChessType | TileXYType,
        neighborTileXY: TileXYType
    ): number | null;

    /**
     * Get neighbor tile at an angle.
     * @param srcTileXY - Source tile.
     * @param angle - Angle in radians.
     * @param out - Optional output object or true to create.
     * @returns Neighbor tile position.
     */
    getNeighborTileXYAtAngle(
        srcTileXY: ChessType | TileXYType,
        angle: number,
        out?: TileXYType | true
    ): TileXYType;

    /**
     * Get neighbor chess piece(s).
     * @param tileXYZ - Source tile.
     * @param direction - Direction(s).
     * @param neighborTileZ - Neighbor z/layer.
     * @returns Neighbor chess piece(s).
     */
    getNeighborChess(
        tileXYZ: ChessType | TileXYType,
        direction: number | number[] | string | null,
        neighborTileZ?: number
    ): ChessType | ChessType[];

    /**
     * Check if two tiles are neighbors.
     * @param tileA - Tile reference.
     * @param tileB - Tile reference.
     * @returns True if the tiles are neighbors.
     */
    areNeighbors(
        tileA: ChessType | TileXYType,
        tileB: ChessType | TileXYType
    ): boolean;

    /**
     * Map neighbors around a tile.
     * @param tileXYZ - Source tile.
     * @param callback - Callback per neighbor.
     * @param scope - Callback scope.
     * @returns Mapped neighbor results.
     */
    mapNeighbors(
        tileXYZ: ChessType | TileXYType,
        callback: Board.MapNeighborsCallbackType,
        scope?: object
    ): any[];

    /**
     * Map neighbors around a tile within distance.
     * @param tileXYZ - Source tile.
     * @param distance - Distance in tiles.
     * @param callback - Callback per neighbor.
     * @param scope - Callback scope.
     * @returns Mapped neighbor results.
     */
    mapNeighbors(
        tileXYZ: ChessType | TileXYType,
        distance: number,
        callback: Board.MapNeighborsCallbackType,
        scope?: object
    ): any[];

    /**
     * Get tile(s) at direction and distance.
     * @param srcTileXY - Source tile.
     * @param direction - Direction(s).
     * @param distance - Distance or range.
     * @param out - Optional output array.
     * @returns Tile position(s) at direction and distance.
     */
    getTileXYAtDirection(
        srcTileXY: ChessType | TileXYType,
        direction: number | number[] | string | null,
        distance: number | number[] | { start?: number, end?: number, step?: number },
        out?: TileXYType[]
    ): TileXYDirectionType | TileXYDirectionType[];

    /**
     * Check if a tile is empty.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param tileZ - Tile z/layer.
     * @returns True if the tile is empty.
     */
    isEmptyTileXYZ(
        tileX: number,
        tileY?: number,
        tileZ?: number | string
    ): boolean;

    /**
     * Get a random empty tile in a z layer.
     * @param tileZ - Tile z/layer.
     * @param out - Optional output object or true to create.
     * @returns Random empty tile position.
     */
    getRandomEmptyTileXY(
        tileZ: number | string,
        out?: TileXYType | true
    ): TileXYType;

    /**
     * Get all empty tiles in a z layer.
     * @param tileZ - Tile z/layer.
     * @param out - Optional output array.
     * @returns Empty tile positions.
     */
    getEmptyTileXYArray(
        tileZ: number | string,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Get a random empty tile within a radius.
     * @param centerTileXY - Center tile.
     * @param radius - Radius.
     * @param tileZ - Tile z/layer.
     * @param out - Optional output object or true to create.
     * @returns Random empty tile position.
     */
    getRandomEmptyTileXYInRange(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        tileZ: number | string,
        out?: TileXYType | true
    ): TileXYType;

    /**
     * Get empty tiles within a radius.
     * @param centerTileXY - Center tile.
     * @param radius - Radius.
     * @param tileZ - Tile z/layer.
     * @param out - Optional output array.
     * @returns Empty tile positions.
     */
    getEmptyTileXYArrayInRange(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        tileZ: number | string,
        out?: TileXYType[]
    ): TileXYType[];

    /**
     * Get all chess pieces on the board.
     * @param out - Optional output array.
     * @returns Chess array.
     */
    getAllChess(
        out?: ChessType[]
    ): ChessType[];

    /**
     * Resize board to fit given tile positions.
     * @param tileXYArray - Tile positions.
     * @returns This instance.
     */
    fit(tileXYArray: TileXYType[]): this;

    /**
     * Check if tile has a blocker.
     * @param tileX - Tile x or tile reference.
     * @param tileY - Tile y.
     * @param tileZ - Tile z/layer.
     * @returns True if the tile has a blocker.
     */
    hasBlocker(
        tileX: number | ChessType | TileXYType,
        tileY?: number,
        tileZ?: number | string
    ): boolean;

    /**
     * Get grid points for a tile position.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param out - Optional output array or true to create.
     * @returns Grid points for the tile.
     */
    getGridPoints(
        tileX: number,
        tileY?: number,
        out?: WorldXYType[] | true
    ): WorldXYType[];
    /**
     * Get grid points for a tile reference.
     * @param tileXY - Tile reference.
     * @param out - Optional output array or true to create.
     * @returns Grid points for the tile.
     */
    getGridPoints(
        tileXY: ChessType | TileXYType,
        out?: WorldXYType[] | true
    ): WorldXYType[];

    /**
     * Get bounds of a tile.
     * @param tileX - Tile x.
     * @param tileY - Tile y.
     * @param out - Optional output object or true to create.
     * @returns Rectangle bounds for the tile.
     */
    getGridBounds(
        tileX: number,
        tileY: number,
        out?: Rectangle | true
    ): Rectangle;

    /**
     * Get bounds of the board.
     * @param out - Optional output object or true to create.
     * @returns Rectangle bounds for the board.
     */
    getBoardBounds(
        out?: Rectangle | true
    ): Rectangle;

    /**
     * Get boundary points for tiles.
     * @param tileXYArray - Tile positions.
     * @param out - Optional output array.
     * @returns Boundary points in world coordinates.
     */
    getBoundaryPoints(
        tileXYArray?: ChessType[] | TileXYType[],
        out?: WorldXYType[]
    ): WorldXYType[];

    /**
     * Get boundary points for a z layer.
     * @param tileZ - Tile z/layer.
     * @param out - Optional output array.
     * @returns Boundary points in world coordinates.
     */
    getBoundaryPoints(
        tileZ?: number | string,
        out?: WorldXYType[]
    ): WorldXYType[];

    /**
     * Get board instance for a chess object.
     * @param chess - Chess object.
     * @returns Board instance.
     */
    chessToBoard(chess: any): Board;
    /**
     * Get board instance for a chess object.
     * @param chess - Chess object.
     * @returns Board instance.
     */
    static GetBoard(chess: any): Board;

}
