let jsonData = {}
fetch('../data/chart2.json')
	.then((response) => response.json())
	.then((json) => { jsonData = json; init(jsonData) });


var width, height, dimensionX, dimensionY
function init(jsonData) {
	// grid basic variables

	dimensionY = maxDivisorBelow(Math.sqrt(jsonData.squares[0].total), jsonData.squares[0].total);
	dimensionX = jsonData.squares[0].total / dimensionY

	function maxDivisorBelow(floatNumber, integer) {
		let maxInt = Math.floor(floatNumber);
		for (let i = maxInt; i > 0; i--) {
			if (integer % i === 0) {
				return i;
			}
		}
		return 1;
	}
	width = height = Math.floor((screen.width) / (dimensionX * 2))
	if (width > 50) {
		width = height = 50
	}

	function getGridData() {
		let data = new Array();

		// rectangle variables
		let rectXpos = 0,
			rectYpos = 0,
			count = 0;
		rectWidth = width,
			rectHeight = height;

		// iterate for rows

		for (let row = 0; row < dimensionY; row++) {

			// iterate for cells/columns inside rows
			for (let column = 0; column < dimensionX; column++) {
				// rectClass = "rect" + rectXpos.toString() + rectYpos.toString();
				data.push({
					x: rectXpos,
					y: rectYpos,
					width: rectWidth,
					height: rectHeight,
					reserved: count < jsonData.squares[0].reserved[0].amount ? true : false,
					owner: jsonData.squares[0].reserved[0].name
				});
				count++
				// increment the x position. I.e. move it over by 50 (width variable)
				rectXpos += rectWidth;
			}
			// reset the x position after a row is complete
			rectXpos = 0;
			// increment the y position for the next row. Move it down 50 (height variable)
			rectYpos += rectHeight;
		}
		return data;
	}

	// drag module
	let previousCell = {}
	let selectedCellList = [];
	let drag = d3.behavior.drag()
	drag
		.on("drag", function (e) {
			let selectedCell = {}
			selectedCell.x = maxDivisibleBy(d3.event.sourceEvent.x, width)
			selectedCell.y = maxDivisibleBy(d3.event.sourceEvent.y, height)
			if (!deepEqual(selectedCell, previousCell) && !objectExistsInArray(selectedCellList, selectedCell) && staysInAvailabe(selectedCell)) {
				changeStatusOfAffected(selectedCell)
				previousCell = selectedCell
				selectedCellList.push(selectedCell)
				CountOfSelectedCells.text(selectedCellList.length)
			}
		})
		.on("dragstart", function () {
			d3.event.sourceEvent.stopPropagation(); // silence other listeners
		});
	let CountOfSelectedCells = d3.select('#CountOfSelectedCells').html(0)
	const tooltip = d3.select("#tooltip");

	let grid = d3.select("#tabcontent-container")
		.append("svg")
		.attr("width", width * dimensionX)
		.attr("height", height * dimensionY)
		.append('g')
	let rect = grid.selectAll(".square")
		.data(getGridData())
		.enter().append("rect")
		.attr("class", "rect")
		.attr("x", function (d) { return d.x; })
		.attr("y", function (d) { return d.y; })
		.attr("width", function (d) { return d.width; })
		.attr("height", function (d) { return d.height; })
		.style("fill", function (d) { return d.reserved ? '#ff8259' : '#6060e0'; })
		.style("stroke", "#fff")
		.style('cursor', 'pointer')
		.each(function (d) {
			if (d.reserved) {
				d3.select(this).classed("reserved", true);
			}
			else d3.select(this).classed("freetosell", true);
		})
	// apply handler for click and drag only for cells free to sell (not reserved)
	let freetosell = rect
		.filter('.freetosell')
		.on("click", function (e) {
			let selectedCell = {}
			selectedCell.x = e.x
			selectedCell.y = e.y
			if (objectExistsInArray(selectedCellList, selectedCell))
				selectedCellList = removeObjectFromArray(selectedCellList, selectedCell)
			else selectedCellList.push(selectedCell)
			changeStatusOfAffected(selectedCell)
			CountOfSelectedCells.text(selectedCellList.length)
		})
		.call(drag)
		.append('title')
		.html((d, i) =>
			`<p class='tooltip'>Free for sale</p>`
		);
	//Assign tooltip for reserved cells.
	let reserved = rect
		.filter('.reserved')
		.append('title')
		.html((d, i) =>
			`<p class='tooltip'>Reserved by ${d.owner}</p>`
		);
	function getHLineGridData() {
		let data = new Array();

		// line variables
		let hlineX1 = 0,
			hlineY1 = 0,
			hlineX2 = 0,
			hlineY2 = width,
			click = 0;

		let lineLength = width;

		for (let row = 0; row < dimensionY; row++) {

			// iterate for cells/columns inside rows
			for (let column = 0; column < dimensionX + 1; column++) {
				hlineClass = "hline" + hlineX1.toString() + hlineY1.toString() + hlineX2.toString() + hlineY2.toString();
				data.push({
					x1: hlineX1,
					y1: hlineY1,
					x2: hlineX2,
					y2: hlineY2,
					class: hlineClass,
					click: click
				});

				// increment the x position for the next line
				hlineX1 += lineLength;
				hlineX2 += lineLength;
			}

			// reset the x position after a row is complete
			hlineX1 = 0;
			hlineX2 = 0;

			// increment the y position for the next row. Move it down by one width (height variable)
			hlineY1 += lineLength;
			hlineY2 += lineLength;
		}
		return data;
	}

	let hline = grid.selectAll(".hline")
		.data(getHLineGridData())
		.enter().append("line")
		.attr("class", function (d) { return d.class; })
		.attr("x1", function (d) { return d.x1; })
		.attr("y1", function (d) { return d.y1; })
		.attr("x2", function (d) { return d.x2; })
		.attr("y2", function (d) { return d.y2; })
		.style("stroke", "white")
		.style("stroke-width", "2")
		.style("cursor", "pointer")
		.each(function (d) {
			d.switch = 0;
		})

	function getVLineGridData() {
		let data = new Array();

		// line variables
		let vlineX1 = 0,
			vlineY1 = 0,
			vlineX2 = width,
			vlineY2 = 0,
			click = 5;

		let lineLength = width;

		// iterate for rows
		for (let row = 0; row < dimensionX; row++) {

			// iterate for cells/columns inside rows
			for (let column = 0; column < dimensionX + 1; column++) {
				vlineClass = "vline" + vlineX1.toString() + vlineY1.toString() + vlineX2.toString() + vlineY2.toString();
				data.push({
					x1: vlineX1,
					y1: vlineY1,
					x2: vlineX2,
					y2: vlineY2,
					class: vlineClass,
					click: click
				});

				// increment the x position for the next line
				vlineY1 += lineLength;
				vlineY2 += lineLength;
			}

			// reset the x position after a row is complete
			vlineY1 = 0;
			vlineY2 = 0;
			// increment the y position for the next row. Move it down width (height variable)
			vlineX1 += lineLength;
			vlineX2 += lineLength;
		}
		return data;
	}

	let vline = grid.selectAll(".vline")
		.data(getVLineGridData())
		.enter().append("line")
		.attr("class", function (d) { return d.class; })
		.attr("x1", function (d) { return d.x1; })
		.attr("y1", function (d) { return d.y1; })
		.attr("x2", function (d) { return d.x2; })
		.attr("y2", function (d) { return d.y2; })
		.attr("click", function (d) { return d.click; })
		.style("stroke", "white")
		.style("stroke-width", "2")
		.style("cursor", "pointer")
		.each(function (d) {
			d.switch = 0;
		})
	// change stroke and other status of when affected(click, drag)
	function changeStatusOfAffected(selectedCell) {
		d3.select(".vline" + selectedCell.x.toString() + selectedCell.y.toString() + (selectedCell.x + height).toString() + selectedCell.y.toString()).style("stroke", Next_Color);
		d3.select(".vline" + selectedCell.x.toString() + (selectedCell.y + height).toString() + (selectedCell.x + height).toString() + (selectedCell.y + height).toString()).style("stroke", Next_Color);
		d3.select(".hline" + selectedCell.x.toString() + selectedCell.y.toString() + selectedCell.x.toString() + (selectedCell.y + width).toString()).style("stroke", Next_Color);
		d3.select(".hline" + (selectedCell.x + width).toString() + selectedCell.y.toString() + (selectedCell.x + width).toString() + (selectedCell.y + width).toString()).style("stroke", Next_Color);
		function Next_Color(selectedCell) {
			let Color = ["white", "red"];
			selectedCell.switch = selectedCell.switch ^ 1;
			let next_Color = Color[selectedCell.switch];
			return next_Color;
		}
	}
}
// handle on click reselected button
function resetSelected() {

	const list = document.getElementById("tabcontent-container");
	if (list.hasChildNodes()) {
		list.removeChild(list.children[0]);
	}
	init(jsonData)
}
// return the biggest integer divisible by width less than provided integer
function maxDivisibleBy(n, by) {
	if (n <= 0) {
		return 0; // or handle the case as per requirement
	}
	return n - (n % by) - (n % by === 0 ? by : 0);
}
// return if object exists in array.
function objectExistsInArray(array, object) {
	return array.some(item => JSON.stringify(item) === JSON.stringify(object));
}

// remove object from array
function removeObjectFromArray(array, object) {
	let index = array.findIndex(item => deepEqual(item, object));
	if (index !== -1) {
		array.splice(index, 1);
	}
	return array;
}

// check if two objs are equal
function deepEqual(obj1, obj2) {
	if (obj1 === obj2) return true;
	if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
		return false;
	}
	let keys1 = Object.keys(obj1);
	let keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) return false;
	for (let key of keys1) {
		if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
			return false;
		}
	}
	return true;
}
function staysInAvailabe(selectedCell) {
	console.log(jsonData)
	if (width * dimensionX > selectedCell.x && height * dimensionY > selectedCell.y && selectedCell.x >= 0 && selectedCell.y >= jsonData.squares[0].reserved[0].amount * height / dimensionX) return true
	return false
}