import React, { useEffect, useState } from 'react';
import Forcast from './Forcast';

const Weather =   () => {
  const [listingWeather, setListingWeather] = useState([]);

  useEffect(() => {
    // l'API ne permet pas d'avoir la prévision des jours suivant dans la query, il faut souscrire à un plan...
    const fetchData = async () => {
        const response = await fetch( `https://api.openweathermap.org/data/2.5/forecast?lang=FR&units=metric&q=toronto&appid=e924461f7ef58beb6c8a678f37f6f475&cnt=32`);
        const data = await response.json();

        // Extraire les informations de la city des données générales..
        const cityInfo = data.city;

        const uniqueDates = Array.from(
        new Set(data.list.map((item) => new Date(item.dt_txt).toDateString()))
      );

      const dailyForecast = uniqueDates.map((date) => {
        // Trouver la première prévision pour chaque date
        const firstForecast = data.list.find(
          (item) => new Date(item.dt_txt).toDateString() === date
        );

        return firstForecast;
      });

      // Ajouter les informations de la ville à chaque prévision quotidienne
      const dailyForecastWithCity = dailyForecast.map((forecast) => ({
        ...forecast,
        city: cityInfo,
      }));

      setListingWeather(dailyForecastWithCity);
    };

    fetchData();
  }, []);

  // Fonction de conversion de format de date comme su maquette
  const formatDateString = (inputDateString) => {
    const date = new Date(inputDateString);
    const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const monthsOfYear = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre',
    ];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const dayOfMonth = date.getDate();
    const month = monthsOfYear[date.getMonth()];

    return `${dayOfWeek} ${dayOfMonth} ${month}`;
  };


  // Des fois on tombe sur une valeur 0 négative
  const temp = Object.is(listingWeather[0] && listingWeather[0]?.main?.temp, -0) ? '0' : listingWeather[0] && listingWeather[0]?.main?.temp.toFixed(0);

  const icon = listingWeather[0] && listingWeather[0]?.weather && listingWeather[0] && listingWeather[0].weather.length > 0 && listingWeather[0] && listingWeather[0].weather[0]?.icon && (listingWeather[0] && listingWeather[0].weather[0]?.icon);

  const description =  listingWeather[0] && listingWeather[0]?.weather &&  listingWeather[0] && listingWeather[0].weather.length > 0 &&  listingWeather[0] && listingWeather[0].weather[0]?.description && ( listingWeather[0] && listingWeather[0].weather[0]?.description);

  return (
    <>
      {
        <div className='Weather__Container'>
          <div className="Weather__Wrapper">
            <div className="Weather__BoxData col--eq-height">
              <div className="Weather__Data">
                <div className="Weather__DataTop">
                    <h1 className="Weather__City">
                      { listingWeather[0] && listingWeather[0].city?.name}
                    </h1>
                    <p className="Weather__Date">
                    {formatDateString( listingWeather[0] && listingWeather[0].dt_txt)}
                    </p>
                </div>

                <div className="Weather__DataCenter">
                    <p className="Weather__Temp">  {temp} C° </p>
                  <p className="Weather__TempMiddle">  { listingWeather[0] && listingWeather[0].main.temp_min } / { listingWeather[0] && listingWeather[0].main.temp_max } C°</p>
                  <div className='Weather__State'>
                    <img src={`http://openweathermap.org/img/w/${icon}.png`} className='Weather__IconState' alt="Weather icon" />
                    <p> { description } </p>
                  </div>
                </div>
                <div className="Weather__DataBottom">
                  <p className='Weather__Wind'>Vent: <span>{ listingWeather[0] && listingWeather[0].wind?.speed } km/h </span></p>
                  <p className='Weather__Humidity'>Humidité: <span> { listingWeather[0] && listingWeather[0].main?.humidity } %</span></p>
                </div>
              </div>
              <div className="Weather__Img">
                <img src={`http://openweathermap.org/img/w/${icon}.png`} className='Weather__IconState' alt="Weather icon" />
              </div>
            </div>
            <div className="Weather__Forcast">
              <ul className="Weather__ForcastList">
                <Forcast formatDateString={formatDateString} data={listingWeather} />
              </ul>
            </div>
          </div>
        </div>
     }
    </>
  )
}

export default Weather