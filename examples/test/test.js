var startT = Date.now();
var elaspedTime = 0; // Load from localStorage
setInterval(function(){
    var curT = Date.now();
    elaspedTime += curT - startT;
    startT = curT;
    console.log(elaspedTime)
}, 1000)