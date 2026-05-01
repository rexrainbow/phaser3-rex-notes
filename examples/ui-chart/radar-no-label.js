import Phaser from 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;
var UseChartJSV3 = true;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        if (UseChartJSV3) {
            this.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js');
        } else {
            this.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.min.js');
        }

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
        var card = CreatePanel(this, 400, 300, 400, 500, data)
            .layout();

        // Create point labels after layout()
        CreatePointLabels(card);

        card.drawBounds(this.add.graphics(), 0xff0000)

    }

    update() { }
}

var CreateHeader = function (scene, name, title) {
    var nameColor = Phaser.Display.Color.IntegerToColor(COLOR_LIGHT);
    var titleColor = Phaser.Display.Color.IntegerToColor(COLOR_DARK);
    var icon = scene.rexUI.add.roundRectangle(0, 0, 80, 80, 20, COLOR_LIGHT);
    var nameText = scene.add.text(0, 0, name, {
        fontSize: 28,
        color: GetRGBAString(nameColor, 1),
    });
    var titleText = scene.add.text(0, 0, title, {
        fontSize: 18,
        fontStyle: 'italic',
        color: GetRGBAString(titleColor, 1),
    });

    var header = scene.rexUI.add.sizer({
        orientation: 'x'
    })
        .add(icon,
            { align: 'center', expand: false }
        )
        .add(
            scene.rexUI.add.sizer({
                orientation: 'y'
            })
                .add(
                    nameText,
                    { align: 'left', padding: { bottom: 10 }, expand: false }
                )
                .addSpace()
                .add(
                    titleText,
                    { align: 'left', expand: false }
                ),

            { proportion: 1, expand: true, padding: { left: 10 } }
        )

    return header;
}

var CreateRadarChart = function (scene, labels, data) {
    var dataColor = Phaser.Display.Color.IntegerToColor(COLOR_LIGHT);
    var gridColor = Phaser.Display.Color.IntegerToColor(COLOR_DARK);

    var config;
    if (UseChartJSV3) {
        config = {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [
                    {
                        backgroundColor: GetRGBAString(dataColor, 0.5),
                        borderColor: GetRGBAString(dataColor, 1),
                        pointBackgroundColor: GetRGBAString(dataColor, 1),
                        data: data
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    r: {
                        ticks: {
                            display: false,
                            stepSize: 50
                        },
                        pointLabels: {
                            display: false
                        },
                        angleLines: {
                            color: GetRGBAString(gridColor, 1)
                        },
                        grid: {
                            color: GetRGBAString(gridColor, 1)
                        }
                    }
                }
            }
        }
    } else {
        config = {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [
                    {
                        backgroundColor: GetRGBAString(dataColor, 0.5),
                        borderColor: GetRGBAString(dataColor, 1),
                        pointBackgroundColor: GetRGBAString(dataColor, 1),
                        data: data
                    },
                ]
            },
            options: {
                legend: {
                    display: false,
                },
                scale: {
                    ticks: {
                        display: false,
                        stepSize: 50,
                    },
                    pointLabels: {
                        display: false
                    },
                    angleLines: {
                        color: GetRGBAString(gridColor, 1),
                    },
                    gridLines: {
                        color: GetRGBAString(gridColor, 1),
                    }
                },
            }
        }
    }

    var chart = scene.rexUI.add.chart(0, 0, 100, 100, config);

    return chart;
}

var CreatePointLabels = function (panel) {
    var scene = panel.scene;
    var chartGameObject = panel.getElement('chart');
    var chart = chartGameObject.chart;
    var labels = chart.data.labels;

    var pointLabels = panel.getElement('pointLabels');
    if (!pointLabels) {
        pointLabels = [];
    }

    var ox = chartGameObject.x, oy = chartGameObject.y;
    var r = (Math.min(chartGameObject.width, chartGameObject.height) / 2) + 30;
    for (var i = 0, cnt = labels.length; i < cnt; i++) {
        var txt = pointLabels[i];
        if (!txt) {
            txt = scene.add.text(0, 0, labels[i], { fontSize: 24 });
            txt.setOrigin(0.5, 0.5);
            pointLabels.push(txt);
        }

        var angle = Phaser.Math.DegToRad(360 * (i / cnt) + 270);
        txt.x = ox + r * Math.cos(angle);
        txt.y = oy + r * Math.sin(angle);

        panel.pin(txt)
    }

    panel.addChildrenMap('pointLabels', pointLabels);

    return pointLabels;
}

var CreatePanel = function (scene, x, y, width, height, data) {
    var name = data.name || 'Name';
    var title = data.title || 'Title';
    delete data.name;
    delete data.title;

    var chartLabels = [];
    var chartData = [];
    for (var key in data) {
        chartLabels.push(key);
        chartData.push(data[key]);
    }

    var background = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_MAIN);

    var chart = CreateRadarChart(scene, chartLabels, chartData);

    var header = CreateHeader(scene, name, title);

    var panel = scene.rexUI.add.sizer({
        x: x, y: y,
        width: width, height: height,
        orientation: 'y',
        space: { left: 20, right: 20, top: 20, bottom: 20, item: 10 }
    })
        .addBackground(background)
        .add(
            header,
            { align: 'left', expand: true }
        )
        .add(
            chart,
            {
                align: 'center', proportion: 1, expand: true,
                padding: { left: 50, right: 50, top: 50, bottom: 50 },
                key: 'chart'
            }
        )

    return panel;
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