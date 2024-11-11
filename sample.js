// Daily Inquiry Chart
const dailyInquiryCtx = document.getElementById('dailyInquiryChart').getContext('2d');
const dailyInquiryChart = new Chart(dailyInquiryCtx, {
    type: 'doughnut',
    data: {
        labels: ['By Email', 'By Phone', 'On Site', 'By Agent'],
        datasets: [{
            data: [15, 20, 45, 35],
            backgroundColor: ['#ff4757', '#3742fa', '#2ed573', '#ffa502'],
        }]
    },
    options: {
        responsive: true
    }
});

// Booking Status Chart
const bookingStatusCtx = document.getElementById('bookingStatusChart').getContext('2d');
const bookingStatusChart = new Chart(bookingStatusCtx, {
    type: 'bar',
    data: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
            label: 'Inquiry',
            data: [65, 59, 80, 81, 56, 55, 40, 90],
            backgroundColor: '#1e90ff',
        }, {
            label: 'Confirm',
            data: [28, 48, 40, 19, 86, 27, 90, 100],
            backgroundColor: '#ff4757',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Revenue Chart
const revenueCtx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(revenueCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
            label: 'Revenue',
            data: [51, 65, 80, 81, 56, 55, 40, 90, 120],
            backgroundColor: 'rgba(30, 144, 255, 0.2)',
            borderColor: '#1e90ff',
            borderWidth: 2,
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
