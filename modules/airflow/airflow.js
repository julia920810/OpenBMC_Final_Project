(function () {
    window.sensorModules = window.sensorModules || {};
    window.sensorModules.Airflow = {
        init: function () {
            console.log('Airflow module initialized');
        },
        renderSensors: function (sensors, helpers) {
            return helpers.html.replace('{{sensorCards}}', helpers.renderSensorPanels('Airflow', sensors));
        }
    };
}());
