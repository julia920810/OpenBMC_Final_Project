# OpenBMC Sensor Modules 模組化結構

## 目錄結構

```
modules/
├── airflow/
│   ├── airflow.html      # HTML 結構
│   ├── airflow.css       # 樣式
│   └── airflow.js        # 邏輯
├── temperature/
│   ├── temperature.html
│   ├── temperature.css
│   └── temperature.js
├── current/
│   ├── current.html
│   ├── current.css
│   └── current.js
├── power/
│   ├── power.html
│   ├── power.css
│   └── power.js
├── fan/
│   ├── fan.html
│   ├── fan.css
│   └── fan.js
└── voltage/
    ├── voltage.html
    ├── voltage.css
    └── voltage.js
```

## 使用方式

### 1. 在主 HTML 檔案中加載模組

在 `index.html` 的 `<head>` 中加載所有 CSS：
```html
<link rel="stylesheet" href="modules/airflow/airflow.css">
<link rel="stylesheet" href="modules/temperature/temperature.css">
<link rel="stylesheet" href="modules/current/current.css">
<link rel="stylesheet" href="modules/power/power.css">
<link rel="stylesheet" href="modules/fan/fan.css">
<link rel="stylesheet" href="modules/voltage/voltage.css">
```

### 2. 在感測器清單區域加載 HTML

在 `<div id="sensorList">` 中動態加載模組 HTML：
```javascript
// 使用 fetch 加載 HTML 內容
fetch('modules/airflow/airflow.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('sensorList').innerHTML += html;
    });
```

### 3. 加載所有 JavaScript 模組

在 HTML 末尾加載 JS：
```html
<script src="modules/airflow/airflow.js"></script>
<script src="modules/temperature/temperature.js"></script>
<script src="modules/current/current.js"></script>
<script src="modules/power/power.js"></script>
<script src="modules/fan/fan.js"></script>
<script src="modules/voltage/voltage.js"></script>
```

### 4. 初始化模組

在主 `app.js` 中初始化模組：
```javascript
// 初始化所有模組
airflowModule.init();
temperatureModule.init();
currentModule.init();
powerModule.init();
fanModule.init();
voltageModule.init();

// 渲染感測器
airflowModule.renderSensors(sensorsData.Airflow);
temperatureModule.renderSensors(sensorsData.Temperature);
currentModule.renderSensors(sensorsData.Current);
powerModule.renderSensors(sensorsData.Power);
fanModule.renderSensors(sensorsData.Fan);
voltageModule.renderSensors(sensorsData.Voltage);
```

## 修改指南

### 修改 Airflow 感測器樣式

編輯 `modules/airflow/airflow.css`：
```css
.airflow-item {
    /* 修改背景顏色、字體等 */
}
```

### 修改 Temperature 感測器邏輯

編輯 `modules/temperature/temperature.js`：
```javascript
const temperatureModule = {
    renderSensors: function(sensors) {
        // 自定義渲染邏輯
    }
};
```

### 修改感測器 HTML 結構

編輯對應的 `.html` 檔案，例如 `modules/voltage/voltage.html`

## 優點

✅ **易於維護** - 每個感測器有獨立的檔案
✅ **易於擴展** - 添加新的感測器類型只需複製一套檔案
✅ **代碼重用** - 模組可以在不同專案中使用
✅ **版本控制** - 清晰的提交歷史

## 下一步

1. 更新 `index.html` 以加載模組 CSS 和 JS
2. 修改 `js/app.js` 中的 `renderSensors()` 函數以使用模組系統
3. 使用動態加載或構建工具來自動化模組加載
