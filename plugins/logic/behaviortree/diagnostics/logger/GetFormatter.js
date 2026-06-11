import CompactFormatter from './formatters/CompactFormatter.js';
import JSONFormatter from './formatters/JSONFormatter.js';
import BBCodeFormatter from './formatters/BBCodeFormatter.js';

var GetFormatter = function (format) {
    if (typeof (format) === 'function') {
        return format;
    }

    switch (format) {
        case 'json':
            return JSONFormatter;

        case 'compact':
            return CompactFormatter;

        case 'bbcode':
            return BBCodeFormatter;

        default:
            return CompactFormatter;
    }
}

export default GetFormatter;
