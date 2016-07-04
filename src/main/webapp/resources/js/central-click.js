/**
 * central-click.js
 */
d3.svg.BubbleChart.define("central-click", function(options) {
	var self = this;

	self.setup = (function(node) {
		var original = self.setup;
		return function(node) {
			var fn = original.apply(this, arguments);
			self.event.on("click", function(node) {
				if (node.selectAll("text.central-click")[0].length === 1) {
					// alert(document.querySelector("g").getAttribute("class"));
					var selectedValue = d3.select("g.active > text.count")
							.text();

					if (selectedValue === "Oteemo-X") {
						swal({
							title : "The Answer",
							imageUrl : "resources/images/OteemoX.jpg"
						});
					} else if (selectedValue === "Philosophy") {
						swal({
							title : "The Strategy",
							imageUrl : "resources/images/philosophy.png"
						});
					} else if (selectedValue === "Agile") {
						swal({
							title : "Discovery",
							imageUrl : "resources/images/agile.png"
						});
					} else if (selectedValue === "Architecture") {
						swal({
							title : "Micro-Services",
							imageUrl : "resources/images/architecture.png"
						});
					} else if (selectedValue === "CI/CD") {
						swal({
							title : "Continuous Integration and Delivery",
							imageUrl : "resources/images/cicd.png"
						});
					} else if (selectedValue === "Automation") {
						swal({
							title : "Consistency in Acceleration",
							imageUrl : "resources/images/automation.png"
						});
					} else if (selectedValue === "Mentoring") {
						swal({
							title : "The Transition",
							imageUrl : "resources/images/mentoring.png"
						});
					} else if (selectedValue === "Infrastructure") {
						swal({
							title : "Flexible Infrastructure",
							imageUrl : "resources/images/infrastructure.jpg"
						});
					} else if (selectedValue === "Technologies") {
						swal({
							title : "Integrated Solutions",
							imageUrl : "resources/images/technologies.png"
						});
					} else if (selectedValue === "Compliance") {
						swal({
							title : "Risk and Compliance",
							imageUrl : "resources/images/compliance.png"
						});
					}
				}
			});
			return fn;
		};
	})();

	self.reset = (function(node) {
		var original = self.reset;
		return function(node) {
			var fn = original.apply(this, arguments);
			node.select("text.central-click").remove();
			return fn;
		};
	})();

	self.moveToCentral = (function(node) {
		var original = self.moveToCentral;
		return function(node) {
			var fn = original.apply(this, arguments);
			var transition = self.getTransition().centralNode;
			transition.each("end", function() {
				node.append("text").classed({
					"central-click" : true
				}).attr(options.attr).style(options.style).attr("x",
						function(d) {
							return d.cx;
						}).attr("y", function(d) {
					return d.cy;
				}).text(options.text).style("opacity", 0).transition()
						.duration(self.getOptions().transitDuration / 2).style(
								"opacity", "0.8");
			});
			return fn;
		};
	})();
});