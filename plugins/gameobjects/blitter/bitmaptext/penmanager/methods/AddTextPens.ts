import CharPen from '../pen/CharPen';

var AddTextPens = function(text?: any) {
    for (var i = 0, cnt = text.length; i < cnt; i++) {
        var pen = new CharPen(this)
            .setChar(text.charAt(i))
        this.pens.push(pen);
    }

    return this;
}

export default AddTextPens;