import { TileXYType } from '../types/Position';


export default MoveTo;

declare namespace MoveTo {

    interface IConfig {
        speed?: number,
        rotateToTarget?: boolean,
        occupiedTest?: boolean,
        blockerTest?: boolean,
        sneak?: boolean,
    }

}

declare class MoveTo<ChessType = Phaser.GameObjects.GameObject> {
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

    pause(): this;
    resume(): this;
    stop(): this;
    readonly isRunning: boolean;

    setEnable(enable?: boolean): this;
    enable: boolean;

    setSpeed(speed: number): this;
    speed: number;

    setRotateToTarget(enable?: boolean): this;

}