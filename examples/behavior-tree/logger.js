import Phaser from 'phaser';
import BehaviorTreePlugin from '../../plugins/behaviortree-plugin.js';
import ClockPlugin from '../../plugins/clock-plugin.js';
import { RUNNING } from '../../plugins/logic/behaviortree/constants.js';

const CreateStringExpression = RexPlugins.BehaviorTree.CreateStringExpression;

RexPlugins.BehaviorTree.BehaviorTree.setStartIDValue(0);

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
        tick.target.print.text += '\n' + text;
        tick.emitNodeLog(this, text);
        return this.SUCCESS;
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        });
    }

    preload() { }

    create() {
        this.print = this.add.text(16, 16, '', {
            fontFamily: 'monospace',
            fontSize: 15,
            color: '#ffffff',
            lineSpacing: 4,
        });

        var logLines = [];
        var appendLog = function (line) {
            console.log(line);
            logLines.push(line);

            if (logLines.length > 32) {
                logLines.shift();
            }
        };

        var btAdd = this.plugins.get('rexBT').add;

        var CreateTask = function (taskName, waitDuration) {
            return btAdd.sequence({
                title: taskName,
                children: [
                    new PrintAction({
                        text: `${taskName}.Start : {{$currentTime}} Hi, {{name}}`
                    }),
                    btAdd.wait({
                        title: `${taskName}.Wait`,
                        duration: waitDuration
                    }),
                    new PrintAction({
                        text: `${taskName}.End {{$currentTime}}`
                    }),
                ]
            });
        };

        var tree = btAdd.behaviorTree({
            title: 'LoggerTest',
        })
            .setRoot(
                btAdd.repeat({
                    title: 'RepeatTwice',
                    maxLoop: 2,
                    child: btAdd.selector({
                        title: 'PickTask',
                        children: [
                            btAdd.cooldown({
                                title: 'TaskA.Cooldown',
                                duration: 1000,
                                child: CreateTask('TaskA', 500)
                            }),
                            CreateTask('TaskB', 800),
                        ]
                    })
                })
            );

        var logger = btAdd.logger({
            tree: tree,
            level: 'status',
            format: 'compact',
            output: appendLog,
        });

        this.events.once('shutdown', function () {
            logger.destroy();
        });

        var blackboard = btAdd.blackboard()
            .set('name', 'rex')
            .set('i', 20);


        appendLog('--- BehaviorTree Logger test ---');

        var clock = this.plugins.get('rexClock').add(this);
        clock
            .on('update', function (time) {
                blackboard.setCurrentTime(time);

                appendLog('--- Ticking ---');

                var state = tree.tick(blackboard, this);

                if (!tree.isRunningState()) {
                    appendLog('--- Done ---');
                    clock.stop();
                }
            }, this)
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
