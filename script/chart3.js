let data2 = []
fetch('../data/chart3.json')
	.then((res) => res.json())
	.then((json) => { calculateTotalValues(json); init() })

function calculateTotalValues(data) {
	data.squares.forEach(square => {
		['apartments', 'garage_space', 'commercial_space', 'warehouse_space'].forEach(type => {
			if (square[type]) {
				square[type].forEach(item => {
					data2.push({
						"name": item.name,
						"value": Math.floor(item.surface),
						"color": item.color
					});
				});
			}
		});
	});
}

function init() {
	console.log(data2)

	/* to color elements we use the class name ( slugigy(name) ) */
	var domain = data2.map(function (d) { return slugify(d.name); })
	var range = ["#c7d4b6", "#a3aabd", "#a0d0de", "#97b5cf"]
	var palette = d3.scale.ordinal().domain(domain).range(range);

	var chart4 = d3waffle()
		.rows(25)
		.scale(1 / 1 / 1)
		.colorscale(palette)
		.appearancetimes(function (d, i) { return i * 10 + Math.random() * 250; })
		.height(600)
		.width(500)

	d3.select("#container-4")
		.datum(data2)
		.call(chart4);
}

let selectedClassList = []

function click(d) {
	console.log(d)
	if (selectedClassList.indexOf(d.class) == -1) {
		d3.selectAll(`.${d.class}`)
			.classed('selected', true)
		selectedClassList.push(d.class)
		d3.select('#CountOfSelectedCells').text(calculateSelectedValuesSum(data2, selectedClassList))
	} else {
		selectedClassList = removeElementFromArray(selectedClassList, d.class)
		d3.select('#CountOfSelectedCells').text(calculateSelectedValuesSum(data2, selectedClassList))
		d3.selectAll(`.${d.class}`)
			.classed('selected', false)
	}
}

function calculateSelectedValuesSum(data, selectedClasses) {
	return data.reduce((sum, item) => {
		if (selectedClasses.includes(item.class)) {
			return sum + item.value;
		}
		return sum;
	}, 0);
}

function resetSelected() {
	const list = document.getElementById("container-4");
	if (list.hasChildNodes()) {
		list.removeChild(list.children[0]);
	}
	init()
	d3.select('#CountOfSelectedCells').text(0)
}

function removeElementFromArray(array, element) {
	return array.filter(item => item != element);
}