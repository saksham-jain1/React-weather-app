import React, {useEffect, useState} from 'react'
import { FaTemperatureLow , FaTemperatureHigh  } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { TbGauge } from "react-icons/tb";
import { BsWind } from "react-icons/bs";

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
            console.log(resjson);
            if(resjson.main)
            {
                setData({...resjson.main,speed:resjson.wind.speed});
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
        <div className="card col-xl-6 col-md-8 col-sm-10 container-fluid align-center justify-content-center bg-info shadow-lg my-5 py-5 px-sm-0 px-md-5" style={{borderRadius:'25px'}}>
        <div className="p-auto m-auto col-xl-6 col-md-8 col-sm-8 col-10">
        <input className="form-control" type="search" placeholder='Enter city name' onChange={(e) => {setPlace(e.target.value);setData([]);}} value={place} />
        </div>
                <div className='col-10 py-3 px-1 mx-5 justify-content-end'><h2 style={{textTransform:'capitalize',textAlign:'center'}}><img src={imgUrl} alt='' />{place}
                <br />{weather.description}</h2></div>
                {(place !=='')?
                (data.length!==0)?
                <table className="table table-borderless">
                <tbody>
                <tr>
                <td colSpan="2">
                    <h3 style={{textTransform:'capitalize',textAlign:'center'}}>Temperature: {data.temp}&#xb0;C</h3>
                </td>
                </tr>
                <tr>
                <td>
                    <FaTemperatureLow size={20} /> Min Temp. :&emsp;{data.temp_min}&#xb0;C
                </td>
                <td>
                <FaTemperatureHigh size={20} /> Max Temp. :&emsp;{data.temp_max}&#xb0;C
                </td>
                </tr>
                <tr>
                <td>
                <WiHumidity size={20} /> Humidity :&emsp;{data.humidity}%
                </td>
                <td>
                
                <TbGauge size={20} /> Pressure :&emsp;{data.pressure} hPa
                
                </td>
                </tr>
                <tr>
                <td>
                
                <BsWind size={20} /> Wind Speed :&emsp;{data.speed} m/sec
                
                </td>
                </tr>
                </tbody>
                </table>
                : <h2> No Data Found</h2>
                : <h2> Please Enter the City </h2>
                }              
        </div>
    );
}

export default Output;


