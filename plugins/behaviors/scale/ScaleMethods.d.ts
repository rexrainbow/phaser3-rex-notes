
declare function PopUp(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Phaser.GameObjects.GameObject;

declare function PopUpPromise(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Promise<any>;

declare function IsRunningPopUp(): boolean;

declare function ScaleDownDestroy(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Phaser.GameObjects.GameObject;

declare function ScaleDownDestroyPromise(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Promise<any>;

declare function ScaleDown(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Phaser.GameObjects.GameObject;

declare function ScaleDownPromise(
    duration: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Promise<any>;

declare function IsRunningScaleDown(): boolean;

declare function ScaleYoyo(
    duration: number,
    peakValue?: number,
    repeat?: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Phaser.GameObjects.GameObject;

declare function ScaleYoyoPromise(
    duration: number,
    peakValue?: number,
    repeat?: number,
    orientation?: 0 | 1 | 'x' | 'y',
    ease?: string
): Promise<any>;

declare function IsRunningScaleYoyo(): boolean;

declare function IsRunningEaseScale(): boolean;

declare const ScaleMethods: {
    popUp: typeof PopUp,
    popUpPromise: typeof PopUpPromise,
    scaleDownDestroyPromise: typeof ScaleDownDestroyPromise,
    scaleDown: typeof ScaleDown,
    scaleDownDestroy: typeof ScaleDownDestroy,
    scaleDownPromise: typeof ScaleDownPromise,
    scaleYoyo: typeof ScaleYoyo,
    scaleYoyoPromise: typeof ScaleYoyoPromise,

    isRunningPopUp: typeof IsRunningPopUp,
    isRunningScaleDown: typeof IsRunningScaleDown,
    isRunningScaleYoyo: typeof IsRunningScaleYoyo,
    isRunningEaseScale: typeof IsRunningEaseScale,

}

export default ScaleMethods;
export {
    PopUp, PopUpPromise,
    ScaleDown, ScaleDownPromise,
    ScaleDownDestroy, ScaleDownDestroyPromise,
    ScaleYoyo, ScaleYoyoPromise,

    IsRunningPopUp, IsRunningScaleDown, IsRunningScaleYoyo, IsRunningEaseScale,
}
