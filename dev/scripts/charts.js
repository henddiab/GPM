
    ////////////////////////////////////////////////////////////////////////////////
    Highcharts.setOptions({
        chart: {
            borderWidth: 0,
            backgroundColor: 'transparent',
            style: {
                //direction: 'rtl',
                fontFamily: 'DIN Next LT Arabic'
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        exporting: {
            enabled: false
        },
        colors: ['#46d1c2', '#feb37a', '#fe7975', '#46D1C1', '#FF7C5C', '#FFE597', '#DF6727', '#662640', '#c0c0c0'],
        mapNavigation: {
            enabled: false
        },
        navigation: {
            buttonOptions: {
                //x: -540
            }
        },
        plotOptions: {
            pie: {
                showInLegend: true,
                useHTML: true,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    useHTML: true,
                    style: {
                        color: '#FFFFFF',
                        fill: '#B2B2B2'
                    },
                    className: 'drilldown-link'
                    //format: '{point.y:.1f}%'
                }
            },
            useHTML: true,
            series: {
                borderColor: '#FFFFFF',
                marker: {
                    enabled: false
                },
                nullColor: '#eee',
                borderWidth: 2,
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                }
            }
        },
        lang: {
            drillUpText: 'رجوع',
            downloadJPEG: "JPEG تحميل صورة",
            downloadPDF: "PDF تحميل صورة",
            downloadPNG: "PNG تحميل صورة",
            downloadSVG: "SVF تحميل صورة",
            printChart: "طباعة صورة",
            viewFullscreen: "عرض شاشة كبيرة",
            months: ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونيو', 'يوليو',
                'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'
            ],
            weekdays: ["الاحد", "الاثنين", "الثلاثاء", "الاربعاء", "الخميس", "الجمعة", "السبت"],
            loading: "جاري التحميل",
            noData: "لا يوجد بيانات"
        }
    });


    (function (H) {
        //DATALABELS
        H.wrap(H.Series.prototype, 'drawDataLabels', function (proceed) {
            var css = this.chart.options.drilldown.activeDataLabelStyle;
            proceed.call(this);

            css.textDecoration = 'none';
            css.fontWeight = 'normal';
            css.color = '#B2B2B2';

            H.each(this.points, function (point) {

                if (point.dataLabel) { // <-- remove 'point.drilldown &&' 
                    point.dataLabel
                        .css(css)
                        .on('click', function () {
                            return false;
                        });
                }
            });
        });
    })(Highcharts);



    //////////////////////////////////////// report charts ////////////////////////////////////////
    if ($('#report1').length) {
        Highcharts.chart('report1', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: ''
            },
            legend: {
                enabled: true
            },
            tooltip: {
                pointFormat: ''
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    colors: ['#1ABBAD', '#A7D4F8', '#5BB1F8', '#9B5ADC'],
                    dataLabels: {
                        enabled: true,
                        format: '{point.percentage:.1f} %',
                        distance: -50,
                        filter: {
                            property: 'percentage',
                            operator: '>',
                            value: 4
                        },
                        showInLegend: true
                    }
                }
            },
            series: [{
                data: $('#report1').data('chart')
            }]
        });
    }

    if ($('#report2').length) {
        Highcharts.chart('report2', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['لجان وزارية', 'لجان مجالس', 'لجان خبراء', 'أخري']
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: ( // theme
                            Highcharts.defaultOptions.title.style &&
                            Highcharts.defaultOptions.title.style.color
                        ) || 'gray'
                    }
                }
            },
            legend: {
                enabled: true
            },
            tooltip: {
                headerFormat: '',
                pointFormat: '<br/>{series.name}: {point.y}<br/>'
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            series: $('#report2').data('chart')
        });
    }

    if ($('#reports3').length) {
        Highcharts.chart('reports3', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}:</td>' +
                    '<td style="color:{series.color};padding:0"><b>{point.y:.1f}%</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: $('#reports3').data('chart')
        });
    }

    if ($('#taklf-source').length) {
        Highcharts.chart('taklf-source', {
            chart: {
                type: 'column',
                plotShadow: false
            },
            xAxis: {
                tickInterval: 1,
                labels: {
                    enabled: true,
                    formatter: function () {
                        var data = $('#taklf-source').data('chart')
                        var categories = [];
                        if (data[this.value]['name'] === 'True') {
                            categories.push('داخلي')
                        } else {
                            categories.push('خارجي')
                        }
                        return categories
                    },
                }
            },
            yAxis: {
                title: true,
                gridLineWidth: 0
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        formatter: function () {
                            return this.point.name
                        }
                    }
                },
                series: {
                    data: $('#taklf-source').data('chart'),
                    borderWidth: 0,
                    dataLabels: {
                        style: {
                            textShadow: false,
                            textOutline: false
                        },
                        enabled: true,
                        formatter: function () {
                            return this.point.y
                        }
                    }
                }
            },
            tooltip: {
                enabled: false,
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'التكليفات حسب المصدر',
                colorByPoint: true
            }]
        })
    }

    if ($('#taklf-status-chart').length) {
        Highcharts.chart('taklf-status-chart', {
            chart: {
                type: 'pie',
                plotShadow: false
            },
            plotOptions: {
                pie: {
                    showInLegend: true,
                    center: ['50%', '50%'],
                    colorByPoint: true,
                    allowPointSelect: true,
                    cursor: 'pointer',
                    //data: $('#container_one').data('chart'),
                    dataLabels: {
                        formatter: function () {
                            return this.point.name + ' : ' + this.point.y
                        }
                    },
                    size: 130
                }
            },
            tooltip: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    return '<span>' + this.point.name + '</span>:' + this.point.y
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'حالة التكليفات',
                colorByPoint: true,
                data: $('#taklf-status-chart').data('chart'),
                useHTML: true,
                formatter: function () {
                    return '<div>' + this.point.name + ':<b>' + this.y + '</b></div>'
                }
            }]
        })
    }

    if ($('#taklf-monster-chart').length) {
        Highcharts.chart('taklf-monster-chart', {
            chart: {
                type: 'pie',
                plotShadow: false
            },
            plotOptions: {
                pie: {
                    showInLegend: true,
                    center: ['50%', '50%'],
                    colorByPoint: true,
                    allowPointSelect: true,
                    innerSize: '70%',
                    cursor: 'pointer',
                    //data: $('#container_one').data('chart'),
                    dataLabels: {
                        //format: '{point.y:.1f}%'
                        formatter: function () {
                            return this.point.name + ' : ' + this.point.y
                        }
                    },
                    size: 130
                }
            },
            tooltip: {
                enabled: true,
                useHTML: true,
                formatter: function () {
                    return '<span>' + this.point.name + '</span>:' + this.point.y
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'حالة التكليفات',
                colorByPoint: true,
                data: $('#taklf-monster-chart').data('chart'),
                useHTML: true,
                formatter: function () {
                    return '<div>' + this.point.name + ':<b>' + this.y + '</b></div>'
                }
            }]
        })
    }

    if ($('#taklf-mahafez-chart').length) {
        Highcharts.chart('taklf-mahafez-chart', {
            chart: {
                type: 'column',
                backgroundColor: 'transparent'
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: false,
                gridLineWidth: 0
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                column: {
                    zones: [{
                        value: 4, // Values up to 4 (not including) ...
                        color: '#A4A4A4' // ... have the color blue.
                    }, {
                        value: 9,
                        color: '#1F78B4' // Values from 10 (including) and up have the color red
                    }, {
                        value: 10,
                        color: '#1CA0B0' // Values from 10 (including) and up have the color red
                    }, {
                        color: '#0F7267' // Values from 10 (including) and up have the color red
                    }]
                },
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        style: {
                            textShadow: false,
                            textOutline: false
                        },
                        enabled: true,
                        formatter: function () {
                            return this.point.y
                        }
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    return [
                        '<div>',
                        '<div><span style="color:' + this.point.color + '">' + this.point.name + '</span></div><br />',
                        '<div style="float:right;display:flex;"><span>بنسبة</span><span>' + this.point.y + '%</span><span> من المجموع الكلي </span></div>',
                        '</div>'
                    ].join("");
                },
                // headerFormat: '<span style="font-size:11px;">&nbsp;</span><br>',
                // pointFormat: '<div><span style="color:{point.color}">{point.name}</span> <div><b>{point.y:.2f}%</b> of total</div></div>'
            },
            series: [{
                colorByPoint: true,
                data: $('#taklf-mahafez-chart').data('chart')
            }],
        });
    }