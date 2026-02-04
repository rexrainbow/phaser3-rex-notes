import ComponentBase from '../../../utils/componentbase/ComponentBase';

export default StepRunner;

declare namespace StepRunner {

}

/**
 * Step-based command runner for arcade TCRP flow.
 */
declare class StepRunner extends ComponentBase {
    /**
     * Create a StepRunner instance.
     *
     * @param parent - Parent scene or game object.
     */
    constructor(
        parent: Phaser.Scene | Phaser.GameObjects.GameObject
    );

    /**
     * Add a command to run on next step.
     *
     * @param command - Command array.
     * @param scope - Execution scope.
     * @returns This StepRunner instance.
     */
    add(
        command: any[],
        scope?: object
    ): this;
}
