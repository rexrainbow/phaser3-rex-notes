import 'phaser';
import { Sizer, RoundRectangle, Chart } from '../../templates/ui/ui-components';
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
        this.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js');
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

class Card extends Sizer {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        data
    ) {

        var background = new RoundRectangle(scene, 0, 0, 0, 0, 20, COLOR_MAIN);
        scene.add.existing(background);

        var icon = new RoundRectangle(scene, 0, 0, 80, 80, 20, COLOR_LIGHT);
        scene.add.existing(icon);

        var nameColor = Phaser.Display.Color.IntegerToColor(COLOR_LIGHT);
        var nameText = scene.add.text(0, 0, '', {
            fontSize: '28px',
            color: GetRGBAString(nameColor, 1),
        });

        var titleColor = Phaser.Display.Color.IntegerToColor(COLOR_DARK);
        var titleText = scene.add.text(0, 0, '', {
            fontSize: '18px',
            fontStyle: 'italic',
            color: GetRGBAString(titleColor, 1),
        });

        var dataColor = Phaser.Display.Color.IntegerToColor(COLOR_LIGHT);
        var gridColor = Phaser.Display.Color.IntegerToColor(COLOR_DARK);
        var attributesChart = new Chart(scene, 0, 0, 240, 240, {
            type: 'radar',
            data: {
                labels: ['A', 'B', 'C', 'D', 'E', 'F'],
                datasets: [
                    {
                        backgroundColor: GetRGBAString(dataColor, 0.5),
                        borderColor: GetRGBAString(dataColor, 1),
                        pointBackgroundColor: GetRGBAString(dataColor, 1),
                        data: [0, 0, 0, 0, 0]
                    },
                ]
            },
            options: {
                legend: {
                    display: false,
                },
                scale: {
                    ticks: {
                        min: 0,
                        max: 100,
                        fontColor: GetRGBAString(gridColor, 1),
                        showLabelBackdrop: false,
                    },
                    pointLabels: {
                        fontColor: GetRGBAString(gridColor, 1),
                    },
                    angleLines: {
                        color: GetRGBAString(gridColor, 1),

                    },
                    gridLines: {
                        color: GetRGBAString(gridColor, 1),
                    }
                }
            }
        });
        scene.add.existing(attributesChart);

        var header = new Sizer(scene, {
            orientation: 'x'
        })
            .add(icon,
                { align: 'center', padding: { right: 10 }, expand: false }
            )
            .add(
                new Sizer(scene, {
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
        (this.getElement('name') as Phaser.GameObjects.Text).text = GetValue(data, 'name', 'Name');
        (this.getElement('title') as Phaser.GameObjects.Text).text = GetValue(data, 'title', 'Title');

        var chart = (this.getElement('attributes') as Chart).chart;
        var labels = chart.data.labels;
        var dataset = chart.data.datasets[0].data;
        for (var i = 0, cnt = labels.length; i < cnt; i++) {
            dataset[i] = GetValue(data, labels[i], 0);
        }
        chart.update();
        return this;
    }
}

var GetRGBAString = function (
    color: Phaser.Display.Color,
    alpha?: number
) {
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