var rtUrl = "./daily?station=08NH005&format=json";
var rtData = {};

function buildDailyUrl(station, format='json'){
    var router = "./daily"
    var url = router + "?station=" + station + "&format=" + format;
    return url
}
function drawDailyGraph(dJSON){
    var parseTime = d3.timeParse("%d-%m-%Y");
    var humanFormat = d3.timeFormat("%B, %e, - %H:%M");
    d3.json(rtUrl, function(data) {
        data.forEach(function(d){
            //var myDate = d["DAY"] + "-" + d["MONTH"] + "-" + "2018"
            d["Date"] = d3.isoParse(d["Date"]);
            var myFormat = d3.timeFormat("%m-%d %H");
            for (var param in d){
                if (param != 'Date' && param != "Discharge / Débit (cms)"){
                    delete d[param];
                }
                if (param == "Discharge / Débit (cms)"){
                    d['Discharge'] = d["Discharge / Débit (cms)"]
                    delete d[param]
                }
            }
            //d["Date"] = parseTime(myDate);
            d["Date"] =d3.timeFormat("%Y-%m-%d %H")(d.Date);
            
            return d;
        })
        var result = d3.nest()
            .key(function(d) {
                return d.Date;
            })
            .rollup(function(v) { return d3.mean(v, function(d) { return d.Discharge; }); })
            .entries(data);
        result.forEach(function(d){
            d.key = d3.timeParse("%Y-%m-%d %H")(d.key);
        })
        window.rtData = result;
        setTimeout(function(){
            c3.generate({
                bindto: '#dailyGraph',
                data:{
                    json: rtData,
                    keys: {
                        x: 'key',
                        value: ['value']
                    },
                    type: 'spline',
                    color: '#011f4b',
                    names: {
                        value: 'Discharge(cms)',
                    }
                
                },
                point: {
                    show: false
                },
                axis:{
                    x:{
                        type: 'timeseries',
                        tick: {
                            format: '%B %e',
                            count: 30
                    }
                    }
                },
                tooltip: {
                    format: {
                        title: function (d) { return 'Flow for: ' + humanFormat(d); },
                        value: function (value, ratio, id) {
                            var format = id === 'data1' ? d3.format(',') : d3.format('.1f');
                            return format(value) + ' m3/s';
                        }
                    }
                }
            });
        },1000)
    });
}

