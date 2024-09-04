import phaser from 'phaser/src/phaser.js';
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
                inputBox: 0x182456,
                messageBackground: 0x696969,
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
                mainPanel.appendMessage(message, room.userInfo);
            })
            .on('userlist.changename', function () {
                mainPanel.setMessages(room.broadcast.getHistory(), room.userInfo)
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
    var background = scene.rexUI.add.roundRectangle({ radius: 20, color: config.color.background })
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
    var userListBox = scene.rexUI.add.gridTable({
        width: 150,
        background: scene.rexUI.add.roundRectangle({ color: config.color.inputBox, alpha: 0.5 }),

        table: {
            cellHeight: 18,
            mask: {
                padding: 1,
            },
            reuseCellContainer: true,
        },

        slider: false,

        createCellContainerCallback(cell, cellContainer) {
            var scene = cell.scene,
                width = cell.width,
                height = cell.height,
                item = cell.item;
            if (cellContainer === null) {
                cellContainer = scene.rexUI.add.label({
                    text: scene.rexUI.add.BBCodeText(0, 0, ''),
                });
            }

            cellContainer.setMinSize(width, height);
            cellContainer.setText(item.text)
            return cellContainer;
        },

        name: 'userListBox'
    })

    // Control
    parent.setUserList = function (users) {
        var nameList = []
        users.forEach(function (user) {
            nameList.push({
                text: user.userName
            })
        })

        userListBox.setItems(nameList);
    }
    return userListBox;
}

var CreateMessageBox = function (parent, config) {
    var scene = parent.scene;
    var messageBox = scene.rexUI.add.gridTable({
        table: {
            cellHeight: 20,
            mask: {
                padding: 1,
            },
            reuseCellContainer: true,
        },

        slider: {
            track: scene.rexUI.add.roundRectangle({ width: 20, height: 10, radius: 10, color: config.color.track }),
            thumb: scene.rexUI.add.roundRectangle({ radius: 10, color: config.color.thumb }),
        },

        createCellContainerCallback(cell, cellContainer) {
            var scene = cell.scene,
                width = cell.width,
                item = cell.item,
                items = cell.items,
                index = cell.index;

            if (cellContainer === null) {
                cellContainer = scene.rexUI.add.titleLabel({
                    space: {
                        item: 10,
                        title: 5
                    },

                    icon: scene.rexUI.add.roundRectangle({ color: 0xffebcd, radius: 20 }),

                    title: scene.rexUI.add.BBCodeText(0, 0, ''),

                    text: scene.rexUI.add.label({
                        orientation: 'x',

                        background: scene.rexUI.add.roundRectangle({
                            strokeColor: config.color.messageBackground, strokeWidth: 2,
                            radius: 10
                        }),

                        text: scene.rexUI.add.BBCodeText(0, 0, '', {
                            wrap: { mode: 'word' }
                        }),

                        space: { left: 10, right: 10, top: 10, bottom: 10 },
                    }),

                    align: {
                        icon: 'top'
                    }
                })
                    .setOrigin(0);
            }

            // Set properties from item value
            var previousItem = items[index - 1];
            var isTheSameName = (previousItem) ? (previousItem.name === item.name) : false;

            // Set icon
            var iconGameObject = cellContainer.getElement('icon');
            if (isTheSameName) {
                cellContainer.setChildVisible(iconGameObject, false);
            } else {
                cellContainer.setChildVisible(iconGameObject, true);
            }

            // Set name
            var nameGameObject = cellContainer.getElement('title');
            if (isTheSameName) {
                scene.rexUI.hide(nameGameObject);
            } else {
                scene.rexUI.show(nameGameObject);
                nameGameObject.setText(item.name);
                cellContainer.setChildAlign(nameGameObject, (item.isLeft) ? 'left' : 'right');
            }

            // Set content
            cellContainer.getElement('text.text')
                .setWrapWidth(width - 200)
                .setText(item.content);

            // Set rtl
            cellContainer.setRTL(!item.isLeft);
            cell.setCellContainerAlign((item.isLeft) ? 'left' : 'right');

            // Set padding
            cellContainer.setInnerPadding('top', (isTheSameName) ? 5 : 20);

            // Layout manually, to get cell height
            cellContainer
                .setDirty(true).layout()  // Run layout manually
                .setDirty(false)          // Don't run layout again

            cell.height = cellContainer.height;

            return cellContainer;
        },

        name: 'messageBox'
    });

    // Control
    parent.appendMessage = function (message, userInfo) {
        var myUserID = userInfo.userID;
        var messages = messageBox.items;
        messages.push({
            name: message.senderName,
            content: message.message,
            isLeft: (myUserID !== message.senderID)
        })

        messageBox
            .setItems(messages)
            .scrollToBottom()
    }
    parent.setMessages = function (messages, userInfo) {
        var myUserID = userInfo.userID;
        messages = messages.map(function (message) {
            return {
                name: message.senderName,
                content: message.message,
                isLeft: (myUserID !== message.senderID)
            }
        })

        messageBox
            .setItems(messages)
            .scrollToBottom()
    }
    return messageBox;
};

var CreateInputPanel = function (parent, config) {
    var scene = parent.scene;
    var background = scene.rexUI.add.roundRectangle({ radius: { bl: 20, br: 20 }, color: config.color.inputBackground }); // Height is 40

    var userNameBox = scene.rexUI.add.canvasInput({
        width: 120, height: 20,

        style: {
            fontSize: 16,
            backgroundBottomY: 4,
            backgroundHeight: 20,

            // Solution A
            'cursor.color': 'black',
            'cursor.backgroundColor': 'white',
        },

        text: config.userName,

        selectAll: true
    })

    var inputBox = scene.rexUI.add.canvasInput({
        width: 100, height: 20,

        background: {
            color: `#${config.color.inputBox.toString(16)}`,
        },

        style: {
            fontSize: 16,
            backgroundBottomY: 4,
            backgroundHeight: 20,

            // Solution A
            'cursor.color': 'black',
            'cursor.backgroundColor': 'white',
        },

        text: 'Hello world',

        selectAll: true
    })

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
            inputBox.close();
        });

    var prevUserName;
    userNameBox
        .on('open', function () {
            prevUserName = userNameBox.text;
        })
        .on('close', function () {
            var currUserName = userNameBox.text;
            if (currUserName !== prevUserName) {
                parent.emit('change-name', currUserName, prevUserName);
            }
        })

    inputBox
        .on('close', function () {
            if (inputBox.text !== '') {
                parent.emit('send-message', inputBox.text, userNameBox.text);
                inputBox.text = '';
            }
        })

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