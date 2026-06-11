import Phaser from 'phaser';
import YAMLEventSheetsPlugin from '../../plugins/yamleventsheets-plugin.js';
import BBCodeTextPlugin from '../../plugins/bbcodetext-plugin.js';

const Colors = {
    group: '#5DADE2',
    sheet: '#48C9B0',
    label: '#F4D03F',
    condition: '#BB8FCE',
    command: '#58D68D',
    running: '#F5B041',
    success: '#58D68D',
    warning: '#E67E22',
    error: '#EC7063',
    muted: '#AEB6BF',
    text: '#EAECEE',
};

var Color = function (color, text) {
    return `[color=${color}]${text}[/color]`;
}

var Bold = function (text) {
    return `[b]${text}[/b]`;
}

var Raw = function (value) {
    return `[raw]${FormatValue(value)}[/raw]`;
}

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

var FormatStatus = function (statusName) {
    switch (statusName) {
        case 'SUCCESS':
            return Color(Colors.success, statusName);

        case 'RUNNING':
            return Color(Colors.running, statusName);

        case 'FAILURE':
        case 'ABORT':
        case 'ERROR':
            return Color(Colors.error, statusName);

        default:
            return Color(Colors.text, statusName);
    }
}

var FormatBoolean = function (value) {
    return (value) ? Color(Colors.success, 'true') : Color(Colors.error, 'false');
}

var FormatSheet = function (event) {
    if (!event.sheetTitle) {
        return '';
    }

    return ` sheet=${Color(Colors.sheet, Raw(event.sheetTitle))}`;
}

var FormatCommand = function (event) {
    var text = ` cmd=${Color(Colors.command, Raw(event.commandName))}`;
    if (event.parameters !== undefined) {
        text += ` ${Raw(event.parameters)}`;
    }
    return text;
}

var FormatEventBBCode = function (event) {
    switch (event.type) {
        case 'start':
            return Color(Colors.group, event.type);

        case 'continue':
            return Color(Colors.running, event.type);

        case 'complete':
            return Color(Colors.success, event.type);

        case 'stop':
            return Color(Colors.error, event.type);

        case 'eventsheet.add':
            return `${Color(Colors.sheet, 'eventsheet.add')}${FormatSheet(event)}`;

        case 'eventsheet.remove':
            return `${Color(Colors.warning, 'eventsheet.remove')}${FormatSheet(event)}`;

        case 'eventsheet.removeall':
            return `${Color(Colors.warning, 'eventsheet.removeall')} sheets=${Raw(event.sheetTitles)}`;

        case 'eventsheet.open':
            return `${Color(Colors.sheet, 'eventsheet.open')}${FormatSheet(event)}`;

        case 'eventsheet.condition':
            return `${Color(Colors.condition, 'eventsheet.condition')}${FormatSheet(event)} passed=${FormatBoolean(event.conditionPassed)}`;

        case 'eventsheet.enter':
            return `${Color(Colors.sheet, 'eventsheet.enter')}${FormatSheet(event)}`;

        case 'eventsheet.catch':
            return `${Color(Colors.warning, 'eventsheet.catch')}${FormatSheet(event)}`;

        case 'eventsheet.tick':
            return `${Color(Colors.muted, 'eventsheet.tick')}${FormatSheet(event)}`;

        case 'eventsheet.skip':
            return `${Color(Colors.warning, 'eventsheet.skip')}${FormatSheet(event)} reason=${Raw(event.reason)}`;

        case 'eventsheet.abort':
            return `${Color(Colors.error, 'eventsheet.abort')}${FormatSheet(event)}`;

        case 'eventsheet.status':
            return `${Color(Colors.sheet, Raw(event.sheetTitle))} -> ${FormatStatus(event.statusName)}`;

        case 'eventsheet.close':
            return `${Color(Colors.muted, 'eventsheet.close')}${FormatSheet(event)}`;

        case 'eventsheet.exit':
            return `${Color(Colors.sheet, 'eventsheet.exit')}${FormatSheet(event)}`;

        case 'eventsheet.roundbreak':
            return `${Color(Colors.running, 'eventsheet.roundbreak')}${FormatSheet(event)} node=${Raw(event.nodeTitle || event.nodeName)}`;

        case 'label.enter':
            return `${Color(Colors.label, 'label.enter')} ${Raw(event.labelTitle)}${FormatSheet(event)}`;

        case 'label.exit':
            return `${Color(Colors.label, 'label.exit')} ${Raw(event.labelTitle)}${FormatSheet(event)}`;

        case 'command.start':
            return `${Color(Colors.command, 'command.start')}${FormatCommand(event)}${FormatSheet(event)}`;

        case 'command.end':
            return `${Color(Colors.command, 'command.end')}${FormatCommand(event)} success=${FormatBoolean(event.success)}${FormatSheet(event)}`;

        case 'command.pause':
            return `${Color(Colors.running, 'command.pause')}${FormatCommand(event)}${FormatSheet(event)}`;

        case 'command.resume':
            return `${Color(Colors.running, 'command.resume')}${FormatCommand(event)}${FormatSheet(event)}`;

        case 'command.abort':
            return `${Color(Colors.error, 'command.abort')}${FormatCommand(event)}${FormatSheet(event)}`;

        case 'condition.eval':
            return `${Color(Colors.condition, `condition.${event.conditionType}`)} ${Raw(FormatExpression(event.expression))} => ${FormatBoolean(event.result)}${FormatSheet(event)}`;

        case 'repeat.iteration':
            return `${Color(Colors.running, 'repeat.iteration')}${FormatSheet(event)} ${event.iterationIndex}/${event.maxLoop} status=${FormatStatus(event.statusName)}`;

        case 'pause.click':
            return Color(Colors.running, 'pause.click');

        case 'pause.key':
            return `${Color(Colors.running, 'pause.key')} key=${Raw(event.key)}`;

        case 'pause.input':
            return Color(Colors.running, 'pause.input');

        case 'resume.input':
            return Color(Colors.running, 'resume.input');

        default:
            return Color(Colors.muted, event.type);
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

var FormatRecordBBCode = function (record, status) {
    var lines = [
        `${Bold(Color(Colors.group, Raw(record.groupName)))}: ${FormatStatus(status)} round#${record.roundID} events=${record.events.length}`
    ];

    var events = record.events;
    var startIndex = Math.max(events.length - 8, 0);
    for (var i = startIndex, cnt = events.length; i < cnt; i++) {
        lines.push(`  ${FormatEventBBCode(events[i])}`);
    }

    return lines.join('\n');
}

var FormatTraceBBCode = function (tracer, groupNames) {
    var blocks = [];

    for (var i = 0, cnt = groupNames.length; i < cnt; i++) {
        var groupName = groupNames[i];
        var currentRecord = tracer.getCurrentRecord(groupName);

        if (currentRecord) {
            blocks.push(FormatRecordBBCode(currentRecord, 'RUNNING'));
            continue;
        }

        var lastRecord = GetLastRecord(tracer, groupName);
        if (lastRecord) {
            blocks.push(FormatRecordBBCode(lastRecord, lastRecord.statusName || 'COMPLETE'));
        } else {
            blocks.push(`${Bold(Color(Colors.group, Raw(groupName)))}: ${Color(Colors.muted, 'IDLE')}`);
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
        this.traceText = this.add.rexBBCodeText(0, 0, '', {
            fontFamily: 'monospace',
            fontSize: 24,
            lineSpacing: 3,
            fixedWidth: 1600,
            fixedHeight: 800,
            padding: {
                left: 8,
                right: 8,
                top: 8,
                bottom: 8,
            },
            wrap: {
                mode: 'char',
                width: 1400
            },
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

        this.traceText.setText(FormatTraceBBCode(this.tracer, this.groupNames));
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 1920,
    height: 1080,
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
            {
                key: 'BBCodeTextPlugin',
                plugin: BBCodeTextPlugin,
                start: true
            }
        ],
    }
};

var game = new Phaser.Game(config);
