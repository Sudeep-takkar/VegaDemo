var vlSpec1 = {
    '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
    'data': { 'name': 'table' },
    'width': 500,
    'height': 500,
    "layer": [
	    {
		    'mark': 'line',
		    'encoding': {
		        'x': { 'field': 'x', 'type': 'quantitative', 'scale': { 'zero': false } },
		        'y': { 'field': 'y', 'type': 'quantitative' },
		        'color': { 'field': 'category', 'type': 'nominal' }
		    }
		},
		{
			 "mark": "rule",
		      "encoding": {
		        "y": {
		          "field": "y",
		          "type": "quantitative",
		          "aggregate": "mean"
		        },
		        "size": {"value": 2},
		        "color": {"field": "symbol", "type": "nominal"}
		      }
		}
    ]
};
var vlSpec2 = {
    '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
    'data': { 'name': 'table' },
    'width': 500,
    'height': 500,
    "layer": [
	    {
		    'mark': 'bar',
		    'encoding': {
		        'x': { 'field': 'x', 'type': 'quantitative', 'scale': { 'zero': false } },
		        'y': { 'field': 'y', 'type': 'quantitative' },
		        'color': { 'field': 'category', 'type': 'nominal' }
		    }
		},
		{
			 "mark": "rule",
		      "encoding": {
		        "y": {
		          "field": "y",
		          "type": "quantitative",
		          "aggregate": "mean"
		        },
		        "size": {"value": 2},
		        "color": {"field": "symbol", "type": "nominal"}
		      }
		}
    ]
};
vegaEmbed('#chart1', vlSpec1).then(function(res) {
    /**
     * Generates a new tuple with random walk.
     */
    function newGenerator() {
        var counter = -1;
        var previousY = [5, 5];
        return function () {
            counter++;
            var newVals = previousY.map(function (v, c) { 
            	var rand = Math.round(Math.random() * 10 - c * 3);
            	return ({
                x: counter,
                y: (rand%2 == 0) ? (v + Math.round(Math.random() * 10 - c * 3)) : (v - Math.round(Math.random() * 10 - c * 3)),
                category: c
            }); });
            previousY = newVals.map(function (v) { return v.y; });
            return newVals;
        };
    }

    var valueGenerator = newGenerator();
    var minimumX = -100;
    window.setInterval(function () {
        minimumX++;
        var changeSet = vega.changeset().insert(valueGenerator()).remove(
        	function (t) { return t.x < minimumX; }
        );
        console.log(changeSet);
        res.view.change('table', changeSet).run();
    }, 300);
    console.log(res.view);

});

vegaEmbed('#chart2', vlSpec2).then(function(res) {
    /**
     * Generates a new tuple with random walk.
     */
    function newGenerator() {
        var counter = -1;
        var previousY = [5, 5];
        return function () {
            counter++;
            var newVals = previousY.map(function (v, c) { 
            	var rand = Math.round(Math.random() * 10 - c * 3);
            	return ({
                x: counter,
                y: (rand%2 == 0) ? (v + Math.round(Math.random() * 10 - c * 3)) : (v - Math.round(Math.random() * 10 - c * 3)),
                category: c
            }); });
            previousY = newVals.map(function (v) { return v.y; });
            return newVals;
        };
    }

    var valueGenerator = newGenerator();
    var minimumX = -100;
    window.setInterval(function () {
        minimumX++;
        var changeSet = vega.changeset().insert(valueGenerator()).remove(
        	function (t) { return t.x < minimumX; }
        );
        console.log(changeSet);
        res.view.change('table', changeSet).run();
    }, 300);
    console.log(res.view);

});