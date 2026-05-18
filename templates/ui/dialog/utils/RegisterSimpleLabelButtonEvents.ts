var OnPointerOverCallback = function(button?: any) {
    if (button.setHoverState) {
        button.setHoverState(true);
    }
}

var OnPointerOutCallback = function(button?: any) {
    if (button.setHoverState) {
        button.setHoverState(false);
    }
}

var OnChoiceButtonStateChange = function(button?: any, groupName?: any, index?: any, value?: any) {
    if (button.setActiveState) {
        button.setActiveState(value);
    }
}

var OnButtonEnable = function(button?: any) {
    if (button.setDisableState) {
        button.setDisableState(false);
    }
}

var OnButtonDisable = function(button?: any) {
    if (button.setDisableState) {
        button.setDisableState(true);
    }
}

var RegisterEvents = function() {
    this
        .on('button.over', OnPointerOverCallback)
        .on('button.out', OnPointerOutCallback)
        .on('button.enable', OnButtonEnable)
        .on('button.disable', OnButtonDisable)
        .on('button.statechange', OnChoiceButtonStateChange)

}

export default RegisterEvents;