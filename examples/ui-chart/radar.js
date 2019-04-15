import UIPlugin from '../../templates/ui/ui-plugin.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
        this.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js');
    }

    create() {
        var chart = CreateChart(this, {
            x: 400,
            y: 300,
            width: 400,
            height: 400,
            data: [10, 20, 30, 40, 50, 60]
        });

        var dataset = chart.chart.data.datasets;
        dataset[0].data[0] = 100;
        chart.chart.update();
    }

    update() { }
}

var CreateChart = function (scene, config) {
    var x = GetValue(config, 'x', 0);
    var y = GetValue(config, 'y', 0);
    var width = GetValue(config, 'width', 100);
    var height = GetValue(config, 'height', 100);
    var data = GetValue(config, 'data', []);
    return scene.rexUI.add.chart(x, y, width, height, {
        type: 'radar',
        data: {
            labels: ['A', 'B', 'C', 'D', 'E'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: Chart.helpers.color('red').alpha(0.5).rgbString(),
                    borderColor: 'red',
                    pointBackgroundColor: 'red',
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
                    min: 0,
                    max: 100,
                    beginAtZero: true,
                    backdropColor: 'transparent'
                },
                angleLines: {
                    color: Chart.helpers.color('yellow').alpha(0.3).rgbString(),

                },
                gridLines: {
                    color: Chart.helpers.color('yellow').alpha(0.3).rgbString(),
                }
            }
        }
    })
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