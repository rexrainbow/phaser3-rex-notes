import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const UIContent = `
# Styles
# Style of $class: mylabel
.mylabel:
    $type: Label
    height: 30
    background:
        $type: RoundRectangle
        color: 0x260e04
    text:
        $type: Text
        text: ''       # Override this property

# Game object
$root:
    $type: TextArea
    
    width: 220
    height: 260
    
    background:
        $type: RoundRectangle
        color: 0x4e342e
    
    text:
        $type: BBCodeText
    
    slider:
        track:
            $type: RoundRectangle
            color: 0x260e04
            width: 20
            radius: 10
        thumb:
            $type: RoundRectangle
            color: 0x7b5e57
            radius: 13
    
    header:
        $type: Label
        $class: mylabel
        text: {text: Header}
    
    footer:
        $type: Label
        $class: mylabel
        text: {text: Footer}
    
    space:
        text: 10
`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var maker = this.rexUI.add.maker();
        var textArea = maker.make(UIContent)
            .setPosition(400, 300)
            .layout()

        textArea.setText(CreateContent(10000));
    }

    update() { }
}

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
var CreateContent = function (linesCount) {
    var numbers = [];
    for (var i = 0; i < linesCount; i++) {
        numbers.push('[color=' + ((i % 2) ? 'green' : 'yellow') + ']' + i.toString() + '[/color]');
    }
    return content + '\n' + numbers.join('\n');
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
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }

};

var game = new Phaser.Game(config);