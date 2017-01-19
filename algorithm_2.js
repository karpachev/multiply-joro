var bigInt = require("big-integer");

module.exports.stats = {
	multiply : 0,
	divide : 0,
	assign : 0,
	total : function() {
		return multiply+divide+assign;
	}
};

module.exports.go = function(input,output) {
	if (input.length==0) throw "Undefined input";
	if (output.length!=input.length) throw "Incorrect input";

	var left = new Array(input.length);
	var right = new Array(input.length);
	module.exports.stats.assign+= 2;
	left[0]=bigInt(1); right[input.length-1]=bigInt(1);

	for (var i=1;i<input.length;i++) {
		left[i] = bigInt(left[i-1]).multiply(input[i-1]);
		module.exports.stats.assign+=2;
		module.exports.stats.multiply+=2;
		right[input.length-1-i] = bigInt(right[input.length-i]).multiply(input[input.length-i]);
	}

	for (var i=0;i<output.length;i++) {
		output[i] = bigInt(left[i]).multiply(right[i]);
		module.exports.stats.assign++;
		module.exports.stats.multiply++;
	}
	// console.log(input);
	// console.log(left);
	// console.log(right);
	// console.log(output);
}
