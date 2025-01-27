import GetValueByPosition from './GetValueByPosition.js';

var OnDragThumb = function (pointer, dragX, dragY) {
    if (!this.enable || !this.inputActive) {
        return;
    }
    this.value = GetValueByPosition.call(this, dragX, dragY);
}

export default OnDragThumb;