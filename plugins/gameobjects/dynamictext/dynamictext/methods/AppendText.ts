var AppendText = function(text?: any, style?: any) {
    var children = this.createCharChildren(text, style);
    this.addChild(children);
    return this;
};

export default AppendText;