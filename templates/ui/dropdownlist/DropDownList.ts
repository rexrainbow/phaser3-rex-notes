import Label from '../label/Label';
import Methods from './methods/Methods'


import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class DropDownList extends Label {
    options: any;

    _value: any;
    currentOverIndex: any;
    emit: any;
    ignoreDestroy: any;
    listPanel: any;
    onClick: any;
    scene: any;
    setButtonClickCallback: any;
    setButtonOutCallback: any;
    setButtonOverCallback: any;
    setCreateButtonCallback: any;
    setCreateListBackgroundCallback: any;
    setCreateListSliderThumbCallback: any;
    setCreateListSliderTrackCallback: any;
    setListAlignmentMode: any;
    setListAlignmentSide: any;
    setListBounds: any;
    setListDraggable: any;
    setListEaseInDuration: any;
    setListEaseOutDuration: any;
    setListExpandDirection: any;
    setListMaxHeight: any;
    setListMouseWheelScrollerConfig: any;
    setListScrollerConfig: any;
    setListSize: any;
    setListSliderAdaptThumbSizeEnable: any;
    setListSpace: any;
    setListTransitInCallback: any;
    settListTransitOutCallback: any;
    setWrapEnable: any;
    timer: any;
    toggleListPanel: any;
    type: any;
    valueChangeCallback: any;
    valueChangeCallbackScope: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        this.type = 'rexDropDownList';
        this.timer = undefined;
        this.listPanel = undefined;
        this.currentOverIndex = undefined;

        this.setOptions(GetValue(config, 'options'));

        var listConfig = GetValue(config, 'list');
        this.setWrapEnable(GetValue(listConfig, 'wrap', false));
        this.setCreateButtonCallback(GetValue(listConfig, 'createButtonCallback'));
        this.setCreateListBackgroundCallback(GetValue(listConfig, 'createBackgroundCallback'));
        this.setCreateListSliderTrackCallback(GetValue(listConfig, 'createTrackCallback'));
        this.setCreateListSliderThumbCallback(GetValue(listConfig, 'createThumbCallback'));
        this.setListSliderAdaptThumbSizeEnable(GetValue(listConfig, 'sliderAdaptThumbSize', false));
        this.setListScrollerConfig(GetValue(listConfig, 'scroller'));
        this.setListMouseWheelScrollerConfig(GetValue(listConfig, 'mouseWheelScroller'));
        this.setButtonClickCallback(GetValue(listConfig, 'onButtonClick'));
        this.setButtonOverCallback(GetValue(listConfig, 'onButtonOver'));
        this.setButtonOutCallback(GetValue(listConfig, 'onButtonOut'));
        this.setListExpandDirection(GetValue(listConfig, 'expandDirection'));
        this.setListEaseInDuration(GetValue(listConfig, 'easeIn', 500));
        this.setListEaseOutDuration(GetValue(listConfig, 'easeOut', 100));
        this.setListTransitInCallback(GetValue(listConfig, 'transitIn'));
        this.settListTransitOutCallback(GetValue(listConfig, 'transitOut'));
        this.setListMaxHeight(GetValue(listConfig, 'maxHeight', 0));
        this.setListSize(GetValue(listConfig, 'width'), GetValue(listConfig, 'height', 0));
        this.setListAlignmentMode(GetValue(listConfig, 'alignParent', 'text'));
        this.setListAlignmentSide(GetValue(listConfig, 'alignSide', ''));
        this.setListBounds(GetValue(listConfig, 'bounds'));
        this.setListSpace(GetValue(listConfig, 'space'));
        this.setListDraggable(GetValue(listConfig, 'draggable', false));

        this.setValueChangeCallback(
            GetValue(config, 'setValueCallback'),
            GetValue(config, 'setValueCallbackScope')
        );
        this.setValue(GetValue(config, 'value'));

        this.onClick(this.toggleListPanel, this);
    }

    destroy(fromScene?: any) {
        //  This Game Object has already been destroyed
        if (!this.scene || this.ignoreDestroy) {
            return;
        }

        if (this.listPanel) {
            this.listPanel.destroy(fromScene);
            this.listPanel = undefined;
        }

        super.destroy(fromScene);
    }

    get isOpened() {
        return !!this.listPanel;
    }

    setOptions(options?: any) {
        if (options === undefined) {
            options = [];
        }
        this.options = options;
        return this;
    }

    setValueChangeCallback(callback?: any, scope?: any) {
        this.valueChangeCallback = callback;
        this.valueChangeCallbackScope = scope;
        return this;
    }

    setValue(value?: any) {
        this.value = value;
        return this;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        if (this._value === value) {
            return;
        }

        var previousValue = this._value;
        this._value = value;

        var callback = this.valueChangeCallback,
            scope = this.valueChangeCallbackScope;
        if (callback?: any) {
            if (scope?: any) {
                callback.call(scope, this, value, previousValue);
            } else {
                callback(this, value, previousValue)
            }
        }

        this.emit('valuechange', this, value, previousValue);

    }

}

Object.assign(
    DropDownList.prototype,
    Methods,
);

export default DropDownList;