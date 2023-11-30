import React from 'react'

const Forcast = ({ data, formatDateString }) => {
   // Afficher les 4 jours suivants
   const forcastNextDays = data.slice(1);
  return (
     <>
        {
           forcastNextDays.map(item => (
               <li className="Weather__ForcastItem">
                 <p className="Weather__ForcastDay">{formatDateString(item.dt_txt)}</p>
                 <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} className='Weather__ForcastIcon' alt="Weather icon" />
                 <p>{ item.weather[0]?.description }</p>
                 <p>{ item.main.temp_min } / { item.main.temp_max }</p>
              </li>
           ))
        }
    </>
  )
}

export default Forcast