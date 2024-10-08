var PropToTagText = function (text, prop, prevProp) {
    if (prevProp == null) {
        prevProp = EMPTYPROP;
    }

    var delimiterLeft = this.delimiters[0];
    var delimiterRight = this.delimiters[1];

    var headers = [];

    for (var k in prevProp) {
        if (!prop.hasOwnProperty(k)) {
            headers.push(`${delimiterLeft}/${k}${delimiterRight}`);
        }
    }

    for (var k in prop) {
        var value = prop[k];


        if (k === 'img') {
            // Each 'img' prop will draw an image
        } else {
            if (prevProp[k] === value) {
                continue;
            }
        }

        switch (k) {
            case 'size':
                headers.push(`${delimiterLeft}size=${value.replace('px', '')}${delimiterRight}`);
                break;

            case 'color':
            case 'weight':
            case 'family':
            case 'stroke':
            case 'bgcolor':
            case 'y':
            case 'img':
            case 'area':
            case 'url':
            case 'align':
            case 'id':
                headers.push(`${delimiterLeft}${k}=${value}${delimiterRight}`);
                break;

            case 'u':
            case 's':
                if (value === true) {
                    headers.push(`${delimiterLeft}${k}${delimiterRight}`);
                } else {
                    headers.push(`${delimiterLeft}${k}=${value}${delimiterRight}`)
                }
                break;

            default:
                headers.push(`${delimiterLeft}${k}${delimiterRight}`);
                break;
        }
    }

    headers.push(text);

    return headers.join('');
}

var EMPTYPROP = {};


export default PropToTagText;