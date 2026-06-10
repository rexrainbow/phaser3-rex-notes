import CompactFormatter from './formatters/CompactFormatter.js';
import JSONFormatter from './formatters/JSONFormatter.js';

var GetFormatter = function (format) {
    if (typeof (format) === 'function') {
        return format;
    }

    switch (format) {
        case 'json':
            return JSONFormatter;

        case 'compact':
        default:
            return CompactFormatter;
    }
}

export default GetFormatter;
