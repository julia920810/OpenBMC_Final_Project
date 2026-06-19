// Sample sensor data - In production, this would come from D-Bus or an API
const sensorsData = {
    Airflow: [
        { id: 'AFW001', name: 'CPU Airflow', unit: 'CFM', value: 450, status: 'normal' },
        { id: 'AFW002', name: 'System Airflow', unit: 'CFM', value: 520, status: 'normal' },
        { id: 'AFW003', name: 'Inlet Airflow', unit: 'CFM', value: 380, status: 'normal' },
    ],
    Temperature: [
        { id: 'MGNT_TEMP_C', name: 'Management Temperature', unit: '°C', value: 24.125, status: 'normal' },
    ],
    Current: [
        { id: 'CURR001', name: '+12V Rail Current', unit: 'A', value: 15.2, status: 'normal' },
        { id: 'CURR002', name: '+5V Rail Current', unit: 'A', value: 8.5, status: 'normal' },
        { id: 'CURR003', name: '+3.3V Rail Current', unit: 'A', value: 5.1, status: 'normal' },
        { id: 'CURR004', name: 'CPU Current', unit: 'A', value: 32.0, status: 'warning' },
    ],
    Power: [
        { id: 'PWR001', name: 'Total Power', unit: 'W', value: 485, status: 'normal' },
        { id: 'PWR002', name: 'CPU Power', unit: 'W', value: 180, status: 'normal' },
        { id: 'PWR003', name: 'System Power', unit: 'W', value: 305, status: 'normal' },
        { id: 'PWR004', name: 'Memory Power', unit: 'W', value: 25, status: 'normal' },
    ],
    Fan: [
        { id: 'FAN001', name: 'CPU Fan', unit: 'RPM', value: 4200, status: 'normal' },
        { id: 'FAN002', name: 'Chassis Fan 1', unit: 'RPM', value: 3800, status: 'normal' },
        { id: 'FAN003', name: 'Chassis Fan 2', unit: 'RPM', value: 3600, status: 'normal' },
        { id: 'FAN004', name: 'PSU Fan', unit: 'RPM', value: 2100, status: 'normal' },
    ],
    Voltage: [
        { id: 'VOLT001', name: '+12V Rail', unit: 'V', value: 12.05, status: 'normal' },
        { id: 'VOLT002', name: '+5V Rail', unit: 'V', value: 5.02, status: 'normal' },
        { id: 'VOLT003', name: '+3.3V Rail', unit: 'V', value: 3.31, status: 'normal' },
        { id: 'VOLT004', name: 'VCORE', unit: 'V', value: 1.25, status: 'normal' },
    ]
};

// DOM Elements
const homeView = document.getElementById('homeView');
const categoryView = document.getElementById('categoryView');
const categoryTitle = document.getElementById('categoryTitle');
const sensorList = document.getElementById('sensorList');
const backBtn = document.getElementById('backBtn');
const categoryBtns = document.querySelectorAll('.category-btn');

// Statistics
const totalSensorsEl = document.getElementById('totalSensors');
const activeSensorsEl = document.getElementById('activeSensors');
const lastUpdateEl = document.getElementById('lastUpdate');

// Initialize app
function init() {
    setupEventListeners();
    updateStatistics();
}

// Setup event listeners
function setupEventListeners() {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            showCategoryView(category);
        });
    });

    backBtn.addEventListener('click', showHomeView);
}

// Show home view
function showHomeView() {
    homeView.classList.add('active');
    categoryView.classList.remove('active');
}

// Show category view
function showCategoryView(category) {
    homeView.classList.remove('active');
    categoryView.classList.add('active');
    
    categoryTitle.textContent = `${category} 感測器`;
    renderSensors(category);
}

// Render sensors for a category
function renderSensors(category) {
    const sensors = sensorsData[category] || [];
    
    if (sensors.length === 0) {
        sensorList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📭</div>
                <div class="empty-state-text">此類別中無感測器數據</div>
            </div>
        `;
        return;
    }

    sensorList.innerHTML = sensors.map(sensor => createSensorCard(sensor)).join('');
}

// Format date and time as YYYY/MM/DD HH:MM:SS
function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const time = date.toLocaleTimeString('zh-HK');
    return `${year}/${month}/${day} ${time}`;
}

// Create sensor card HTML
function createSensorCard(sensor) {
    const statusClass = sensor.status === 'warning' ? 'warning' : 'normal';
    const statusDot = sensor.status === 'warning' ? '⚠️' : '✓';

    return `
        <div class="sensor-card">
            <div class="sensor-name">
                <span class="sensor-status"></span>
                ${sensor.name}
            </div>
            <div class="sensor-details">
                <div class="sensor-detail">
                    <span class="detail-label">ID</span>
                    <span class="detail-value">${sensor.id}</span>
                </div>
                <div class="sensor-detail">
                    <span class="detail-label">當前值</span>
                    <span class="detail-value ${statusClass}">${sensor.value} ${sensor.unit}</span>
                </div>
                <div class="sensor-detail">
                    <span class="detail-label">狀態</span>
                    <span class="detail-value ${statusClass}">${statusDot} ${sensor.status === 'warning' ? '警告' : '正常'}</span>
                </div>
                <div class="sensor-detail">
                    <span class="detail-label">最後更新</span>
                    <span class="detail-value">${formatDateTime(new Date())}</span>
                </div>
            </div>
        </div>
    `;
}

// Update statistics
function updateStatistics() {
    const totalSensors = Object.values(sensorsData).reduce((sum, category) => sum + category.length, 0);
    const activeSensors = Object.values(sensorsData)
        .flat()
        .filter(sensor => sensor.status !== 'error')
        .length;

    totalSensorsEl.textContent = totalSensors;
    activeSensorsEl.textContent = activeSensors;
    lastUpdateEl.textContent = formatDateTime(new Date());
}

// Simulate real-time updates every 30 seconds
function startRealtimeUpdates() {
    setInterval(() => {
        // Randomly update sensor values to simulate real-time monitoring
        Object.keys(sensorsData).forEach(category => {
            sensorsData[category].forEach(sensor => {
                const variation = (Math.random() - 0.5) * 2; // ±1 unit variation
                sensor.value = Math.max(0, parseFloat((sensor.value + variation).toFixed(2)));
            });
        });
        
        // Update UI if category view is active
        if (categoryView.classList.contains('active')) {
            const categoryName = categoryTitle.textContent.replace(' 感測器', '');
            renderSensors(categoryName);
        }
        
        // Update statistics
        updateStatistics();
    }, 30000); // Update every 30 seconds
}

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    init();
    startRealtimeUpdates();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && categoryView.classList.contains('active')) {
        showHomeView();
    }
});
