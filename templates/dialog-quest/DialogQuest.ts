import QuestionManager from '../../plugins/logic/quest/questions/QuestionManager';
import QuestMethods from './QuestMethods';
import DataMethods from './DataMethods';

import { Events as PhaserEvents, Utils as PhaserUtils } from 'phaser';
const EE = PhaserEvents.EventEmitter;
const GetValue = PhaserUtils.Objects.GetValue;

class DialogQuest extends EE {
    dialog: any;
    emit: any;
    questionManager: any;

    constructor(config?: any) {
        super();

        if (config === undefined) {
            config = {};
        }
        if (!config.quest) {
            config.quest = true;
        }

        this.dialog = GetValue(config, 'dialog', undefined);
        this.questionManager = new QuestionManager(config);

        // Attach events
        this.questionManager
            .on('quest', function(question?: any) {
                var choices = this.dialog.getElement('choices');
                var options = question.options, option;
                for (var i = 0, cnt = choices.length; i < cnt; i++) {
                    option = options[i];
                    if (option?: any) {
                        this.dialog.showChoice(i);
                        this.emit('update-choice', choices[i], option, this);
                    } else {
                        this.dialog.hideChoice(i);
                    }
                }
                this.emit('update-dialog', this.dialog, question, this);
            }, this);

        this.dialog
            .on('button.click', function(button?: any, groupName?: any, index?: any) {
                var eventName = 'click-' + ((groupName === 'choices') ? 'choice' : 'action');
                this.emit(eventName, button, this.dialog, this);
            }, this)
    }
}

Object.assign(
    DialogQuest.prototype,
    QuestMethods,
    DataMethods
);


export default DialogQuest;