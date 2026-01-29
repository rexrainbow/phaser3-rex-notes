/**
 * Start stepping with an optional step length.
 * @param stepLength - Step length in pixels.
 * @returns Target game object.
 */
declare function StepStart(
    stepLength?: number
): Phaser.GameObjects.GameObject;

/**
 * Start stepping with a config object.
 * @param config - Step configuration.
 * @returns Target game object.
 */
declare function StepStart(
    config?: {
        /**
         * Step length in pixels.
         */
        stepLength?: number
    }
): Phaser.GameObjects.GameObject;

/**
 * Stop stepping.
 * @returns Target game object.
 */
declare function StepStop(): Phaser.GameObjects.GameObject;

declare const StepMethods: {
    startStep: typeof StepStart,
    stopStep: typeof StepStop,
}

export default StepMethods;
export {
    StepStart,
    StepStop
}
