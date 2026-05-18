import Pool from '../../../../pool';

class WrapTextLinesPool extends Pool {
    pop: any;
    push: any;
    pushMultiple: any;

    freeLine(line?: any) {
        if (!line) {
            return;
        }
        this.push(line);
        return this;
    }

    freeLines(lines?: any) {
        if (!lines) {
            return;
        }
        this.pushMultiple(lines);
        return this;
    }

    getLine(text?: any, width?: any, newLineMode?: any) {
        var l = this.pop();
        if (l === null) {
            l = {};
        }
        l.text = text;
        l.width = width;
        l.newLineMode = newLineMode;
        return l;
    }

}


export default WrapTextLinesPool;