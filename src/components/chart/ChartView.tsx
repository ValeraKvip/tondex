import React from 'react';
import './chart.scss';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import CoinData from '../../models/CoinData';
import axios from 'axios';
import PeriodSelector from './PeriodSelector/PeriodSelector';
import Toggle from '../toggle/Toggle';
Chart.register(...registerables);

interface Props {
  to: CoinData,
  from: CoinData,
}

interface State {
  chartData: any,
  days: number,
  hoverPrice: number
}


export default class ChartView extends React.Component<Props, State> {

  mouseIn: boolean = false;
  mousePosX = 0;
  constructor(prop: any) {
    super(prop);

    this.state = {
      days: 1,
      hoverPrice: 0,
      chartData: {
        labels: [],
        datasets: []
      }
    }

    this.changePeriod = this.changePeriod.bind(this);
  }



  async componentDidUpdate(prevProps: Props, prevState: State) {
    //console.log('CHARTVIEW',prevProps.from.token.id ,this.props.from.token.id)
    if (prevProps.from.token.id !== this.props.from.token.id || this.state.days != prevState.days) {
      this.loadChartData();
    }
  }

  async loadChartData() {
    const id = this.props.from.token.id === 'toncoin' ? 'usd-coin' : this.props.from.token.id;
    const statistics = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${this.state.days}`)   

    if (statistics?.data?.prices) {
      const chart = (document.getElementById('swap-chart') as any);
      var ctx = (document.getElementById('swap-chart') as any).getContext("2d")
     
      var gradient = ctx.createLinearGradient(0, 0, 0, 650)
      gradient.addColorStop(0, "rgba(0, 136, 204, 0.5)");
      gradient.addColorStop(1, "rgba(48, 55, 87, 0.1)");

      const p = statistics?.data?.prices as [] ?? [];
      const labels = p.map(m => {
        const date = new Date(m[0]);
        if (this.state.days === 1) {
          return date.getHours() + ':00';
        }
        else if (this.state.days === 7) {

          return date.toLocaleString('en-us', { weekday: 'short' });
        }


        return date.toLocaleString('en-us', { day: '2-digit', month: 'short' });
      });

      var data = p.map(m => m[1]) as any;


      const datasets = [{
        label: '',
        data,
        fill: true,
        borderColor: '#0088cc',
        pointBorderColor: "#fff",
        pointBackgroundColor: "#0088cc",
        pointRadius: 0,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 2,
        borderWidth: 2,
        tension: 0.2,
        backgroundColor: gradient,
      }]


      this.setState({
        hoverPrice: this.props.from.price,
        chartData: {
          labels: labels,
          datasets
        }
      })

    }
  }

  async componentDidMount() {
    this.loadChartData();
  }

  changePeriod(index: number) {
    const days = index === 0 ? 1 : index === 1 ? 7 : 30;
    if (this.state.days === days) {
      return;
    }

    this.setState({
      days
    })
  }

  render() {
    const options = {
      responsive: true,
      maintainAspectRatio: false,


      onHover: (e: any, element: any) => {
        if (!this.mouseIn) {
          return;
        }

        var ind = element[0].index;

        this.mousePosX = element[0].element.x;

        const price = this.state.chartData.datasets[0].data[ind];
        if (this.state.hoverPrice !== price)
          this.setState({
            hoverPrice: price
          })

      },

      hover: {
        mode: 'index',
        intersect: false
      },
      layout: {
        padding: 0
      },
      scales: {
        x: {
          // type: 'line', 
          ticks: {
        
         //   autoSkip: true,
            maxTicksLimit: 10,
            maxRotation: 0,
            minRotation: 0,
           
          },
          grid: {
            display: false,
            drawBorder: false,
            
          }
        },
        y: {
          //       type: 'logarithmic',    
          grid: {
            drawBorder: false,
            display: false
          },
          ticks: {
            display: false
          }
        }
      },
      plugins: {
        tooltip: {
          enabled: false
        },
        legend: {
          display: false
        }
      }
    } as any;


    const plugins = [{
      afterDraw: (chart: any) => {
        if (this.state.chartData?.datasets?.[0]?.data && this.mouseIn) {
        //  console.log('chart', chart)
          var ctx = chart.ctx;
          var xAxis = chart.scales['x'];
          var yAxis = chart.scales['y'];

          var x = this.mousePosX;

          var yTop = yAxis.getPixelForTick(100);
          ctx.save();
          ctx.strokeStyle = '#aaaaaa';
          ctx.beginPath();
          ctx.moveTo(x, yAxis.bottom);
          ctx.lineTo(x, yTop);
          ctx.stroke();
          ctx.restore();
        
        }
      }
    }] as any;

    return (
      <div className='swap-chart-container'>
        <div className='chart-header'>


          <div className='chart-toggle'>
          <img className='icon' src={this.props.from.token.image} />
          <img className='icon' src={this.props.to.token.image} />
            <span>Detailed</span>
            <Toggle onToggle={() => { console.log('Toggle') }}></Toggle>
          </div>
          <PeriodSelector active={this.state.days === 30 ? 2 : this.state.days === 7 ? 1 : 0} changePeriod={this.changePeriod}></PeriodSelector>

        </div>
        <div className='chart-info'>
          <div className='price'>{this.state.hoverPrice.toFixed(4)}</div>        
          <span>{this.props.from.token.symbol}/{this.props.to.token.symbol}</span>              
        </div>


        <Line
          id="swap-chart"
          data={this.state.chartData}
          options={options}
          plugins={plugins}
          onMouseOut={(e: any) => {
            this.mouseIn = false;

            this.setState({
              hoverPrice: this.props.from.price
            })
          }}

          onMouseEnter={
            (e) => { this.mouseIn = true; }
          }
        ></Line>
      </div>

    )
  }
}