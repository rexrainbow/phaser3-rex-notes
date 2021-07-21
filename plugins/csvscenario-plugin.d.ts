import CSVScenario from './csvscenario';

export default class CursorAtBoundPlugin extends Phaser.Plugins.BasePlugin {
    add(
        scene: Phaser.Scene,
        config?: CSVScenario.IConfig
    ): CSVScenario;

}