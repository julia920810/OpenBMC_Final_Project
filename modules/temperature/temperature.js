(function () {
    window.sensorModules = window.sensorModules || {};
    window.sensorModules.Temperature = {
        init: function () {
            console.log('Temperature module initialized');
        },
        renderSensors: function (sensors, helpers) {
            return helpers.html.replace('{{sensorCards}}', helpers.renderSensorPanels('Temperature', sensors));
        }
    };
}());
