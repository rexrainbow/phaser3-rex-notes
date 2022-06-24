import GOManager from './GOManager';

export default BobBase;

declare namespace BobBase {

}

declare class BobBase {
    constructor(
        GOManager: GOManager,
        gameObject: Phaser.GameObjects.GameObject,
        name: string
    );

    destroy(): void;

    setProperty(property: string, value: any): this;

    easeProperty(
        property: string,
        value: number,
        duration?: number,
        ease?: string,
        repeat?: null,
        isYoyo?: boolean,
        onComplete?: Function
    ): this;

    setTimeScale(timeScale: number): this;
}