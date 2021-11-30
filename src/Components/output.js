import React, {useEffect, useState} from 'react'

function Output()
{
    const [temp,setTemp]=useState('No Data Found');
    const [place,setPlace]=useState('Jhansi'); 
    
    
    useEffect(()=>{
        const getWeather = async () => {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=metric&appid=6b211ad57ccbde222a34f29288667216`;
            const response = await fetch(url);
            const resjson = await response.json();
            console.log(resjson);
            const main = resjson.main; 
            if(main)
            {
                setTemp(main.temp);
            }
            else
            {
                setTemp('No Data Found');
            }
        }
        getWeather();
    },[place]);

    return  (
        <center>
        <div className="card bg-primary m-5 p-3 col-sm-5 shadow-lg">
        <div className="p-2 mb-4">
        <input className="form-control me-2" type="search" onChange={(e) => {setPlace(e.target.value)}} value={place} />
        </div>
                <>
                <div><h2> {place}</h2></div>
                <div><h3>Temperature: {temp}</h3></div>                    
                </>
        </div>
        </center>
    );
}

export default Output;


