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

var FormatEvent = function (event) {
    var line = event.type;

    if (event.nodeID !== undefined) {
        line += ` ${event.nodeName || event.nodeTitle || 'node'}#${event.nodeID}`;
    }

    if (event.statusName !== undefined) {
        line += ` -> ${event.statusName}`;
    }

    if (event.message !== undefined) {
        line += ` : ${event.message}`;
    }

    return line;
}

var FormatTrace = function (record) {
    if (!record) {
        return '';
    }

    var lines = [
        `Trace tick#${record.tickID} ${record.statusName} nodes=${record.nodeCount} open=${(record.openNodeIDs) ? record.openNodeIDs.length : 0}`,
    ];

    var events = record.events;
    for (var i = 0, cnt = events.length; i < cnt; i++) {
        lines.push(`  ${i}. ${FormatEvent(events[i])}`);
    }

    return lines.join('\n');
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        });
    }

    preload() { }

    create() {
        this.print = this.add.text(300, 0, '', {
            fontFamily: 'monospace',
            fontSize: 15,
            color: '#ffffff',
            lineSpacing: 4,
        });

        this.traceText = this.add.text(0, 0, '', {
            fontFamily: 'monospace',
            fontSize: 13,
            color: '#bde3ff',
            lineSpacing: 3,
        });

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
            title: 'TracerTest',
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

        var tracer = btAdd.tracer({
            tree: tree,
            maxRecords: 16,
            includeTime: false,
        });

        this.events.once('shutdown', function () {
            tracer.destroy();
        });

        var blackboard = btAdd.blackboard()
            .set('name', 'rex')
            .set('i', 20);

        this.print.text = '--- BehaviorTree Tracer test ---';

        var clock = this.plugins.get('rexClock').add(this);
        clock
            .on('update', function (time) {
                blackboard.setCurrentTime(time);

                var state = tree.tick(blackboard, this);
                var record = tracer.getLastRecord();

                this.traceText.setText(FormatTrace(record));
                console.log(record);

                if (!tree.isRunningState()) {
                    this.print.text += '\n--- Done ---';
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
