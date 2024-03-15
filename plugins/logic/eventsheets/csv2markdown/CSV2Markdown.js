import CSVParser from 'papaparse/papaparse.min.js';

var CSV2Markdown = function (csvString) {
    var arr = CSVParser.parse(csvString).data;
    var content = [];
    var row, col0, col1, startChar;
    for (var i = 0, cnt = arr.length; i < cnt; i++) {
        row = arr[i];
        col0 = row[0] || '';
        col1 = row[1] || '';
        startChar = col0.charAt(0);

        if (startChar === '#') {
            content.push(`${col0} ${col1}`);

        } else {
            if ((col0 !== '') && (col1 !== '')) {
                content.push(`\n${col0}`);
                content.push(`${col1}\n`);

            } else if (col0 !== '') {
                content.push(`\n${col0}\n`);

            } else {
                content.push(`\n${col1}\n`);

            }
        }
    }

    return content.join('\n');
}

export default CSV2Markdown;