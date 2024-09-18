// var tableData = [
//     { total: 27, category: 'VIP', pending: 1, inboundSuccess: 1, processed: 0, recallCount1: 1, recallCount2: 0, recallCount3: 0, agentHangup: 10007, incomingCalls: 7, queue: 'IVR L3' },
//     { total: 20, category: 'Mas', pending: 0, inboundSuccess: 1, processed: 1, recallCount1: 0, recallCount2: 1, recallCount3: 0, agentHangup: 10004, incomingCalls: 6, queue: 'Quew' },
//     { total: 41, category: 'KHDN', pending: 1, inboundSuccess: 1, processed: 0, recallCount1: 0, recallCount2: 0, recallCount3: 1, agentHangup: 10006, incomingCalls: 9, queue: 'IVR L3' },
// ];



const tbody = document.querySelector("#exampleTable tbody");

// Function to render filtered data into the table
function renderTable(filteredData) {
    tbody.innerHTML = ''; // Clear the existing table body

    filteredData.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td>${row.total}</td>
                        <td>${row.category}</td>
                        <td>${row.pending}</td>
                        <td>${row.inboundSuccess}</td>
                        <td>${row.processed}</td>
                        <td>${row.recallCount1}</td>
                        <td>${row.recallCount2}</td>
                        <td>${row.recallCount3}</td>
                        <td>${row.agentHangup}</td>
                        <td>${row.incomingCalls}</td>
                        <td>${row.queue}</td>`;
        tbody.appendChild(tr);
    });
}

// Function to apply filters to the table data
function filterTableData() {
    let filteredData = tableData.slice();

    // Get filter values
    const customerRank = document.getElementById('customerRank').value;
    const incomingSearch = document.getElementById('incomingSearch').value;
    const agentSearch = document.getElementById('agentSearch').value;
    const statusFilter = document.getElementById('statusFilter').value;
    const queueFilter = document.getElementById('queueFilter').value;
    const recallCountFilter = document.getElementById('recallCountFilter').value;

    // Apply Customer Rank filter
    if (customerRank) {
        filteredData = filteredData.filter(row => row.category === customerRank);
    }

    // Apply Incoming Calls filter
    if (incomingSearch) {
        filteredData = filteredData.filter(row => row.incomingCalls.toString().includes(incomingSearch));
    }

    // Apply Agent Search filter
    if (agentSearch) {
        filteredData = filteredData.filter(row => row.agentHangup.toString().includes(agentSearch));
    }

    // Apply Queue filter
    if (queueFilter !== 'Tất cả') {
        filteredData = filteredData.filter(row => row.queue === queueFilter);
    }


// Apply Status filter
if (statusFilter) {
    if (statusFilter === 'Chưa xử lý') {
        // Filter for rows where 'pending' is 1 (Chưa xử lý)
        filteredData = filteredData.filter(row => row.pending === 1);
    } else if (statusFilter === 'Đã xử lý') {
        // Filter for rows where 'processed' is 1 (Đã xử lý)
        filteredData = filteredData.filter(row => row.processed === 1);
    } else if (statusFilter === 'Gọi lại lần 1') {
        filteredData = filteredData.filter(row => row.recallCount1 === 1);
    } else if (statusFilter === 'Gọi lại lần 2') {
        filteredData = filteredData.filter(row => row.recallCount2 === 1);
    } else if (statusFilter === 'Gọi lại lần 3') {
        filteredData = filteredData.filter(row => row.recallCount3 === 1);
    }
}
    // Apply sorting by recall counts based on priority
    if (recallCountFilter === 'Tăng dần') {
        filteredData.sort((a, b) => {
            if (a.recallCount3 !== b.recallCount3) {
                return a.recallCount3 - b.recallCount3;
            } else if (a.recallCount2 !== b.recallCount2) {
                return a.recallCount2 - b.recallCount2;
            } else {
                return a.recallCount1 - b.recallCount1;
            }
        });
    } else if (recallCountFilter === 'Giảm dần') {
        filteredData.sort((a, b) => {
            if (b.recallCount3 !== a.recallCount3) {
                return b.recallCount3 - a.recallCount3;
            } else if (b.recallCount2 !== a.recallCount2) {
                return b.recallCount2 - a.recallCount2;
            } else {
                return b.recallCount1 - a.recallCount1;
            }
        });
    }

    renderTable(filteredData);
}

// Function to generate random data for each table row
function updateTableData() {
    filterTableData(); // Apply filters after updating the data
}



// Add event listeners to filter inputs
document.querySelectorAll('select, input').forEach(filterInput => {
    filterInput.addEventListener('input', filterTableData);
});
