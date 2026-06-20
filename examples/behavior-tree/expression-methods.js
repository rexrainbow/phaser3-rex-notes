import Phaser from 'phaser';
import BehaviorTreePlugin from '../../plugins/behaviortree-plugin.js';
import ClockPlugin from '../../plugins/clock-plugin.js';
import mustache from 'mustache';

var ExpressionHandlers = {
    playStatus(parameters, context) {
        var [field] = parameters;
        var value = context.player[field];
        console.log(`Custom expression method: playStatus(${field}) = ${value}`)
        return value;
    }
}

const CreateStringExpression = RexPlugins.BehaviorTree.CreateStringExpression;

class PrintAction extends RexPlugins.BehaviorTree.Action {
    constructor(config = {}, nodePool) {
        var text;

        if (nodePool) {
            super(config, nodePool);

            var expressions = config.expressions || {};
            text = expressions.text;

        } else {
            var {
                text: textValue = ''
            } = config;

            super({
                name: 'Print',
                properties: { text: textValue },
            });

            text = textValue;
        }

        this.text = this.addExpression('text', CreateStringExpression(text, nodePool));
    }

    tick(tick) {
        var text = tick.evalExpression(this.text);
        console.log(`Print: ${text}`);
        return this.SUCCESS;
    }
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

        var blackboard = btAdd.blackboard({})
            .set('player', {
                name: 'rex',
                coin: 10,
                hp: 100,
                mp: 30
            })

        var target = ExpressionHandlers;

        var CreateTask = function (taskName, waitDuration) {
            if (waitDuration === undefined) {
                waitDuration = 1000;
            }

            return btAdd.sequence({
                children: [
                    new PrintAction({ text: `${taskName}.Start : hello {{playStatus("name")}}` }),
                    btAdd.wait({ duration: waitDuration }),
                    new PrintAction({ text: `${taskName}.End` }),
                ]
            });
        }
        var tree = btAdd.behaviorTree()
            .setRoot(
                btAdd.ifSelector({
                    condition: '(playStatus("hp") > 50) && (playStatus("mp") > 10)',
                    children: [
                        CreateTask('TaskA', 500),
                        CreateTask('TaskB', 500)
                    ]
                })
            )


        var clock = this.plugins.get('rexClock').add(this);
        clock
            .on('update', function (time, delta) {
                blackboard.setCurrentTime(time);
                var state = tree.tick(blackboard, target);
                console.log(`Run tick ${state}`);

                // Stop ticking
                if (!tree.isRunningState()) {
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
