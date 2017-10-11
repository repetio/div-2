(function(w) {

	var loadData = function () {
		var screenNum = w.location.search.substr(1).split("=")[1];

		var d1 = $.ajax({url:"data.txt"});
		var d2 = $.getJSON("config/screen-conf.json");

		$.when(d1, d2).done(function(d, s) {
			d = d[0].replace(/\r/g, '');
			var data = d.split("\n");
			var conf = s[0][screenNum];

			$.each(conf, function(index, card) {
				var i = index + 1;
				var edo = $("#estado"+i);
				if(card["visible"]) {
					edo.text(card["name"]);
					var candData = $.grep(data, function(lData, lNum) {
						return lData.substr(0,2) == card["code"];
					})[0];
					candDataArr = candData.split("|");

					if(candDataArr[1] !== "0") {
						$("#foto"+i).attr("src", "candidatos/"+candDataArr[1]+".jpg");
						$("#partido"+i).attr("src", "logos/"+candDataArr[3]+".jpg");
						$("#nombre"+i).text(candDataArr[2]);
						$("#votos"+i).text(Number(candDataArr[4]).toLocaleString("es-VE"));
						$("#tx"+i).text(candDataArr[5]);
						$("#part" + i).text(candDataArr[6]);
					} else {					
						$("#partido"+i).attr("src", "logos/0.png");
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

	var currentScreen = 1;
	function shiftScreens() {
		if(currentScreen == 1) {
			$("#scr2").removeClass("hide-info");
			$("#scr1").removeClass("show-info");
			$("#scr1").css("z-index", "100")
			$("#scr2").addClass("show-info");
			$("#scr1").addClass("hide-info");
			currentScreen = 2;
		} else {
			$("#scr2").removeClass("show-info");
			$("#scr1").removeClass("hide-info");
			$("#scr1").css("z-index", "0")
			$("#scr2").addClass("hide-info");
			$("#scr1").addClass("show-info");
			currentScreen = 1;
		}
	}

	loadData();
	setInterval(shiftScreens, 20000);
	setInterval(loadData, 60000);

})(window);

