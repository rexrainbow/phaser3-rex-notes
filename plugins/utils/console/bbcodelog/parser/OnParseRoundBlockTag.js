var OnParseRoundBlockTag = function (parser) {
    parser
        .on('+round', function (radius, padding) {
            if (radius === undefined) {
                radius = 3;
            }
            if (padding === undefined) {
                padding = radius;
            }

            if (typeof (radius) === 'number') {
                radius = `${radius}px`;
            }
            if (typeof (padding) === 'number') {
                padding = `${padding}px`;
            }

            parser.addStyle('display', 'inline-block');
            parser.addStyle('border-radius', radius);
            parser.addStyle('padding', padding);
            parser.skipEvent();
        })
        .on('-round', function () {
            parser.removeStyle('display');
            parser.removeStyle('border-radius');
            parser.removeStyle('padding');
            parser.skipEvent();
        })
}

export default OnParseRoundBlockTag;