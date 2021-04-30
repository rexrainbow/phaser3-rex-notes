var GetWord = function (children, startIndex, result) {
    if (result === undefined) {
        result = { word: [], width: 0 };
    }

    result.word.length = 0;

    var endIndex = children.length;
    var currentIndex = startIndex;
    var word = result.word, wordWidth = 0;
    while (currentIndex < endIndex) {
        var child = children[currentIndex];
        if ((child.type === 'text') && (child.text !== ' ') && (child.text !== '\n')) {
            word.push(child);
            wordWidth += child.width;
            currentIndex++;
            // Continue
        } else {  // Get non-text child, a space, or a new-line
            if (currentIndex === startIndex) { // Single child
                word.push(child);
                wordWidth += child.width;
            }
            break;
        }

    }

    result.width = wordWidth;
    return result;
}

export default GetWord;