'use strict'

import Canvas from './../../plugins/canvas-plugin.js';
import Chart from './../../plugins/utils/chartjs/Chart.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var canvas = this.add.rexCanvas(0, 0, 400, 400).setOrigin(0);

        var src = canvas.getCanvas();
        var ctx = src.getContext('2d');
        //ctx.fillStyle = 'dimgray';
        //ctx.fillRect(0, 0, src.width, src.height);
        debugger
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                },
                animation: {
                    duration: 0,
                    onProgress: function(animation) {
                        console.log(animation.animationObject.currentStep / animation.animationObject.numSteps)
                        canvas.needRedraw();
                    },
                    onComplete: function() {
                        console.log('onComplete')
                    }
                }                
            }
        });
        console.log(ctx.canvas.toDataURL());
    }

    update() { }
}

var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo
};

var game = new Phaser.Game(config);