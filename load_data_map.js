(function(w) {

	var loadData = function () {
		var d1 = $.ajax({url:"data.txt"});
		var d2 = $.getJSON("partidos.json");

		$.when(d1, d2).done(function(d, p) {
			var data = d[0].split("\n");
			var parties = p[0];

			$.each(data, function(index, eCandData) {
				var i = index + 1;
				candData = eCandData.split("|");
				var stateCode = "#m0"+candData[0];

				if(candData[1] != "0") {
					var partyData = parties[Number(candData[3])];
					if(partyData) {
						$(stateCode).css("fill", partyData["color"]);
					}
				}
			});
		}).fail(function(x1, x2) {
			console.log("Error loading files");
		})
	}	

	loadData();

})(window);

