async function pageOnload() {
  var margin = { top: 50, right: 50, bottom: 50, left: 50 },
    width = 800 - margin.left - margin.right,
    height = 380 - margin.top - margin.bottom;

  var y = d3.scaleLinear().domain([0, 30]).range([height, 0]);
  var x = d3.scaleLinear().domain([10, 29]).range([0, width]);

  var svg = d3
    .select("#page1div")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const dataTreshold = await d3.csv("nchs-mortality-treshold.csv");
  const dataCovid = await d3.csv("nchs-mortality-covid.csv");
  const dataBaseline = await d3.csv("nchs-mortality-baseline.csv");

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
    .text("Mortality percentage");

  svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([dataCovid])
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
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([dataTreshold])
    .attr("stroke", "sandybrown")
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
    .data([dataBaseline])
    .attr("stroke", "skyblue")
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
  const annotations = [
    {
      note: {
        label: "Pick mortality of Pnemonia, Influenza or Covid-19",
        //title: "Annotation title",
        //align: "middle",  // try right or left
        wrap: 200, // try something smaller to see text split in several lines
        padding: 10, // More = text lower
      },
      color: ["black"],
      x: width / 2 - 121,
      y: height / 2 - 120,
      dy: 50,
      dx: 50,
    },
  ];

  //  const makeAnnotations = d3.annotation().annotations(annotations);
  svg.append("g").call(d3.annotation().annotations(annotations));
}
