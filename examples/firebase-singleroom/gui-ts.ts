import 'phaser';
import AwaitLoader from '../../plugins/awaitloader';
import firebaseConfig from './firebaseConfig';
import { Preload as SetupFirebase, SingleRoom, Broadcast } from '../../plugins/firebase-components';
import { Sizer, TextArea, Label, BBCodeText, RoundRectangle, Edit } from '../../templates/ui/ui-components';
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

interface IMainPanelConfig {
    x?: number, y?: number,
    width?: number, height?: number,
    color?: {
        background?: number,
        track?: number,
        thumb?: number,
        inputBackground?: number,
        inputBox?: number
    },
    userName?: string
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
        const s = []
        users.forEach(function (user) {
            s.push(user.userName)
        })

        const usetListBox = this.getElement('UserListBox') as TextArea;
        usetListBox.setText(s.join('\n'));

        return this;
    }

    appendMessage(message: Broadcast.IReceiveData) {
        var s = MessageToString(message);

        const MessageBox = this.getElement('MessageBox') as TextArea;
        MessageBox
            .appendText(s)
            .scrollToBottom()

        return this;
    }

    setMessages(messages: Broadcast.IReceiveData[]) {
        const s = [];
        messages.forEach(function (message) {
            s.push(MessageToString(message))
        })

        const MessageBox = this.getElement('MessageBox') as TextArea;

        MessageBox
            .setText(s.join(''))
            .scrollToBottom()

        return this;
    }
}

const MessageToString = function (message: Broadcast.IReceiveData) {
    return `[${message.senderName}] ${message.message}\n`;
}

var CreateUserListBox = function (parent: MainPanel, config: IMainPanelConfig) {

    const scene = parent.scene;

    const background = new RoundRectangle(scene, { color: config.color.inputBox, alpha: 0.5 });
    scene.add.existing(background);

    const text = new BBCodeText(scene);
    scene.add.existing(text);

    const userListBox = new TextArea(scene, {
        width: 150,
        background: background,
        text: text,

        slider: false,

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

    const messageBox = new TextArea(scene, {
        text: text,

        slider: {
            track: track,
            thumb: thumb,
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

    const userNameBox = new BBCodeText(scene, 0, 0, config.userName, {
        halign: 'right',
        valign: 'center',
        fixedWidth: 120,
        fixedHeight: 20
    });
    scene.add.existing(userNameBox);

    const inputBox = new BBCodeText(scene, 0, 0, 'Hello world', {
        halign: 'left',
        valign: 'center',
        fixedWidth: 100,
        fixedHeight: 20,
        backgroundColor: `#${config.color.inputBox.toString(16)}`
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
        });

    userNameBox
        .setInteractive()
        .on('pointerdown', function () {
            const prevUserName = userNameBox.text;
            Edit(
                userNameBox,  // text game object
                undefined,    // Config
                function (textObject: BBCodeText) { // onClose
                    const currUserName = textObject.text
                    if (currUserName !== prevUserName) {
                        parent.emit('change-name', currUserName, prevUserName);
                    }
                }
            );
        });

    inputBox
        .setInteractive()
        .on('pointerdown', function () {
            Edit(inputBox);
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
    scene: Demo

};

var game = new Phaser.Game(config);