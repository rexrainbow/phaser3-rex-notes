var d = {
    a: Math.floor(Math.random() * 100),
    b: Math.floor(Math.random() * 100)
};
console.log(d);
localStorage.setItem('key', JSON.stringify(d));
var value = JSON.parse(localStorage.getItem('key'));
console.log(value);