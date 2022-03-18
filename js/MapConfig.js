OSMLULC.lulcSource = new ol.source.TileWMS({
	//url: "https://maps.heigit.org/osmlanduse/tiles/osmlanduse:osm_lulc_combined_v1/webmercator/{z}/{x}/{y}.png",
	//*url: "https://maps.heigit.org/osmlanduse/service",
	// url: "http://osmatrix.geog.uni-heidelberg.de/cache/osmlanduse/service",
	url: "https://maps.heigit.org/osmlanduse/service",
	// params: {"LAYERS":'osmlanduse:osm_lulc',"BUFFER":'25'},
	params: {"LAYERS":'osmlanduse:osm_lulc_combined_osm4eo',"BUFFER":'25'},
	// params: {"LAYERS":'osmlanduse:osm4eo',"BUFFER":'25'},
	crossOrigin: 'anonymous',
	attributions: ['Gap filled overlay data by <a href="http://openstreetmap.org">OpenStreetMap contributors</a> and GIScience Heidelberg, under <a href="http://www.openstreetmap.org/copyright">ODbL;</a>.'],
	transition: 0
});


OSMLULC.rasterSource = new ol.source.Raster({
	sources: [OSMLULC.lulcSource],
	operationType: 'image',
	operation: function (imageDatas, data) {
		let imageData = imageDatas[0]; //only one layer in raster source
		data.mypixels = imageData;
		return imageData;
	}
});

const linkControlEl = document.createElement('div');
linkControlEl.innerHTML = "<a href='https:/heigit.org/legal-notice/' target='_blank'>Privacy Policy</a> &middot; <a href='https:/heigit.org/imprint/' target='_blank'>Imprint</a>";
linkControlEl.className = 'link-control ol-unselectable ol-control';

OSMLULC.mapConfig = {
	
	baseLayers : {

			'OSM Mapnik': new ol.layer.Tile({
				// source: new ol.source.TileDebug(),
				            source: new ol.source.XYZ({
								transition: 0,
				            	maxZoom: 19,
								url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
								attributions : ['&#169; ' +
								'<a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> ' +
								'contributors.']
				            }),
				            visible: true,
				            opacity: 0.7,
							crossOrigin: 'anonymous'
				          })
	}
	,
	
	overlayLayers : [
			//landuse/landcover
			new ol.layer.Tile({
				title: "OSM Landuse/Landcover",
				//opacity: 0.8,
				source: OSMLULC.lulcSource
			})
		,
		//invisible layer for raster pixel analysis
		new ol.layer.Image({
			className: 'stats-layer',
			title: "OSM Landuse/Landcover Stats",
			opacity: 0,
			source: OSMLULC.rasterSource
		})

	],
	
	overlays : [new ol.Overlay({element: document.getElementById('popup')})],
	
	center : ol.proj.transform([8.7,49.4], "EPSG:4326", "EPSG:3857"),
	
	projection: "EPSG:3857",
	
	zoom : 12,
	
	target: "map",
	
	controls : ol.control.defaults().extend([
		new ol.control.ScaleLine(),
		new ol.control.Control({
			element: linkControlEl
		})])
	
};
