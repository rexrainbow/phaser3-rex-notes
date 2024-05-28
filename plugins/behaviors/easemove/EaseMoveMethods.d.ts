declare function MoveFrom(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Phaser.GameObjects.GameObject;

declare function MoveFrom(
    config: {
        x: number,
        y: number,
        speed?: number,
        duration?: number,
        ease?: string,
    }
): Phaser.GameObjects.GameObject;

declare function MoveFromPromise(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Promise<any>;

declare function MoveFromPromise(
    config: {
        x: number,
        y: number,
        speed?: number,
        duration?: number,
        ease?: string,
    }
): Promise<any>;

declare function MoveFromDestroy(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Phaser.GameObjects.GameObject;

declare function MoveFromDestroy(
    config: {
        x: number,
        y: number,
        speed?: number,
        duration?: number,
        ease?: string,
    }
): Phaser.GameObjects.GameObject;

declare function MoveFromDestroyPromise(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Promise<any>;

declare function MoveFromDestroyPromise(
    config: {
        x: number,
        y: number,
        speed?: number,
        duration?: number,
        ease?: string,
    }
): Promise<any>;

declare function IsRunningMoveFrom(): boolean;

declare function MoveTo(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Phaser.GameObjects.GameObject;

declare function MoveTo(
    config: {
        x: number,
        y: number,
        speed?: number,
        duration?: number,
        ease?: string,
    }
): Phaser.GameObjects.GameObject;

declare function MoveToPromise(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Promise<any>;

declare function MoveToPromise(
    config: {
        x: number,
        y: number,
        speed?: number,
        duration?: number,
        ease?: string,
    }
): Promise<any>;

declare function MoveToDestroy(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Phaser.GameObjects.GameObject;

declare function MoveToDestroy(
    config: {
        x: number,
        y: number,
        speed?: number,
        duration?: number,
        ease?: string,
    }
): Phaser.GameObjects.GameObject;

declare function MoveToDestroyPromise(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Promise<any>;

declare function MoveToDestroyPromise(
    config: {
        x: number,
        y: number,
        speed?: number,
        duration?: number,
        ease?: string,
    }
): Promise<any>;

declare function IsRunningMoveTo(): boolean;

declare function IsRunningEaseMove(): boolean;

declare function MoveStop(toEnd?: boolean): Phaser.GameObjects.GameObject;

declare const EaseMoveMethods: {
    moveFrom: typeof MoveFrom,
    moveFromPromise: typeof MoveFromPromise,
    moveFromDestroy: typeof MoveFromDestroy,
    moveFromDestroyPromise: typeof MoveFromDestroyPromise,

    moveTo: typeof MoveTo,
    moveToPromise: typeof MoveToPromise,
    moveToDestroy: typeof MoveToDestroy,
    moveToDestroyPromise: typeof MoveToDestroyPromise,

    isRunningMoveFrom: typeof IsRunningMoveFrom,
    isRunningMoveTo: typeof IsRunningMoveTo,
    isRunningEaseMove: typeof IsRunningEaseMove,
    moveStop: typeof MoveStop,

}

export default EaseMoveMethods;
export {
    MoveFrom, MoveFromPromise, MoveFromDestroy, MoveFromDestroyPromise,
    MoveTo, MoveToPromise, MoveToDestroy, MoveToDestroyPromise,

    IsRunningMoveFrom, IsRunningMoveTo, IsRunningEaseMove, MoveStop,
}