const barChart = document.getElementById('barChart');
const pieChart = document.getElementById('pieChart');
const lineChart = document.getElementById('lineChart');

document.getElementById('csvFile').addEventListener('change', readFile)
const form = document.getElementById('form');
const main = document.querySelector('main');

function readFile(e) {
  const file = e.target.files[0]

  if (!file) {
    return;
  }

  generateFilePreview(file)

  form.addEventListener('submit', (e) => parseCSV(e, file))
}

function generateFilePreview(file) {
  const card = document.getElementById('file-card-preview')
  const addBtn = document.getElementById('btn-add')

  card.classList.remove("hidden")
  addBtn.classList.remove("hidden")

  card.innerHTML = "Arquivo: " + `<span class="text-blue-700">${file.name}</span>`
}

async function parseCSV(e, file) {
  e.preventDefault();
 
  form.classList.add("hidden")
  main.classList.remove("hidden")

  await Papa.parse(file, {
    header: true,
    dynamicTyping: true,
    complete: function (results) {

      showGraphs(results.data) 
    },
  });
}

function showGraphs(data) {
  console.log(data)

  const labels = data.map(el => {
    for (const key in el) {
      if (key === '') {
        return el[key]
      }
    }
  })

  const kyotoData = data.map(el => {
    for (const key in el) {
      if (key === 'Kyoto') {
        return el[key]
      }
    }
  })

  const tokyoData = data.map(el => {
    for (const key in el) {
      if (key === 'Tokyo') {
        return el[key]
      }
    }
  })

  const osakaData = data.map(el => {
    for (const key in el) {
      if (key === 'Osaka') {
        return el[key]
      }
    }
  })

  createGraph('bar', 'Kyoto', labels, kyotoData, barChart)
  createGraph('pie', 'Tokyo', labels, tokyoData, pieChart)
  createGraph('line', 'Osaka', labels, osakaData, lineChart)
}

function createGraph(type, label, labels, data, element) {
  new Chart(element, {
    type,
    data: {
      labels,
      datasets: [{
        label,
        data,
        borderWidth: 5
      }]
    },
    options: {
      options: {
        responsive: true
      },
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
        },
      },
      maintainAspectRatio: false, 
    }
  })
}