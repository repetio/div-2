(function(w) {

	var loadData = function () {
		console.log('loaded');
		console.log('param', w.location.search);
		var screenNum = w.location.search.substr(1).split("=")[1];
		console.log("sn", screenNum);

		var d1 = $.ajax({url:"data.txt"});
		var d2 = $.getJSON("screen-conf.json");

		$.when(d1, d2).done(function(d, s) {
			console.log("res", d, s);
			var data = d[0].split("\n");
			var conf = s[0][screenNum];
			console.log(conf);

			$.each(conf, function(index, card) {
				var i = index + 1;
				var edo = $("#estado"+i);
				if(card["visible"]) {
					edo.text(card["name"]);
					var candData = $.grep(data, function(lData, lNum) {
						return lData.substr(0,2) == card["code"];
					})[0];
					console.log("can data", candData);
					candDataArr = candData.split("|");

					if(candDataArr[1] != "0") {
						var path = 
						$("#img"+i).attr("src", setPath(candDataArr[1]));
						$("#votos"+i).text("Votos válidos: " + Number(candDataArr[2]).toLocaleString("es-VE"));
						$("#part"+i).text(candDataArr[3]);
						$("#tx"+i).text(candDataArr[4]);
					} else {					
						$("#img"+i).attr("src", "logos662x300/no_adj.png");
					}
				} else {
					edo.parent().hide();
				}
			})
		}).fail(function(x1, x2) {
			console.log("Error loading files");
		})
	}	

	function setPath(code) {
		var l = code.indexOf(".");
		var e = code.substr(0, l);
		console.log("l", l);
		return "logos662x300/" + e + "/" + code + ".jpg";

	}

	setInterval(loadData, 5000);

})(window);

