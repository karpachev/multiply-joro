var bigInt = require("big-integer");

module.exports.stats = {
	multiply : 0,
	divide : 0,
	assign : 0,
	total : function() {
		return multiply+divide;
	}
};
module.exports.go = function(input,output) {
	if (input.length==0) throw "Undefined input";
	if (output.length!=input.length) throw "Incorrect input";

	var total = multiply(input);
	// console.log("Total is", total.toString());

	for (var i=0;i<input.length;i++) {
		if (input[i]) {
			output[i]= total.divide(input[i]);
			module.exports.stats.divide++;
			module.exports.stats.assign++;
		} else {
			output[i]= multiply(input,i);
			module.exports.stats.assign++;
		}

		// console.log(i, "is", output[i].toString());
	}
}

multiply = function(input,skip_i) {
	var result = bigInt(input[0]);
	if (skip_i===undefined) skip_i=0;

	for (var i=1;i<input.length;i++) {
		if (i==skip_i) continue;
		
		result = result.multiply(input[i]);
		module.exports.stats.multiply++;
		module.exports.stats.assign++;
	}

	return result;
}