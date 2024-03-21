var OnParseShadowTag = function (parser) {
    parser
        .on('+shadow', function (color) {
            parser.addStyle('text-shadow', `1px 1px 3px ${color}`);
            parser.skipEvent();
        })
        .on('-shadow', function () {
            parser.removeStyle('text-shadow');
            parser.skipEvent();
        })
}

export default OnParseShadowTag;