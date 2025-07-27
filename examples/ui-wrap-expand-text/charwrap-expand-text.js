import phaser from '../../../phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() { }

    create() {
        var content = '正嚷間，大聖到了。叫一聲：開路！掣開鐵棒，幌一幌，碗來粗細，丈二長短，丟開架子，打將出來。九曜星那個敢抵，一時打退。那九曜星立住陣勢道：你這不知死活的弼馬溫！你犯了十惡之罪，先偷桃，後偷酒，攪亂了蟠桃大會，又竊了老君仙丹，又將御酒偷來此處享樂，你罪上加罪，豈不知之？大聖笑道：這幾樁事，實有，實有！但如今你怎麼？九曜星道：吾奉玉帝金旨，帥眾到此收降你，快早皈依，免教這些生靈納命。不然，就髹平了此山，掀翻了此洞也！大聖大怒道：量你這些毛神，有何法力，敢出浪言。不要走，請吃老孫一棒！';

        this.rexUI.add.sizer({
            x: 400, y: 300,
            width: 500,
            orientation: 'x',

            space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 }
        })
            .addBackground(this.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_MAIN))
            .add(this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT), 0, 'bottom')

            .add(
                // Built-in Text game object does not support character wrapper
                this.rexUI.wrapExpandText(this.rexUI.add.BBCodeText(0, 0, content, {
                    fontSize: 24,
                    wrap: { mode: 'char' }
                })),
                {
                    proportion: 1,
                    expand: true
                }
            )

            .add(this.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_LIGHT), 0, 'bottom')
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
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