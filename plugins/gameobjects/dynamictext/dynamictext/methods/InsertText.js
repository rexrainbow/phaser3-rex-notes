var InsertText = function (index, text, style) {
    var bobArray = this.createCharBobArray(text, style);
    index = this.getCharDataIndex(index, true);
    this.addChild(bobArray, index);

    return this;
};

export default InsertText;