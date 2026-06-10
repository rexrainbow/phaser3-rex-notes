import Phaser from 'phaser';
import YAMLEventSheetsPlugin from '../../plugins/yamleventsheets-plugin.js';
import {
    EVT_GROUP_START,
    EVT_GROUP_CONTINUE,
    EVT_GROUP_COMPLETE,
    EVT_GROUP_STOP,
    EVT_EVENTSHEET_ENTER,
    EVT_EVENTSHEET_CATCH,
    EVT_EVENTSHEET_STATUS,
    EVT_EVENTSHEET_SKIP,
    EVT_EVENTSHEET_ABORT,
    EVT_LABEL_ENTER,
    EVT_LABEL_EXIT,
    EVT_COMMAND_START,
    EVT_COMMAND_END,
    EVT_COMMAND_PAUSE,
    EVT_COMMAND_RESUME,
    EVT_COMMAND_ABORT,
    EVT_CONDITION_EVAL,
} from '../../plugins/logic/eventsheets/eventsheetmanager/constants.js';

var FormatValue = function (value) {
    if (value === undefined) {
        return '';
    }

    if (typeof (value) === 'string') {
        return value;
    }

    return JSON.stringify(value);
}

var FormatExpression = function (expression) {
    if (expression && (typeof (expression) === 'object')) {
        var text = expression.name || JSON.stringify(expression);
        if (expression.parameters) {
            text += ` ${FormatValue(expression.parameters)}`;
        }
        return text;
    }

    return `"${expression}"`;
}

var FormatEvent = function (event) {
    switch (event.type) {
        case EVT_GROUP_START:
        case EVT_GROUP_CONTINUE:
        case EVT_GROUP_COMPLETE:
        case EVT_GROUP_STOP:
            return event.type;

        case EVT_EVENTSHEET_ENTER:
        case EVT_EVENTSHEET_CATCH:
        case EVT_EVENTSHEET_SKIP:
        case EVT_EVENTSHEET_ABORT:
            return `${event.type} ${event.sheetTitle}`;

        case EVT_EVENTSHEET_STATUS:
            return `${event.sheetTitle} -> ${event.statusName}`;

        case EVT_LABEL_ENTER:
        case EVT_LABEL_EXIT:
            return `${event.type} ${event.labelTitle}`;

        case EVT_COMMAND_START:
            return `cmd ${event.commandName} ${FormatValue(event.parameters)} start`;

        case EVT_COMMAND_END:
            return `cmd ${event.commandName} end success=${event.success}`;

        case EVT_COMMAND_PAUSE:
        case EVT_COMMAND_RESUME:
        case EVT_COMMAND_ABORT:
            return `cmd ${event.commandName} ${event.type}`;

        case EVT_CONDITION_EVAL:
            return `condition.${event.conditionType} ${FormatExpression(event.expression)} => ${event.result}`;

        default:
            return event.type;
    }
}

var GetLastRecord = function (tracer, groupName) {
    var records = tracer.getRecords();
    for (var i = records.length - 1; i >= 0; i--) {
        if (records[i].groupName === groupName) {
            return records[i];
        }
    }

    return undefined;
}

var FormatRecord = function (record, status) {
    var lines = [
        `${record.groupName}: ${status} round#${record.roundID} events=${record.events.length}`
    ];

    var events = record.events;
    var startIndex = Math.max(events.length - 8, 0);
    for (var i = startIndex, cnt = events.length; i < cnt; i++) {
        lines.push(`  ${FormatEvent(events[i])}`);
    }

    return lines.join('\n');
}

var FormatTrace = function (tracer, groupNames) {
    var blocks = [];

    for (var i = 0, cnt = groupNames.length; i < cnt; i++) {
        var groupName = groupNames[i];
        var currentRecord = tracer.getCurrentRecord(groupName);

        if (currentRecord) {
            blocks.push(FormatRecord(currentRecord, 'RUNNING'));
            continue;
        }

        var lastRecord = GetLastRecord(tracer, groupName);
        if (lastRecord) {
            blocks.push(FormatRecord(lastRecord, lastRecord.statusName || 'COMPLETE'));
        } else {
            blocks.push(`${groupName}: IDLE`);
        }
    }

    return blocks.join('\n\n');
}

class CommandExecutor {
    constructor({
        waitDuration = 1000
    } = {}) {
        this.defaultWaitDuration = waitDuration;
    }

    print(
        {
            text = ''
        } = {},
        eventSheetManager, eventSheet
    ) {

        console.log(text);
    }

    wait(
        {
            duration = this.defaultWaitDuration
        } = {},
        eventSheetManager, eventSheet
    ) {

        var resumeCallback = eventSheetManager.pauseEventSheet();
        setTimeout(resumeCallback, duration);
    }
}

class Demo extends Phaser.Scene {

    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.text('eventSheet0', 'assets/yamleventsheets/parallel-groups/parallel0.yml');
        this.load.text('eventSheet1', 'assets/yamleventsheets/parallel-groups/parallel1.yml');
    }

    create() {
        this.traceText = this.add.text(0, 0, '', {
            fontFamily: 'monospace',
            fontSize: 13,
            color: '#bde3ff',
            lineSpacing: 3,
        });

        var eventSheetManager = this.plugins.get('rexYAMLEventSheets').add({
            commandExecutor: new CommandExecutor(),
        })
            .addEventSheet(this.cache.text.get('eventSheet0'), 'task0')
            .addEventSheet(this.cache.text.get('eventSheet1'), 'task1')
            .on('complete', function (groupName) {
                console.log(`Group '${groupName}' complete`)
            })

        this.logger = this.plugins.get('rexYAMLEventSheets').addLogger({
            manager: eventSheetManager,
            level: 'flow',
            format: 'compact'
        });

        this.groupNames = ['task0', 'task1'];
        this.tracer = this.plugins.get('rexYAMLEventSheets').addTracer({
            manager: eventSheetManager,
            maxRecords: 8,
            includeTime: false,
        });

        eventSheetManager.startGroup('task0');

        this.time.delayedCall(1000, function () {
            eventSheetManager.startGroup('task1')
        })
    }

    update() {
        if (!this.tracer) {
            return;
        }

        this.traceText.setText(FormatTrace(this.tracer, this.groupNames));
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
                key: 'rexYAMLEventSheets',
                plugin: YAMLEventSheetsPlugin,
                start: true
            },
        ],
    }
};

var game = new Phaser.Game(config);
