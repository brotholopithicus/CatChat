var updated = "2016-04-04T00:32:53.738Z";

var dt = new Date();
var du = new Date(updated);
console.log(dt.toDateString());
var elapsed = dt.getTime() - du.getTime();
var ms = elapsed;
var s = elapsed / 1000;
var min = s / 60;
var hr = min / 60;
console.log(hr);

console.log(((1 / 1000) / 60 ) / 60);

var millisHourConversion = 2.777777777777778e-7;
