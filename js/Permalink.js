OSMLULC.Permalink =  {
	
	/**
	 * Permalink should handle following states:
	 * 
	 * zoom
	 * centerLon
	 * centerLat
	 * rotation
	 * cqlfilterValue (historic=*)
	 * 
	 * URL pattern: example.org/#zoom/centerLon/centerLat/rotation/cqlfilterValue
	 * 
	 */
	
	moveendKey : undefined,
	
	initialize : function() {
		
		console.log("Permalink.initialize");
		
		OSMLULC.Permalink.setStateFromUrl();
		
		//set EveltListeners
		window.addEventListener("popstate", OSMLULC.Permalink.onPopstate, false);
		OSMLULC.Permalink.moveendKey = OSMLULC.Controller.map.map.on("moveend", OSMLULC.Permalink.updateUrl);
		$(document).on("setCQLFilter", OSMLULC.Permalink.updateUrl); //Triggered in OSMLULC.Map.setCQLFilter()

	},
	
	setStateFromUrl : function(e) {
		console.log(e);
		//setState from URL on startup (load)
		console.log("Permalink.setStateFromUrl()");
		if (window.location.hash !== '') {
			
			console.log(window.location.hash);
        
        var hash = window.location.hash.substring(1); //remove # at beginning
        var parts = hash.split('/');
        
        var state = {
        	zoom: parseInt(parts[0]),
			centerLon: parseFloat(parts[1]),
			centerLat: parseFloat(parts[2]),
			rotation: parseFloat(parts[3]),
			cqlfilterValue: parts[4]
        };
        
        OSMLULC.Permalink.setState(state);
        
      }
		
	},
	
	onPopstate : function(e) {
		
		OSMLULC.Permalink.setStateFromUrl(e);
		
	},
  
	updateUrl : function(e) {
		console.log("Permalink.updateUrl",e);
		
		var state = OSMLULC.Permalink.getState();
		
		var hash  = "#" +
					state.zoom + "/" +
					state.centerLon + "/" +
					state.centerLat + "/" +
					state.rotation + "/" +
					state.cqlfilterValue;

		window.removeEventListener("popstate", OSMLULC.Permalink.onPopstate, false);
						
		window.location.hash = hash;
		
		window.addEventListener("popstate", OSMLULC.Permalink.onPopstate, false);
	},
	
	getState : function() {
		
		var view 		= OSMLULC.Controller.map.map.getView();
		var zoom 		= view.getZoom();
		var center 		= ol.proj.toLonLat(view.getCenter()); //[lon, lat]
		var rotation 	= view.getRotation(); 

		return {
			zoom: zoom,
			centerLon: parseFloat(OSMLULC.Permalink.normalizeLon( center[0] ).toFixed(5)),
			centerLat: parseFloat(center[1].toFixed(5)),
			rotation: parseFloat(rotation.toFixed(2)),
			cqlfilterValue: "" //cqlfilterValue
			};
		
	},
	
	setState : function(state) {
		
		console.log("setState", state);
		
		var view = OSMLULC.Controller.map.map.getView();
		
		// console.log(OSMLULC.Permalink.moveendKey);
		//ol3 OSMLULC.Controller.map.map.unByKey(OSMLULC.Permalink.moveendKey);
		OSMLULC.Controller.map.map.un("moveend", OSMLULC.Permalink.updateUrl); //ol4 no unByKey
		
		view.setZoom(state.zoom);
		view.setCenter(ol.proj.fromLonLat([state.centerLon, state.centerLat]));
		view.setRotation(state.rotation);

		OSMLULC.Permalink.moveendKey = OSMLULC.Controller.map.map.on("moveend", OSMLULC.Permalink.updateUrl);
	},
	
	normalizeLon : function(x){return (( (x+180) % 360 + 360) % 360)-180;  } // mathematic modulo like in R, not like % symetric modulo like in Java or Javascript
  
};