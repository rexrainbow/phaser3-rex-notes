import CSVParser from 'papaparse/papaparse.min.js';

var CSV2MD = function (csvString) {
    var arr = CSVParser.parse(csvString).data;
    var content = [];
    var row, col0, col1, startChar;
    for (var i = 0, cnt = arr.length; i < cnt; i++) {
        row = arr[i];
        col0 = row[0] || '';
        col1 = row[1] || '';
        startChar = col0.charAt(0);

        switch (startChar) {
            case '#':
            case '/':
                content.push(`${col0} ${col1}`);
                break;

            default:
                if ((col0 !== '') && (col1 !== '')) {
                    content.push(`\n${col0}\n${col1}\n`);

                } else if (col0 !== '') {
                    content.push(`\n${col0}\n`);

                } else {
                    content.push(`\n${col1}\n`);

                }
                break;
        }
    }

    return content.join('\n');
}

export default CSV2MD;