declare function StartStep(
    stepLength?: number
): Phaser.GameObjects.GameObject;

declare function StartStep(
    config?: {
        stepLength?: number
    }
): Phaser.GameObjects.GameObject;

declare function StopStep(): Phaser.GameObjects.GameObject;

declare const StepMethods: {
    startStep: typeof StartStep,
    stopStep: typeof StopStep,
}

export default StepMethods;