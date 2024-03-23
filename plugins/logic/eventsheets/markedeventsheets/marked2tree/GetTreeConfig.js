import ParseProperty from './ParseProperty.js';

var GetTreeConfig = function (paragraphs, commentLineStart) {
    // TODO: YAML format? 
    var config = {};
    paragraphs.forEach(function (paragraph) {
        var lines = paragraph.text.split('\n');
        lines.forEach(function (line) {
            if (line.startsWith(commentLineStart)) {
                return;
            }
            ParseProperty(line, config);
        })
    })

    return config;
}

export default GetTreeConfig;