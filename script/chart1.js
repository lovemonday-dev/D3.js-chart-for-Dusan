fetch('../data/chart1.json')
  .then((response) => response.json())
  .then((json) => {
    render(json);
  })
  .catch((error) => console.error('Error fetching data:', error));
function render(jsonData) {
  var margin = { top: 20, right: 0, bottom: 0, left: 0 },
    width = 400, //640
    height = 350,
    formatNumber = d3.format(",d"),
    transitioning;

  var x = d3.scaleLinear()
    .domain([0, width])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([0, height - margin.top - margin.bottom])
    .range([0, height - margin.top - margin.bottom]);

  var color = d3.scaleOrdinal()
    .range(d3.schemeCategory10
      .map(function (c) { c = d3.rgb(c); c.opacity = 0.1; return c; }));

  var fader = function (color) { return d3.interpolateRgb(color, "#fff")(0.1); };
  var format = d3.format(",d");

  //var treemap;

  //var svg, grandparent;



  function updateDrillDown() {

    drawTreemap("investicija");
    drawMiddleContainer()
    drawTreemap("proizvod");
    drawSecondLine('second-line')
  };
  function drawMiddleContainer() {
    var container = d3.select("#cost-per-area").append('svg')
      .attr('width', 200)
      .attr('height', 200)
    var grandparent = container.append('g')
    let costPerArea = grandparent.append('g')
    let rectCostPerArea = costPerArea.append('rect')
      .style('fill', '#6868E1')
      .attr('width', 200)
      .attr('height', 200)
    let text = costPerArea.append('text')
      .style('fill', 'white')
      .attr('y', 50)
      .attr('font-size', '1.5em')
    text.append('tspan')
      .text('3.5M ÷ 1,880m²')
      .attr('x', 22)
    text.append('tspan')
      .text('=')
      .attr('y', 90)
      .attr('x', 90)
    text.append('tspan')
      .text('1,862€')
      .attr('y', 150)
      .attr('x', 33)
      .attr('font-size', '2em')
  }
  function drawSecondLine(id) {
    d3.select('#second-line').append('div')
      .html(`
      <div style="display: inline-block; bottom: 70px;position: relative; left: 149px;">
				<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 320 512">
					<path fill="#99D9EA" stroke="black" stroke-width="3"
						d="M318 177.5c3.8-8.8 2-19-4.6-26l-136-144C172.9 2.7 166.6 0 160 0s-12.9 2.7-17.4 7.5l-136 144c-6.6 7-8.4 17.2-4.6 26S14.4 192 24 192H96l0 288c0 17.7 14.3 32 32 32h64c17.7 0 32-14.3 32-32l0-288h72c9.6 0 18.2-5.7 22-14.5z" />
				</svg>
				<div>
					<div style="color: black; font-size: 30px; font-family: cursive;">3.5M€</div>
				</div>
				<div style="    position: relative; left: -128px;top: 31px;">
					<div style="font-family: cursive;">Opis investicije:</div>
					<div style="font-family: cursive;">Stambena zgrada...</div>
				</div>
	
			</div>
			<div class="profit-show"
				style="width: 250px; height: 250px; background-color: #FFF777; position: relative; display: inline-block; left: 352px; color: white; font-size: 22px;">
        <p style="position:absolute;left: 60px;top: 58px;font-size: 38px;font-weight: bolder;font-family: cursive;">2.712€</p>
        </div>
       <div class="profit-show" style="width: 200px; height: 200px; background-color: #8B8BE8; position: relative; display: inline-block; left:99px; color: white; font-size:22px;">
       <p style="position:absolute;left: 60px;top: 58px;font-size: 24px;font-weight: bolder;font-family: cursive;">2.287€</p>
       </div>
       <div class="profit-show-default" style="width: 160px; height: 160px; background-color: #6868E1; position: relative; display: inline-block; right:105px; color: white; font-size:22px;">
			 <p style="position:absolute;left: 40px;top: 40px;font-size: 24px;font-weight: bolder;font-family: cursive;">1.862€</p>	
       </div>


			<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 512 512"
				style="position: relative; bottom: 80px; left:86px">
				<path fill="#99D9EA" stroke="black" stroke-width="3"
					d="M177.5 414c-8.8 3.8-19 2-26-4.6l-144-136C2.7 268.9 0 262.6 0 256s2.7-12.9 7.5-17.4l144-136c7-6.6 17.2-8.4 26-4.6s14.5 12.5 14.5 22l0 72 288 0c17.7 0 32 14.3 32 32l0 64c0 17.7-14.3 32-32 32l-288 0 0 72c0 9.6-5.7 18.2-14.5 22z" />
			</svg>
			<div style="display: inline-block; position: relative; bottom: 110px; left: 169px; text-align: center;">
				<div style="color: black; font-family: cursive;">prodaja</div>
				<div style="color: black; font-size: 30px; font-family: cursive;">5.1M€</div>
			</div>
			<svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 320 512"
				style="display: inline-block; position: relative; bottom: 167px;left: 86px;">
				<path fill="#99D9EA" stroke="black" stroke-width="3"
					d="M2 334.5c-3.8 8.8-2 19 4.6 26l136 144c4.5 4.8 10.8 7.5 17.4 7.5s12.9-2.7 17.4-7.5l136-144c6.6-7 8.4-17.2 4.6-26s-12.5-14.5-22-14.5l-72 0 0-288c0-17.7-14.3-32-32-32L128 0C110.3 0 96 14.3 96 32l0 288-72 0c-9.6 0-18.2 5.7-22 14.5z" />
			</svg>
      `)
  }
  d3.select("#cost-per-area").on('mouseover', function(){
    d3.select('.profit-show-default p').style('display','block')
  })
  .on('mouseout', function(){
    d3.select('.profit-show-default p').style('display','none')
  })

  function drawTreemap(selector) {
    let data2 = jsonData[selector][0]
    var root = d3.hierarchy(data2)
      .eachBefore(function (d) { d.id = (d.parent ? d.parent.id + "." : "") + d.data.name; })
      .sum(function (d) { return d.value; })  // access the numeric attribute of the data
      .sort(function (a, b) {
        return b.height - a.height || b.value - a.value;
      });
    var id = "#" + selector;
    var svg = d3.select(id).append("svg")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.bottom - margin.top)
      .style("margin-left", -margin.left + "px")
      .style("margin.right", -margin.right + "px")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .style("shape-rendering", "crispEdges");

    var grandparent = svg.append("g")
      .attr("class", "grandparent");

    grandparent.append("rect")
      .attr("y", -margin.top)
      .attr("width", width)
      .attr("height", margin.top);

    grandparent.append("text")
      .attr("x", 6)
      .attr("y", 5 - margin.top)
      .attr("dy", ".75em");

    var treemap = d3.treemap()
      .size([width, height])
      .round(false)
      .paddingInner(1);

    initialize(root);
    accumulate(root);
    layout(root);
    treemap(root);
    display(root);

    function display(d) {

      grandparent
        .datum(d.parent)
        .on("click", transition)
        .select("text")
        .text(name(d, selector));

      var g1 = svg.insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth");

      var g = g1.selectAll("g")
        .data(d._children)
        .enter().append("g");

      g.filter(function (d) { return d.data.link; })
        .on('click', function () {
          d3.select('#myModal').style('display', 'block')
        })
      d3.select('.close').on('click', function () {
        d3.select('#myModal').style('display', 'none')
      })
      g.filter(function (d) { return d._children; })
        .classed("children", true)
        .on("click", transition);



      var children = g.selectAll(".child")
        .data(function (d) { return d._children || [d]; })
        .enter().append("g");

      children.append("rect")
        .attr("class", "child")
        .call(rect)
        .append("title")
        .text(function (d) { return d.data.name + " (" + formatNumber(d.value) + ")"; });

      children.append("text")
        .attr("class", "ctext")
        .text(function (d) { return d.data.name; })
        .call(text2);

      g.append("rect")
        .attr("class", "parent")
        .call(rect);

      var t = g.append("text")
        .attr("class", "ptext")
        .attr("dy", ".75em")

      t.append("tspan")
        .text(function (d) { return d.data.name; });
      t.append("tspan")
        .attr("dy", "1.0em")
        .text(function (d) { return formatNumber(d.value); })
        .style('fill', 'white');
      t.call(text);

      g.selectAll("rect")
        .style("fill", function (d) { if (d.data.color) return d.data.color; return "#ccc" });
      function transition(d) {
        if (transitioning || !d) return;
        transitioning = true;

        var g2 = display(d),
          t1 = g1.transition().duration(1000)
          t2 = g2.transition().duration(1000)


        // Update the domain only after entering new elements.
        x.domain([d.x0, d.x0 + d.x1]);
        y.domain([d.y0, d.y0 + d.y1]);

        // Enable anti-aliasing during the transition.
        svg.style("shape-rendering", null);

        // Draw child nodes on top of parent nodes.
        svg.selectAll(".depth").sort(function (a, b) { return a.depth - b.depth; });
        svg.selectAll(".depth").style('opacity', 0.3);

        // Fade-in entering text.
        g2.selectAll("text").style("fill-opacity", 0);

        // Transition to the new view.
        t1.selectAll("text").call(text).style("fill-opacity", 0);
        t2.selectAll("text").call(text).style("fill-opacity", 1);
        t1.selectAll("rect").call(rect);
        t2.selectAll("rect").call(rect);
        setTimeout(() => {
          svg.selectAll(".depth").style('opacity', 1);
        }, 1000);



        // Remove the old node when the transition is finished.
        t1.remove().on("end", function () {
          svg.style("shape-rendering", "crispEdges");
          transitioning = false;
        });
      }
      return g;
    }


  }  // end of drawTreemap()

  function initialize(root) {
    root.x = root.y = 0;
    root.x1 = width;
    root.y1 = height;
    root.depth = 0;
  }

  // Aggregate the values for internal nodes. This is normally done by the
  // treemap layout, but not here because of our custom implementation.
  // We also take a snapshot of the original children (_children) to avoid
  // the children being overwritten when when layout is computed.
  function accumulate(d) {
    return (d._children = d.children)
      ? d.value = d.children.reduce(function (p, v) { return p + accumulate(v); }, 0)
      : d.value;
  }

  // Compute the treemap layout recursively such that each group of siblings
  // uses the same size (1×1) rather than the dimensions of the parent cell.
  // This optimizes the layout for the current zoom state. Note that a wrapper
  // object is created for the parent node for each group of siblings so that
  // the parent’s dimensions are not discarded as we recurse. Since each group
  // of sibling was laid out in 1×1, we must rescale to fit using absolute
  // coordinates. This lets us use a viewport to zoom.
  function layout(d) {
    if (d._children) {
      d._children.forEach(function (c) {
        c.x0 = d.x0 + c.x0 * d.x1;
        c.y0 = d.y0 + c.y0 * d.y1;
        c.x1 *= d.x1;
        c.y1 *= d.y1;
        c.parent = d;
        layout(c);
      });
    }
  }
  function text(text) {
    text.selectAll("tspan")
      .attr("x", function (d) { return x(d.x0) + 6; })
    text.attr("x", function (d) { return x(d.x0) + 6; })
      .attr("y", function (d) { return y(d.y0) + 10; })
      .style("opacity", function (d) {
        return this.getComputedTextLength() < x(d.x0 + d.x1) - x(d.x0) ? 1 : 0;
      });
  }
  function text2(text) {
    text.attr("x", function (d) { return x(d.x0 + d.x1) - this.getComputedTextLength() - 6; })
      .attr("y", function (d) { return y(d.y0 + d.y1) - 6; })
      .style("opacity", function (d) { return this.getComputedTextLength() < x(d.x0 + d.x1) - x(d.x0) ? 1 : 0; });
  }
  function rect(rect) {
    rect.attr("x", function (d) { return x(d.x0); })
      .attr("y", function (d) { return y(d.y0); })
      .attr("width", function (d) {
        return x(d.x0 + d.x1) - x(d.x0);
      })
      .attr("height", function (d) {
        return y(d.y0 + d.y1) - y(d.y0);
      });
  }
  function name(d, selector) {
    const temp = d.parent
      ? selector + " / " + d.data.name + " (" + formatNumber(d.value) + ")"
      : selector + " (" + formatNumber(d.value) + ")";
    return temp
  }
  updateDrillDown();

  d3.select('.profit-show-default')
  .on('mouseover', function (params) {
    d3.select('.profit-show-default p').style('display', 'block')
  })
  .on('mouseout', function (params) {
    d3.select('.profit-show-default p').style('display', 'none')
  })

}

