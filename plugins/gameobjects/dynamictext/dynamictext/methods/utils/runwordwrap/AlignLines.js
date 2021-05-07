import { HAlign, VAlign } from '../AlignConst.js';

var AlignLines = function (result, width, height) {
    var hAlign = result.hAlign,
        vAlign = result.vAlign;

    if (typeof (hAlign) === 'string') {
        hAlign = HAlign[hAlign];
        result.hAlign = hAlign;
    }
    if (typeof (vAlign) === 'string') {
        vAlign = VAlign[vAlign];
        result.vAlign = vAlign;
    }

    if (hAlign !== 0) {  // left align does not have offset
        var lines = result.lines;
        for (var li = 0, lcnt = lines.length; li < lcnt; li++) {
            var line = lines[li];
            var lineWidth = line.width,
                children = line.children;

            var xOffset;
            switch (hAlign) {
                case 1:  // center
                    xOffset = (width - lineWidth) / 2
                    break;
                case 2:  // right
                    xOffset = width - lineWidth;
                    break;
            }

            for (var ci = 0, ccnt = children.length; ci < ccnt; ci++) {
                var child = children[ci];
                child.x += xOffset;
            }
        }
    }

    if (vAlign !== 0) { // top align does not have offset
        var linesHeight = result.linesHeight;
        var yOffset;
        switch (vAlign) {
            case 1: // center
                yOffset = (height - linesHeight) / 2;
                break;
            case 2: // bottom
                yOffset = height - linesHeight;
                break;
        }

        var children = result.children;
        for (var ci = 0, ccnt = children.length; ci < ccnt; ci++) {
            var child = children[ci];
            child.y += yOffset;
        }
    }
}

export default AlignLines;