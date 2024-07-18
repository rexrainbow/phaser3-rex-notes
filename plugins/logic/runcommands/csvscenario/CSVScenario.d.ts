import CSVScenarioLogic from './CSVScenarioLogic';
import Timer from './timer/Timer';

export default CSVScenario;

declare namespace CSVScenario {

}

declare class CSVScenario extends CSVScenarioLogic {
    constructor(
        scene: Phaser.Scene,
        config?: CSVScenarioLogic.IConfig
    );

    boot(
        scene: Phaser.Scene,
        config?: CSVScenarioLogic.IConfig
    ): this;

    createTimer(
        scene: Phaser.Scene,
        config?: CSVScenarioLogic.IConfig
    ): Timer;
}