// aqi bar
const ctxAQI = document.getElementById("aqiChart").getContext("2d");
new Chart(ctxAQI, {
  type: "bar",
  data: {
    labels: ["AQI Level"],
    datasets: [
      {
        label: "AQI",
        data: [aqi],
        backgroundColor: aqi > 300 ? "#7e0023" : aqi > 200 ? "#8f3f97" : aqi > 150 ? "#ff0000" : aqi > 100 ? "#ff7e00" : aqi > 50 ? "#ffff00" : "#00e400"
      }
    ]
  },
  options: {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: { beginAtZero: true, max: 500 },
      y: { ticks: { font: { size: 14 } } }
    }
  }
});

// covid pie
const ctxCovid = document.getElementById("covidChart").getContext("2d");
new Chart(ctxCovid, {
  type: "pie",
  data: {
    labels: ["Active", "Critical", "Recovered + Others"],
    datasets: [
      {
        data: [covid.active, covid.critical, covid.total - covid.active],
        backgroundColor: ["#ff9800", "#f44336", "#4caf50"]
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

// threat pie
const ctxThreat = document.getElementById("threatPie").getContext("2d");
new Chart(ctxThreat, {
  type: "doughnut",
  data: {
    labels: ["Risk", "Remaining"],
    datasets: [
      {
        data: [threatScore, 100 - threatScore],
        backgroundColor: ["#e91e63", "#424242"]
      }
    ]
  },
  options: {
    cutout: "70%",
    plugins: {
      legend: { position: "bottom" }
    }
  }
});
