const data = {

	investicija: {
		children: [
			{
				"name": "Plac",
				"value": 1300000,
				"image": "some_image.jpg",
				"link": "http://somelink.com?id=1",
				"color": "#6060e0"
			},
			{
				"name": "Softcost",
				"value": 300000,
				"color": "#ff8259",
				// "children": [
				// 	{
				// 		"name": "Nadzor",
				// 		"image": "some_image.jpg",
				// 		"link": "http://somelink.com?id=1",
				// 		"value": 100000
				// 	},
				// 	{
				// 		"name": "Dozvola",
				// 		"image": "some_image.jpg",
				// 		"link": "http://somelink.com?id=1",
				// 		"value": 100000
				// 	},
				// 	{
				// 		"name": "Direkcija",
				// 		"image": "some_image.jpg",
				// 		"link": "http://somelink.com?id=1",
				// 		"value": 100000
				// 	}
				// ]
			},
			{
				"name": "Hardcost",
				"value": 1900000,
				"color": "#fff214",
				"image": "some_image.jpg",
				"link": "http://somelink.com?id=1",
				// "children": [
				// 	{
				// 		"name": "Izvodjenje",
				// 		"value": 600000,
				// 		"children": [
				// 			{
				// 				"job_id": "1",
				// 				"name": "Obezbedjenje temeljne jame",
				// 				"value": 200000,
				// 				"izvodjac": "InKop",
				// 				"izvodjac_id": 21,
				// 				"trajanje": 33,
				// 				"image": "some_image.jpg",
				// 				"link": "http://somelink.com?job_id=1",
				// 				"rok": "20-12-2024"
				// 			},
				// 			{
				// 				"job_id": "2",
				// 				"name": "Iskop",
				// 				"value": 200000,
				// 				"izvodjac": "InKop",
				// 				"izvodjac_id": 21,
				// 				"trajanje": 33,
				// 				"image": "some_image.jpg",
				// 				"link": "http://somelink.com?job_id=1",
				// 				"rok": "20-12-2024"
				// 			},
				// 			{
				// 				"job_id": "3",
				// 				"name": "Temeljna ploca",
				// 				"value": 200000,
				// 				"izvodjac": "InKop",
				// 				"izvodjac_id": 21,
				// 				"trajanje": 33,
				// 				"image": "some_image.jpg",
				// 				"link": "http://somelink.com?job_id=1",
				// 				"rok": "20-12-2024"
				// 			}
				// 		]
				// 	},
				// 	{
				// 		"name": "Materijal",
				// 		"value": 1300000,
				// 		"children": [
				// 			{
				// 				"order_id": "3",
				// 				"name": "Armaturna mreza",
				// 				"value": 300000,
				// 				"dobavljac": "Metal metal",
				// 				"dobavljac_id": 22,
				// 				"image": "some_image.jpg",
				// 				"link": "http://somelink.com?job_id=1",
				// 				"isporuka": "20-12-2024"
				// 			},
				// 			{
				// 				"order_id": "3",
				// 				"name": "Plocice",
				// 				"value": 300000,
				// 				"dobavljac": "RA KERAMIKA",
				// 				"dobavljac_id": 21,
				// 				"image": "some_image.jpg",
				// 				"link": "http://somelink.com?job_id=1",
				// 				"isporuka": "20-12-2024"
				// 			},
				// 			{
				// 				"order_id": "3",
				// 				"name": "Lepak za fasadu",
				// 				"value": 700000,
				// 				"dobavljac": "ROMA",
				// 				"dobavljac_id": 25,
				// 				"image": "some_image.jpg",
				// 				"link": "http://somelink.com?job_id=1",
				// 				"isporuka": "20-12-2024"
				// 			}
				// 		]
				// 	}
				// ]
			}
		]
	},

	proizvod: {
		children: [
			{
				"name": "Stanovi",
				"kvadrata": 1284,
				"komada": 21,
				"color": "#6868E1",
				"children": [
					{
						"name": "a",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"sprat": 1,
						"kvadrata": 45.44,
						"value": 28,
						"color": "#6868E1",

					},
					{
						"name": "b",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"sprat": 2,
						"kvadrata": 85.5,
						"value": 19,
						"color": "#8B8BE8",
					},
					{
						"name": "c",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"sprat": 2,
						"kvadrata": 152,
						"value": 18,
						"color": "#8B8BE8",
					}
					,
					{
						"name": "d",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"sprat": 2,
						"kvadrata": 152,
						"value": 19,
						"color": "#8B8BE8",
					}
				]
			},
			{
				"name": "Lokali",
				"kvadrata": 480,
				"komada": 2,
				"color": "#ff8259",
				"children": [
					{
						"name": "e",
						"opis": "Lep s pogledom na ulicu",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"kvadrata": 152,
						"value": 14,
						"color": "#FFB39B",
					},
					{
						"name": "f",
						"opis": "Na 2 sprata, idealan za restoran",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"kvadrata": 152,
						"value": 11,
						"color": "#FFB39B",
					},
					{
						"name": "g",
						"opis": "Veliki magacin",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"kvadrata": 152,
						"value": 15,
						"color": "#FFB097",
					},
					{
						"name": "h",
						"opis": "Veliki magacin",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"kvadrata": 152,
						"value": 16,
						"color": "#FFB097",
					}
				]
			},
			{
				"name": "Garažna mesta",
				"kvadrata": 980,
				"komada": 21,
				"color": "#fff214",
				"children": [
					{
						"name": "i",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-2",
						"kvadrata": 12.5,
						"value": 12,
						"color": "#FFF888",
					},
					{
						"name": "j",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-2",
						"kvadrata": 12.5,
						"value": 13,
						"color": "#FFF888",
					},
					{
						"name": "k",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-1",
						"kvadrata": 12.5,
						"value": 13,
						"color": "#FFF888",
					},
					{
						"name": "l",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-1",
						"kvadrata": 12.5,
						"value": 25,
						"color": "#FFF331",
					},
					{
						"name": "m",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-1",
						"kvadrata": 12.5,
						"value": 16,
						"color": "#FFF888",
					},
					{
						"name": "n",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-1",
						"kvadrata": 12.5,
						"value": 28,
						"color": "#FFF331",
					}
				]
			},
			{
				"name": "Magacin",
				"kvadrata": 980,
				"komada": 21,
				"children": [
					{
						"name": "i",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-2",
						"kvadrata": 12.5,
						"value": 13,
						"color": "#FFFDF8",
					},
					{
						"name": "j",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-2",
						"kvadrata": 12.5,
						"value": 16,
						"color": "#FFFDF8",
					},
					{
						"name": "k",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-1",
						"kvadrata": 12.5,
						"value": 16,
						"color": "#FFFDF8",
					},
					{
						"name": "l",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-1",
						"kvadrata": 12.5,
						"value": 28,
						"color": "#FFFDF8",
					},
					{
						"name": "m",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-1",
						"kvadrata": 12.5,
						"value": 18,
						"color": "#FFFDF8",
					},
					{
						"name": "n",
						"image": "some_image.jpg",
						"link": "http://somelink.com?job_id=1",
						"nivo": "-1",
						"kvadrata": 12.5,
						"value": 30,
						"color": "#FFFDF8",
					}
				]
			}
		]
	}
}




// set the dimensions and margins of the graph
const margin = { top: 15, right: 10, bottom: 10, left: 10 },
	width = 350 - margin.left - margin.right,
	height = 350 - margin.top - margin.bottom;

// append the svg object to the body of the page

function render(selector) {
	const svg = d3.select(`#${selector}`)
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform",
			`translate(${margin.left}, ${margin.top})`);

	// Give the data to this cluster layout:
	const root = d3.hierarchy(data[selector]).sum(function (d) { return d.value }) // Here the size of each leave is given in the 'value' field in input data

	// Then d3.treemap computes the position of each element of the hierarchy
	d3.treemap()
		.size([width, height])
		.paddingTop(15)
		.paddingRight(7)
		.paddingInner(3)      // Padding between each rectangle
		(root)

	// use this information to add rectangles:
	svg
		.selectAll("rect")
		.data(root.leaves())
		.join("rect")
		.attr('x', function (d) { return d.x0; })
		.attr('y', function (d) { return d.y0+6; })
		.attr('width', function (d) { return d.x1 - d.x0; })
		.attr('height', function (d) { return d.y1 - d.y0; })
		.style("stroke", "black")
		.style("fill", function (d) { return d.data.color })

	// and to add the text labels
	svg
		.selectAll("text")
		.data(root.leaves())
		.enter()
		.append("text")
		.attr("x", function (d) { return d.x0 + 5 })    // +10 to adjust position (more right)
		.attr("y", function (d) { return d.y0 + 20 })    // +20 to adjust position (lower)
		.text(function (d) { return d.data.name })
		.attr("font-size", "19px")
		.attr("fill", "black")

	// and to add the text labels
	svg
		.selectAll("vals")
		.data(root.leaves())
		.enter()
		.append("text")
		.attr("x", function (d) { return d.x0 + 5 })    // +10 to adjust position (more right)
		.attr("y", function (d) { return d.y0 + 37 })    // +20 to adjust position (lower)
		.text(function (d) { return d.data.value })
		.attr("font-size", "16px")
		.attr("fill", "white")

	// Add title for the 3 groups
	svg
		.selectAll("titles")
		.data(root.descendants().filter(function (d) { return d.depth == 1 }))
		.enter()
		.append("text")
		.attr("x", function (d) { return d.x0 })
		.attr("y", function (d) { if(selector=="investicija") return d.y0; return d.y0 + 18 })
		.text(function (d) { return d.data.name })
		.attr("font-size", "19px")
		.attr("fill", function (d) { return d.data.color })

	// Add title for the 3 groups
	svg
		.append("text")
		.attr("x", 0)
		.attr("y", 2)
		.text(selector)
		.attr("font-size", "19px")
		.attr("fill", "black")
}

render("investicija")
render("proizvod")