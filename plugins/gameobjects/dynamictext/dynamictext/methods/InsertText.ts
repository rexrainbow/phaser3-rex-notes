var InsertText = function(index?: any, text?: any, style?: any) {
    var children = this.createCharChildren(text, style);
    index = this.getCharChildIndex(index, true);
    this.addChild(children, index);

    return this;
};

export default InsertText;