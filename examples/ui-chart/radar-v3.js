import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js');
    }

    create() {
        var data = {
            name: 'rex',
            title: 'Programmer',

            A: 10,
            B: 20,
            C: 30,
            D: 40,
            E: 50,
            F: 60,
        }
        var card = new Card(this, 400, 300, data)
            .layout();

    }

    update() { }
}

class Card extends RexPlugins.UI.Sizer {
    constructor(scene, x, y, data) {
        var background = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_MAIN);

        var nameColor = Phaser.Display.Color.IntegerToColor(COLOR_LIGHT);
        var titleColor = Phaser.Display.Color.IntegerToColor(COLOR_DARK);
        var icon = scene.rexUI.add.roundRectangle(0, 0, 80, 80, 20, COLOR_LIGHT);
        var nameText = scene.add.text(0, 0, '', {
            fontSize: 28,
            color: GetRGBAString(nameColor, 1),
        });
        var titleText = scene.add.text(0, 0, '', {
            fontSize: 18,
            fontStyle: 'italic',
            color: GetRGBAString(titleColor, 1),
        });

        var dataColor = Phaser.Display.Color.IntegerToColor(COLOR_LIGHT);
        var gridColor = Phaser.Display.Color.IntegerToColor(COLOR_DARK);
        var attributesChart = scene.rexUI.add.chart(0, 0, 240, 240, {
            type: 'radar',
            data: {
                labels: ['A', 'B', 'C', 'D', 'E', 'F'],
                datasets: [
                    {
                        label: '',
                        backgroundColor: GetRGBAString(dataColor, 0.5),
                        borderColor: GetRGBAString(dataColor, 1),
                        pointBackgroundColor: GetRGBAString(dataColor, 1),
                        data: [0, 0, 0, 0, 0]
                    },
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                        // v3: options.plugins.legend.display: false 
                        // v2: options.legend.display: false 
                    }
                },

                // compare with options.scale in v2
                scales: {
                    r: {
                        min: 0,
                        max: 100,
                        ticks: {
                            color: GetRGBAString(gridColor, 1),
                            showLabelBackdrop: false,
                        },
                        pointLabels: {
                            color: GetRGBAString(gridColor, 1),
                        },
                        angleLines: {
                            color: GetRGBAString(gridColor, 1),
                        },
                        grid: {
                            color: GetRGBAString(gridColor, 1),
                        }
                    }
                }
            }
        });

        var header = scene.rexUI.add.sizer({
            orientation: 'x'
        })
            .add(icon,
                { align: 'center', padding: { right: 10 }, expand: false }
            )
            .add(
                scene.rexUI.add.sizer({
                    orientation: 'y'
                })
                    .add(
                        nameText,
                        { align: 'left', padding: { bottom: 10 }, expand: false }
                    )
                    .add(
                        titleText,
                        { align: 'left', expand: false }
                    )
            )

        super(scene, {
            x: x, y: y,
            orientation: 'y',
            space: { left: 20, right: 20, top: 20, bottom: 20, item: 10 }
        });

        this
            .addBackground(background)
            .add(
                header,
                { align: 'left', expand: false }
            )
            .add(
                attributesChart,
                { align: 'center', expand: false }
            )

        this.addChildrenMap('icon', icon);
        this.addChildrenMap('name', nameText);
        this.addChildrenMap('title', titleText);
        this.addChildrenMap('attributes', attributesChart);

        this.updateData(data);
    }

    updateData(data) {
        this.getElement('name').text = GetValue(data, 'name', 'Name');
        this.getElement('title').text = GetValue(data, 'title', 'Title');

        var chart = this.getElement('attributes').chart;
        var labels = chart.data.labels;
        var dataset = chart.data.datasets[0].data;
        for (var i = 0, cnt = labels.length; i < cnt; i++) {
            dataset[i] = GetValue(data, labels[i], 0);
        }
        chart.update();
        return this;
    }
}

var GetRGBAString = function (color, alpha) {
    if (alpha === undefined) {
        alpha = color.alphaGL;
    }
    return `rgba(${color.red},${color.green},${color.blue},${alpha})`;
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