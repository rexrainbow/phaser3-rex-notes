// String template
console.log('String template')
try {
    var i = 10;
    console.log(`${i + 20}`)
} catch (e) {
    console.log(e)
}
console.log('--------')


// Handlebars : Error
import Handlebars from 'handlebars';

console.log('Handlebars')
try {
    var context = { i: 10 };
    var template = Handlebars.compile('{{i + 20}}');
    var s = template(context);
    console.log(s)
} catch (e) {
    console.log(e)
}
console.log('--------')

// Mustache : Incorrect result
import Mustache from '../../plugins/utils/mustache/mustache.min.js';

console.log('Mustache')
try {
    var context = { i: 10 };
    var s = Mustache.render('{{i + 20}}', context);
    console.log(s)
} catch (e) {
    console.log(e)
}
console.log('--------')