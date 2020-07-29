async function pageOnload() {
  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  var x = d3.scaleLinear().domain([10, 29]).range([0, width]);
  var y = d3.scaleLinear().domain([0, 30]).range([height, 0]);

  var svg = d3
    .select("#page1div")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const age04 = await d3.csv("0-4agePos.csv");
  const age517 = await d3.csv("5-17agePos.csv");
  const age1849 = await d3.csv("18-49agePos.csv");
  const age5064 = await d3.csv("50-64agePos.csv");
  const age65 = await d3.csv("65+agePos.csv");
  const unknown = await d3.csv("unknownAgePos.csv");

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
    .text("Percentage of Positive cases");

  svg
    .append("g")
    .attr("transform", "translate(10,0 )")
    .attr("class", "grid")
    .call(d3.axisLeft(y).tickFormat(""));

  svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([age04])
    .attr("stroke", "pink")
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.week);
        })
        .y(function (d) {
          return y(d.value);
        })
    );

  svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([age517])
    .attr("stroke", "blue")
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.week);
        })
        .y(function (d) {
          return y(d.value);
        })
    );

  svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([age1849])
    .attr("stroke", "green")
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.week);
        })
        .y(function (d) {
          return y(d.value);
        })
    );

  svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([age5064])
    .attr("stroke", "maroon")
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.week);
        })
        .y(function (d) {
          return y(d.value);
        })
    );

  svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([unknown])
    .attr("stroke", "brown")
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.week);
        })
        .y(function (d) {
          return y(d.value);
        })
    );
  svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([age65])
    .attr("stroke", "red")
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.week);
        })
        .y(function (d) {
          return y(d.value);
        })
    );
  svg
    .selectAll("dot")
    .data(age65)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("transform", function (d) {
      return "translate(" + x(+d.week + 0.3) + " ," + y(d.value) + ")";
    })
    // .attr("cx", function (d) {
    //   return x(d.week);
    // })
    // .attr("cy", function (d) {
    //   return y(d.value);
    // })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html(d.week + "<br/>" + d.value)
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });
}
