import phaser from 'phaser/src/phaser.js';
import Maker from '../../templates/ui/maker/Maker.js';
import Handlebars from 'handlebars';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const CONTENT = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

const UIContent = `
# Styles
# Style of $class:mylabel
.mylabel:
    $type: Label
    width: 40
    height: 40
    
    background:
        $type: RoundRectangle
        color: {{COLOR_PRIMARY}}
    text:
        $type: Text
        text: ''       # Override this property
        fontSize: 24
    
    space:
        left: 10
        right: 10
        top: 10
        bottom: 10

.mytabs:
    $type: Buttons
    orientation: x
    space: {left: 10, right: 10, top: 10, bottom: 0}

    buttonsType: radio
    buttons:
        - $class: mylabel
          name: page0
          text: {text: Page0}
        - $class: mylabel
          name: page1
          text: {text: Page1}
        - $class: mylabel
          name: page2
          text: {text: Page2}

.mypage:
    $type: TextArea
    text:
        $type: BBCodeText
        fontSize: 24

    slider:
        track:
            $type: RoundRectangle
            color: {{COLOR_PRIMARY}}
            width: 20
            radius: 10
        thumb:
            $type: RoundRectangle
            color: {{COLOR_LIGHT}}
            radius: 13

    content: |
        {{CONTENT}}        
        ....
        [color=green]{{CONTENT}}[/color]
        ....
        [color=cadetblue]{{CONTENT}}[/color]
        ....
        [color=yellow]{{CONTENT}}[/color]
        
    

.mypages:
    $type: Pages
    children:
        - $child:
              $class: mypage
          key: page0
          expand: true
        
        - $child:
            $class: mypage
          key: page1
          expand: true
        
        - $child:
            $class: mypage
          key: page2
          expand: true

# Game object
$root:
    $type: Sizer
    width: 500
    height: 400
    orientation: y

    space: { left: 5, right: 5, top: 5, bottom: 5, item: 10 }

    background:
        $type: RoundRectangle
        color: {{COLOR_DARK}}
        
    children:
        - $child:
              $class: mytabs
          key: tabs
          align: left
        
        - $child:
            $class: mypages
          key: pages
          proportion: 1
          expand: true

`

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var maker = new Maker(this);
        var data = Handlebars.compile(UIContent)({
            COLOR_PRIMARY: COLOR_PRIMARY,
            COLOR_LIGHT: COLOR_LIGHT,
            COLOR_DARK: COLOR_DARK,

            CONTENT: CONTENT
        });
        var ui = maker.make(data)
            .setPosition(400, 300)
            .layout()


        ui.getElement('tabs').on('button.statechange', function (button, index, value, previousValue) {
            // Style of button
            var background = button.getElement('background');
            if (value) {
                background.setStrokeStyle(2, COLOR_LIGHT);
            } else {
                background.setStrokeStyle();
            }

            // Swap page
            if (value) {
                ui.getElement('pages').swapPage(button.name);
            }
        })
            .emitButtonClick(0);



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