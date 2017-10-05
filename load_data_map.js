(function(w) {

	var loadData = function () {
		var d1 = $.ajax({url:"data.txt"});
		var d2 = $.getJSON("partidos.json");
		var winners = null;

		$.when(d1, d2).done(function(d, p) {
			d[0] = d[0].replace(/\r/g, '');
			var data = d[0].split("\n");
			var parties = p[0];

			winners = [];
			$.each(data, function(index, eCandData) {
				var i = index + 1;
				candData = eCandData.split("|");
				var stateCode = "#m0"+candData[0];
				if(candData[1] && candData[1] !== "0") {
					var partyData = parties[Number(candData[3])];
					if(partyData) {
						$(stateCode).css("fill", partyData["color"]);
					}
 					if(!winners[candData[3]]){
						winners[candData[3]] = {
							name: partyData.name,
							color: partyData.color,
							penColor: partyData.penColor,
							total: 1
						}
					}
					else{
						winners[candData[3]].total += 1;
					}
				}
			});
			winners.sort(function(a,b){ 
				if(a.total === b.total) {
					return a.name > b.name;
				}
				else {
					return a.total < b.total;
				}
			});
			$("#winner-count").empty();
			$.each(winners, function(index, winner){
				if(!winner) return;
				console.log(winner);
				var winnersContent = $("#winner-count");
				var insert = $('<div class="winner-item"> <div class="count-group" style="background-color:' + winner.color + ';color:' + winner.penColor + '">' + winner.total + '</div>' + winner.name + '</div>');
				winnersContent.append(insert);

			});
		}).fail(function(x1, x2) {
			console.log("Error loading files");
		})
	}	

	loadData();

})(window);

