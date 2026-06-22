const DASHBOARD_CATEGORIES = ['Temperature', 'Airflow', 'Power', 'Voltage'];
const EVENT_WINDOW_US = 3_000_000;
const MIN_REPLAY_DELAY_MS = 300;
const HISTORY_STORAGE_KEY = 'openbmc.rootCauseHistory.v1';

const sensorFiles = [
    { category: 'airflow', sensorName: 'SYSTEM_AIRFLOW_CFM', path: 'statistics_test/airflow/anomaly_airflow-SYSTEM_AIRFLOW_CFM.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD0_FAN0_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD0_FAN0_48V_PWR_W.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD0_FAN1_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD0_FAN1_48V_PWR_W.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD0_FAN4_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD0_FAN4_48V_PWR_W.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD0_FAN5_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD0_FAN5_48V_PWR_W.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD0_FAN8_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD0_FAN8_48V_PWR_W.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD0_FAN9_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD0_FAN9_48V_PWR_W.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD1_FAN11_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD1_FAN11_48V_PWR_W.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD1_FAN2_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD1_FAN2_48V_PWR_W.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD1_FAN3_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD1_FAN3_48V_PWR_W.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD1_FAN6_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD1_FAN6_48V_PWR_W.csv' },
    { category: 'power', sensorName: 'VIRTUAL_FANBOARD1_FAN7_48V_PWR_W', path: 'statistics_test/power/anomaly_power-VIRTUAL_FANBOARD1_FAN7_48V_PWR_W.csv' },
    { category: 'temperature', sensorName: 'MGNT_TEMP_C', path: 'statistics_test/temperature/anomaly_temperature-MGNT_TEMP_C.csv' },
    { category: 'voltage', sensorName: 'FANBOARD0_ADC_48V_AUX_VOLT_V', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD0_ADC_48V_AUX_VOLT_V.csv' },
    { category: 'voltage', sensorName: 'FANBOARD0_ADC_FAN0_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD0_ADC_FAN0_48V_CURR_A.csv' },
    { category: 'voltage', sensorName: 'FANBOARD0_ADC_FAN1_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD0_ADC_FAN1_48V_CURR_A.csv' },
    { category: 'voltage', sensorName: 'FANBOARD0_ADC_FAN4_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD0_ADC_FAN4_48V_CURR_A.csv' },
    { category: 'voltage', sensorName: 'FANBOARD0_ADC_FAN5_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD0_ADC_FAN5_48V_CURR_A.csv' },
    { category: 'voltage', sensorName: 'FANBOARD0_ADC_FAN8_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD0_ADC_FAN8_48V_CURR_A.csv' },
    { category: 'voltage', sensorName: 'FANBOARD0_ADC_FAN9_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD0_ADC_FAN9_48V_CURR_A.csv' },
    { category: 'voltage', sensorName: 'FANBOARD1_ADC_48V_AUX_VOLT_V', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD1_ADC_48V_AUX_VOLT_V.csv' },
    { category: 'voltage', sensorName: 'FANBOARD1_ADC_FAN11_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD1_ADC_FAN11_48V_CURR_A.csv' },
    { category: 'voltage', sensorName: 'FANBOARD1_ADC_FAN2_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD1_ADC_FAN2_48V_CURR_A.csv' },
    { category: 'voltage', sensorName: 'FANBOARD1_ADC_FAN3_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD1_ADC_FAN3_48V_CURR_A.csv' },
    { category: 'voltage', sensorName: 'FANBOARD1_ADC_FAN6_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD1_ADC_FAN6_48V_CURR_A.csv' },
    { category: 'voltage', sensorName: 'FANBOARD1_ADC_FAN7_48V_CURR_A', path: 'statistics_test/voltage/anomaly_voltage-FANBOARD1_ADC_FAN7_48V_CURR_A.csv' }
];

const modulePaths = {
    Airflow: 'modules/airflow/airflow.html',
    Temperature: 'modules/temperature/temperature.html',
    Power: 'modules/power/power.html',
    Voltage: 'modules/voltage/voltage.html'
};

const sensorSeriesByCategory = { Temperature: [], Airflow: [], Power: [], Voltage: [] };
const moduleCache = {};
const sensorModules = window.sensorModules || {};
let sensorsData = { Temperature: [], Airflow: [], Power: [], Voltage: [] };
let activeCategory = null;
let dataLoaded = false;
let rootCauseHistory = [];
let taipeiTimeText = '';

const replay = {
    speed: 1,
    timeline: [],
    index: 0,
    timer: null,
    currentTimeUs: null
};

const els = {
    homeView: document.getElementById('homeView'),
    categoryView: document.getElementById('categoryView'),
    temperatureBaselineView: document.getElementById('temperatureBaselineView'),
    categoryTitle: document.getElementById('categoryTitle'),
    sensorList: document.getElementById('sensorList'),
    backBtn: document.getElementById('backBtn'),
    categoryBtns: document.querySelectorAll('.category-btn'),
    totalSensors: document.getElementById('totalSensors'),
    activeSensors: document.getElementById('activeSensors'),
    lastUpdate: document.getElementById('lastUpdate'),
    rootCausePanel: document.getElementById('rootCausePanel')
};

function normalizeCategory(category) {
    const value = String(category || '').trim().toLowerCase();
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalizeLevel(level) {
    return String(level || 'normal').trim().toLowerCase();
}

function displayLevel(level) {
    const normalized = normalizeLevel(level);
    if (normalized === 'low') return 'LOW';
    if (normalized === 'high') return 'HIGH';
    return 'NORMAL';
}

function levelClass(level) {
    return normalizeLevel(level);
}

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day} ${date.toLocaleTimeString('zh-TW')}`;
}

function formatTaipeiNow() {
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Taipei',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).formatToParts(new Date()).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
    }, {});
    return `Taipei Time: ${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
}

function updateTaipeiTime() {
    taipeiTimeText = formatTaipeiNow();
    document.querySelectorAll('.taipei-time-value').forEach(element => {
        element.textContent = taipeiTimeText;
    });
    if (els.lastUpdate) {
        els.lastUpdate.textContent = taipeiTimeText;
    }
}

function timestampToLabel(timestampUs) {
    const numeric = Number(timestampUs);
    if (!Number.isFinite(numeric)) return '-';
    const date = new Date(numeric / 1000);
    if (Number.isNaN(date.getTime())) return String(timestampUs);
    const parts = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'Asia/Taipei',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).formatToParts(date).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`;
}

function registerSensorModule(name, module) {
    sensorModules[name] = module;
    window.sensorModules = sensorModules;
}

function loadRootCauseHistory() {
    try {
        const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
        const parsed = stored ? JSON.parse(stored) : [];
        rootCauseHistory = Array.isArray(parsed)
            ? parsed.map(item => ({
                ...item,
                time: item.time,
                anomalyLevel: String(item.anomalyLevel || '')
                    .split(',')
                    .map(level => displayLevel(level))
                    .join(', ')
            }))
            : [];
        saveRootCauseHistory();
    } catch (error) {
        console.warn('Unable to read root cause history from localStorage:', error);
        rootCauseHistory = [];
    }
}

function saveRootCauseHistory() {
    try {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(rootCauseHistory));
    } catch (error) {
        console.warn('Unable to save root cause history to localStorage:', error);
    }
}

function clearRootCauseHistory() {
    rootCauseHistory = [];
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    renderRootCauseAnalysis({ skipRecord: true });
}

async function loadModuleHtml(category) {
    if (!moduleCache[category]) {
        const response = await fetch(modulePaths[category]);
        if (!response.ok) throw new Error(`Cannot load ${category} module HTML: ${response.status}`);
        moduleCache[category] = await response.text();
    }
    return moduleCache[category];
}

function parseCsv(text) {
    const rows = [];
    let field = '';
    let row = [];
    let inQuotes = false;

    for (let i = 0; i < text.length; i += 1) {
        const char = text[i];
        const next = text[i + 1];
        if (char === '"') {
            if (inQuotes && next === '"') {
                field += '"';
                i += 1;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            row.push(field);
            field = '';
        } else if ((char === '\n' || char === '\r') && !inQuotes) {
            if (char === '\r' && next === '\n') i += 1;
            row.push(field);
            if (row.some(cell => cell !== '')) rows.push(row);
            row = [];
            field = '';
        } else {
            field += char;
        }
    }

    if (field || row.length) {
        row.push(field);
        rows.push(row);
    }

    const headers = rows.shift() || [];
    return rows.map(values => headers.reduce((record, header, index) => {
        record[header] = values[index] || '';
        return record;
    }, {}));
}

function toPoint(record, file) {
    const anomalyLevel = displayLevel(record.anomaly_level);
    const level = normalizeLevel(anomalyLevel);
    const timestampRealtime = Number(record['timestamp-realtime'] || record.timestamp_realtime || record.timestamp);
    return {
        category: normalizeCategory(record.sensor_type || file.category),
        sensorName: record.sensor_name || file.sensorName,
        timestampRealtime,
        value: Number(record.value),
        lowerBound: Number(record.iqr_lower_bound),
        upperBound: Number(record.iqr_upper_bound),
        anomalyLevel,
        isAnomaly: level !== 'normal'
    };
}

async function loadSensorSeries() {
    await Promise.all(sensorFiles.map(async file => {
        const category = normalizeCategory(file.category);
        const response = await fetch(file.path);
        if (!response.ok) throw new Error(`Cannot load ${file.path}: ${response.status}`);
        const records = parseCsv(await response.text())
            .map(record => toPoint(record, file))
            .filter(point => Number.isFinite(point.timestampRealtime) && Number.isFinite(point.value))
            .sort((a, b) => a.timestampRealtime - b.timestampRealtime);

        if (records.length) {
            sensorSeriesByCategory[category].push({
                category,
                sensorName: file.sensorName,
                path: file.path,
                records,
                currentIndex: 0
            });
        }
    }));

    replay.timeline = [...new Set(Object.values(sensorSeriesByCategory)
        .flat()
        .flatMap(series => series.records.map(record => record.timestampRealtime)))]
        .sort((a, b) => a - b);

    dataLoaded = true;
    if (replay.timeline.length) setReplayTime(replay.timeline[0]);
}

function inferUnit(sensorName, category) {
    if (sensorName.endsWith('_V') || category === 'Voltage') return 'V';
    if (sensorName.endsWith('_A')) return 'A';
    if (sensorName.endsWith('_W') || category === 'Power') return 'W';
    if (sensorName.includes('TEMP')) return 'C';
    if (sensorName.includes('AIRFLOW')) return 'CFM';
    return '';
}

function currentPointForSeries(series) {
    return series.records[series.currentIndex] || series.records[0];
}

function indexAtOrBefore(records, timeUs) {
    let low = 0;
    let high = records.length - 1;
    let result = 0;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (records[mid].timestampRealtime <= timeUs) {
            result = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return result;
}

function setReplayTime(timeUs) {
    replay.currentTimeUs = timeUs;
    Object.values(sensorSeriesByCategory).flat().forEach(series => {
        series.currentIndex = indexAtOrBefore(series.records, timeUs);
    });
    sensorsData = buildSensorsData();
    updateStatistics();
    renderRootCauseAnalysis();
    if (activeCategory) renderActiveCategory();
}

function buildSensorsData() {
    const output = { Temperature: [], Airflow: [], Power: [], Voltage: [] };
    DASHBOARD_CATEGORIES.forEach(category => {
        output[category] = sensorSeriesByCategory[category].map(series => {
            const current = currentPointForSeries(series);
            return {
                id: series.sensorName,
                name: series.sensorName,
                sensorName: series.sensorName,
                unit: inferUnit(series.sensorName, category),
                value: Number(current.value.toFixed(3)),
                lowerBound: current.lowerBound,
                upperBound: current.upperBound,
                anomalyLevel: current.anomalyLevel,
                status: current.isAnomaly ? 'warning' : 'normal',
                category
            };
        });
    });
    return output;
}

function startReplay() {
    if (!replay.timeline.length) return;
    clearTimeout(replay.timer);
    const current = replay.timeline[replay.index];
    const nextIndex = (replay.index + 1) % replay.timeline.length;
    const next = replay.timeline[nextIndex];
    const rawDiffUs = nextIndex === 0
        ? replay.timeline[1] - replay.timeline[0]
        : next - current;
    const safeDiffUs = Number.isFinite(rawDiffUs) && rawDiffUs > 0 ? rawDiffUs : MIN_REPLAY_DELAY_MS * 1000;
    const delayMs = Math.max(MIN_REPLAY_DELAY_MS, safeDiffUs / 1000 / replay.speed);

    replay.timer = setTimeout(() => {
        replay.index = nextIndex;
        setReplayTime(replay.timeline[replay.index]);
        startReplay();
    }, delayMs);
}

function createSensorCard(sensor, categoryClass) {
    const level = levelClass(sensor.anomalyLevel);
    const shownLevel = displayLevel(sensor.anomalyLevel);
    return `
        <div class="sensor-card ${categoryClass}-item anomaly-${level}">
            <div class="sensor-name">
                <span class="sensor-status ${level}"></span>
                ${escapeHtml(sensor.sensorName)}
            </div>
            <div class="sensor-details">
                <div class="sensor-detail"><span class="detail-label">Sensor Name</span><span class="detail-value sensor-name-value">${escapeHtml(sensor.sensorName)}</span></div>
                <div class="sensor-detail"><span class="detail-label">Current Value</span><span class="detail-value ${level}">${escapeHtml(sensor.value)} ${escapeHtml(sensor.unit)}</span></div>
                <div class="sensor-detail"><span class="detail-label">anomaly_level</span><span class="anomaly-pill ${level}">${escapeHtml(shownLevel)}</span></div>
                <div class="sensor-detail"><span class="detail-label">Taipei Time</span><span class="detail-value compact taipei-time-value">${escapeHtml(taipeiTimeText)}</span></div>
            </div>
        </div>
    `;
}

function chartIdFor(category, sensorName) {
    return `chart-${category}-${sensorName}`.replace(/[^a-z0-9_-]/gi, '-');
}

function renderSensorChartCard(category, series) {
    const current = currentPointForSeries(series);
    const level = levelClass(current.anomalyLevel);
    const title = `${category} - ${series.sensorName}`;
    return `
        <article class="chart-card">
            <div class="chart-card-header">
                <h3>${escapeHtml(title)}</h3>
                <span class="anomaly-pill ${escapeHtml(level)}">${escapeHtml(displayLevel(current.anomalyLevel))}</span>
            </div>
            <canvas id="${escapeHtml(chartIdFor(category, series.sensorName))}" class="sensor-chart" height="360" aria-label="${escapeHtml(title)} line chart"></canvas>
            <div class="axis-label x-axis-label">X-axis: Current Taipei Time</div>
            <div class="axis-label y-axis-label">Y-axis: Sensor Value</div>
            <p class="chart-axis-note">X-axis: current Taipei time, representing the dashboard display time. Y-axis: value, representing the sensor reading.</p>
            <div class="chart-legend">
                <span><i class="legend-line value-line"></i>value</span>
                <span><i class="legend-line lower-line"></i>iqr_lower_bound</span>
                <span><i class="legend-line upper-line"></i>iqr_upper_bound</span>
                <span><i class="legend-dot low-dot"></i>low/high anomaly</span>
            </div>
        </article>
    `;
}

function renderSensorPanels(category, sensors) {
    const seriesList = sensorSeriesByCategory[category] || [];
    if (!sensors.length) return renderEmptyState();
    return sensors.map(sensor => {
        const series = seriesList.find(item => item.sensorName === sensor.sensorName);
        return `
            <section class="sensor-panel">
                ${createSensorCard(sensor, category.toLowerCase())}
                ${series ? renderSensorChartCard(category, series) : ''}
            </section>
        `;
    }).join('');
}

function renderEmptyState() {
    return '<div class="empty-state"><div class="empty-state-text">No sensor data loaded.</div></div>';
}

async function showCategoryView(category) {
    activeCategory = category;
    els.homeView.classList.remove('active');
    els.categoryView.classList.add('active');
    els.temperatureBaselineView.classList.remove('active');
    await renderActiveCategory();
}

async function renderActiveCategory() {
    if (!activeCategory) return;
    els.categoryTitle.textContent = `${activeCategory} Sensors`;
    const html = await loadModuleHtml(activeCategory);
    const module = sensorModules[activeCategory];
    els.sensorList.innerHTML = module.renderSensors(sensorsData[activeCategory] || [], {
        html,
        renderSensorPanels,
        renderEmptyState,
        escapeHtml,
        category: activeCategory
    });
    requestAnimationFrame(() => drawSensorCharts(activeCategory));
}

function showHomeView() {
    activeCategory = null;
    els.homeView.classList.add('active');
    els.categoryView.classList.remove('active');
    els.temperatureBaselineView.classList.remove('active');
    renderRootCauseAnalysis();
}

function drawSensorCharts(category) {
    (sensorSeriesByCategory[category] || []).forEach(series => {
        const canvas = document.getElementById(chartIdFor(category, series.sensorName));
        if (canvas) drawLineChart(canvas, series);
    });
}

function drawLineChart(canvas, series) {
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;
    const cssHeight = 360;
    canvas.width = Math.max(760, rect.width * ratio);
    canvas.height = cssHeight * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const width = canvas.width / ratio;
    const height = canvas.height / ratio;
    const padding = { top: 18, right: 18, bottom: 58, left: 64 };
    const end = series.currentIndex + 1;
    const records = series.records.slice(Math.max(0, end - 180), end);
    const values = records.flatMap(record => [record.value, record.lowerBound, record.upperBound].filter(Number.isFinite));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max === min ? 1 : max - min;
    const xFor = index => padding.left + (index / Math.max(records.length - 1, 1)) * (width - padding.left - padding.right);
    const yFor = value => padding.top + (1 - ((value - min) / range)) * (height - padding.top - padding.bottom);

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#e5e7eb';
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Segoe UI, sans-serif';

    for (let i = 0; i <= 4; i += 1) {
        const value = min + (range * i / 4);
        const y = yFor(value);
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        ctx.fillText(value.toFixed(2), 10, y + 4);
    }

    drawSeriesLine(ctx, records, xFor, yFor, 'value', '#2563eb', false);
    drawSeriesLine(ctx, records, xFor, yFor, 'lowerBound', '#f59e0b', true);
    drawSeriesLine(ctx, records, xFor, yFor, 'upperBound', '#ef4444', true);

    records.forEach((record, index) => {
        if (record.isAnomaly) {
            ctx.beginPath();
            ctx.fillStyle = levelClass(record.anomalyLevel) === 'high' ? '#dc2626' : '#f59e0b';
            ctx.arc(xFor(index), yFor(record.value), 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
        }
    });

    ctx.fillStyle = '#334155';
    ctx.font = '12px Segoe UI, sans-serif';
    ctx.fillText('Current Taipei Time', width / 2 - 58, height - 16);
    ctx.save();
    ctx.translate(18, height / 2 + 42);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Sensor Value', 0, 0);
    ctx.restore();
    if (records.length) {
        const firstLabel = taipeiTimeText.replace('Taipei Time: ', '');
        const lastLabel = taipeiTimeText.replace('Taipei Time: ', '');
        ctx.fillText(firstLabel, padding.left, height - 38);
        ctx.fillText(lastLabel, width - padding.right - ctx.measureText(lastLabel).width, height - 38);
    }
}

function drawSeriesLine(ctx, records, xFor, yFor, field, color, dashed) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = field === 'value' ? 2.5 : 1.5;
    ctx.setLineDash(dashed ? [6, 4] : []);
    let started = false;
    records.forEach((record, index) => {
        const value = record[field];
        if (!Number.isFinite(value)) return;
        if (!started) {
            ctx.moveTo(xFor(index), yFor(value));
            started = true;
        } else {
            ctx.lineTo(xFor(index), yFor(value));
        }
    });
    ctx.stroke();
    ctx.setLineDash([]);
}

function getEventAbnormalSensors() {
    if (!Number.isFinite(replay.currentTimeUs)) return [];
    return Object.entries(sensorSeriesByCategory).flatMap(([category, seriesList]) => {
        return seriesList.flatMap(series => {
            return series.records
                .filter(record => record.isAnomaly && Math.abs(record.timestampRealtime - replay.currentTimeUs) <= EVENT_WINDOW_US)
                .map(record => ({ category, series, current: record }));
        });
    });
}

function evaluateRootCause() {
    const abnormalSensors = mergeAbnormalSensors(getEventAbnormalSensors());
    const abnormalCategories = [...new Set(abnormalSensors.map(item => item.category.toLowerCase()))];
    const has = category => abnormalCategories.includes(category);
    let result;

    if (!abnormalSensors.length) {
        result = { systemStatus: 'Normal', triggeredRule: 'No anomaly detected', rootCause: 'No anomaly detected', reason: 'No warning event within +/- 3 seconds of the current replay time.', recommendedAction: 'No action required.' };
    } else if (abnormalCategories.length > 2) {
        result = { systemStatus: 'Warning', triggeredRule: 'Rule 8', rootCause: 'Multi-Sensor System Anomaly', reason: 'Multiple sensor categories are abnormal in the same +/- 3 second event window.', recommendedAction: 'Check BMC logs, PSU status, thermal policy, and system event logs.' };
    } else if (has('temperature') && has('airflow')) {
        result = { systemStatus: 'Warning', triggeredRule: 'Rule 1', rootCause: 'Cooling Issue Detected', reason: 'Temperature and airflow are abnormal in the same event window.', recommendedAction: 'Check airflow path, fan operation, and chassis ventilation.' };
    } else if (has('temperature') && has('power')) {
        result = { systemStatus: 'Warning', triggeredRule: 'Rule 2', rootCause: 'High Load or Thermal Stress', reason: 'Temperature and power are abnormal in the same event window.', recommendedAction: 'Check system workload, processor utilization, and thermal policy.' };
    } else if (has('voltage') && has('power')) {
        result = { systemStatus: 'Warning', triggeredRule: 'Rule 3', rootCause: 'Possible PSU Anomaly', reason: 'Voltage and power are abnormal in the same event window.', recommendedAction: 'Check PSU health, voltage rail stability, and power cable connection.' };
    } else if (has('temperature')) {
        result = { systemStatus: 'Warning', triggeredRule: 'Rule 4', rootCause: 'Temperature Sensor Outlier', reason: 'Only temperature is abnormal in the current event window.', recommendedAction: 'Verify temperature sensor reading and compare with nearby related sensors.' };
    } else if (has('airflow')) {
        result = { systemStatus: 'Warning', triggeredRule: 'Rule 5', rootCause: 'Airflow Sensor Outlier', reason: 'Only airflow is abnormal in the current event window.', recommendedAction: 'Check airflow path and verify airflow sensor reading.' };
    } else if (has('power')) {
        result = { systemStatus: 'Warning', triggeredRule: 'Rule 6', rootCause: 'Power Sensor Outlier', reason: 'Only power is abnormal in the current event window.', recommendedAction: 'Check workload, PSU power reading, and system event logs.' };
    } else {
        result = { systemStatus: 'Warning', triggeredRule: 'Rule 7', rootCause: 'Voltage Sensor Outlier', reason: 'Only voltage is abnormal in the current event window.', recommendedAction: 'Check voltage rail stability and PSU health.' };
    }

    result.abnormalSensors = abnormalSensors;
    result.affectedCategories = abnormalCategories;
    return result;
}

function mergeAbnormalSensors(items) {
    const bySensor = new Map();
    items.forEach(item => {
        const key = `${item.category}|${item.series.sensorName}`;
        const existing = bySensor.get(key);
        if (!existing || Math.abs(item.current.timestampRealtime - replay.currentTimeUs) < Math.abs(existing.current.timestampRealtime - replay.currentTimeUs)) {
            bySensor.set(key, item);
        }
    });
    return [...bySensor.values()].sort((a, b) => a.current.timestampRealtime - b.current.timestampRealtime);
}

function recordRootCauseHistory(result) {
    if (result.systemStatus === 'Normal') return;
    const times = result.abnormalSensors.map(item => item.current.timestampRealtime);
    const eventStart = Math.min(...times);
    const eventEnd = Math.max(...times);
    const matching = rootCauseHistory.find(item => eventStart <= item.eventEndUs + EVENT_WINDOW_US && eventEnd >= item.eventStartUs - EVENT_WINDOW_US);
    const entry = {
        eventStartUs: matching ? Math.min(matching.eventStartUs, eventStart) : eventStart,
        eventEndUs: matching ? Math.max(matching.eventEndUs, eventEnd) : eventEnd,
        time: taipeiTimeText || formatTaipeiNow(),
        triggeredRule: result.triggeredRule,
        rootCause: result.rootCause,
        affectedCategories: result.affectedCategories.join(', '),
        affectedSensorNames: result.abnormalSensors.map(item => item.series.sensorName).join(', '),
        anomalyLevel: [...new Set(result.abnormalSensors.map(item => item.current.anomalyLevel))].join(', '),
        recommendedAction: result.recommendedAction
    };

    if (matching) {
        Object.assign(matching, entry);
    } else {
        rootCauseHistory.unshift(entry);
    }
    saveRootCauseHistory();
}

function renderRootCauseAnalysis(options = {}) {
    if (!els.rootCausePanel) return;
    const result = evaluateRootCause();
    if (!options.skipRecord) recordRootCauseHistory(result);
    const statusClass = result.systemStatus === 'Normal' ? 'normal' : 'warning';
    els.rootCausePanel.innerHTML = `
        <div class="replay-status">
            <span>Current Taipei Time</span>
            <strong class="taipei-time-value">${escapeHtml(taipeiTimeText)}</strong>
            <span>timestamp-realtime: ${escapeHtml(replay.currentTimeUs ?? '-')}</span>
            <span>speed: ${escapeHtml(replay.speed)}x</span>
        </div>
        <div class="rca-summary ${statusClass}">
            <div><span>System Status</span><strong>${escapeHtml(result.systemStatus)}</strong></div>
            <div><span>Triggered Rules</span><strong>${escapeHtml(result.triggeredRule)}</strong></div>
            <div><span>Possible Root Cause</span><strong>${escapeHtml(result.rootCause)}</strong></div>
        </div>
        <div class="rca-detail-grid">
            <article class="rca-card"><h3>Reason</h3><p>${escapeHtml(result.reason)}</p></article>
            <article class="rca-card"><h3>Recommended Action</h3><p>${escapeHtml(result.recommendedAction)}</p></article>
        </div>
        <article class="rca-card"><h3>Abnormal Sensor List</h3>${renderAbnormalSensorTable(result.abnormalSensors)}</article>
        <article class="rca-card">
            <div class="rca-card-header">
                <h3>Root Cause History</h3>
                <button type="button" class="clear-history-btn" id="clearHistoryBtn">Clear History</button>
            </div>
            ${renderHistoryTable()}
        </article>
    `;
    const clearButton = document.getElementById('clearHistoryBtn');
    if (clearButton) clearButton.addEventListener('click', clearRootCauseHistory);
}

function renderAbnormalSensorTable(abnormalSensors) {
    if (!abnormalSensors.length) return '<p class="muted-text">No abnormal sensorName detected in the current +/- 3 second event window.</p>';
    return `
        <div class="table-wrap">
            <table class="data-table">
                <thead><tr><th>Category</th><th>Sensor Name</th><th>timestamp-realtime</th><th>Value</th><th>Lower Bound</th><th>Upper Bound</th><th>anomaly_level</th></tr></thead>
                <tbody>
                    ${abnormalSensors.map(item => `
                        <tr>
                            <td>${escapeHtml(item.category.toLowerCase())}</td>
                            <td>${escapeHtml(item.series.sensorName)}</td>
                            <td>${escapeHtml(item.current.timestampRealtime)}</td>
                            <td>${escapeHtml(item.current.value.toFixed(3))}</td>
                            <td>${escapeHtml(Number.isFinite(item.current.lowerBound) ? item.current.lowerBound.toFixed(3) : '-')}</td>
                            <td>${escapeHtml(Number.isFinite(item.current.upperBound) ? item.current.upperBound.toFixed(3) : '-')}</td>
                            <td><span class="anomaly-pill ${escapeHtml(levelClass(item.current.anomalyLevel))}">${escapeHtml(displayLevel(item.current.anomalyLevel))}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderHistoryTable() {
    if (!rootCauseHistory.length) return '<p class="muted-text">No root cause history yet.</p>';
    return `
        <div class="table-wrap">
            <table class="data-table history-table">
                <thead><tr><th>Time</th><th>Triggered Rule</th><th>Root Cause</th><th>Affected Categories</th><th>Affected Sensor Names</th><th>Anomaly Level</th><th>Recommended Action</th></tr></thead>
                <tbody>
                    ${rootCauseHistory.map(item => `
                        <tr>
                            <td>${escapeHtml(item.time)}</td>
                            <td>${escapeHtml(item.triggeredRule)}</td>
                            <td>${escapeHtml(item.rootCause)}</td>
                            <td>${escapeHtml(item.affectedCategories)}</td>
                            <td>${escapeHtml(item.affectedSensorNames)}</td>
                            <td>${escapeHtml(item.anomalyLevel.split(',').map(level => displayLevel(level)).join(', '))}</td>
                            <td>${escapeHtml(item.recommendedAction)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function updateCategoryCounts() {
    els.categoryBtns.forEach(btn => {
        const category = btn.dataset.category;
        const countEl = btn.querySelector('.count');
        if (countEl && dataLoaded) countEl.textContent = `${(sensorsData[category] || []).length} sensors`;
    });
}

function updateStatistics() {
    const allSensors = Object.values(sensorsData).flat();
    els.totalSensors.textContent = allSensors.length;
    els.activeSensors.textContent = allSensors.filter(sensor => normalizeLevel(sensor.anomalyLevel) === 'normal').length;
    els.lastUpdate.textContent = taipeiTimeText || formatTaipeiNow();
    updateCategoryCounts();
}

function setupEventListeners() {
    els.categoryBtns.forEach(btn => btn.addEventListener('click', () => showCategoryView(btn.dataset.category)));
    els.backBtn.addEventListener('click', showHomeView);
    window.addEventListener('resize', () => {
        if (activeCategory) drawSensorCharts(activeCategory);
    });
}

async function init() {
    loadRootCauseHistory();
    updateTaipeiTime();
    setInterval(updateTaipeiTime, 1000);
    setupEventListeners();
    renderRootCauseAnalysis();
    await loadSensorSeries();
    Object.values(sensorModules).forEach(module => {
        if (typeof module.init === 'function') module.init();
    });
    startReplay();
}

window.SensorDashboard = {
    registerSensorModule,
    showHomeView,
    updateStatistics,
    createSensorCard,
    renderSensorPanels,
    renderEmptyState,
    formatDateTime,
    escapeHtml
};

document.addEventListener('DOMContentLoaded', () => {
    init().catch(error => {
        console.error('Dashboard initialization failed:', error);
        renderRootCauseAnalysis();
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && (els.categoryView.classList.contains('active') || els.temperatureBaselineView.classList.contains('active'))) {
        showHomeView();
    }
});
