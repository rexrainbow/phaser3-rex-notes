import phaser from '../../../phaser/src/phaser.js';
import YAMLScenario from '../../templates/scenario/YAMLScenario.js';
import CreateMonitorPanel from '../../templates/scenario/monitor/CreateMonitorPanel.js';
import TextBoxStyle from './styles/TextBoxStyle.js';


class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.text('eventSheet0', 'assets/yamleventsheets/scenario/fast-typing.yml');
    }

    create() {
        var rootLayer = this.add.layer().setName('root');
        var viewport = this.scale.getViewPort();

        var eventSheetManager = new YAMLScenario(this, {
            styles: {
                TEXTBOX: TextBoxStyle,
            },
            rootLayer,
            multipleCamerasEnable: true,
            viewport
        })
            .addEventSheet(this.cache.text.get('eventSheet0'))

        CreateMonitorPanel(
            this,
            {
                width: 300, height: 0
            },
            eventSheetManager.memory,
            [
                {
                    $key: '$fastTyping', title: 'Skip',
                },
                {
                    $key: '$autoNextPage', title: 'Auto',
                },
                { $type: 'separator' },
                {
                    // Run event sheet
                    $type: 'button', title: 'Action', label: 'Run',
                    callback(target) {
                        eventSheetManager.startGroup();
                    }
                }
            ]
        )
            .setOrigin(0)
            .layout()

    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);