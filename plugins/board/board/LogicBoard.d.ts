import EE from '../../utils/eventemitter/EventEmitter';
import Line from '../../utils/geom/line/Line';
import Circle from '../../utils/geom/circle/Circle';
import Rectangle from '../../utils/geom/rectangle/Rectangle';
import Ellipse from '../../utils/geom/ellipse/Ellipse';
import Triangle from '../../utils/geom/triangle/Triangle';
import Polygon from '../../utils/geom/polygon/Polygon';


// Quad
type QuadGridTypes = 0 | 1 | 'orthogonal' | 'isometric';
type QuadGridDirTypes = 4 | 8 | '4dir' | '8dir';
// Hexagon
type HexagonGridStaggerAxisTypes = 0 | 1 | 'y' | 'x';
type HexagonGridStaggerindexTypes = 0 | 1 | 'even' | 'odd';

export interface TileXYZType { x: number, y: number, z: (number | string) }
export interface TileXYType { x: number, y: number, z?: (number | string) }
export interface WorldXYType { x: number, y: number }

type ForEachTileXYOrderTypes = 0 | 1 | 2 | 3 | 'x+' | 'x-' | 'y+' | 'y-';

export interface IConfigQuadGrid {
    /**
     * 'quadGrid'
     */
    gridType: string,

    x?: number, y?: number,
    cellWidth?: number, cellHeight?: number,

    type?: QuadGridTypes,

    dir?: QuadGridDirTypes
}

export interface IConfigHexagonGrid {
    /**
     * 'hexagonGrid'
     */
    gridType: string,

    x?: number, y?: number,
    cellWidth?: number, cellHeight?: number,

    staggeraxis?: HexagonGridStaggerAxisTypes,
    staggerindex?: HexagonGridStaggerindexTypes
}

export interface IConfig {
    grid?: IConfigQuadGrid | IConfigHexagonGrid,
    width?: number,
    height?: number
}

export default class Board<ChessType = unknown> extends EE {
    constructor(
        scene: unknown,
        config?: IConfig
    );

    scene: unknown;

    setBoardWidth(width: number): this;
    readonly width: number;
    setBoardHeight(height: number): this;
    readonly height: number;

    addChess(
        chess: ChessType,
        tileX: number,
        tileY: number,
        tileZ: number | string,
        align?: boolean
    ): this;

    removeChess(
        chess: ChessType | null,
        tileX?: number | null,
        tileY?: number | null,
        tileZ?: number | string | null,
        destroy?: boolean
    ): this;

    removeAllChess(destroy?: boolean): this;

    moveChess(
        chess: ChessType,
        toTileX: number,
        toTileY: number,
        toTileZ: number | string,
        align?: boolean
    ): this;

    swapChess(
        chessA: ChessType,
        chessB: ChessType,
        align?: boolean
    ): this;

    chessToTileXYZ(
        chess: ChessType | TileXYType | number | undefined | null
    ): TileXYZType | null;

    tileXYZToChess(
        tileX: number,
        tileY: number,
        tileZ: number | string
    ): ChessType | null;

    tileXYToChessArray(
        tileX: number,
        tileY: number,
        out?: ChessType[]
    ): ChessType[];

    tileZToChessArray(
        tileZ: number,
        out?: ChessType[]
    ): ChessType[];

    tileXYArrayToChessArray(
        tileXYArray: TileXYType[],
        tileZ?: number | string | ChessType[],
        out?: ChessType[]
    ): ChessType[];

    worldXYToChessArray(
        worldX: number,
        worldY: number,
        out?: ChessType[]
    ): ChessType[];

    worldXYToChess(
        worldX: number,
        worldY: number,
        tileZ?: number | string
    ): ChessType;

    contains(
        tileX: number,
        tileY: number,
        tileZ?: number | string
    ): boolean;

    exists(
        chess: ChessType
    ): boolean;

    forEachTileXY(
        callback: ((tileXY: TileXYType, board: Board<ChessType>) => void | boolean),
        scope?: unknown,
        order?: ForEachTileXYOrderTypes
    ): this;

    tileXYToWorldXY(
        tileX: number,
        tileY: number,
        out?: WorldXYType
    ): WorldXYType;

    worldXYToTileXY(
        worldX: number,
        worldY: number,
        out?: TileXYType | true
    ): TileXYType;

    worldXYSnapToGrid(
        worldX: number,
        worldY: number,
        out?: WorldXYType
    ): WorldXYType;

    getDistance(
        tileA: ChessType | TileXYType,
        tileB: ChessType | TileXYType
    ): number;

    ringToTileXYArray(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        out?: TileXYType[]
    ): TileXYType[];

    filledRingToTileXYArray(
        centerTileXY: ChessType | TileXYType,
        radius: number,
        nearToFar?: boolean | TileXYType[],
        out?: TileXYType[]
    ): TileXYType[];

    lineToTileXYArray(
        startWorldX: number | Line,
        startWorldY?: number | TileXYType[],
        endWorldX?: number,
        endWorldY?: number,
        out?: TileXYType[]
    ): TileXYType[];

    circleToTileXYArray(
        circle: Circle,
        out?: TileXYType[]
    ): TileXYType[];

    rectangleToTileXYArray(
        rectangle: Rectangle,
        out?: TileXYType[]
    ): TileXYType[];

    ellipseToTileXYArray(
        ellipse: Ellipse,
        out?: TileXYType[]
    ): TileXYType[];

    triangleToTileXYArray(
        triangle: Triangle,
        out?: TileXYType[]
    ): TileXYType[];

    polygonToTileXYArray(
        polygon: Polygon,
        out?: TileXYType[]
    ): TileXYType[];

    angleBetween(
        tileA: ChessType | TileXYType,
        tileB: ChessType | TileXYType
    ): number;

    isAngleInCone(
        chessA: ChessType | TileXYType,
        chessB: ChessType | TileXYType,
        face: number,
        cone: number
    ): boolean;

    directionBetween(
        chessA: ChessType | TileXYType,
        chessB: ChessType | TileXYType,
        round?: boolean
    ): number;

    isDirectionInCone(
        chessA: ChessType | TileXYType,
        chessB: ChessType | TileXYType,
        face: number,
        cone: number
    ): boolean;

    getOppositeDirection(
        tileX: number | ChessType | TileXYType,
        tileY: number,
        direction?: number
    ): number;

    angleSnapToDirection(
        tileXY: ChessType | TileXYType | undefined,
        angle: number
    ): number;

    gridAlign(chess?: ChessType): this;

    isOverlappingPoint(
        worldX: number,
        worldY: number,
        tileZ?: number | string
    ): boolean;

    getNeighborTileXY(
        srcTileXY: ChessType | TileXYType,
        direction: number | number[] | string | null,
        out?: TileXYType[]
    ): TileXYType | TileXYType[];

    getNeighborTileDirection(
        srcTile: ChessType | TileXYType,
        neighborTileXY: TileXYType
    ): number | null;

    getNeighborTileXYAtAngle(
        srcTileXY: ChessType | TileXYType,
        angle: number,
        out?: TileXYType | true
    ): TileXYType;

    getNeighborChess(
        tileXYZ: ChessType | TileXYType,
        direction: number | number[] | string | null,
        neighborTileZ?: number
    ): ChessType;

    areNeighbors(
        tileA: ChessType | TileXYType,
        tileB: ChessType | TileXYType
    ): boolean;

    getTileXYAtDirection(
        srcTileXY: ChessType | TileXYType,
        direction: number | number[] | string | null,
        distance: number | number[] | { start?: number, end?: number, step?: number },
        out?: TileXYType[]
    ): TileXYType | TileXYType[];

    getRandomEmptyTileXY(
        tileZ: number | string,
        out?: TileXYType | true
    ): TileXYType;

    getEmptyTileXYArray(
        tileZ: number | string,
        out?: TileXYType[]
    ): TileXYType[];

    getAllChess(): ChessType[];

    fit(tileXYArray: TileXYType[]): this;

    hasBlocker(
        tileX: number | ChessType | TileXYType,
        tileY?: number,
        tileZ?: number | string
    ): boolean;

    getGridPoints(
        tileX: number | ChessType | TileXYType,
        tileY?: number | WorldXYType[],
        out?: WorldXYType[]
    ): WorldXYType;
}