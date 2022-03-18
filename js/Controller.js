class Controller {

	initialize = function () {
		console.log("INIT Controller");
		this.map = new OSMLULC.Map();
		OSMLULC.Nominatim.initialize();
		OSMLULC.Permalink.initialize();
	};
}


OSMLULC.Controller = new Controller();

OSMLULC.Controller.initialize();
