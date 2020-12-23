function createChart(id, data) {
    return new Chart(document.getElementById(id), {
        type: "pie",
        data: data,
    })
}