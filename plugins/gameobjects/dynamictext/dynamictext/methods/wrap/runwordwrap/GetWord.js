import { CharTypeName } from '../../../bob/Types.js';

var GetWord = function (children, startIndex, charMode, result) {
    if (result === undefined) {
        result = { word: [], width: 0 };
    }

    result.word.length = 0;

    var endIndex = children.length;
    var currentIndex = startIndex;
    var word = result.word, wordWidth = 0;
    while (currentIndex < endIndex) {
        var child = children[currentIndex];
        if ((child.type === CharTypeName) && (child.text !== ' ') && (child.text !== '\n')) {
            word.push(child);
            wordWidth += child.outerWidth;
            currentIndex++;
            // Continue
        } else {  // Get non-text child, a space, or a new-line
            if (currentIndex === startIndex) { // Single child
                word.push(child);
                wordWidth += child.outerWidth;
            }
            break;
        }

        if (charMode) {  // Word only contains 1 character
            break;
        }
    }

    result.width = wordWidth;
    return result;
}

export default GetWord;