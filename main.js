// Data from https://data.giss.nasa.gov/gistemp/
// Mean from: https://earthobservatory.nasa.gov/world-of-change/DecadalTemp



async function getData() {
  const response = await fetch("ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  const years = [];
  const temps = [];
  const rows = data.split("\n").slice(1);
  rows.forEach((row) => {
    const cols = row.split(",");
    years.push(cols[0])
    temps.push(14 + parseFloat(cols[1])
);
  });
  return { years, temps };
}

drawChart();
async function drawChart() {
const data = await getData();
const ctx = document.getElementById("myChart").getContext("2d");
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: data.years,
    datasets: [
      {
        label: "Temperature",
        data: data.temps,
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
        borderWidth: 1,
        radius: 1,
        tension: 0.2,
        hoverRadius: 5
      },
    ],
  },
  options: {
    scales: {
        y: {
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return value + "°";
                }
            }
        }
    }
}
});
}
