import React, {useEffect, useState} from 'react'
import { FaTemperatureLow , FaTemperatureHigh } from "react-icons/fa";

function Output()
{
    const [data,setData]=useState([]);
    const [place,setPlace]=useState('jhansi');
    const [imgUrl,setImgUrl]=useState('');
    const [weather,setweather]=useState('');
    useEffect(()=>{
        const getWeather = async () => {
            if(place!=='')
            {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=6b211ad57ccbde222a34f29288667216`;
            const response = await fetch(url);
            const resjson = await response.json();
            const weather = resjson.weather;
            if(resjson.main)
            {
                setData(resjson.main);
                setweather(weather[0])
                setImgUrl(`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`);
            }
            else
            {
                setData([]);
                setweather('');
                setImgUrl('');
            }
        }
        }
        getWeather();
    },[place]);

    return  (
        <div className="card col-md-6 container-fluid align-center justify-content-center bg-info shadow-lg my-5 p-5" style={{borderRadius:'25px'}}>
        <div className="p-2 m-2">
        <input className="form-control me-2" type="search" placeholder='Enter city name' onChange={(e) => {setPlace(e.target.value)}} value={place} />
        </div>
                <div className='col-10 p-3 mx-5'><h2 style={{textTransform:'capitalize',textAlign:'center'}}> <img src={imgUrl} alt='' />&emsp; {place}<br />{weather.description}</h2></div>
                {data!==''?
                <table>
                <tbody>
                <tr>
                <td className='col-5'>
                    <h3>Temperature: {data.temp}</h3>
                    <FaTemperatureLow size={20} /> Min Temperature :&emsp;{data.temp_min}
                    <br />
                    <FaTemperatureHigh size={20} /> Max Temperature :&emsp;{data.temp_max}
                </td>
                <td className='col-5'>
                    <h3>Temperature: {data.temp}</h3>
                    <FaTemperatureLow size={20} /> Humidity :&emsp;{data.humidity}
                    <br />
                    <FaTemperatureHigh size={20} /> Pressure :&emsp;{data.pressure}
                </td>
                </tr>
                </tbody>
                </table>
                : <h2> No Data Found </h2>
                }              
        </div>
    );
}

export default Output;


