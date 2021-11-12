import { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changeWeatherCity } from '../../actionCreators';
import { withRouter } from 'react-router-dom';
import './Details.scss';

class Details extends PureComponent {
  state = {
    isScrollingDown: false,
    isShowMore: false,
    city: '',
  };


  componentDidMount = async () => {
    try {
      const cityInfo = this.props.location.pathname;
      const city = cityInfo.slice(4, cityInfo.length)
      const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=b5647a55e8d4130e223c36880624811e`);
      const weatherFive = await response.json();
      const { changeWeatherCity } = this.props;
      changeWeatherCity(weatherFive);
      this.setState({ isShowMore: true });
    } catch (err) {
    }
  }
  handleClick = async (city) => {
    this.setState({ isShowMore: false });
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=b5647a55e8d4130e223c36880624811e`);
      const weatherFive = await response.json();
      const { changeWeatherCity } = this.props;
      changeWeatherCity(weatherFive, city);
      this.setState({ isShowMore: true });
    }
    catch (err) {
    }
  }

  handleChangeCity = (e) => {
    this.setState({ city: e.target.value })
  };

  render() {
    const { isShowMore } = this.state;
    const { city } = this.state;
    const { weatherCitys } = this.props;
    return (
      <section className="form">
        <input placeholder='enter weather' onChange={this.handleChangeCity} value={city} />
        {city.length !== 0 &&
          <Link to={`/in/${city}`} className="form__button" onClick={() => this.handleClick(city)}>
            New City
          </Link>}
        {isShowMore &&
          <table className="weather">
            {weatherCitys.list.map((item) => (
              <tr>
                <td className="weather__td">Temperature:{Math.round(item.main.temp)}℃, Date:{item.dt_txt}</td>
              </tr>
            ))}
          </table>
        }
        
        <Link to={`/${ city }`} className="form__button">HOME</Link>
      </section>
    )
  }
}
const mapStateToProps = ({ weatherCitys, thisCity }) => ({
  thisCity: thisCity.thisCity,
  weatherCitys: weatherCitys.weatherCitys,
});
const mapDispatchToProps = (dispatch) => ({
  changeWeatherCity: (weatherFive, thisCity) => dispatch(changeWeatherCity(weatherFive, thisCity)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));
