(function () {
    window.sensorModules = window.sensorModules || {};
    window.sensorModules.Power = {
        init: function () {
            console.log('Power module initialized');
        },
        renderSensors: function (sensors, helpers) {
            return helpers.html.replace('{{sensorCards}}', helpers.renderSensorPanels('Power', sensors));
        }
    };
}());
