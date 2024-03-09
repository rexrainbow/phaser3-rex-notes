import { StringType, RegexType } from './BuiltInCommandTypes.js';

var ParseType = function (s, patterns) {
    s = s.trim();

    if ((s[0] === '[') && (s[s.length - 1] === ']')) {
        s = s.substring(1, s.length - 1).toLowerCase();

        for (var i = 0, cnt = patterns.length; i < cnt; i++) {
            var pattern = patterns[i];
            var patternType = pattern.type;
            if (patternType === StringType) {
                if (pattern.name === s) {
                    return { type: pattern.name };
                }

            } else if (patternType === RegexType) {
                var result = s.match(pattern.pattern);
                if (result) {
                    return { type: pattern.name, match: result };
                }

            }
        }
    }

    return null;
}

export default ParseType;