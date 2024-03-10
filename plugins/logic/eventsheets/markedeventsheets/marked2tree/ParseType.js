var ParseType = function (s, patterns) {
    s = s.trim();

    if ((s[0] === '[') && (s[s.length - 1] === ']')) {
        s = s.substring(1, s.length - 1);
        var lowCaseString = s.toLowerCase();

        for (var i = 0, cnt = patterns.length; i < cnt; i++) {
            var pattern = patterns[i];
            var patternName = pattern.name;
            var testPattern = pattern.pattern;

            if (testPattern) {
                var result = s.match(testPattern);
                if (result) {
                    return { type: patternName, match: result };
                }
            } else if (patternName === lowCaseString) {
                return { type: patternName };
            }
        }
    }

    return null;
}

export default ParseType;