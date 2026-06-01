import Phaser from 'phaser';
import BehaviorTreePlugin from '../../plugins/behaviortree-plugin.js';
import ClockPlugin from '../../plugins/clock-plugin.js';

class PrintAction extends RexPlugins.BehaviorTree.Action {
    constructor({ text = '' } = {}) {
        super({
            name: 'MyAction',
            properties: { text: text },
        });

        this.textExpression = this.addStringTemplateExpression(text);
    }

    tick(tick) {
        var text = this.textExpression.eval(tick.getGlobalMemory());
        console.log(`Print: ${text}`);
        return this.SUCCESS;
    }
}

class World {
    constructor() {
        this.state = {
            player: {
                coin: 10
            }
        };
    }

    get player() {
        return this.state.player;
    }

    evaluateCondition(condition, context) {
        switch (condition.conditionType) {
            case 'playerCoin':
                return this.evaluatePlayerCoinCondition(condition, context);
            default:
                return false;
        }
    }

    evaluatePlayerCoinCondition(condition, context) {
        var coin = this.player.coin;
        var value = context.evaluateExpression(condition.parameters.value);
        switch (condition.parameters.operator) {
            case '>':
                return coin > value;
            case '>=':
                return coin >= value;
            case '<':
                return coin < value;
            case '<=':
                return coin <= value;
            case '===':
                return coin === value;
            default:
                return false;
        }
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
        var world = new World();

        var CreateTask = function (taskName, waitDuration) {
            if (waitDuration === undefined) {
                waitDuration = 1000;
            }

            return btAdd.sequence({
                children: [
                    new PrintAction({ text: `${taskName}.Start : {{$currentTime}}` }),
                    btAdd.wait({ duration: waitDuration }),
                    new PrintAction({ text: `${taskName}.End : {{$currentTime}}` }),
                ]
            });
        }
        var tree = btAdd.behaviorTree()
            .setRoot(
                btAdd.ifSelector({
                    expression: {
                        conditionType: 'playerCoin',
                        parameters: {
                            operator: '>',
                            value: 'time * 10'
                        }
                    },
                    children: [
                        CreateTask('TaskA', 500),
                        CreateTask('TaskB', 500)
                    ]
                })

            )

        var blackboard = btAdd.blackboard();
        var target = {
            world: world
        };

        var clock = this.plugins.get('rexClock').add(this);
        clock
            .on('update', function (time, delta) {
                blackboard.setCurrentTime(time);
                var state = tree.tick(blackboard, target, {
                    getEvalContext(tick) {
                        var context = {
                            world: tick.target.world,
                            time: tick.currentTime / 1000,
                            blackboard: tick.blackboard,
                            evaluateExpression(value) {
                                return tick.evalExpressionValue(value, this);
                            }
                        }
                        context.evalExpressionObject = function (expression) {
                            return tick.target.world.evaluateCondition(expression, context);
                        }

                        return context;
                    }
                });
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
