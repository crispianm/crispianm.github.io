OSMLULC.Nominatim = {
	
	URL : "//nominatim.openstreetmap.org/search?format=json&addressdetails=1&polygon=0&q=",
	
	initialize : function () {
		$('.ui.search').search({
			apiSettings: {
				url : OSMLULC.Nominatim.URL + '{query}',
				
				onResponse : function (nominatimResponse) {

		        	var response = {
		        				    results : []
						          };
						          
					//translate nominatim response
					$.each(nominatimResponse,

						function (i,e) { //key,value
							
							if (e.class === 'place' || e.class === 'boundary') {
							
								var item = {
									title: e.display_name,
									bbox:  OSMLULC.Nominatim.nominatimBboxToOlExtent(e.boundingbox) 
								};
								
								response.results.push(item);
							}
						}

					);
						          
					return response;
				}
				
				
			},
			onSelect: function(result,response) {
				
					console.log(result);
					var map = OSMLULC.Controller.map.map;
					var view = map.getView();
					var extent = ol.proj.transformExtent(result.bbox,"EPSG:4326","EPSG:3857");
					view.fit(extent, map.getSize());
					//set zoom as integer
					var resolution = view.getResolutionForExtent(extent, map.getSize());
					var zoom = Math.floor(view.getZoomForResolution(resolution));
					map.getView().setZoom(zoom);

					//android doesn't close results after selection
					$('.ui.search').search('hide results',undefined, undefined);
				
				},
			minCharacters : 100 //avoid requests, not allowed by nominatim api
		});
		
		
		//trigger search on press enter
		$('.ui.search').on('keydown', function(event){

			var keyCode = (event.keyCode ? event.keyCode : event.which);
			console.log(keyCode);   
    		if (keyCode == 13) {
				$('.ui.search').search('search remote', $('.ui.search').search('get value') ,undefined);
			}
		});
		
		//select all on focus
		$('.ui.search input').on('focus', function (e) {
		    $(this)
		        .one('mouseup', function () {
		            $(this).select();
		            return false;
		        })
		        .select();
		});
		
		
	},
	
	nominatimBboxToOlExtent : function (box) { //btlr
		var olExtent = [ parseFloat(box[2]),parseFloat(box[0]),parseFloat(box[3]),parseFloat(box[1]) ];
		return olExtent; //lbrt
		
	}
	
	
	
};
