var GetText = function(activeOnly?: any) {
    var text = ''
    this.forEachCharChild(function(child?: any) {
        text += child.text;
    }, undefined, activeOnly);
    return text;
}

export default GetText;