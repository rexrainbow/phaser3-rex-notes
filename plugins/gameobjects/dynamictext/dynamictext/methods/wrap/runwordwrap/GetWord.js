import { CharTypeName } from '../../../bob/Types.js';
import IsASCIIString from '../../../../../../utils/string/IsASCIIString.js';

var GetWord = function (children, startIndex, wrapMode, result) {
    if (result === undefined) {
        result = { word: [], width: 0 };
    }

    result.word.length = 0;

    var isCharWrap = (wrapMode === 2);
    var isMixWrap = (wrapMode === 3);
    var isWordWrap = !isCharWrap && !isMixWrap;

    var endIndex = children.length;
    var currentIndex = startIndex;
    var word = result.word;
    var wordWidth = 0;
    var hasAnyASCIICharacter = false;
    while (currentIndex < endIndex) {
        var child = children[currentIndex];
        // Can't render (command child), put into output directly
        if (!child.renderable) {
            word.push(child);
            currentIndex++;
            continue;
        }

        var text = (child.type === CharTypeName) ? child.text : null;
        // Get image child, a new-line, or page-break
        if ((text === null) || (text === '\n') || (text === '\f')) {
            if (currentIndex === startIndex) { // Single child
                word.push(child);
                wordWidth += child.outerWidth;
            }
            break;
        }

        if (isWordWrap) {
            word.push(child);
            wordWidth += child.outerWidth;
            if (text === ' ') { // Word is end with a space character
                break;
            }

            currentIndex++;

        } else if (isCharWrap) {  // Word only contains 1 character
            word.push(child);
            wordWidth += child.outerWidth;
            // Flush this 1 character
            break;

        } else if (isMixWrap) {
            if (!IsASCIIString(text)) {
                if (!hasAnyASCIICharacter) {
                    word.push(child);
                    wordWidth += child.outerWidth;

                    // Is next child a space character?
                    var nextChild = children[currentIndex + 1];
                    if (nextChild &&
                        (nextChild.type === CharTypeName) &&
                        (nextChild.text === ' ')) {
                        word.push(nextChild);
                        wordWidth += nextChild.outerWidth;
                        // Include this space character
                    }
                    // Flush this 1 non-ascii character
                    break;

                } else {
                    // Flush remainder children (all ascii character), except current child
                    break;

                }
            } else {
                word.push(child);
                wordWidth += child.outerWidth;
                if (text === ' ') { // Word is end with a space character
                    break;
                }

                currentIndex++;
                hasAnyASCIICharacter = true;
                // Test next child until ...
            }

        }
    }

    result.width = wordWidth;
    return result;
}

export default GetWord;