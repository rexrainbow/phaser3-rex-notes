import phaser from 'phaser/src/phaser.js';
import MDScenario from '../../templates/mdscenario/MDScenario.js';
import TextBoxStyle from './styles/TextBoxStyle.js';
import ChoiceStyle from './styles/ChoiceStyle.js';
import TitleStyle from './styles/TitleStyle.js';
import NameInputStyle from './styles/NameInputStyle.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.text('eventSheet0', 'assets/markedeventsheet/mds/fast-typing.md');
    }

    create() {
        var print = this.add.text(0, 1050, '', { fontSize: 20, backgroundColor: 'grey' }).setDepth(100);
        print.text = 'Any click to start';

        var rootLayer = this.add.layer().setName('root');
        var viewport = this.scale.getViewPort();

        var eventSheetManager = new MDScenario(this, {
            styles: {
                TEXTBOX: TextBoxStyle,
                CHOICE: ChoiceStyle,
                TITLE: TitleStyle,
                NAMEINPUT: NameInputStyle,
            },
            rootLayer,
            multipleCamerasEnable: true,
            viewport
        })
            .addEventSheet(this.cache.text.get('eventSheet0'))
            .setData('$fastTyping', true);

        eventSheetManager
            .on('pause.input', function () {
                print.text = 'Wait any click to continue';
            })
            .on('resume.input', function () {
                print.text = '';
            })
            .on('complete', function () {
                print.text = 'Complete';
                console.log(eventSheetManager.memory)
            })

        this.input.once('pointerdown', function () {
            print.text = '';
            eventSheetManager.startGroup();
        })

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