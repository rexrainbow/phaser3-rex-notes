declare function StepStart(
    stepLength?: number
): Phaser.GameObjects.GameObject;

declare function StepStart(
    config?: {
        stepLength?: number
    }
): Phaser.GameObjects.GameObject;

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