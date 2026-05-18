import ParseProperty from './ParseProperty';

var GetTreeConfig = function(paragraphs?: any, commentLineStart?: any) {
    // TODO: YAML format? 
    var config = {};
    paragraphs.forEach(function(paragraph?: any) {
        var lines = paragraph.text.split('\n');
        lines.forEach(function(line?: any) {
            if (line.startsWith(commentLineStart)) {
                return;
            }
            ParseProperty(line, config);
        })
    })

    return config;
}

export default GetTreeConfig;