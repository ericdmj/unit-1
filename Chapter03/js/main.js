//initialize function called when the script loads
function initialize(){
    cities();
};

//function that creates a table with cities and their populations
function cities(){
    //define two arrays for cities and population
	var cityPop = [
		{ 
			city: 'Madison',
			population: 233209
		},
		{
			city: 'Milwaukee',
			population: 594833
		},
		{
			city: 'Green Bay',
			population: 104057
		},
		{
			city: 'Superior',
			population: 27244
		}
	];

    //creates the table element
    var table = document.createElement("table");

    //creates a header row
    var headerRow = document.createElement("tr");

    //adds the "City" and "Population" columns to the header row
    headerRow.insertAdjacentHTML("beforeend","<th>City</th><th>Population</th>")

    //adds the header row to the table
    table.appendChild(headerRow);

    //loops to add a new row for each city
    for (var i = 0; i < cityPop.length; i++){
        //assign longer html strings to a variable
        var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
        //add the row's html string to the table
        table.insertAdjacentHTML('beforeend',rowHtml);
    }
	//uses a method chain to add the table to the mydiv element
    document.querySelector("#mydiv").appendChild(table);

	//makes the cityPop array available outside of the cities function
	return cityPop;
};

//makes the returned array a variable from the cities function
var cityPop = cities();

//function that adds a column to the table
function addColumns(cityPop){

	//uses a method to match each tr tag in order to run through each row to add content
    document.querySelectorAll("tr").forEach(function(row, i){
		//loops through rows and by virtue of result selects header row or other rows to add a final cell with specified content
    	if (i == 0){
			//applies content to final cell of header row
    		row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
    	} else {
			//creates variable with sizes calculated and resultant parameters applied
    		var citySize;

    		if (cityPop[i-1].population < 100000){
    			citySize = 'Small';

    		} else if (cityPop[i-1].population < 500000){
    			citySize = 'Medium'; //fixed typo here. 

    		} else {
    			citySize = 'Large';
    		};
			//applies content to final cell of city row
			row.insertAdjacentHTML('beforeend','<td>' + citySize + '</td>');
    	};
    });
};

//executes the function that adds of the final column
addColumns(cityPop);

//defines function to add events
function addEvents(){

	//defines table variable
    var table = document.createElement("table");

	//adds mouseover event listener to the table area
	document.querySelector("table").addEventListener("mouseover", function(){

		//defines color variable
		var color = "rgb(";

		//executes loop three times to select each of three rbg color values 
		for (var i=0; i<3; i++){
			//creates random rgb color value
			var random = Math.round(Math.random() * 255);

			color += random;

			if (i<2){
				color += ",";
			
			} else {
				color += ")";
		};
		//applies color style to table text
		document.querySelector("table").style.color = color;
	}});

	//defines function for text to appear when element is clicked
	function clickme(){

		alert('Hey, you clicked me!');
	};

	//uses a method chain to add the table to the mydiv element
	document.getElementById("mydiv").appendChild(table);

	//adds click eventlistener to execute clickme
	document.querySelector("table").addEventListener("click", clickme)
};

//executes the addEvents function
addEvents();


//defines function to callback data after next function loads it and converts it
//fascinating that it requires nothing in the block, though--just a pure callback "placeholder"?
function debugCallback(response){};

//defines function to show GeoJSON data
function debugAjax(){

    //executes fetch request to get GeoJSON file
	fetch("data/MegaCities.geojson")
		.then(function(response){
			return response.json();
		})
        //inserts HTML using JSON.stringify() static method to convert a JavaScript values to a JSON string
        .then(function(data) {
            debugCallback(data);
            document.querySelector("#mydiv").insertAdjacentHTML('beforeend', '<br>GeoJSON data:<br>' + JSON.stringify(data))
        })

};

//executes function
debugAjax();