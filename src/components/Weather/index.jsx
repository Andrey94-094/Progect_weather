import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { weatherCity } from '../../actionCreators'
import { withRouter } from 'react-router-dom';
import './Weather.scss'

class Weather extends PureComponent {
  state = {
    isShowMore: false,
    cityMass: [{ city: 'Minsk' }, { city: 'Moscow' }, { city: 'Bratislava' }],
    city:'',
  };


  componentDidMount = async () => {
    try {
      const cityInfo = this.props.location.pathname;
      const city = cityInfo === '/'? 'Minsk' : cityInfo.slice(1, cityInfo.length);
      const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=b5647a55e8d4130e223c36880624811e`);
      const weatherFive = await response.json();
      const { weatherCity } = this.props;
      weatherCity(weatherFive);
      this.setState({ isShowMore: true });}
    catch (err) {
    }
  }

  handleClick = async (city) => {
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=b5647a55e8d4130e223c36880624811e`);
      const weatherFive = await response.json();
      const { weatherCity } = this.props;
      weatherCity(weatherFive);
      this.setState({ isShowMore: true });
      this.setState({ city });
      this.props.history.replace(city);
    }
    catch (err) {
    }
  }

  render() {
    const { isShowMore } = this.state;
    const { cityMass } = this.state;
    const { weatherCitys } = this.props;
    const { thisCity } = this.props;
    return (
      <section className="form">
        {cityMass.map((item) => (
          <button className="form__button" onClick={() => this.handleClick(`${item.city} `)} >
            {item.city}
          </button>
        ))}
        {isShowMore &&
          <table className="table">
            <tr>
              <td>Temperature: {Math.round(weatherCitys.list[0].main.temp)}℃, Date: {weatherCitys.list[0].dt_txt.split(" ")[0]}</td>
            </tr>
            <tr>
              <td>Temperature: {Math.round(weatherCitys.list[8].main.temp)}℃, Date: {weatherCitys.list[8].dt_txt.split(" ")[0]}</td>
            </tr>
            <tr>
              <td>Temperature: {Math.round(weatherCitys.list[16].main.temp)}℃, Date: {weatherCitys.list[16].dt_txt.split(" ")[0]}</td>
            </tr>
          </table>
        }
        <Link to={`/in/${thisCity}`} className="form__button">
          More weather in {thisCity}
        </Link>
      </section>
    )
  }
}
const mapStateToProps = ({ weatherCitys, thisCity }) => ({
  thisCity: thisCity.thisCity,
  weatherCitys: weatherCitys.weatherCitys,
});
const mapDispatchToProps = (dispatch) => ({
  weatherCity: (weatherFive) => dispatch(weatherCity(weatherFive)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Weather));
