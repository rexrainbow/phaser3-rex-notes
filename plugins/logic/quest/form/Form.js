import GetValue from '../../../utils/object/GetValue.js';
import ItemsMethods from './itemsMethods.js';
import QuestMethods from './QuestMethods.js';

class Form {
    constructor(config) {
        this.items = [];
        this.itemsMap = {};
        this._quest = undefined;

        var formConfig = GetValue(config, 'form', undefined);
        if (formConfig) {
            this.add(formConfig.items, formConfig);
        }
        var questConfig = GetValue(config, 'quest', undefined);
        if (questConfig) {
            this.startQuest(questConfig)
        }
    }
}

Object.assign(
    Form.prototype,
    ItemsMethods,
    QuestMethods
);

export default Form;