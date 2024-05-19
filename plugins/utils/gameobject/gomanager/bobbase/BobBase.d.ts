import GOManager from '../GOManager';

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

    hasProperty(property: string): boolean;

    setProperty(property: string, value: any): this;

    easeProperty(
        config: {
            property: string,
            value: number,
            duration?: number,
            delay?: number,
            ease?: string,
            repeat?: null,
            yoyo?: boolean,
            from?: boolean,
            complete?: (
                gameObject: Phaser.GameObjects.GameObject,
                property: string
            ) => void,
            target?: Object,
        }
    ): this;

    addTweenTask(
        name: string,
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): this;

    setTimeScale(timeScale: number): this;

    hasMethod(methodName: string): boolean;

    call(
        methodName: string,
        ...parameters: any[]
    ): this;
}