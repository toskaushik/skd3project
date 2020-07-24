async function init1() {
  var margin = { top: 50, right: 100, bottom: 80, left: 50 },
    width = 960 - margin.left - margin.right,
    //width = 960  - margin.left,
    height = 650 - margin.top - margin.bottom;

  var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const data = await d3.csv(
    "https://raw.githubusercontent.com/toskaushik/skd3project/master/data.csv"
  );
  //const data = d3.csv("https://raw.githubusercontent.com/rajeevujain/DV/master/world.csv");

  data.forEach(function (d) {
    date = d.time;
    value = d.count;
  });

  var x = d3
    .scaleLinear()
    //.domain(d3.extent(data, function (d) { return d.date; }))
    .domain([202010, 202029])
    .range([0, width]);

  svg
    .append("g")
    .attr("transform", "translate(10," + height + ")")
    .call(
      d3
        .axisBottom(x)
        .tickValues([
          202010,
          202011,
          202012,
          202013,
          202014,
          202015,
          202016,
          202017,
          202018,
          202019,
          202020,
          202021,
          202022,
          202023,
          202024,
          202025,
          202026,
          202027,
          202028,
          202029,
        ])
        .tickFormat(d3.format("d"))
    )
    .style("font-size", "12px");

  // text label for the x axis
  svg
    .append("text")
    .attr(
      "transform",
      "translate(" + width / 2 + " ," + (height + margin.top) + ")"
    )
    .style("text-anchor", "middle")
    .text("Year");

  var y = d3
    .scaleLinear()
    .domain([
      50,
      d3.max(data, function (d) {
        return +d.value + 2;
      }),
    ])
    .range([height, 0]);

  svg
    .append("g")
    .attr("transform", "translate(10,0 )")
    .call(d3.axisLeft(y))
    .style("font-size", "12px");

  // text label for the y axis
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Life Expectancy");

  // gridlines in x axis function
  function make_x_gridlines() {
    return d3
      .axisBottom(x)
      .tickValues([
        202010,
        202011,
        202012,
        202013,
        202014,
        202015,
        202016,
        202017,
        202018,
        202019,
        202020,
        202021,
        202022,
        202023,
        202024,
        202025,
        202026,
        202027,
        202028,
        202029,
      ]);
    //.ticks(15)
  }

  // gridlines in y axis function
  function make_y_gridlines() {
    return d3.axisLeft(y).ticks(12);
  }

  // add the X gridlines
  svg
    .append("g")
    .attr("class", "grid")
    .attr("transform", "translate(10," + height + ")")
    .call(make_x_gridlines().tickSize(-height).tickFormat(""));

  // add the Y gridlines
  svg
    .append("g")
    .attr("transform", "translate(12,0 )")
    .attr("class", "grid")
    .call(make_y_gridlines().tickSize(-width).tickFormat(""));

  svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2.5)
    .attr(
      "d",
      d3
        .line()
        .x(function (d) {
          return x(d.date);
        })
        .y(function (d) {
          return y(d.value);
        })
    );
}
