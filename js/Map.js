OSMLULC.Map = function Map() {

    this.getOlOptions = function () {
        var mapConfig = OSMLULC.mapConfig;

        var baseLayerGroup = new ol.layer.Group();
        var baseLayerCollection = new ol.Collection();
        for (let layer in mapConfig.baseLayers) {
            mapConfig.baseLayers[layer].set('title', layer);
            baseLayerCollection.push(mapConfig.baseLayers[layer]);
        }
        baseLayerGroup.setLayers(baseLayerCollection);

        var overlayLayerGroup = new ol.layer.Group();
        var overlayLayerCollection = new ol.Collection();
        mapConfig.overlayLayers.forEach(function (e, i, a) {
            overlayLayerCollection.push(e);
        });
        overlayLayerGroup.setLayers(overlayLayerCollection);

        return {
            layers: [baseLayerGroup, overlayLayerGroup],
            maxTilesLoading: 48,
            view: new ol.View({
                zoom: mapConfig.zoom,
                center: mapConfig.center,
                projection: mapConfig.projection,
                maxZoom: 19
            }),
            target: mapConfig.target,
            overlays: mapConfig.overlays || [],
            controls: mapConfig.controls || ol.control.defaults()
        };

    };

    this.map = new ol.Map(this.getOlOptions());

    // indicate that the map is clickable
    this.map.getTargetElement().style.cursor = 'pointer';

    //GeoJSON reader/writer
    var geoJsonFormat = new ol.format.GeoJSON({
        defaultDataProjection: "EPSG:3857",
        featureProjection: "EPSG:3857",
        geometryName: "the_geom"
    });

    //Highlighting Layer
    var hlSource = new ol.source.Vector();
    var hlVector = new ol.layer.Vector({

        source: hlSource,
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.1)'
            }),
            stroke: new ol.style.Stroke({
                color: '#0000FF',
                width: 4
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: 'rgba(255,255,0,0.7)' //'#ffff00'
                }),
                stroke: new ol.style.Stroke({
                    color: '#333333',
                    width: 2
                })

            })
        })
    });

    this.highlightFeature = function (geojson) {

        this.map.addLayer(hlVector);

        var features = geoJsonFormat.readFeatures(geojson, {
            dataProjection: "EPSG:3857",
            featureProjection: "EPSG:3857"
        });

        hlSource.addFeatures(features);

    };

    this.clearHighlightLayer = function () {

        hlSource.clear(true);

        this.map.removeLayer(hlVector);

    };


    this.setFeatureInfoLoading = function (position) {
        var popup = this.map.getOverlays().item(0);
        var popupElement = popup.getElement();
        popupElement.className = "";
        var content = "<table><tr><th><div class='ui loader inline active inverted'></div></th></tr></table>";
        popupElement.innerHTML = content;
        //set position or undefined to hide
        popup.setPosition(position);
    };

    this.updateFeatureInfo = function (attributes, position) {
        var popup = this.map.getOverlays().item(0);
        var popupElement = popup.getElement();

        popupElement.className = (position != null) ? "loaded" : "";
        //create table
        var content = "<table>";

        for (let key in attributes) {

            var value = attributes[key];

            if (key === "osm id") {
                value = "<a class='external' href='http://www.openstreetmap.org/" + attributes["osm type"] + "/" + value + "' target='_blank'>" + value + "</a>";
            }

            if ((key === "source" || key === "url") && value.indexOf("http") === 0) {
                value = '<a class="external" href="' + value + '" target="_blank">' + value + '</a>';
            }

            if (key === "image" && value.indexOf("http") === 0) {
                if (decodeURIComponent(value).search("File:") !== -1) {
                    //value = '<a class="external" href="' + value + '" target="_blank">'+ value +'</a>';
                    //handle case later
                } else if (value.indexOf("Datei:") !== -1) {
                    value = '<a class="external" href="' + value + '" target="_blank">' + value + '</a>';
                } else if (value.indexOf("flickr") !== -1) {
                    value = '<a class="external" href="' + value + '" target="_blank">' + value + '</a>';
                } else {
                    value = '<a class="external" href="' + value + '" target="_blank"><img src="' + value + '" height="75"></a>';
                }

            }

            //in case of wikimedia commons images
            if (key === "image") {

                var imgTitleOriginal = value;
                value = decodeURIComponent(value);

                if (value.indexOf("File:") !== -1) {


                    var imgTitle = (value.indexOf("File:") === 0) ? value : value.match(/File:.+\.(jpg|png|gif|svg|jpeg|tif|tiff|pdf)/gi)[0];
                    imgTitle = encodeURIComponent(imgTitle);
                    var COMMONSDESCURLBASE = "https://commons.wikimedia.org/wiki/";
                    var COMMONSDESCURL = COMMONSDESCURLBASE + imgTitle;
                    value = '<a id="' + 'commonsLink' + '" class="external" href="' + COMMONSDESCURL + '" target="_blank">' + imgTitleOriginal + '</a>';
                }
            }


            if (/website/.test(key) && value.indexOf("http") === 0) {
                value = '<a class="external" href="' + value + '" target="_blank">' + value + '</a>';
                console.log("website", value);
            }
            if (key.indexOf("wikipedia") !== -1) {
                if (value.indexOf("http") === 0) {
                    value = '<a class="external" href="' + value + '" target="_blank">' + value + '</a>';
                } else {
                    //get language
                    var key_has_lang = /wikipedia:([a-z]{2})/.test(key);
                    var val_has_lang = /([a-z]{2}):.*/.test(value);

                    let lang;
                    if (key_has_lang) {
                        lang = key.match(/wikipedia:([a-z]{2})/)[1];
                    } else if (val_has_lang) {
                        lang = value.match(/([a-z]{2}):.*/)[1];
                    } else {
                        lang = "en";
                    }

                    value = '<a class="external" target="_blank" href="https://' + lang + '.wikipedia.org/wiki/' + encodeURIComponent(value) + '">' + value + '</a>';

                }

            }

            content += "<tr><th>" + key + "</th><td>" + value + "</td></tr>";
        }

        content += "</table>";

        popupElement.innerHTML = content;

        console.log("COMMONSDESCURL", COMMONSDESCURL);
        if (COMMONSDESCURL != undefined) {

            $.ajax({
                dataType: 'jsonp',
                headers: {'Api-User-Agent': 'OSMLULC/1.0'},
                url: "https://commons.wikimedia.org/w/api.php?format=json&action=query&prop=imageinfo&&iiprop=url&iiurlheight=75&titles=" + imgTitle,
                success: function (result) {

                    console.log(result);

                    function getImageInfo(wikimediaResult) {
                        var pages = wikimediaResult.query.pages;
                        for (let id in pages) {
                            return pages[id].imageinfo[0];
                        }
                    }

                    var imageinfo = getImageInfo(result);

                    $("#commonsLink").html("<img src='" + imageinfo.thumburl + "' height='75'></a>");


                }
            });

        }

        //set position or undefined to hide
        popup.setPosition(position);
    };


    var xmax = 20037508.342789244;
    var xmax2 = xmax * 2;
    this.normalizeX = function (x) {
        return (((x + xmax) % xmax2 + xmax2) % xmax2) - xmax;
    }; // mathematic modulo like in R, not % symetric modulo like in Java or Javascript

    this.getExtentLonLat = function () {
        var extent = this.map.getView().calculateExtent(this.map.getSize());

        extent = [ol.proj.toLonLat([extent[0], extent[1]]), ol.proj.toLonLat([extent[2], extent[3]])];

        return extent;
    };


    this.map.on('moveend', function (e){

        var extent = this.getExtentLonLat();

        var area = turf.area(turf.bboxPolygon(extent[0].concat(extent[1])));

        if (area > 2500000000 || area < 10) { //BUG: sometimes very low values are reported when zoomed completly out (whole world)
            console.log("Requested AREA too large: area bigger than 2.500.000.000 sqm (e.g. 50 km x 50 km)");
            OSMLULC.Stats.hidePieChartBBox();
            return;
        }

        OSMLULC.Stats.showPieChartBBox();

        $('#viewport-area').html((area > 100000) ? (area / 1000000).toFixed(2) + ' km²' : area.toFixed(2) + ' m²');

    }.bind(this));


     this.map.on('singleclick', function (evt) {
        this.updateFeatureInfo({}, undefined);
        this.clearHighlightLayer();
        var viewResolution = /** @type {number} */ (this.map.getView().getResolution());
        var url = OSMLULC.mapConfig.overlayLayers[0].getSource().getFeatureInfoUrl(
            [this.normalizeX(evt.coordinate[0]), evt.coordinate[1]], viewResolution, 'EPSG:3857',
            {
                'INFO_FORMAT': 'application/json',
                'BUFFER': '0',
                'FEATURE_COUNT': '1',
                'QUERY_LAYERS': 'osmlanduse:osm_lulc'
            });
        if (url) {
            this.setFeatureInfoLoading(evt.coordinate);
            $.getJSON(url, null, function (data) {

                if (data.features && data.features.length > 0) {
                    var osm_id = data.features[0].properties.osm_id;
                    var name = data.features[0].properties.name;
                    var type = data.features[0].properties.type;
                    var geomType = data.features[0].geometry.type;
                    //var hasInnerRings = (geomType == 'Polygon' && (data.features[0].geometry.coordinates.length > 1) );
                    geomType = (osm_id < 0) ? 'PolygonWithInnerRings' : geomType;

                    var feature_geom = geoJsonFormat.readFeature(data.features[0], {
                        dataProjection: "EPSG:3857",
                        featureProjection: "EPSG:3857"
                    }).clone();

                    feature_geom = feature_geom.getGeometry().transform("EPSG:3857", "EPSG:4326");

                    const feature_ = new ol.Feature({geometry: feature_geom});

                    const feature = geoJsonFormat.writeFeature(feature_, {
                        dataProjection: "EPSG:4326",
                        featureProjection: "EPSG:4326"
                    });


                    var polygonArea = (geomType.indexOf('Polygon', 0) !== -1) ? turf.area(JSON.parse(feature)).toFixed(2) + " m²" : "-";

                    var OSMTYPE = {
                        'Point': 'node',
                        'LineString': 'way',
                        'MultiPolygon': 'way',
                        'PolygonWithInnerRings': 'relation'
                    };
                    var tags = {};
                    tags["osm id"] = Math.abs(osm_id);
                    tags["name"] = name;
                    tags["type"] = type;
                    tags["osm type"] = OSMTYPE[geomType];
                    tags["geom type"] = geomType;
                    tags["area"] = polygonArea;
                    console.log("6");
                    this.updateFeatureInfo(tags, evt.coordinate);
                    this.highlightFeature(data.features[0]);

                } else {
                    this.updateFeatureInfo({}, undefined);
                    this.clearHighlightLayer();
                }

            }.bind(this));
        }
    }.bind(this));

    var closePopoupHandler = function (event) {
        // if clicked on a child that is a link, do not close popup
        if (event.target.tagName === "A") return;

        OSMLULC.Controller.map.updateFeatureInfo({}, undefined);
        OSMLULC.Controller.map.clearHighlightLayer();
    };

    $('#popup').on('click', closePopoupHandler);
    $('#popup').on('touchstart', closePopoupHandler);


    OSMLULC.mapConfig.overlayLayers[0].on('prerender', function (event) {
        var ctx = event.context;

        if (ctx) {
            ctx.save();
            ctx.globalCompositeOperation = 'multiply';
        }
    }.bind(this));

    OSMLULC.mapConfig.overlayLayers[0].on('postrender', function (event) {
        var ctx = event.context;
        if (ctx) ctx.restore();
    }.bind(this));


    //make layer grey
    OSMLULC.mapConfig.baseLayers['OSM Mapnik'].on('postrender', function (event) {

        var ctx = event.context;
        var pixelRatio = event.frameState.pixelRatio;

        if (ctx) {
            var size = this.map.getSize();
            ctx.save();
            ctx.globalCompositeOperation = 'color';
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, size[0] * pixelRatio, size[1] * pixelRatio);
            ctx.restore();
        }

    }.bind(this));


};
