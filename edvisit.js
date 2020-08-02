async function pageOnload() {
  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  var y = d3.scaleLinear().domain([0, 10]).range([height, 0]);
  var x = d3.scaleLinear().domain([10, 29]).range([0, width]);

  var svg = d3
    .select("#page1div")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const data = await d3.csv("edvisit1.csv");
  const dataili = await d3.csv("edvisit2.csv");

  // Define the div for the tooltip
  var div = d3
    .select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  svg
    .append("g")
    .attr("transform", "translate(10," + height + ")")
    .call(d3.axisBottom(x));

  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top) + ")"
    )
    .style("text-anchor", "middle")
    .text("Weeks of 2020");

  svg.append("g").attr("transform", "translate(10,0 )").call(d3.axisLeft(y));

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Percentage of visits");

  var covid = svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([data])
    .attr("stroke", "red")
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.week);
        })
        .y(function (d) {
          return y(d.count);
        })
    );

  var influ = svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([dataili])
    .attr("stroke", "teal")
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.week);
        })
        .y(function (d) {
          return y(d.count);
        })
    );
  var covidt = svg
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("transform", function (d) {
      return "translate(" + x(+d.week + 0.3) + " ," + y(d.count) + ")";
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html("Week 2020/" + d.week + "<br/>" + "Percentage " + d.count + "%")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });
  var covidilit = svg
    .selectAll("dot")
    .data(dataili)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("transform", function (d) {
      return "translate(" + x(+d.week + 0.3) + " ," + y(d.count) + ")";
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html("Week 2020/" + d.week + "<br/>" + "Percentage " + d.count + "%")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });
}
