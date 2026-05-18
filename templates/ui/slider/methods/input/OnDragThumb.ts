import GetValueByPosition from './GetValueByPosition';

var OnDragThumb = function(pointer?: any, dragX?: any, dragY?: any) {
    if (!this.enable || !this.inputActive) {
        return;
    }
    this.value = GetValueByPosition.call(this, dragX, dragY);
}

export default OnDragThumb;