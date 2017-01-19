var moment = require("moment");
var fs = require("fs");
var bigInt = require("big-integer");
var algorithm = require("./algorithm_2.js")

const INPUT_SIZE = 1000;
const MAX_INT_SIZE = Number.MAX_SAFE_INTEGER;
var input = new Array(INPUT_SIZE);
var output = new Array(INPUT_SIZE);
var i;

for (i=0;i<input.length;i++) {
	input[i]= (Math.random()<=0.5?1:-1) * Math.floor((Math.random() * MAX_INT_SIZE)+1);
}
//input[Math.floor(Math.random()*input.length)]= 0;

var begin = moment();
console.log("Started at: ", begin.format());

algorithm.go(input,output);

var end = moment();


function verify_solution(input,output)
{
	//verify that the solution is correct
	var solution_correct = true;
	for (i=0;i<output.length;i++) {
		var temp_result= bigInt(1);
		for (var j=0;j<input.length;j++) {
			if (i==j) continue;
			temp_result = temp_result.multiply(input[j]);
		}
		if (temp_result.compare(output[i])!=0) {
			solution_correct = false;
			// console.log("Solution incorrect at: ", i, temp_result.toString(), output[i].toString());
		}
	}
	console.log("The proposed solution is: ", solution_correct?"CORRECT":"NOT CORRECT");
	fs.writeFileSync("logs/input.json", JSON.stringify(input,null,2));

	var temp_output= new Array(INPUT_SIZE);
	output.forEach(function(val,i){
		temp_output[i]= val.toString()
	})
	fs.writeFileSync("logs/output.json", JSON.stringify(temp_output,null,2));	
}



console.log("Algo Ended at: ", end.format());
console.log("Algo Run time: ", end-begin);
console.log("stats", algorithm.stats);
console.log("Total Run time: ", moment()-begin);
