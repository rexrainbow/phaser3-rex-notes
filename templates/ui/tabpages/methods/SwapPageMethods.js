var SwapPageByIndex = function (index) {
    this.getElement('tabs').emitButtonClick(index);
    return this;
}

var SwapFirstPage = function () {
    this.swapPageByIndex(0);
    return this;
}

var SwapLastPage = function () {
    this.swapPageByIndex(this.getElement('tabs.buttons').length - 1);
    return this;
}

var SwapPage = function (key) {
    var buttons = this.getElement('tabs.buttons');
    for (var i = 0, cnt = buttons.length; i < cnt; i++) {
        if (buttons[i].name === key) {
            this.swapPageByIndex(i);
            break;
        }
    }
    return this;
}

export default {
    swapPageByIndex: SwapPageByIndex,
    swapFirstPage: SwapFirstPage,
    swapLastPage: SwapLastPage,
    swapPage: SwapPage
};