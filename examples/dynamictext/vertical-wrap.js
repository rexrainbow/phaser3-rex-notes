import 'phaser';
import DynamicTextPlugin from '../../plugins/dynamictext-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var text = this.add.rexDynamicText(
            {
                x: 400, y: 300,
                width: 400,
                height: 500,

                background: {
                    stroke: 'white',
                    cornerRadius: 20
                },
                innerBounds: {
                    stroke: '#A52A2A'
                },
                padding: 20,
                style: {
                    fontSize: '16px',
                },
            }
        )

        var content = '正嚷間，大聖到了。叫一聲：開路！掣開鐵棒，幌一幌，碗來粗細，丈二長短，丟開架子，打將出來。九曜星那個敢抵，一時打退。那九曜星立住陣勢道：你這不知死活的弼馬溫！你犯了十惡之罪，先偷桃，後偷酒，攪亂了蟠桃大會，又竊了老君仙丹，又將御酒偷來此處享樂，你罪上加罪，豈不知之？大聖笑道：這幾樁事，實有，實有！但如今你怎麼？九曜星道：吾奉玉帝金旨，帥眾到此收降你，快早皈依，免教這些生靈納命。不然，就髹平了此山，掀翻了此洞也！大聖大怒道：量你這些毛神，有何法力，敢出浪言。不要走，請吃老孫一棒！這九曜星一齊踴躍。那美猴王不懼分毫，輪起金箍棒，左遮右擋，把那九曜星戰得筋疲力軟，一個個倒拖器械，敗陣而走，急入中軍帳下，對托塔天王道：那猴王果十分驍勇！我等戰他不過，敗陣來了。李天王即調四大天王與二十八宿，一路出師來鬥。大聖也公然不懼，調出獨腳鬼王、七十二洞妖王與四個健將，就於洞門外列成陣勢。你看這場混戰好驚人也'
        text.appendText(content, { color: '#FFF8DC' })

        this.print = this.add.text(0, 580, '');

        ShowNextPage(text, {
            lineWidth: 45,
            letterSpacing: 0,
            fixedChildHeight: 20,
            padding: {
                top: 15,
                right: 4,
                left: 8
            },
            // rtl: false
            // hAlign: 'right',
            // vAlign: 'top'
        })

    }

    update() { }
}

var ShowNextPage = function (text, config) {
    var result = text.runVerticalWrap(config);

    var scene = text.scene;
    if (!result.isLastPage) {
        scene.print.setText('Click to continue');
        scene.input.once('pointerdown', function () {
            scene.print.setText('');
            ShowNextPage(text, result);
        })
    } else {
        scene.print.setText('Last page');
    }
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
        global: [{
            key: 'rexDynamicText',
            plugin: DynamicTextPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);