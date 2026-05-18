var OnParseSizeTag = function(parser?: any) {
    parser
        .on('+size', function(size?: any) {
            if (typeof (size) === 'number') {
                size = `${size}px`
            }
            parser.addStyle('font-size', size);
            parser.skipEvent();
        })
        .on('-size', function() {
            parser.removeStyle('font-size');
            parser.skipEvent();
        })
}

export default OnParseSizeTag;