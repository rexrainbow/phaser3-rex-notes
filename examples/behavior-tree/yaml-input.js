import 'phaser';
import BehaviorTreePlugin from '../../plugins/behaviortree-plugin.js';
import ClockPlugin from '../../plugins/clock-plugin.js';

var content = `
selector :
    conditions:
        repeat : 3
    children : 
        - sequence :
            title: TaskA
            conditions:
                cooldown : 1000
            children : 
                - print : |
                    TaskA.Start : {{$currentTime}}
                - wait : 500
                - print : |
                    TaskA.End : {{$currentTime}}
            services :
                - print-service: |
                    {{$currentTime}}
        - sequence :
            title: TaskB
            children : 
                - print : |
                    TaskB.Start : {{$currentTime}}
                - wait : 1000
                - print : |
                    TaskB.End : {{$currentTime}}
`

class PrintAction extends RexPlugins.BehaviorTree.Action {
    constructor({ text = '' } = {}) {
        super({
            name: 'MyAction',
            properties: { text: text },
        });

        this.textExpression = this.addStringTemplateExpression(text);
    }

    tick(tick) {
        var text = this.textExpression.eval(tick.blackboardContext);
        console.log(`Print: ${text}`);
        return this.SUCCESS;
    }
}

var CreatePrintNode = function (text) {
    return new PrintAction({
        text: text
    });
}

class PrintService extends RexPlugins.BehaviorTree.Service {
    constructor({
        text = '',
        interval = 70
    } = {}) {
        super({
            name: 'MyPrintService',
            interval: interval,
            properties: { text: text },
        });

        this.textExpression = this.addStringTemplateExpression(text);
    }

    tick(tick) {
        var text = this.textExpression.eval(tick.blackboardContext);
        console.log(`Print-Service: ${text}`);
    }
}

var CreatePrintServiceNode = function (text) {
    return new PrintService({
        text: text
    });
}


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var btAdd = this.plugins.get('rexBT').add;

        var tree = btAdd.behaviorTree()
            .setRoot(
                btAdd.yaml(content, {
                    'print': CreatePrintNode,
                    'print-service': CreatePrintServiceNode
                })
            )

        console.log(tree.dump());

        var blackboard = btAdd.blackboard();
        var clock = this.plugins.get('rexClock').add(this);
        clock
            .on('update', function (time, delta) {
                blackboard.setCurrentTime(time);
                var state = tree.tick(blackboard);
                console.log(`Run tick ${state}`);

                // Stop ticking
                if (state !== 3) {
                    clock.stop();
                }
            })
            .start()
            .tick(0);


    }

    update() {
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
        global: [
            {
                key: 'rexBT',
                plugin: BehaviorTreePlugin,
                start: true
            },
            {
                key: 'rexClock',
                plugin: ClockPlugin,
                start: true
            }
        ]
    }
};

var game = new Phaser.Game(config);