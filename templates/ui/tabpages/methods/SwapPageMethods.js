var SwapPage = function (key) {
    var index;
    if (typeof (key) === 'number') {
        index = key;
    } else {
        index = this.getPageIndex(key);
    }

    if (index != null) {
        this.childrenMap.tabs.emitButtonClick(index);
    }

    return this;
}

var SwapFirstPage = function () {
    this.swapPage(0);
    return this;
}

var SwapLastPage = function () {
    this.swapPage(this.getElement('tabs.buttons').length - 1);
    return this;
}


export default {
    swapPage: SwapPage,
    swapFirstPage: SwapFirstPage,
    swapLastPage: SwapLastPage,
};