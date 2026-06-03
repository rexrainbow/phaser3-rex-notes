import Phaser from 'phaser';
import BehaviorTreePlugin from '../../plugins/behaviortree-plugin.js';
import ClockPlugin from '../../plugins/clock-plugin.js';
import mustache from 'mustache';

class PrintAction extends RexPlugins.BehaviorTree.Action {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {  // New node
            var { text = '' } = config;
            super(
                {
                    name: 'MyAction',
                    properties: { text: text },
                },
            );
        }

        this.text = this.properties.text;
    }

    tick(tick) {
        var text = mustache.render(this.text, tick.getGlobalMemory());
        console.log(`Print: ${text}`);
        return this.SUCCESS;
    }
}

class PrintService extends RexPlugins.BehaviorTree.Service {
    constructor(config = {}, nodePool) {
        if (nodePool) {  // Rebuild node, don't touch config
            super(config, nodePool);

        } else {
            var {
                text = '',
                interval = 70
            } = config;
            super(
                {
                    name: 'MyPrintService',
                    interval: interval,
                    properties: { text: text },
                },
            );

        }

        this.text = this.properties.text;
    }

    tick(tick) {
        var text = mustache.render(this.text, tick.getGlobalMemory());
        console.log(`Print-Service: ${text}`);
    }
}

var SortNodes = function (data) {
    data.nodes.sort(function (a, b) {
        return a.id.localeCompare(b.id);
    });
    return data;
}

var AssertDumpEquals = function (dataA, dataB) {
    dataA = SortNodes(JSON.parse(JSON.stringify(dataA)));
    dataB = SortNodes(JSON.parse(JSON.stringify(dataB)));

    // Serial number may advance while load creates replacement node instances.
    dataA.sn = null;
    dataB.sn = null;

    var jsonA = JSON.stringify(dataA);
    var jsonB = JSON.stringify(dataB);
    if (jsonA !== jsonB) {
        console.error(dataA, dataB);
        throw new Error('BehaviorTree dump/load round-trip failed.');
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
                btAdd.repeat({
                    maxLoop: '1+1+1',
                    child: btAdd.selector({
                        children: [
                            btAdd.cooldown({
                                duration: 1000,
                                child: CreateTask('TaskA', 500)
                                    .addService(new PrintService({ text: `{{$currentTime}}` })),
                            }),
                            CreateTask('TaskB', 1000)
                        ]
                    })
                })

            )
        tree
            .setTitle('')
            .setDescription('')
        tree.root.setTitle('');

        // Dump
        var data = tree.dump();
        console.log(data);
        // Load
        var tree2 = btAdd.behaviorTree({
            title: 'Original title before load',
            description: 'Original description before load',
        })
            .load(data, {
                MyAction: PrintAction,
                MyPrintService: PrintService
            });
        AssertDumpEquals(data, tree2.dump());

        var blackboard = btAdd.blackboard()
            .set('name', 'rex')
            .set('i', 20);

        var clock = this.plugins.get('rexClock').add(this);
        clock
            .on('update', function (time, delta) {
                blackboard.setCurrentTime(time);
                var state = tree2.tick(blackboard);
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
