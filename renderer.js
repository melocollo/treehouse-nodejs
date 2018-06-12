var fs = require('fs');

// function to merge variable values into templates
function mergeValues(values, content) {
	for(var key in values) {
		// replace keys with values from values object
		content = content.replace("{{" + key + "}}", values[key]);
	}
	return content
}

// function to read template files
function view(templateName, values, res) {
	// read from template files
	var fileContents = fs.readFileSync('./views/' + templateName + ".html", {encoding: "utf8"});
	
	// insert values into content
	fileContents = mergeValues(values, fileContents);

	// write out contents to response
	res.write(fileContents);
	
}
