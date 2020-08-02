async function pageOnload() {
  var margin = { top: 50, right: 50, bottom: 50, left: 75 },
    width = 800 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  const ddlData = ["Number of test cases", "Number of +ve cases"];
  d3.select("#ddl").on("change", function (d) {
    var selectedOption = d3.select(this).property("value");
    updateChart(selectedOption);
  });

  d3.select("#ddl")
    .selectAll("myOptions")
    .data(ddlData)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    })
    .attr("value", function (d) {
      return d;
    });

  var svg = d3
    .select("#page1div")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var totalCases = [
    { week: 10, value: 8204 },
    { week: 11, value: 35371 },
    { week: 12, value: 69313 },
    { week: 13, value: 66193 },
    { week: 14, value: 78690 },
    { week: 15, value: 82941 },
    { week: 16, value: 83932 },
    { week: 17, value: 129824 },
    { week: 18, value: 150153 },
    { week: 19, value: 163365 },
    { week: 20, value: 180464 },
    { week: 21, value: 214091 },
    { week: 22, value: 223510 },
    { week: 23, value: 241186 },
    { week: 24, value: 248207 },
    { week: 25, value: 248292 },
    { week: 26, value: 265751 },
    { week: 27, value: 269253 },
    { week: 28, value: 331170 },
    { week: 29, value: 246839 },
  ];

  var positiveCases = [
    { week: 10, value: 987 },
    { week: 11, value: 3563 },
    { week: 12, value: 6897 },
    { week: 13, value: 10829 },
    { week: 14, value: 13997 },
    { week: 15, value: 15156 },
    { week: 16, value: 15250 },
    { week: 17, value: 21367 },
    { week: 18, value: 19426 },
    { week: 19, value: 17666 },
    { week: 20, value: 15277 },
    { week: 21, value: 14669 },
    { week: 22, value: 12660 },
    { week: 23, value: 12088 },
    { week: 24, value: 12847 },
    { week: 25, value: 13686 },
    { week: 26, value: 17405 },
    { week: 27, value: 16416 },
    { week: 28, value: 24764 },
    { week: 29, value: 19771 },
  ];

  var x = d3.scaleBand().range([0, width]).padding(0.1);
  var xAxis = svg.append("g").attr("transform", "translate(0," + height + ")");

  var y = d3.scaleLinear().range([height, 0]);

  var yAxis = svg.append("g").attr("class", "myY");

  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top) + ")"
    )
    .style("text-anchor", "middle")
    .text("Weeks of 2020");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Number of cases");

  function updateChart(selectedItem) {
    if (selectedItem == "Number of +ve cases") {
      data = positiveCases;
      color = "red";
    } else {
      data = totalCases;
      color = "orange";
    }

    x.domain(
      data.map(function (d) {
        return d.week;
      })
    );
    xAxis.call(d3.axisBottom(x));

    y.domain([
      0,
      d3.max(data, function (d) {
        return d.value;
      }),
    ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    var chart = svg.selectAll("rect").data(data);

    chart
      .enter()
      .append("rect")
      .merge(chart)
      .transition()
      .duration(1000)
      .attr("x", function (d) {
        return x(d.week);
      })
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return height - y(d.value);
      })
      .attr("fill", color);

    u.exit().remove();
  }
  updateChart("");
}
