export function weatherCity(weatherFive) {
  return {
    type: 'FETCH_WEATHER',
    payload: { weatherFive }
  }
}
export function changeWeatherCity(weatherFive, thisCity) {
  return {
    type: 'CHANGE_WEATHER',
    payload: { weatherFive, thisCity }
  }
}