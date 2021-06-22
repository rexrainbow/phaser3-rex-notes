import 'phaser';
import FirebasePlugin from '../../plugins/firebase-plugin.js';
import firebaseConfig from './firebaseConfig.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import GetRandomWord from '../../plugins/utils/string/GetRandomWord.js';
import Delay from '../../plugins/utils/promise/Delay.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.plugins.get('rexFire').preload(this);
    }

    create() {
        var userID = GetRandomWord(10),
            userName = GetRandomWord(5, 10);

        var rexFire = this.plugins.get('rexFire').initializeApp(firebaseConfig);
        var room = rexFire.add.singleRoom({
            root: 'simple-room-ui',
            broadcast: {
                history: true
            }
        });

        var mainPanel = CreateMainPanel(this, {
            x: 400, y: 300,
            width: 640, height: 560,
            color: {
                background: 0x0E376F,
                track: 0x3A6BA5,
                thumb: 0xBFCDBB,
                inputBackground: 0x685784,
                inputBox: 0x182456
            },
            userName: userName
        })
            .layout();

        // Control
        mainPanel
            .on('send-message', function (message) {
                room.broadcast.send(message)
            })
            .on('change-name', function (newUserName) {
                room.changeUserName(newUserName);
            })

        room
            .on('userlist.update', function (users) {
                mainPanel.setUserList(users);
            })
            .on('broadcast.receive', function (message) {
                mainPanel.appendMessage(message);
            })
            .on('userlist.changename', function () {
                mainPanel.setMessages(room.broadcast.getHistory())
            })
            .setUser(userID, userName)
            .joinRoom()

    }

    update() { }
}

var CreateMainPanel = function (scene, config) {
    var mainPanel = scene.rexUI.add.sizer({
        x: config.x, y: config.y,
        width: config.width, height: config.height,
        orientation: 'y'
    });
    var upperPanel = scene.rexUI.add.sizer({
        orientation: 'x'
    });
    var background = scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, config.color.background);
    var userListBox = CreateUserListBox(mainPanel, config);
    var messageBox = CreateMessageBox(mainPanel, config);
    var inputPanel = CreateInputPanel(mainPanel, config);

    upperPanel
        .add(
            userListBox, //child
            0, // proportion
            'center', // align
            { right: 5 }, // paddingConfig
            true, // expand
        )
        .add(
            messageBox, //child
            1, // proportion
            'center', // align
            0, // paddingConfig
            true, // expand
        )
    mainPanel
        .addBackground(background)
        .add(
            upperPanel, //child
            1, // proportion
            'center', // align
            { top: 10, bottom: 10, left: 5, right: 5 }, // paddingConfig
            true, // expand
        )
        .add(
            inputPanel, //child
            0, // proportion
            'center', // align
            0, // paddingConfig
            true, // expand
        );

    return mainPanel;
};

var CreateUserListBox = function (parent, config) {
    var scene = parent.scene;
    var userListBox = scene.rexUI.add.textArea({
        width: 150,
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, config.color.inputBox, 0.5),
        text: scene.rexUI.add.BBCodeText(0, 0, '', {

        }),

        slider: false,

        name: 'userListBox'
    });

    // Control
    parent.setUserList = function (users) {
        var s = []
        users.forEach(function (user) {
            s.push(user.userName)
        })
        userListBox.setText(s.join('\n'));
    }
    return userListBox;
}

var CreateMessageBox = function (parent, config) {
    var scene = parent.scene;
    var messageBox = scene.rexUI.add.textArea({
        text: scene.rexUI.add.BBCodeText(0, 0, '', {

        }),

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, config.color.track),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, config.color.thumb),
        },

        name: 'messageBox'
    });

    // Control
    var messageToString = function (message) {
        return `[${message.senderName}] ${message.message}\n`;
    }
    parent.appendMessage = function (message) {
        var s = messageToString(message);
        messageBox
            .appendText(s)
            .scrollToBottom()
    }
    parent.setMessages = function (messages) {
        var s = [];
        messages.forEach(function (message) {
            s.push(messageToString(message))
        })
        messageBox
            .setText(s.join(''))
            .scrollToBottom()
    }
    return messageBox;
};

var CreateInputPanel = function (parent, config) {
    var scene = parent.scene;
    var background = scene.rexUI.add.roundRectangle(0, 0, 2, 2, { bl: 20, br: 20 }, config.color.inputBackground); // Height is 40
    var userNameBox = scene.rexUI.add.BBCodeText(0, 0, config.userName, {
        halign: 'right',
        valign: 'center',
        fixedWidth: 120,
        fixedHeight: 20
    });

    var inputBox = scene.rexUI.add.BBCodeText(0, 0, 'Hello world', {
        halign: 'left',
        valign: 'center',
        fixedWidth: 100,
        fixedHeight: 20,
        backgroundColor: `#${config.color.inputBox.toString(16)}`
    });

    var SendBtn = scene.rexUI.add.BBCodeText(0, 0, 'Send', {

    });

    var inputPanel = scene.rexUI.add.label({
        height: 40,

        background: background,
        icon: userNameBox,
        text: inputBox,
        expandTextWidth: true,
        action: SendBtn,

        space: {
            left: 15,
            right: 15,
            top: 0,
            bottom: 0,

            icon: 10,
            text: 10,
        }
    });

    // Control
    SendBtn
        .setInteractive()
        .on('pointerdown', function () {
            if (inputBox.text !== '') {
                parent.emit('send-message', inputBox.text, userNameBox.text);
                inputBox.text = '';
            }
        });

    userNameBox
        .setInteractive()
        .on('pointerdown', function () {
            var prevUserName = userNameBox.text;
            scene.rexUI.edit(
                userNameBox,  // text game object
                undefined,  // Config
                function (textObject) { // onClose
                    var currUserName = textObject.text
                    if (currUserName !== prevUserName) {
                        parent.emit('change-name', currUserName, prevUserName);
                    }
                }
            );
        });

    inputBox
        .setInteractive()
        .on('pointerdown', function () {
            scene.rexUI.edit(inputBox);
        });

    return inputPanel;
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
    dom: {
        createContainer: true
    },
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexFire',
            plugin: FirebasePlugin,
            start: true
        }],
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);