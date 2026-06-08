import Phaser from 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const SETTINGS = {
    mask: true,
    enableLayer: true,
    forceSetTimeout: true, 
    targetFps: 240,
    rows: 30
};

class DemoScene extends Phaser.Scene {
    constructor() {
        super("DemoScene");
    }

    create() {
        const panelWidth = this.scale.width - 64;
        const panelHeight = this.scale.height - 64; 
        
        const content = this.rexUI.add.sizer({
            orientation: "y",
            space: { item: 6, left: 20, right: 20, top: 16, bottom: 16 },
        });

        for (let i = 0; i < SETTINGS.rows; i++) {
            const background = this.rexUI.add.roundRectangle(
                0, 0, 2, 2, 4,
                i % 2 ? 0x283344 : 0x243142
            );
            
            const row = this.rexUI.add.label({
                width: panelWidth - 38,
                height: 64,
                background,
                text: this.add.text(0, 0, "Row " + i, {
                    fontSize: "14px",
                    color: "#f2f5fa",
                }),
                space: {
                    left: 10, right: 10, top: 6, bottom: 6,
                },
            });

            row.setInteractive({ useHandCursor: true });
            row.on("pointerdown", () => {
                const selected = row.getData("selected") === true;
                row.setData("selected", !selected);
                background.setFillStyle(
                    selected ? (i % 2 ? 0x283344 : 0x243142) : 0x8a4b32
                );
            });

            content.add(row, { expand: true });
        }

        const panel = this.rexUI.add.scrollablePanel({
            x: this.scale.width / 2,
            y: this.scale.height / 2,
            width: panelWidth,
            height: panelHeight,
            scrollMode: "y",
            panel: {
                child: content,
                mask: SETTINGS.mask ? { updateMode: 0 } : false,
                enableLayer: SETTINGS.enableLayer,
            },
            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 6, 10, 3, 0x384354),
                thumb: this.rexUI.add.roundRectangle(0, 0, 12, 36, 6, 0xd9e4f5),
                hideUnscrollableSlider: false,
                disableUnscrollableDrag: false,
            },
            scroller: {
                threshold: 10,
                dragRate: 1,
                slidingDeceleration: 5000,
                backDeceleration: 5000,
            },
            mouseWheelScroller: {
                focus: true,
                speed: 0.5,
            },
            space: {
                left: 12, right: 18, panel: 10,
            },
        }).layout();

        // red border
        const block = panel.childrenMap.scrollableBlock;
        this.add.rectangle(block.x, block.y, block.displayWidth, block.displayHeight)
            .setStrokeStyle(2, 0xff3333)
            .setDepth(9999);
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: "game",
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#11141a",
    fps: {
        target: SETTINGS.targetFps,
        forceSetTimeout: SETTINGS.forceSetTimeout
    },
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: DemoScene,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    },

};

new Phaser.Game(config);