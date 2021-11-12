const initState = {
  weatherCitys:{},
  thisCity:'',
}

function reducer(state = initState, action) {
  switch (action.type) {

    case 'FETCH_WEATHER': {
      return {
        weatherCitys: action.payload.weatherFive,
        thisCity: action.payload.weatherFive.city.name,
      }
    }
    case 'CHANGE_WEATHER': {
      return {
        thisCity: action.payload.thisCity,
        weatherCitys: action.payload.weatherFive,
      }
    }
    default: return state;
  }

  

}

export default reducer;