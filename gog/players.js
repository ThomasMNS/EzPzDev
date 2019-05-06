var data;
var request = new XMLHttpRequest();
request.open('GET', 'https://thomasmns.000webhostapp.com/read.php');
request.onload = function () {
    data = JSON.parse(this.response);

    google.charts.load('current', {packages: ['corechart', 'controls']});
    google.charts.setOnLoadCallback(drawDashboard);
};
request.send();

function drawDashboard() {
    var dataArray = [[{label: 'Time', type: 'datetime'}, {label: 'Players', type: 'number'}]];
    for(var i in data) {
    var t = data[i]["timeinserted"].split(/[- :]/);
    dataArray.push([new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5])), parseInt(data[i]["numberplayers"])]);
    };
    var dataTable = google.visualization.arrayToDataTable(dataArray);

    var dashboard = new google.visualization.Dashboard(document.getElementById('playersDashboard'));

    var lineChart = new google.visualization.ChartWrapper({
    'chartType': 'LineChart',
    'containerId': 'playersChart', 
    'options': {
        'height': '250',
        'legend': {'position': 'none'},
        'chartArea': {'top': 20, 'height': '200'}
    }
    });

    var chartRangeFilter = new google.visualization.ControlWrapper({
    'controlType': 'ChartRangeFilter',
    'containerId': 'playersFilter',
    'options': {
        'filterColumnLabel': 'Time',
        'ui': {
        'chartOptions': {
            'height': '75',
            'hAxis': {format: 'dd/MM/yy'},
        }
        }
    },
    'state': {'range': {'start': new Date(new Date().setDate(new Date().getDate()-7))}}
    });

    dashboard.bind(chartRangeFilter, lineChart);

    dashboard.draw(dataTable);
};