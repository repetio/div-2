(function(w) {

	var loadData = function () {
		var screenNum = w.location.search.substr(1).split("=")[1];
		console.log("sn", screenNum);

		var d1 = $.ajax({url:"data.txt"});
		var d2 = $.getJSON("screen-conf.json");

		$.when(d1, d2).done(function(d, s) {
			var data = d[0].split("\n");
			var conf = s[0][screenNum];

			$.each(conf, function(index, card) {
				var i = index + 1;
				console.log("i1", i);
				var edo = $("#estado"+i);
				if(card["visible"]) {
					edo.text(card["name"]);
					var candData = $.grep(data, function(lData, lNum) {
						return lData.substr(0,2) == card["code"];
					})[0];
					candDataArr = candData.split("|");
						console.log("i2", i, candDataArr);

					if(candDataArr[1] != "0") {
						$("#foto"+i).attr("src", "candidatos/"+candDataArr[1]+".jpg");
						$("#partido"+i).attr("src", "logos/"+candDataArr[3]+".jpg");
						$("#nombre"+i).text(candDataArr[2]);
						$("#votos"+i).text(Number(candDataArr[4]).toLocaleString("es-VE"));
						$("#part"+i).text(candDataArr[5]);
						$("#tx"+i).text(candDataArr[6]);
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
		return "logos662x300/" + e + "/" + code + ".jpg";

	}

	setInterval(shiftScreens, 10000);

	var currentScreen = 1;
	function shiftScreens() {
		if(currentScreen == 1) {
			$("#scr2").show();
			$("#scr1").hide();
			currentScreen = 2;
		} else {
			$("#scr1").show();
			$("#scr2").hide();						
			currentScreen = 1;
		}
	}

	shiftScreens();
	loadData();

})(window);
