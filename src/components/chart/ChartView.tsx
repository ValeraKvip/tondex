import React from 'react';
import './chart.scss';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import CoinData from '../../models/CoinData';
import axios from 'axios';
import PeriodSelector from './PeriodSelector/PeriodSelector';
import Toggle from '../toggle/Toggle';
import LottieView from '../lottie/LottieView';
import { delay } from '../../utils';
Chart.register(...registerables);

interface Props {
  to: CoinData,
  from: CoinData,
}

interface State {
  chartData: any,
  days: number,
  hoverPrice: number,
  hoverDate: string,
  isLoading: boolean

}


export default class ChartView extends React.Component<Props, State> {

  firstLoad: boolean;
  mouseIn: boolean = false;
  mousePosX = 0;
  constructor(prop: any) {
    super(prop);

    this.firstLoad = true;

    this.state = {
      days: 1,
      hoverDate: '',
      hoverPrice: 0,
      chartData: {
        labels: [],
        datasets: []
      },
      isLoading: false
    }

    this.changePeriod = this.changePeriod.bind(this);
  }

  async componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.from.token.id !== this.props.from.token.id
      || prevProps.to.token.id !== this.props.to.token.id
      || this.state.days != prevState.days) {
      this.loadChartData(prevProps.from.token.id !== this.props.from.token.id ? this.props.from.token.id : this.props.to.token.id);
    }
  }

  async loadChartData(tokeId: string) {
    const id = tokeId === 'toncoin' ? 'usd-coin' : tokeId;
    if (this.firstLoad) {
      this.setState({
        isLoading: true
      })
    }

    const statistics = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${this.state.days}`)

    if (this.firstLoad) {
      await delay(3000);
      this.setState({
        isLoading: false
      })
    }
    this.firstLoad = false;

    if (statistics?.data?.prices) {
      const ctx = (document.getElementById('swap-chart') as any)?.getContext("2d")

      if (!ctx) {
        return;
      }

      const gradient = ctx.createLinearGradient(0, 0, 0, 650)
      gradient.addColorStop(0, "rgba(0, 136, 204, 0.5)");
      gradient.addColorStop(1, "rgba(162, 177, 242, 0.1)");

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
        borderWidth: 1.5,
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
    this.loadChartData(this.props.from.token.id);
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
        if (!this.mouseIn || !element?.length) {
          return;
        }

        var ind = element[0].index;

        this.mousePosX = element[0].element.x;

        const price = this.state.chartData.datasets[0].data[ind];
        const date = this.state.chartData.labels[ind];
        if (this.state.hoverPrice !== price)
          this.setState({
            hoverPrice: price,
            hoverDate: date || ''
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
            {/* <span>Detailed</span>
            <Toggle onToggle={() => { console.log('Toggle') }}></Toggle> */}
          </div>
          <PeriodSelector active={this.state.days === 30 ? 2 : this.state.days === 7 ? 1 : 0} changePeriod={this.changePeriod}></PeriodSelector>

        </div>
        <div className='chart-info'>
          <div className='price'>{this.state.hoverPrice.toFixed(4)}</div>
          <span>{this.props.from.token.symbol}/{this.props.to.token.symbol}</span>
        </div>
        <div className='hover-date'>{this.state.hoverDate}</div>


        <Line
          id="swap-chart"
          data={this.state.chartData}
          options={options}
          plugins={plugins}
          onMouseOut={(e: any) => {
            this.mouseIn = false;

            this.setState({
              hoverPrice: this.props.from.price,
              hoverDate:''
            })
          }}

          onMouseEnter={
            (e) => { this.mouseIn = true; }
          }
        ></Line>

        <LottieView enable={this.state.isLoading} path='/assets/anims/anim_stepup.json'></LottieView>
      </div>

    )
  }
}