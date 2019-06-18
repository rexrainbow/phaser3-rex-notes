import QuestPlugin from '../../plugins/quest-plugin.js';

const csvString = `type,name
q,Q0
,Z
,X
,C
q,Q1
,Z
,X
,C
q,Q2
,Z
,X
,C`;
class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
        this.txt;
    }

    preload() { }

    create() {
        var quest = this.plugins.get('rexQuest').add({
            form: {
                items: csvString
            },
            quest: {
                shuffleQuests: true,
                shuffleOptions: true,
            }
        });
        runQuest(this, quest, function (out) {
            console.log(out);
        });
    }

    update() {
    }
}

var runQuest = function (scene, quest, onComplete, out) {
    if (out === undefined) {
        out = {};
    }
    if (scene.print === undefined) {
        scene.print = scene.add.text(0, 0, '');
    }

    if (quest.isLastQuest()) {
        scene.print.text += JSON.stringify(out) + '\n';
        if (onComplete) {
            onComplete(out);
        }
        return;
    }

    var item = quest.getNextQuest();
    var options = item.options;
    scene.print.text += `${item.name}:${options[0].name}, ${options[1].name}, ${options[2].name} ? `;

    // Input
    if (scene.zKey === undefined) {
        scene.zKey = scene.input.keyboard.addKey('Z');
    }
    if (scene.xKey === undefined) {
        scene.xKey = scene.input.keyboard.addKey('X');
    }
    if (scene.cKey === undefined) {
        scene.cKey = scene.input.keyboard.addKey('C');
    }

    scene.zKey
        .removeAllListeners()
        .on('down', function () {
            out[item.name] = 'Z';
            scene.print.text += 'Z\n';
            runQuest(scene, quest, onComplete, out); // Run next quest
        })
    scene.xKey
        .removeAllListeners()
        .on('down', function () {
            out[item.name] = 'X';
            scene.print.text += 'X\n';
            runQuest(scene, quest, onComplete, out); // Run next quest
        })
    scene.cKey
        .removeAllListeners()
        .on('down', function () {
            out[item.name] = 'C';
            scene.print.text += 'C\n';
            runQuest(scene, quest, onComplete, out); // Run next quest
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
        global: [{
            key: 'rexQuest',
            plugin: QuestPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);