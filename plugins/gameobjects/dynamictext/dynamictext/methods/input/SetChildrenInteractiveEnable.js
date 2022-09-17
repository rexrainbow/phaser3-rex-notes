var SetChildrenInteractiveEnable = function (enable) {
    if (enable === undefined) {
        enable = true;
    }

    this.childrenInteractiveEnable = enable;

    return this;
}

export default SetChildrenInteractiveEnable;