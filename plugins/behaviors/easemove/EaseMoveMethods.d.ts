/**
 * Move a game object from a position.
 * @param duration - Duration in ms.
 * @param x - Start x.
 * @param y - Start y.
 * @param ease - Ease name.
 * @returns Target game object.
 */
declare function MoveFrom(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Phaser.GameObjects.GameObject;

/**
 * Move a game object from a position.
 * @param config - Move configuration.
 * @returns Target game object.
 */
declare function MoveFrom(
    config: {
        /**
         * Start x.
         */
        x: number,
        /**
         * Start y.
         */
        y: number,
        /**
         * Speed value.
         */
        speed?: number,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Ease name.
         */
        ease?: string,
    }
): Phaser.GameObjects.GameObject;

/**
 * Move a game object from a position and return a promise.
 * @param duration - Duration in ms.
 * @param x - Start x.
 * @param y - Start y.
 * @param ease - Ease name.
 * @returns Promise resolved on complete.
 */
declare function MoveFromPromise(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Promise<any>;

/**
 * Move a game object from a position and return a promise.
 * @param config - Move configuration.
 * @returns Promise resolved on complete.
 */
declare function MoveFromPromise(
    config: {
        /**
         * Start x.
         */
        x: number,
        /**
         * Start y.
         */
        y: number,
        /**
         * Speed value.
         */
        speed?: number,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Ease name.
         */
        ease?: string,
    }
): Promise<any>;

/**
 * Move a game object from a position and destroy on complete.
 * @param duration - Duration in ms.
 * @param x - Start x.
 * @param y - Start y.
 * @param ease - Ease name.
 * @returns Target game object.
 */
declare function MoveFromDestroy(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Phaser.GameObjects.GameObject;

/**
 * Move a game object from a position and destroy on complete.
 * @param config - Move configuration.
 * @returns Target game object.
 */
declare function MoveFromDestroy(
    config: {
        /**
         * Start x.
         */
        x: number,
        /**
         * Start y.
         */
        y: number,
        /**
         * Speed value.
         */
        speed?: number,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Ease name.
         */
        ease?: string,
    }
): Phaser.GameObjects.GameObject;

/**
 * Move a game object from a position and destroy on complete, returning a promise.
 * @param duration - Duration in ms.
 * @param x - Start x.
 * @param y - Start y.
 * @param ease - Ease name.
 * @returns Promise resolved on complete.
 */
declare function MoveFromDestroyPromise(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Promise<any>;

/**
 * Move a game object from a position and destroy on complete, returning a promise.
 * @param config - Move configuration.
 * @returns Promise resolved on complete.
 */
declare function MoveFromDestroyPromise(
    config: {
        /**
         * Start x.
         */
        x: number,
        /**
         * Start y.
         */
        y: number,
        /**
         * Speed value.
         */
        speed?: number,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Ease name.
         */
        ease?: string,
    }
): Promise<any>;

/**
 * Test if a move-from is running.
 * @returns True if running.
 */
declare function IsRunningMoveFrom(): boolean;

/**
 * Move a game object to a position.
 * @param duration - Duration in ms.
 * @param x - End x.
 * @param y - End y.
 * @param ease - Ease name.
 * @returns Target game object.
 */
declare function MoveTo(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Phaser.GameObjects.GameObject;

/**
 * Move a game object to a position.
 * @param config - Move configuration.
 * @returns Target game object.
 */
declare function MoveTo(
    config: {
        /**
         * End x.
         */
        x: number,
        /**
         * End y.
         */
        y: number,
        /**
         * Speed value.
         */
        speed?: number,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Ease name.
         */
        ease?: string,
    }
): Phaser.GameObjects.GameObject;

/**
 * Move a game object to a position and return a promise.
 * @param duration - Duration in ms.
 * @param x - End x.
 * @param y - End y.
 * @param ease - Ease name.
 * @returns Promise resolved on complete.
 */
declare function MoveToPromise(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Promise<any>;

/**
 * Move a game object to a position and return a promise.
 * @param config - Move configuration.
 * @returns Promise resolved on complete.
 */
declare function MoveToPromise(
    config: {
        /**
         * End x.
         */
        x: number,
        /**
         * End y.
         */
        y: number,
        /**
         * Speed value.
         */
        speed?: number,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Ease name.
         */
        ease?: string,
    }
): Promise<any>;

/**
 * Move a game object to a position and destroy on complete.
 * @param duration - Duration in ms.
 * @param x - End x.
 * @param y - End y.
 * @param ease - Ease name.
 * @returns Target game object.
 */
declare function MoveToDestroy(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Phaser.GameObjects.GameObject;

/**
 * Move a game object to a position and destroy on complete.
 * @param config - Move configuration.
 * @returns Target game object.
 */
declare function MoveToDestroy(
    config: {
        /**
         * End x.
         */
        x: number,
        /**
         * End y.
         */
        y: number,
        /**
         * Speed value.
         */
        speed?: number,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Ease name.
         */
        ease?: string,
    }
): Phaser.GameObjects.GameObject;

/**
 * Move a game object to a position and destroy on complete, returning a promise.
 * @param duration - Duration in ms.
 * @param x - End x.
 * @param y - End y.
 * @param ease - Ease name.
 * @returns Promise resolved on complete.
 */
declare function MoveToDestroyPromise(
    duration: number,
    x: number,
    y: number,
    ease?: string
): Promise<any>;

/**
 * Move a game object to a position and destroy on complete, returning a promise.
 * @param config - Move configuration.
 * @returns Promise resolved on complete.
 */
declare function MoveToDestroyPromise(
    config: {
        /**
         * End x.
         */
        x: number,
        /**
         * End y.
         */
        y: number,
        /**
         * Speed value.
         */
        speed?: number,
        /**
         * Duration in ms.
         */
        duration?: number,
        /**
         * Ease name.
         */
        ease?: string,
    }
): Promise<any>;

/**
 * Test if a move-to is running.
 * @returns True if running.
 */
declare function IsRunningMoveTo(): boolean;

/**
 * Test if an ease move is running.
 * @returns True if running.
 */
declare function IsRunningEaseMove(): boolean;

/**
 * Stop current move.
 * @param toEnd - True to jump to end.
 * @returns Target game object.
 */
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
