import TickTask from '../../utils/behaviorbase/TickTask';
import { TileXYType, TileXYZType } from '../types/Position';
import Board from '../board/Board';


export default MoveTo;

declare namespace MoveTo {


    type MoveableTestCallbackType = (
        fromTileXYZ: TileXYZType,
        toTileXYZ: TileXYZType,
        direction: number,
        board: Board
    ) => boolean;

    interface IConfig {
        speed?: number,
        rotateToTarget?: boolean,

        occupiedTest?: boolean,
        blockerTest?: boolean,
        moveableTest?: MoveableTestCallbackType,
        moveableTestScope?: object,

        sneak?: boolean,
    }

}

declare class MoveTo<ChessType = Phaser.GameObjects.GameObject> extends TickTask {
    constructor(
        gameObject: ChessType,
        config?: MoveTo.IConfig
    );

    moveTo(tileX: number, tileY: number): this;
    moveTo(tileXY: TileXYType): this;

    moveToward(direction: number): this;

    moveToRandomNeighbor(): this;

    moveAway(tileX: number, tileY: number): this;
    moveAway(tileXY: TileXYType): this;

    moveCloser(tileX: number, tileY: number): this;
    moveCloser(tileXY: TileXYType): this;

    canMoveTo(tileX: number, tileY: number): boolean;

    readonly lastMoveResult: boolean;

    readonly destinationTileX: number;
    readonly destinationTileY: number;
    readonly destinationDirection: number;

    setEnable(enable?: boolean): this;
    enable: boolean;

    setSpeed(speed: number): this;
    speed: number;

    timeScale: number;

    setRotateToTarget(enable?: boolean): this;
    rotateToTarget: boolean;

    setSneakEnable(enable?: boolean): this;

    setOccupiedTest(enable?: boolean): this;
    occupiedTest: boolean;
    setBlockerTest(enable?: boolean): this;
    blockerTest: boolean;
    setEdgeBlockerTest(enable?: boolean): this;
    edgeBlockerTest: boolean;

    setMoveableTestCallback(
        callback: MoveTo.MoveableTestCallbackType,
        scope?: object
    ): this;
}