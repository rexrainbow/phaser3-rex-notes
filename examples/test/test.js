import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        // this.add.rectangle(100,100,100,100,0xff0000)
        //     const testView = new IconTextView(this,100,100,100,100)
        //     testView.layout();
        //     testView.drawBounds(this.add.graphics(),0x00ffff)

        const parentSizer = new RexPlugins.UI.Sizer(this, 300, 300, 440, 460);
        parentSizer.setOrientation('vertical');
        // parentSizer.layout();
        // parentSizer.drawBounds(this.add.graphics(), 0x0000ff)
        const spac = 27.5;
        parentSizer.spacing = {
            left: spac,
            right: spac,
            top: spac,
            bottom: spac,
            item: spac * .5
        }


        const Sizer = new RexPlugins.UI.FixWidthSizer(this, 300, 200, 385, 202.5);
        Sizer.setAlign('center');
        // Sizer.setOrigin(0,.5)
        parentSizer.add(Sizer);
        // Sizer.layout();
        // Sizer.drawBounds(this.add.graphics(),0x00ff00)

        for (let i = 0; i < 5; i++) {
            const resourceIconTextView = new IconTextView(this, 0, 0, 1, 1);
            resourceIconTextView.setMinSize(101, 101);
            Sizer.add(resourceIconTextView);
        }
        // Sizer.layout();
        // Sizer.drawBounds(this.add.graphics(),0x00ff00)
        debugger
        parentSizer.layout();

        // Sizer.layout();

        parentSizer.drawBounds(this.add.graphics(), 0x00ff00)

    }

    update() { }
}

class IconTextView extends RexPlugins.UI.Sizer {
    static EVENTS = {
        LAYOUT: 'LAYOUT',
    };
    EVENTS = IconTextView.EVENTS;
    textScale = .2;
    spacing = 0;
    iconSprite;
    countText;
    iconTextureKey;

    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height, 'vertical');
        console.log('construct');
        scene.add.existing(this);

        const icon = scene.add.rectangle(100, 100, 100, 100, 0xffff00);
        this.iconSprite = icon;
        this.add(icon);
        this.on(this.EVENTS.LAYOUT, () => {
            const iconSize = Math.min(this.minInnerWidth, this.minInnerHeight * .8)
            icon.setSize(iconSize, iconSize);
            icon.setOrigin(.5);
        });




        const countText = scene.add.text(0, 0, '0');
        this.add(countText);
        this.countText = countText;
        countText.setOrigin(.5);
        this.on(this.EVENTS.LAYOUT, () => {
            countText.setFontSize(this.minInnerHeight * this.textScale);
            // valueSizer.layout();
        });
        // countText.setFontFamily(FONT_BOLD);

        this.setPosition(x, y);
        this.setSize(width, height);
        this.emit(this.EVENTS.LAYOUT);
    }

    runLayout(parent, newWidth, newHeight) {
        debugger
        console.log('layout');
        this.emit(this.EVENTS.LAYOUT);
        return super.runLayout(parent, newWidth, newHeight);
    }

    setCount(number) {
        this.countText.setText(`${number}`);
    }
}


var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
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