// Get the context of the canvas element
var ctx = document.getElementById('pieChart').getContext('2d');

// Initialize the chart with empty data
var pieChart = new Chart(ctx, {
    type: 'pie', // Pie chart
    data: {
        labels: ['Chưa xử lý', 'Inbound thành công', 'Đã xử lý', 'Gọi lại lần 1', 'Gọi lại lần 2', 'Gọi lại lần 3'], // Updated labels
        datasets: [{
            label: 'Số liệu',
            data: [], // Initialize with empty data, we'll update it later
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)', // Red
                'rgba(54, 162, 235, 0.6)', // Blue
                'rgba(255, 206, 86, 0.6)', // Yellow
                'rgba(75, 192, 192, 0.6)', // Green
                'rgba(153, 102, 255, 0.6)', // Purple
                'rgba(255, 159, 64, 0.6)', // Orange
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom', // Place the legend (labels) at the bottom
            },
            title: {
                display: true,
                text: 'Số liệu', // Chart title
                font: {
                    size: 18 // Customize the font size for the title
                }
            }
        }
    }
});

// Function to extract numeric values from relevant columns in the table
function getColumnSums() {
    const tbody = document.querySelector("#exampleTable tbody");
    const columnSums = [0, 0, 0, 0, 0, 0]; // 6 columns: Chưa xử lý, Inbound thành công, Đã xử lý, Gọi lại lần 1, Gọi lại lần 2, Gọi lại lần 3

    tbody.querySelectorAll('tr').forEach(row => {
        const cells = row.querySelectorAll('td');

        columnSums[0] += parseInt(cells[2].textContent) || 0; // "Chưa xử lý" (pending, 0 or 1)
        columnSums[1] += parseInt(cells[3].textContent) || 0; // "Inbound thành công" (0 or 1)
        columnSums[2] += parseInt(cells[4].textContent) || 0; // "Đã xử lý" (processed, 0 or 1)
        columnSums[3] += parseInt(cells[5].textContent) || 0; // "Gọi lại lần 1" (recallCount1, 0 or 1)
        columnSums[4] += parseInt(cells[6].textContent) || 0; // "Gọi lại lần 2" (recallCount2, 0 or 1)
        columnSums[5] += parseInt(cells[7].textContent) || 0; // "Gọi lại lần 3" (recallCount3, 0 or 1)
    });

    return columnSums;
}

// Update the pie chart with the table data
function updateChartData() {
    const sums = getColumnSums();
    pieChart.data.datasets[0].data = sums; // Update the chart data with the sums
    pieChart.update(); // Re-render the chart with the new data
}
