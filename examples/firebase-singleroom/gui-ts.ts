import 'phaser';
import AwaitLoader from '../../plugins/awaitloader';
import firebaseConfig from './firebaseConfig';
import { Preload as SetupFirebase, SingleRoom, Broadcast } from '../../plugins/firebase-components';
import {
    Sizer, GridTable, Label, TitleLabel, BBCodeText, RoundRectangle, CanvasInput,
    Hide, Show,
} from '../../templates/ui/ui-components';
import GetRandomWord from '../../plugins/utils/string/GetRandomWord';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

        AwaitLoader.call(this.load, async function (successCallback: Function, failureCallback: Function) {
            await SetupFirebase({}, firebaseConfig);
            successCallback();
        })

    }

    create() {
        var userID = GetRandomWord(10),
            userName = GetRandomWord(5, 10);

        var room = new SingleRoom({
            root: 'simple-room-ui',
            broadcast: {
                history: true
            }
        });

        var mainPanel = new MainPanel(this, {
            x: 400, y: 300,
            width: 640, height: 560,
            color: {
                background: 0x0E376F,
                messageBackground: 0x696969,
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
            .on('send-message', function (message: string, userName: string) {
                room.broadcast.send(message)
            })
            .on('change-name', function (newUserName: string) {
                room.changeUserName(newUserName);
            })

        room
            .on('userlist.update', function (users: SingleRoom.IUserInfo[]) {
                mainPanel.setUserList(users);
            })
            .on('broadcast.receive', function (message: Broadcast.IReceiveData) {
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

interface IMainPanelConfig {
    x?: number, y?: number,
    width?: number, height?: number,
    color?: {
        background?: number,
        messageBackground?: number,
        track?: number,
        thumb?: number,
        inputBackground?: number,
        inputBox?: number
    },
    userName?: string
}

interface IUserName {
    text: string,
}

interface IMessage {
    name: string,
    content: string,
    isLeft: boolean
}

class MainPanel extends Sizer {
    constructor(scene: Phaser.Scene, config: IMainPanelConfig) {

        const { x, y, width, height } = config;
        super(scene, { x, y, width, height, orientation: 'y' });
        scene.add.existing(this);

        const upperPanel = new Sizer(scene, {
            orientation: 'x'
        });
        scene.add.existing(upperPanel);

        const background = new RoundRectangle(scene, { radius: 20, color: config.color.background });
        scene.add.existing(background);

        const userListBox = CreateUserListBox(this, config);
        const messageBox = CreateMessageBox(this, config);
        const inputPanel = CreateInputPanel(this, config);

        upperPanel
            .add(
                userListBox, //child
                { proportion: 0, expand: true, padding: { right: 5 } }
            )
            .add(
                messageBox, //child
                { proportion: 1, expand: true }
            )
        this
            .addBackground(background)
            .add(
                upperPanel, //child
                { proportion: 1, expand: true, padding: { top: 10, bottom: 10, left: 5, right: 5 } }
            )
            .add(
                inputPanel, //child
                { proportion: 0, expand: true }
            );

        this
            .addChildrenMap('UserListBox', userListBox)
            .addChildrenMap('MessageBox', messageBox)
            .addChildrenMap('InputPanel', inputPanel)

    }

    setUserList(users: SingleRoom.IUserInfo[]) {
        var nameList: IUserName[] = [];
        users.forEach(function (user) {
            nameList.push({
                text: user.userName
            })
        })
        const usetListBox = this.getElement('UserListBox') as GridTable;
        usetListBox.setItems(nameList);

        return this;
    }

    appendMessage(message: Broadcast.IReceiveData, userInfo: SingleRoom.IUserInfo) {
        var myUserID = userInfo.userID;

        const messageBox = this.getElement('MessageBox') as GridTable;
        const messages = messageBox.items as IMessage[];
        messages.push({
            name: message.senderName,
            content: message.message as string,
            isLeft: (myUserID !== message.senderID)
        })

        messageBox
            .setItems(messages)
            .scrollToBottom()

        return this;
    }

    setMessages(receiveData: Broadcast.IReceiveData[], userInfo: SingleRoom.IUserInfo) {
        const myUserID = userInfo.userID;
        const messages = receiveData.map(function (message) {
            return {
                name: message.senderName,
                content: message.message,
                isLeft: (myUserID !== message.senderID)
            }
        })

        const messageBox = this.getElement('MessageBox') as GridTable;
        messageBox
            .setItems(messages)
            .scrollToBottom()

        return this;
    }
}

var CreateUserListBox = function (parent: MainPanel, config: IMainPanelConfig) {

    const scene = parent.scene;

    const background = new RoundRectangle(scene, { color: config.color.inputBox, alpha: 0.5 });
    scene.add.existing(background);

    const text = new BBCodeText(scene);
    scene.add.existing(text);

    const userListBox = new GridTable(scene, {
        width: 150,
        background: background,
        table: {
            cellHeight: 18,
            mask: {
                padding: 1,
            },
            reuseCellContainer: true,
        },

        slider: false,

        createCellContainerCallback(cell, cellContainer: Label) {
            var scene = cell.scene,
                width = cell.width,
                height = cell.height,
                item = cell.item as IUserName;
            if (cellContainer === null) {
                const text = new BBCodeText(scene, 0, 0, '');
                scene.add.existing(text);

                cellContainer = new Label(scene, {
                    text: text
                });
                scene.add.existing(cellContainer);
            }

            cellContainer.setMinSize(width, height);
            cellContainer.setText(item.text)
            return cellContainer;
        },

        name: 'userListBox'
    });
    scene.add.existing(userListBox);
    return userListBox;
}

var CreateMessageBox = function (parent: MainPanel, config: IMainPanelConfig) {

    const scene = parent.scene;

    const text = new BBCodeText(scene);
    scene.add.existing(text);

    const track = new RoundRectangle(scene, { width: 20, height: 10, radius: 10, color: config.color.track });
    scene.add.existing(track);

    const thumb = new RoundRectangle(scene, { radius: 10, color: config.color.thumb });
    scene.add.existing(thumb);

    const messageBox = new GridTable(scene, {
        table: {
            cellHeight: 20,
            mask: {
                padding: 1,
            },
            reuseCellContainer: true,
        },

        slider: {
            track: track,
            thumb: thumb,
        },

        createCellContainerCallback(cell, cellContainer: TitleLabel) {
            var scene = cell.scene,
                width = cell.width,
                item = cell.item as IMessage,
                items = cell.items as IMessage[],
                index = cell.index;

            if (cellContainer === null) {
                const icon = new RoundRectangle(scene, { color: 0xffebcd, radius: 20 });
                scene.add.existing(icon);

                const title = new BBCodeText(scene, 0, 0, '');
                scene.add.existing(title);

                const textLabelBackground = new RoundRectangle(scene, {
                    strokeColor: config.color.messageBackground, strokeWidth: 2,
                    radius: 10
                })
                scene.add.existing(textLabelBackground);

                const textLabelText = new BBCodeText(scene, 0, 0, '', {
                    wrap: { mode: 'word' }
                });
                scene.add.existing(textLabelText);

                const textLabel = new Label(scene, {
                    orientation: 'x',

                    background: textLabelBackground,

                    text: textLabelText,

                    space: { left: 10, right: 10, top: 10, bottom: 10 },
                })
                scene.add.existing(textLabel);

                cellContainer = new TitleLabel(scene, {
                    space: {
                        item: 10,
                        title: 5
                    },

                    icon: icon,

                    title: title,

                    text: textLabel,

                    align: {
                        icon: 'top'
                    }
                })
                    .setOrigin(0);

                scene.add.existing(cellContainer);
            }

            // Set properties from item value
            var previousItem = items[index - 1];
            var isTheSameName = (previousItem) ? (previousItem.name === item.name) : false;

            // Set icon
            var iconGameObject = cellContainer.getElement('icon') as RoundRectangle;
            if (isTheSameName) {
                cellContainer.setChildVisible(iconGameObject, false);
            } else {
                cellContainer.setChildVisible(iconGameObject, true);
            }

            // Set name
            var nameGameObject = cellContainer.getElement('title') as BBCodeText;
            if (isTheSameName) {
                Hide(nameGameObject);
            } else {
                Show(nameGameObject);
                nameGameObject.setText(item.name);
                cellContainer.setChildAlign(nameGameObject, (item.isLeft) ? 'left' : 'right');
            }

            // Set content
            (cellContainer.getElement('text.text') as BBCodeText)
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
    scene.add.existing(messageBox);

    return messageBox;
};

var CreateInputPanel = function (parent: MainPanel, config: IMainPanelConfig) {

    const scene = parent.scene;

    const background = new RoundRectangle(scene, { radius: { bl: 20, br: 20 }, color: config.color.inputBackground });
    scene.add.existing(background);

    const userNameBox = new CanvasInput(scene, {
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
    scene.add.existing(userNameBox);

    const inputBox = new CanvasInput(scene, {
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
    });
    scene.add.existing(inputBox);

    const SendBtn = new BBCodeText(scene, 0, 0, 'Send');
    scene.add.existing(SendBtn);

    const inputPanel = new Label(scene, {
        height: 40,

        background: background,
        icon: userNameBox,
        text: inputBox,
        expandTextWidth: true,
        action: SendBtn,

        space: {
            left: 15, right: 15, top: 0, bottom: 0,

            icon: 10, text: 10,
        }
    });
    scene.add.existing(inputPanel);

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

    let prevUserName: string;
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
    scene: Demo

};

var game = new Phaser.Game(config);