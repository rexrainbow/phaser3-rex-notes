import SizerPlugin from 'rexPlugins/sizer-plugin.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var data = [{
                content: 'abc',
                icon: Random(0, 0xffffff)
            },
            {
                content: 'aabbcc',
                icon: Random(0, 0xffffff)
            },
        ];
        var sizer = getList(this, 400, 300, data);
        drawBounds(this.add.graphics(), sizer);
    }

    update() {}
}

var getRow = function (scene, data) {
    var icon = scene.add.rectangle(0, 0, 30, 30, data.icon);
    var txt0 = scene.add.text(0, 0, data.content, {
        fontSize: '64px',
        color: 'white',
        backgroundColor: 'gray'
    });
    var sizer = scene.add.rexSizer({
            orientation: 'x',
        })
        .add(icon, 0)
        .add(txt0, 0)
        .layout();

    return sizer;
}

var getList = function (scene, x, y, data) {
    var sizer = scene.add.rexSizer(x, y, {
        orientation: 'y',
    });
    for (var i = 0, cnt = data.length; i < cnt; i++) {
        sizer.add(getRow(scene, data[i]), 0);
    }
    sizer.layout();
    return sizer;
}

var drawBounds = function (graphics, gameObject) {
    graphics.lineStyle(1, 0xff0000).strokeRectShape(gameObject.getBounds());
    var children = (gameObject.getChildren) ? gameObject.getChildren() : undefined;
    if (children === undefined) {
        return;
    }

    for (var i = 0, cnt = children.length; i < cnt; i++) {
        drawBounds(graphics, children[i]);
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexSizer',
            plugin: SizerPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);