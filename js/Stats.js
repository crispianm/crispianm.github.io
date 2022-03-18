OSMLULC.Stats = (function (w) {


    // var SERVICE_URL = "https://maps.heigit.org/osmlanduse/stats/";
    // var currentPieChartRequest;

    var chart = c3.generate({
        bindto: "#pie",
        data: {
            json: {'loading': 100},
            type: 'pie',
            colors: {
                urban_fabric: '#E6004D',
                forests: '#4DFF00',
                water_bodies: '#00CCF2',
                arable_land: '#FFFFA8',
                artif_non_agri_vegetated: '#FFA6FF',
                ind_com: '#CC4DF2',
                mine_dump_constr: '#A600CC',
                open_spaces_no_veg: '#E6E6E6',
                pastures: '#E6E64D',
                permanent_crops: '#E68000',
                scrub_herbs: '#CCF24D',
                wetlands: '#A6A6FF',
                coastal_wetlands: '#E6E6FF',
                other: '#C8C8C8',
                'unmapped area': '#FDFDFD'
            }
        },
        legend: {
            show: false
        },
        pie: {
            label: {
                //threshold: 0.0001,
                format: function (value, ratio, id) {
                    return d3.format('.2%')(ratio);
                }
            }
        },
        tooltip: {
            format: {
                value: function (value, ratio, id, index) {
                    return d3.format('.2%')(ratio);
                }
            }
        }

    });

    /**
     * Constructor
     */
    function Stats() {

    }

    // Stats.prototype.getServiceURL = function () {
    //     return SERVICE_URL;
    // };
    //
    //
    //
    // function pgToC3json(data) {
    //     var out = {
    //         forests: 0,
    //         urban_fabric: 0,
    //         artif_non_agri_vegetated: 0,
    //         arable_land: 0,
    //         water_bodies: 0,
    //         ind_com: 0,
    //         pastures: 0,
    //         scrub_herbs: 0,
    //         other: 0,
    //         mine_dump_constr: 0,
    //         open_spaces_no_veg: 0,
    //         permanent_crops: 0,
    //         wetlands: 0,
    //         coastal_wetlands: 0,
    //         'unmapped area': 0,
    //         loading: 0
    //     };
    //
    //
    //     data.forEach(function (e, i, a) {
    //
    //         out[e.class] = e.sum_area;
    //
    //     });
    //     console.log(out);
    //
    //     delete out.unmapped_area;
    //     delete out.other
    //
    //     return out;
    //
    // };
    //
    // function createC3PieChart(data) {
    //
    //     data = pgToC3json(data);
    //
    //     !!! chart.load({json:data});
    //
    // }
    //
    // function getPieChartBboxData(bbox, callback) {
    //     if (currentPieChartRequest) {
    //         currentPieChartRequest.abort();
    //     }
    //     currentPieChartRequest = $.getJSON(SERVICE_URL + "area-by-class-bbox/" + bbox, null, callback);
    //
    // }
    //
    // function updatePieChartBBox(bbox) {
    //     if ($('#pie').data('isActive')) {
    //         // getPieChartBboxData(bbox, createC3PieChart);
    //     }
    // };
let isActive = false;
    function activate() {
        if (!isActive) {
        OSMLULC.mapConfig.overlayLayers[1].setVisible(true);
        OSMLULC.rasterSource.on('afteroperations',this.onAfterOperations);
        isActive = true;
        }
    }

    function deactivate() {
        if(isActive) {
        OSMLULC.rasterSource.un('afteroperations',this.onAfterOperations);
        OSMLULC.mapConfig.overlayLayers[1].setVisible(false);
        isActive = false;
        }
    }

    function hidePieChartBBox() {
        $('#pie-parent').fadeOut();
        $('#pieicon').fadeOut();
        deactivate();
    }

    function showPieChartBBox() {

        $('#pieicon').fadeIn();
        if ($("#pie").data("isActive")) {
            $('#pie-parent').fadeIn();
            activate();
        }

    }

  this.onAfterOperations = function (event) {
            // console.log("raster AFTER", event);

            let buffer32 = new Uint32Array(event.data.mypixels.data.buffer);
            let bufferLength = buffer32.length;

            let out = {
                forests: 0,
                urban_fabric: 0,
                artif_non_agri_vegetated: 0,
                arable_land: 0,
                water_bodies: 0,
                ind_com: 0,
                pastures: 0,
                scrub_herbs: 0,
                other: 0,
                mine_dump_constr: 0,
                open_spaces_no_veg: 0,
                permanent_crops: 0,
                wetlands: 0,
                coastal_wetlands: 0,
                'unmapped area': 0,
                loading: 0
            };

            for (let i = 0; i < bufferLength; i++) {

                switch (buffer32[i]) {

                    case 0xff4d00e6:
                        out.urban_fabric++;
                        break;
                    case 0xffa8ffff:
                        out.arable_land++;
                        break;
                    case 0xff00ff4d:
                        out.forests++;
                        break;
                    case 0xfff24dcc:
                        out.ind_com++;
                        break;
                    case 0xffffa6ff:
                        out.artif_non_agri_vegetated++;
                        break;
                    case 0xffcc00a6:
                        out.mine_dump_constr++;
                        break;
                    case 0xff4de6e6:
                        out.pastures++;
                        break;
                    case 0xff0080e6:
                        out.permanent_crops++;
                        break;
                    case 0xfff2cc00:
                        out.water_bodies++;
                        break;
                    case 0xffe6e6e6:
                        out.open_spaces_no_veg++;
                        break;
                    case 0xff4df2cc:
                        out.scrub_herbs++;
                        break;
                    case 0xffffa6a6:
                        out.wetlands++;
                        break;
                    case 0xffffe6e6:
                        out.coastal_wetlands++;
                        break;
                    case 0xffffffff:
                        out["unmapped area"]++;
                        break;
                }

            }
            // console.log("counts", out);
            chart.load({json: out});
        }
    ;

    // Stats.prototype.updatePieChartBBox = updatePieChartBBox.bind(this);
    Stats.prototype.hidePieChartBBox = hidePieChartBBox.bind(this);
    Stats.prototype.showPieChartBBox = showPieChartBBox.bind(this);
    Stats.prototype.activate = activate.bind(this);
    Stats.prototype.deactivate = deactivate.bind(this);

    return new Stats();

})(window);
