import axios from 'axios'

const DASHBOARD_DATA_LOADED = 'DASHBOARD_DATA_LOADED'

export function loadDashboardData() {
  return (dispatch) => {
    console.log('Loading')
    axios.post('http://api.seestats.org/targets/top10?from=2016-03-01&to=2016-03-06', {}).then((resp) => {
      if (resp.success) {
        const data = {
          xs: [],
          ys: [],
        }
        resp.hits.forEach((hit) => {
          data.xs.push(hit.key)
          data.ys.push(hit.doc_count)
        })
        dispatch({
          type: DASHBOARD_DATA_LOADED,
          payload: data,
        })
      } else {
        console.error('ERROR', resp)
      }
    }).catch((err) => {
      console.log('ERROR', err)
    })
  }
}

const generateTableData = () => {
  let newTableData = []
  for (let i = 0; i < Math.round(Math.random() * 40) + 10; i++) {
    newTableData.push({
      number1: Math.round(Math.random() * 100),
      number2: Math.round(Math.random() * 1000),
      number3: (Math.random() * 5).toFixed(3),
    })
  }
  return newTableData
}

export const initialState = {
  apiData: null,
  // pieData: [
  //   {
  //       value: 300,
  //       color:"#F7464A",
  //       highlight: "#FF5A5E",
  //       label: "Red"
  //   },
  //   {
  //       value: 50,
  //       color: "#46BFBD",
  //       highlight: "#5AD3D1",
  //       label: "Green"
  //   },
  //   {
  //       value: 100,
  //       color: "#FDB45C",
  //       highlight: "#FFC870",
  //       label: "Yellow"
  //   }
  // ],
  // barData: {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "My First dataset",
  //       fillColor: "rgba(220,220,220,0.2)",
  //       strokeColor: "rgba(220,220,220,1)",
  //       pointColor: "rgba(220,220,220,1)",
  //       pointStrokeColor: "#fff",
  //       pointHighlightFill: "#fff",
  //       pointHighlightStroke: "rgba(220,220,220,1)",
  //       data: [65, 59, 80, 81, 56, 55, 40]
  //     },
  //     {
  //       label: "My Second dataset",
  //       fillColor: "rgba(151,187,205,0.2)",
  //       strokeColor: "rgba(151,187,205,1)",
  //       pointColor: "rgba(151,187,205,1)",
  //       pointStrokeColor: "#fff",
  //       pointHighlightFill: "#fff",
  //       pointHighlightStroke: "rgba(151,187,205,1)",
  //       data: [28, 48, 40, 19, 86, 27, 90]
  //     }
  //   ]
  // },
  // lineData: {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //         label: "My First dataset",
  //         fillColor: "rgba(220,220,220,0.5)",
  //         strokeColor: "rgba(220,220,220,0.8)",
  //         highlightFill: "rgba(220,220,220,0.75)",
  //         highlightStroke: "rgba(220,220,220,1)",
  //         data: [65, 59, 80, 81, 56, 55, 40]
  //     },
  //     {
  //         label: "My Second dataset",
  //         fillColor: "rgba(151,187,205,0.5)",
  //         strokeColor: "rgba(151,187,205,0.8)",
  //         highlightFill: "rgba(151,187,205,0.75)",
  //         highlightStroke: "rgba(151,187,205,1)",
  //         data: [28, 48, 40, 19, 86, 27, 90]
  //     }
  //   ]
  // },
  // radarData: {
  //   labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
  //   datasets: [
  //     {
  //       label: "My First dataset",
  //       fillColor: "rgba(220,220,220,0.2)",
  //       strokeColor: "rgba(220,220,220,1)",
  //       pointColor: "rgba(220,220,220,1)",
  //       pointStrokeColor: "#fff",
  //       pointHighlightFill: "#fff",
  //       pointHighlightStroke: "rgba(220,220,220,1)",
  //       data: [65, 59, 90, 81, 56, 55, 40]
  //     },
  //     {
  //       label: "My Second dataset",
  //       fillColor: "rgba(151,187,205,0.2)",
  //       strokeColor: "rgba(151,187,205,1)",
  //       pointColor: "rgba(151,187,205,1)",
  //       pointStrokeColor: "#fff",
  //       pointHighlightFill: "#fff",
  //       pointHighlightStroke: "rgba(151,187,205,1)",
  //       data: [28, 48, 40, 19, 96, 27, 100]
  //     }
  //   ]
  // },
  tableData: generateTableData(),
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOAD_DASHBOARD_DATA':
      return {
        ...state,
        targets: action.payload,
      }
    case 'RANDOM_ALL_DATA':
      const newState = {
        // ...state,
        lineData: {
          labels: state.lineData.labels,
          datasets: state.lineData.datasets.map((ds) => {
            ds.data = ds.data.map((d) => {
              return Math.random() * 100
            })
            return ds
          })
        },
        radarData: state.radarData,
        pieData: state.pieData.map((d) => {
          d.value = Math.random() * 100
          return d
        }),
        barData: {
          labels : state.barData.labels,
          datasets: state.barData.datasets.map((ds) => {
            ds.data = ds.data.map((d) => {
              return Math.random() * 100
              return d
            })
            return ds
          })
        },
        tableData: generateTableData(),
      }
      return newState;
    default:
      return state
  }
}
