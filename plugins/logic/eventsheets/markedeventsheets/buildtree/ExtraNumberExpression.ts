var ExtraNumberExpression = function(s?: any) {
    if (s.startsWith('#(') && s.endsWith(')')) {
        return s.substring(2, s.length - 1);
    }

    return s;
}

export default ExtraNumberExpression;