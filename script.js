document.addEventListener('DOMContentLoaded', () => {
    const toggleSidebar = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');

    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('open'); // Toggle the open class
        sidebar.classList.toggle('collapsed'); // Add/remove the collapsed class
    });

    // Pie Chart
    var pieChart = new Chart(document.getElementById('pieChart'), {
        type: 'doughnut',
        data: {
            labels: ['By Email', 'By Phone', 'On Site', 'By Agent'],
            datasets: [{
                data: [20, 15, 15, 35],
                backgroundColor: ['#f39c12', '#16a085', '#2980b9', '#c0392b']
            }]
        }
    });

    // Bar Chart
var barChart = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
            label: 'Inquiry',
            data: [60, 70, 80, 90, 100, 110, 120, 130],
            backgroundColor: '#2980b9'
        }, {
            label: 'Confirm',
            data: [40, 50, 60, 70, 80, 90, 100, 110],
            backgroundColor: '#c0392b'
        }]
    }
});

    // Line Chart
var lineChart = new Chart(document.getElementById('lineChart'), {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        datasets: [{
            label: 'Revenue',
            data: [20, 30, 50, 60, 80, 100, 120, 140, 160],
            backgroundColor: '#16a085',
            borderColor: '#16a085',
            fill: false
        }]
    }
});
});
