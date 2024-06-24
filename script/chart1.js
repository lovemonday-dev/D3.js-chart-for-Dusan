fetch('../data/chart1.json')
  .then((response) => response.json())
  .then((json) => {
    render(json, 'investicija');
    render(json, 'proizvod');
  })
  .catch((error) => console.error('Error fetching data:', error));

function render(treemapData, selector) {
  const renderData = treemapData[selector][0]; // Ensure this key exists in your JSON data

  (function () {
    const margin = { top: 20, right: 0, bottom: 0, left: 0 };
    const container = document.getElementById(selector);
    const width = container.clientWidth;
    const height = container.clientHeight;

    let svg, grandparent, scaleX, scaleY, treemap;

    function createSvg() {
      scaleX = d3.scale.linear()
        .domain([0, width])
        .range([0, width]);

      scaleY = d3.scale.linear()
        .domain([0, height])
        .range([0, height]);

      treemap = d3.layout.treemap()
        .children((d, depth) => depth ? null : d._children)
        .sort((a, b) => a.amount - b.amount)
        .ratio(height / width * 0.5 * (1 + Math.sqrt(5)))
        .round(false)
        .value(d => d.value);

      svg = d3.select(`#${selector}`).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.bottom + margin.top)
        .style("margin-left", -margin.left + "px")
        .style("margin-right", -margin.right + "px")
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .style("shape-rendering", "geometricPrecision");

      grandparent = svg.append("g")
        .attr("class", "grandparent");

      grandparent.append("rect")
        .attr("y", -margin.top)
        .attr("width", width)
        .attr("height", margin.top + 10);

      grandparent.append("text")
        .attr("x", 25)
        .attr("y", 6 - margin.top + 3)
        .attr("dy", ".75em");
    }

    function initialize(d) {
      d.x = d.y = 0;
      d.dx = width;
      d.dy = height;
      d.depth = 0;
    }

    function accumulate(d) {
      return (d._children = d.children) ? d.amount = d.children.reduce((p, v) => p + accumulate(v), 0) : d.amount;
    }

    function layout(d) {
      if (d._children) {
        treemap.nodes({ _children: d._children });

        d._children.forEach(c => {
          c.x = d.x + c.x * d.dx;
          c.y = d.y + c.y * d.dy;
          c.dx *= d.dx;
          c.dy *= d.dy;
          c.parent = d;
        });
      }
    }

    function display(d) {
      grandparent
        .datum(d.parent)
        .on("click", transition)
        .select("text")
        .text(selector);

      const g1 = svg.insert("g", ".grandparent")
        .datum(d)
        .attr("class", "depth");

      const g = g1.selectAll("g")
        .data(d._children)
        .enter().append("g");

      g.filter(d => d._children)
        .classed("children", true)
        .on("click", transition);

      g.append("rect")
        .attr("class", "parent")
        .call(rect)
        .style("fill", d => d.color)
        .append("title")
        .text(d => d.fullname);

      g.selectAll(".child")
        .data(d => {
          layout(d);
          return d._children || [d];
        })
        .enter().append("rect")
        .attr("class", "child")
        .call(rect);

      g.append("text")
        .classed("overlaidText1", true)
        .text(d => d.name)
        .call(middletext1);

      g.append("text")
        .classed("overlaidText", true)
        .text(d => d.text)
        .call(middletext);

      function transition(d) {
        if (!d || this.transitioning) return;
        this.transitioning = true;

        const g2 = display(d),
          t1 = g1.transition().duration(1000),
          t2 = g2.transition().duration(1000);

        scaleX.domain([d.x, d.x + d.dx]);
        scaleY.domain([d.y, d.y + d.dy]);

        svg.style("shape-rendering", null);

        svg.selectAll(".depth").sort((a, b) => a.depth - b.depth);

        g2.selectAll("text")
          .style("fill-opacity", 0);

        t1.selectAll("text:not(.overlaidText)").call(middletext1).style("fill-opacity", 0);
        t2.selectAll("text:not(.overlaidText)").call(middletext1).style("fill-opacity", 1);
        t1.selectAll(".overlaidText").call(middletext).style("fill-opacity", 0);
        t2.selectAll(".overlaidText").call(middletext).style("fill-opacity", 1);
        t1.selectAll("rect").call(rect);
        t2.selectAll("rect").call(rect);

        t1.remove().each("end", () => {
          svg.style("shape-rendering", "geometricPrecision");
          this.transitioning = false;
        });
      }

      return g;
    }

    function text(text) {
      text.attr("x", d => scaleX(d.x) + 6)
        .attr("y", d => scaleY(d.y) + 2);
    }

    function middletext(text) {
      text.attr("x", d => scaleX(d.x + d.dx / 2))
        .attr("y", d => scaleY(d.y + d.dy / 2) + 18);
    }

    function middletext1(text) {
      text.attr("x", d => scaleX(d.x + d.dx / 2))
        .attr("y", d => scaleY(d.y + d.dy / 2) - 3.5);
    }

    function rect(rect) {
      rect.attr("x", d => scaleX(d.x))
        .attr("y", d => scaleY(d.y) - 6)
        .attr("width", d => {
          const x0 = scaleX(d.x);
          const x1 = scaleX(d.x + d.dx);
          const w = x1 - x0;
          console.log(`Width for ${d.name} in ${selector}: x0=${x0}, x1=${x1}, width=${w}`);
          return w;
        })
        .attr("height", d => scaleY(d.y + d.dy) - scaleY(d.y))
        .attr("rx", "0px");
    }


    // Debug logs
    createSvg();
    initialize(renderData);
    accumulate(renderData);
    layout(renderData);
    display(renderData);
  })();
}
