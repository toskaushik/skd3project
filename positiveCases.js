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
  // var div = d3
  //   .select("body")
  //   .append("div")
  //   .attr("class", "tooltip")
  //   .style("opacity", 0);

  const ddlData = [
    "All Records",
    "0-4 Age",
    "5-17 Age",
    "18-49 Age",
    "50-64 Age",
    "65+ Age",
    "Total",
  ];

  d3.select("#ddl").on("change", function (d) {
    var selectedOption = d3.select(this).property("value");
    update(selectedOption);
  });
  function update(selectedItem) {
    if (selectedItem == "0-4 Age") {
      iage04 = age04;
      iage517 = [];
      iage1849 = [];
      iage5064 = [];
      iage65 = [];
      iunknown = [];
    } else if (selectedItem == "5-17 Age") {
      iage04 = [];
      iage517 = age517;
      iage1849 = [];
      iage5064 = [];
      iage65 = [];
      iunknown = [];
    } else if (selectedItem == "5-17 Age") {
      iage04 = [];
      iage517 = [];
      iage1849 = age1849;
      iage5064 = [];
      iage65 = [];
      iunknown = [];
    } else if (selectedItem == "18-49 Age") {
      iage04 = [];
      iage517 = [];
      iage1849 = age1849;
      iage5064 = [];
      iage65 = [];
      iunknown = [];
    } else if (selectedItem == "50-64 Age") {
      iage04 = [];
      iage517 = [];
      iage1849 = [];
      iage5064 = age5064;
      iage65 = [];
      iunknown = [];
    } else if (selectedItem == "65+ Age") {
      iage04 = [];
      iage517 = [];
      iage1849 = [];
      iage5064 = [];
      iage65 = age65;
      iunknown = [];
    } else if (selectedItem == "Total") {
      iage04 = [];
      iage517 = [];
      iage1849 = [];
      iage5064 = [];
      iage65 = [];
      iunknown = unknown;
    } else {
      iage04 = age04;
      iage517 = age517;
      iage1849 = age1849;
      iage5064 = age5064;
      iage65 = age65;
      iunknown = unknown;
    }

    a04
      .data([iage04])
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

    a17
      .data([iage517])
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

    a18
      .data([iage1849])
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

    a50
      .data([iage5064])
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

    aunknown
      .data([iunknown])
      .attr("stroke", "orange")
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
    a65
      .data([iage65])
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
  }
  d3.select("#ddl")
    .selectAll("myOptions")
    .data(ddlData)
    .enter()
    .append("option")
    .text(function (d) {
      return d;
    }) // text showed in the menu
    .attr("value", function (d) {
      return d;
    });
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

  var a04 = svg
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

  var a17 = svg
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

  var aunknown = svg
    .append("path")
    .attr("transform", "translate(10,0 )")
    .data([unknown])
    .attr("stroke", "orange")
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
  // svg
  //   .selectAll("dot")
  //   .data(age65)
  //   .enter()
  //   .append("circle")
  //   .attr("r", 5)
  //   .attr("transform", function (d) {
  //     return "translate(" + x(+d.week + 0.3) + " ," + y(d.value) + ")";
  //   })
  //   // .attr("cx", function (d) {
  //   //   return x(d.week);
  //   // })
  //   // .attr("cy", function (d) {
  //   //   return y(d.value);
  //   // })
  //   .on("mouseover", function (d) {
  //     div.transition().duration(200).style("opacity", 0.9);
  //     div
  //       .html(d.week + "<br/>" + d.value)
  //       .style("left", d3.event.pageX + "px")
  //       .style("top", d3.event.pageY - 28 + "px");
  //   })
  //   .on("mouseout", function (d) {
  //     div.transition().duration(500).style("opacity", 0);
  //   });
}
