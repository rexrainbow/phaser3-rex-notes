import Step from './step';
import { StepStart, StepStop } from './behaviors/step/StepMethods';

declare namespace StepPlugin {
    interface StepMethodsGameObject extends Phaser.GameObjects.GameObject {
        stepStart: typeof StepStart,
        stepStop: typeof StepStop,
    }
}

export default class StepPlugin extends Phaser.Plugins.BasePlugin {
    add(
        gameObject: Phaser.GameObjects.GameObject,
        config?: Step.IConfig
    ): Step;

    injectMethods(
        gameObject: Phaser.GameObjects.GameObject
    ): StepPlugin.StepMethodsGameObject;

    injectMethodsToRootClass(): this;
}