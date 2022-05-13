## Introduction

Draw [chart](https://www.chartjs.org/) on [canvas](canvas.md).

- Author: Rex
- Game object

## Live demos

- [Radar chart](https://codepen.io/rexrainbow/pen/qwVBNy)

## Usage

[Sample code](https://github.com/rexrainbow/phaser3-rex-notes/tree/master/examples/ui-chart)

### Install plugin

#### Install chart.js

[Chart.js](https://www.chartjs.org/) is not included in rexUI, installs it before creating any chart.

```javascript
scene.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js');
```

#### Load minify file

- Load plugin (minify file) in preload stage
    ```javascript
    scene.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js');
    scene.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    ```
- Add chart object
    ```javascript
    var chart = scene.rexUI.add.chart(config);
    ```

#### Import plugin

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Install plugin in [configuration of game](game.md#configuration)
    ```javascript
    import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
    var config = {
        // ...
        plugins: {
            scene: [{
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            },
            // ...
            ]
        }
        // ...
    };
    var game = new Phaser.Game(config);
    ```
- Add chart object
    ```javascript
    var chart = scene.rexUI.add.chart(config);
    ```

#### Import class

- Install rex plugins from npm
    ```
    npm i phaser3-rex-plugins
    ```
- Import class
    ```javascript
    import { Chart } from 'phaser3-rex-plugins/templates/ui/ui-components.js';
    ```
- Add chart object
    ```javascript    
    var chart = new Chart(scene, config);
    scene.add.existing(chart);
    ```

### Add chart object

```javascript
var chart = scene.rexUI.add.chart(x, y, width, height, config);
```

- `x`, `y` : Position of this object.
- `width`, `height` : Canvas size.
- `config` : [Configuration](https://www.chartjs.org/docs/latest/configuration/) for creating chart.
    - Set `undefined` to not create chart at beginning.

### Custom class

- Define class
    ```javascript
    class MyChart extends RexPlugins.UI.Chart {
        constructor(scene, x, y, width, height, config) {
            super(scene, x, y, width, height, config);
            // ...
            scene.add.existing(this);
        }
        // ...
    }
    ```
- Create instance
    ```javascript
    var chart = new MyChart(scene, x, y, width, height, config);
    ```

### Create chart

Create chart (if not creating at beginning).

```javascript
chart.setChart(config);
```

- `config` : [Configuration](https://www.chartjs.org/docs/latest/configuration/) for creating chart.

### Chart data

- Get dataset
    ```javascript
    var dataset = chart.getChartDataset(datasetIndex);
    ```
    - `datasetIndex` : Index number or label string.
- Get data
    ```javascript
    var data = chart.getChartData(datasetIndex, dataIndex);
    ```
    - `datasetIndex` : Index number or label string.
    - `dataIndex` : Index number or label string.
- Set
    ```javascript
    chart.setChartData(datasetIndex, dataIndex, value).updateChart();
    ```
    - `datasetIndex` : Index number or label string.
    - `dataIndex` : Index number or label string.

### Manipulate chart object

1. Get chart object
    ```javascript
    var chart = chart.chart;
    ```
1. Set properties of chart
    - Array of dataset
        ```javascript
        var datasets = chart.data.datasets;
        ```
        - Label of dataset
            ```javascript
            var label = chart.data.datasets[i].label;
            ```
    - Labels
        ```javascript
        var labels = chart.data.labels;
        ```
    - Set chart data
        ```javascript
        chart.data.datasets[datasetIndex].data[dataIndex] = value;
        ```
1. Update chart
    ```javascript
    chart.update();
    ```
