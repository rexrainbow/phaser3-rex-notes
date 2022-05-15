import Label from '../label/Label.js';
import Clone from '../../../plugins/utils/object/Clone.js';
import ListPanelMethods from './listpanel/Methods.js'


const GetValue = Phaser.Utils.Objects.GetValue;

class DropDownList extends Label {
    constructor(scene, config) {
        super(scene, config);
        this.type = 'rexDropDownList';

        this.options = [];

        this.setOptions(GetValue(config, 'options'));

        var listConfig = GetValue(config, 'list');
        this.setCreateButtonCallback(GetValue(listConfig, 'createButtonCallback'));
        this.setCreateBackgroundCallback(GetValue(listConfig, 'createBackgroundCallback'));
        this.setButtonOverCallback(GetValue(listConfig, 'onButtonOver'));
        this.setButtonOutCallback(GetValue(listConfig, 'onButtonOut'));
        this.setListSize(GetValue(listConfig, 'width'), GetValue(listConfig, 'height'));
        this.setListAlignmentMode(GetValue(listConfig, 'alignParent', 'text'));
        this.setListBounds(GetValue(listConfig, 'bounds'));
        this.setListEaseInDuration(GetValue(listConfig, 'easeIn', 500));
        this.setListEaseOutDuration(GetValue(listConfig, 'easeOut', 100));

        this.onClick(this.toggleListPanel, this);
    }

    destroy(fromScene) {
        //  This Game Object has already been destroyed
        if (!this.scene) {
            return;
        }

        if (this.listPanel) {
            this.listPanel.destroy(fromScene);
            this.listPanel = undefined;
        }

        super.destroy(fromScene);
    }

    setOptions(options) {
        if (options === undefined) {
            options = [];
        }
        Clone(options, this.options);
        return this;
    }


}

Object.assign(
    DropDownList.prototype,
    ListPanelMethods,
);

export default DropDownList;