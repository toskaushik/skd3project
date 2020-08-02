async function pageOnload() {
  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  var y = d3.scaleLinear().domain([0, 35]).range([height, 0]);
  var x = d3.scaleLinear().domain([10, 29]).range([0, width]);

  var svg = d3
    .select("#page1div")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const age04 = await d3.csv("0-4age.csv");
  const age517 = await d3.csv("5-17age.csv");
  const age1849 = await d3.csv("18-49age.csv");
  const age5064 = await d3.csv("50-64age.csv");
  const age65 = await d3.csv("65+age.csv");

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
    .text("Hospitalization percentage by Population");

  var a0 = svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([age04])
    .attr("stroke", "purple")
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

  var a5 = svg
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

  var a18 = svg
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

  var a50 = svg
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
  var a65 = svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([age65])
    .attr("stroke", "fuchsia")
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
  var t65 = svg
    .selectAll("dot")
    .data(age65)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("transform", function (d) {
      return "translate(" + x(+d.week + 0.3) + " ," + y(d.value) + ")";
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html("Week 2020/" + d.week + "<br/>" + "Percentage " + d.value + "%")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });
  var t50 = svg
    .selectAll("dot")
    .data(age5064)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("transform", function (d) {
      return "translate(" + x(+d.week + 0.3) + " ," + y(d.value) + ")";
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html("Week 2020/" + d.week + "<br/>" + "Percentage " + d.value + "%")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });

  var t18 = svg
    .selectAll("dot")
    .data(age1849)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("transform", function (d) {
      return "translate(" + x(+d.week + 0.3) + " ," + y(d.value) + ")";
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html("Week 2020/" + d.week + "<br/>" + "Percentage " + d.value + "%")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });
  var t5 = svg
    .selectAll("dot")
    .data(age517)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("transform", function (d) {
      return "translate(" + x(+d.week + 0.3) + " ," + y(d.value) + ")";
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html("Week 2020/" + d.week + "<br/>" + "Percentage " + d.value + "%")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });

  var t0 = svg
    .selectAll("dot")
    .data(age04)
    .enter()
    .append("circle")
    .attr("r", 5)
    .attr("transform", function (d) {
      return "translate(" + x(+d.week + 0.3) + " ," + y(d.value) + ")";
    })
    .on("mouseover", function (d) {
      div.transition().duration(200).style("opacity", 0.9);
      div
        .html("Week 2020/" + d.week + "<br/>" + "Percentage " + d.value + "%")
        .style("left", d3.event.pageX + "px")
        .style("top", d3.event.pageY - 28 + "px");
    })
    .on("mouseout", function (d) {
      div.transition().duration(500).style("opacity", 0);
    });
}
