var OnPointerOverCallback = function (button) {
    if (button.setHoverState) {
        button.setHoverState(true);
    }
}

var OnPointerOutCallback = function (button) {
    if (button.setHoverState) {
        button.setHoverState(false);
    }
}


var RegisterEvents = function () {
    this
        .on('action.over', OnPointerOverCallback)
        .on('action.out', OnPointerOutCallback)
        .on('choice.over', OnPointerOverCallback)
        .on('choice.out', OnPointerOutCallback)
}

export default RegisterEvents;