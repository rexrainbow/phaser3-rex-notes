import CSVScenarioLogic from './CSVScenarioLogic';
import Timer from './timer/Timer';

export default CSVScenario;

declare namespace CSVScenario {

}

/**
 * Scene-bound CSV scenario runner.
 */
declare class CSVScenario extends CSVScenarioLogic {
    /**
     * Create a CSVScenario instance.
     *
     * @param scene - Scene instance.
     * @param config - Configuration options.
     */
    constructor(
        scene: Phaser.Scene,
        config?: CSVScenarioLogic.IConfig
    );

    /**
     * Initialize scenario with scene.
     *
     * @param scene - Scene instance.
     * @param config - Configuration options.
     * @returns This CSVScenario instance.
     */
    boot(
        scene: Phaser.Scene,
        config?: CSVScenarioLogic.IConfig
    ): this;

    /**
     * Create timer bound to scene.
     *
     * @param scene - Scene instance.
     * @param config - Configuration options.
     * @returns Timer instance.
     */
    createTimer(
        scene: Phaser.Scene,
        config?: CSVScenarioLogic.IConfig
    ): Timer;
}
