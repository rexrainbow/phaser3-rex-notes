import { EaseMove, EaseMoveTo, EaseMoveToDestroy, EaseMoveFrom, EaseMoveFromDestroy } from './easemove';
import {
    MoveFrom, MoveFromPromise, MoveFromDestroy, MoveFromDestroyPromise,
    MoveTo, MoveToPromise, MoveToDestroy, MoveToDestroyPromise,

    IsRunningMoveFrom, IsRunningMoveTo, IsRunningEaseMove, MoveStop
} from './behaviors/easemove/EaseMoveMethods';

declare namespace EaseMovePlugin {
    interface EaseMoveMethodsGameObject extends Phaser.GameObjects.GameObject {
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
}

export default class EaseMovePlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: EaseMove.IConfig
    ): EaseMove;

    moveTo: typeof EaseMoveTo;
    moveFrom: typeof EaseMoveFrom;
    moveToDestroy: typeof EaseMoveToDestroy;
    moveFromDestroy: typeof EaseMoveFromDestroy;

    injectMethods(
        gameObject: Phaser.GameObjects.GameObject
    ): EaseMovePlugin.EaseMoveMethodsGameObject;

    injectMethodsToRootClass(): this;
}