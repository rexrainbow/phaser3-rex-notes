var ConsoleWrite = function (value) {
    console.log(value);
}

var GetSinkWrite = function (sink, output) {
    if (sink) {
        if (typeof (sink) === 'function') {
            return sink;
        }

        if (sink.write) {
            return function (value) {
                sink.write(value);
            };
        }

        if (sink.log) {
            return function (value) {
                sink.log(value);
            };
        }
    }

    if (output) {
        return output;
    }

    return ConsoleWrite;
}

export default GetSinkWrite;
