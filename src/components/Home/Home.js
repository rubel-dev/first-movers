import React, { useEffect, useState } from 'react';
import backgroundImg from '../../images/Bg.png'
import Header from '../Header/Header';
import Transport from '../Transport/Transport';
import './Home.css' 
import fakeData from '../../fakeData/fakeData'

const Home = () => {
    const [vehicles, setVehicles] = useState([])

    useEffect(()=>{ 
        const transportInfo = fakeData
         setVehicles(transportInfo)
    },[])
    return (
        <div className='home' style={{ backgroundImage: `url(${backgroundImg})` }}>
            <div className="container"> 
              <Header isUserAvailable ={false}></Header>

              <div className="row same-style">
                  {
                      vehicles.map(vehicle => <Transport vehicles = {vehicle}></Transport>)
                  }
                 
              </div>
            </div>
        </div>
    );
};

export default Home;