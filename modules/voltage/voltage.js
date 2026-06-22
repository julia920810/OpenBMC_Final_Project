(function () {
    window.sensorModules = window.sensorModules || {};
    window.sensorModules.Voltage = {
        init: function () {
            console.log('Voltage module initialized');
        },
        renderSensors: function (sensors, helpers) {
            return helpers.html.replace('{{sensorCards}}', helpers.renderSensorPanels('Voltage', sensors));
        }
    };
}());
