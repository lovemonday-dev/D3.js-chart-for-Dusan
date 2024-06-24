var data2 = {}
fetch('../data/chart3.json')
	.then((res) => res.json())
	.then((json) => { data2 = calculateTotalValues(json); init() })

function calculateTotalValues(data) {
	const result = [];
	data.squares.forEach(square => {
		for (const [key, value] of Object.entries(square)) {
			if (Array.isArray(value)) {
				const totalValue = value.reduce((sum, item) => sum += item.value, 0);
				result.push({ name: key, value: totalValue });
			}
		}
	});
	return result;
}

function init() {

	/* to color elements we use the class name ( slugigy(name) ) */
	var domain = data2.map(function (d) { return slugify(d.name); })
	var range = ["#c7d4b6", "#a3aabd", "#a0d0de", "#97b5cf"]
	var palette = d3.scale.ordinal().domain(domain).range(range);

	var chart4 = d3waffle()
		.rows(15)
		.scale(1 / 500 / 10)
		.colorscale(palette)
		.appearancetimes(function (d, i) { return i * 10 + Math.random() * 250; })
		.height(500)
		.width(300)

	d3.select("#container-4")
		.datum(data2)
		.call(chart4);
}

let selectedClassList = []

function click(d) {
	if (selectedClassList.indexOf(d.class) == -1) {
		d3.selectAll(`.${d.class}`)
			.classed('selected', true)
		selectedClassList.push(d.class)
		$('#CountOfSelectedCells').text(calculateSelectedValuesSum(data2, selectedClassList))
	} else {
		selectedClassList = removeElementFromArray(selectedClassList, d.class)
		$('#CountOfSelectedCells').text(calculateSelectedValuesSum(data2, selectedClassList))
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
	$('#CountOfSelectedCells').text(0)
}

function removeElementFromArray(array, element) {
	return array.filter(item => item != element);
}