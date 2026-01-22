import GOManager from '../GOManager';

export default BobBase;

declare namespace BobBase {

}

declare class BobBase {
    /**
     * Create a bob base.
     * @param GOManager - Owner manager.
     * @param gameObject - Game object instance.
     * @param name - Bob name.
     */
    constructor(
        GOManager: GOManager,
        gameObject: Phaser.GameObjects.GameObject,
        name: string
    );

    /**
     * Destroy this bob.
     */
    destroy(): void;

    /**
     * Return true if a property exists.
     * @param property - Property name.
     * @returns True if exists.
     */
    hasProperty(property: string): boolean;

    /**
     * Set a property value.
     * @param property - Property name.
     * @param value - Property value.
     * @returns This instance.
     */
    setProperty(property: string, value: any): this;

    /**
     * Ease a property value.
     * @param config - Ease config.
     * @returns This instance.
     */
    easeProperty(
        config: {
            /**
             * Property name.
             */
            property: string,
            /**
             * Target value.
             */
            value: number,
            /**
             * Tween duration.
             */
            duration?: number,
            /**
             * Tween delay.
             */
            delay?: number,
            /**
             * Easing name.
             */
            ease?: string,
            /**
             * Repeat count.
             */
            repeat?: null,
            /**
             * True to yoyo.
             */
            yoyo?: boolean,
            /**
             * True to start from target value.
             */
            from?: boolean,
            /**
             * Complete callback.
             */
            complete?: (
                gameObject: Phaser.GameObjects.GameObject,
                property: string
            ) => void,
            /**
             * Target object.
             */
            target?: Object,
        }
    ): this;

    /**
     * Add a tween task.
     * @param name - Task name.
     * @param config - Tween config.
     * @returns This instance.
     */
    addTweenTask(
        name: string,
        config: Phaser.Types.Tweens.TweenBuilderConfig | object
    ): this;

    /**
     * Set time scale.
     * @param timeScale - Time scale value.
     * @returns This instance.
     */
    setTimeScale(timeScale: number): this;

    /**
     * Return true if a method exists.
     * @param methodName - Method name.
     * @returns True if exists.
     */
    hasMethod(methodName: string): boolean;

    /**
     * Call a method.
     * @param methodName - Method name.
     * @param parameters - Method parameters.
     * @returns This instance.
     */
    call(
        methodName: string,
        ...parameters: any[]
    ): this;
}
