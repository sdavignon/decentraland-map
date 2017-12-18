var size = 50;
var blocksize = 15;
var mapoffset = 10;
var mapoffsetrequest = '-'+mapoffset+',-'+mapoffset+'/'+mapoffset+','+mapoffset;
var width = (mapoffset*blocksize) * 2 + blocksize;
var height = (mapoffset*blocksize) * 2 + blocksize;
var landdata;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select("#divbody").append("svg")
	.attr("width", width)
   .attr("height", height);

var zoomLayer = svg.append("g");
var zoomed = function() {
  zoomLayer.attr("transform", d3.event.transform);
};
svg.call(d3.zoom()
	.scaleExtent([0.1, 12])
	.on("zoom", zoomed)
);

axios.get('https://api.auction.decentraland.org/api/parcelState/range/'+mapoffsetrequest)
	.then((res) => {
		landdata = res.data.data;
		zoomLayer.selectAll("rect")
		.data(landdata)
		.enter()
		.append("rect")
		.attr("x", function(d){
			return (d.x*blocksize)+(width/2)+1;
		})
		.attr("y", function(d){
			return ((d.y*-1)*blocksize)+(height/2)+1;
		})
		.attr("height", blocksize)
		.attr("width", blocksize)
		.attr("fill", function(d) {return d.projectId !== null ? '#BFBFBF' : color(d.amount/100) ;})
		.on("click", function(d) { console.log(d);});
	}
);