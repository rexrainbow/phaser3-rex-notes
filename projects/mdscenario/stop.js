import phaser from 'phaser/src/phaser.js';
import MDScenario from '../../templates/mdscenario/MDScenario.js';
import TextBoxStyle from './styles/TextBoxStyle.js';
import ChoiceStyle from './styles/ChoiceStyle.js';

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.text('eventSheet0', 'assets/markedeventsheet/mds/command-executor.md');

        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('road', 'assets/images/backgrounds/road.png');

        this.load.image('nextPage', 'assets/images/arrow-down-left.png');

        this.load.atlas('characters', 'assets/images/characters/characters.png', 'assets/images/characters/characters.json');
        this.load.atlas('portraits', 'assets/images/characters/portraits.png', 'assets/images/characters/portraits.json');

        this.load.audio('theme0', [
            'assets/audio/oedipus_wizball_highscore.ogg',
            'assets/audio/oedipus_wizball_highscore.mp3'
        ]);
        this.load.audio('theme1', [
            'assets/audio/jungle.ogg',
            'assets/audio/jungle.mp3'
        ]);
        this.load.audio('explosion', [
            'assets/audio/soundeffect/explosion.mp3'
        ]);
    }

    create() {
        var print = this.add.text(0, 570, '', { fontSize: 20, backgroundColor: 'grey' }).setDepth(100);
        print.text = 'Any click to start';

        var rootLayer = this.add.layer().setName('root');
        var viewport = this.scale.getViewPort();

        var eventSheetManager = new MDScenario(this, {
            styles: {
                TEXTBOX: TextBoxStyle,
                CHOICE: ChoiceStyle,
            },
            rootLayer,
            viewport
        })
            .addEventSheet(this.cache.text.get('eventSheet0'))

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
            eventSheetManager.start();

            setTimeout(function () {
                // eventSheetManager.stop();
                eventSheetManager.destroy();
            }, 8000)
        })

    }

    update() { }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo
};

var game = new Phaser.Game(config);