$( document ).ready(function() {
    var url = "./station?station=08NH005&format=json&stats_type=historic"
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var parseTime = d3.timeParse("%d-%m-%Y");
    var color = d3.scaleOrdinal()
        .domain(["max", ",min"])
        .range(["rgba(176,196,222, 0.2)", "rgba(65,105,225, 0.65)"]);
    
    var x = d3.scaleTime()
        .rangeRound([0, width]);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);
    var z = color;
    var area = d3.area()
        .x(function(d) { return x(d["Date"]); })
        .y1(function(d) { return y(d["max"]); });

    d3.json(url, function(data) {
        data.forEach(function(d){
            var myDate = d["DAY"] + "-" + d["MONTH"] + "-" + "2018"
            //d["Date"] = d3.isoParse(d["Date"]);
            d["Date"] = parseTime(myDate);
            var myFormat = d3.timeFormat("%Y-%m-%d");
            console.log(myFormat(d["Date"]));
            return d;
        })
        console.log(data);
          // sort years ascending
        data.sort(function(a, b){
            return a["Date"]-b["Date"];
        })
        
        x.domain(d3.extent(data, function(d) { return d["Date"]; }));
        y.domain([0, d3.max(data, function(d) { return d["max"]; })]);
        area.y0(y(0));

        g.append("path")
            .datum(data)
            .attr("fill", "steelblue")
            .attr("d", area);

        g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Flow (m/s)");
    });
});