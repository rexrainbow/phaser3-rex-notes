import Handlebars from 'handlebars';

var context = {
    name: 'rex'
}
var proxy = new Proxy({}, {  
    get: function (target, key) {
        return context[key];
    }
})

var template = Handlebars.compile('Hello {{name}}');
var s = template(proxy, {
    allowProtoPropertiesByDefault: true,
    allowProtoMethodsByDefault: true
});
console.log(s);