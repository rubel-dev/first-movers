import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import './Destination.css'
import fakeData from '../../fakeData/fakeData'
import people from '../../images/peopleicon.png'
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocationOnIcon from '@material-ui/icons/LocationOn'; 

const Destination = () => {
     const[destination, setDestination] = useState({});
     const [location, setLocation] = useState({
         isTransportDetail:false,
         isTransportForm:true
     })
    const {type} = useParams()
    useEffect(()=>{
        const data = fakeData;
        const transport = data.find(info => info.transportType === type)
         setDestination(transport)
    },[]) 
    
    const handleSubmit =(e)=>{  
        const startInput = document.getElementById('start').value;
        const endInput = document.getElementById('end').value;
         const newLocation = {startInput, endInput, isTransportDetail:true,idTransportForm:false}
         setLocation(newLocation)
        e.preventDefault()
    }
     
    return (
        <div className='container'>
            <Header isUserAvailable ={true}></Header> 
          <div className='row'>
            <div className='col-md-5'>
            {
                location.isTransportForm &&
                <div className='form'>
                <form action="">
                        <label>Pick From</label>
                        <input  type="text" name='from' id='start' className='form-control' required />
                        <label>Pick To</label>
                        <input type="text" name='to' id='end' className='form-control' required/>
                        <input type="submit" onClick={handleSubmit} className='btn btn-dark form-control' value='Search'/>
                </form>
                </div>
            }
                {location.isTransportDetail &&
                    <div className="transport-detail form">
                    <div className='location'>
                        <div className='d-flex align-items-center '>
                            <MyLocationIcon/>
                            <h4 className='ms-2'>{location.startInput}</h4>
                        </div>
                        <div className='d-flex align-items-center mt-2'>
                            <LocationOnIcon/> 
                            <h4 className='ms-2'>{location.endInput}</h4>
                        </div> 
                    </div>
                    <div className="col-12">
                    <div className="p-3  text-style d-flex  align-items-center justify-content-between">
                        <div className='d-flex align-items-center justify-content-between'>
                        <img className='destination-img mx-1' src={destination.img} alt="" />
                            <h5 className = 'mx-3 mt-1'>{destination.name}</h5>
                            <img className='people-img mx-2' src={people} alt="" />
                            <h5 className='mt-1'>2</h5>
                        </div>
                            <div> 
                                <h5>$70</h5>
                            </div> 
                    </div>
                    <div className="p-3 mt-3 text-style d-flex  align-items-center justify-content-between">
                        <div className='d-flex align-items-center justify-content-between'>
                        <img className='destination-img mx-1' src={destination.img} alt="" />
                            <h5 className = 'mx-3 mt-1'>{destination.name}</h5>
                            <img className='people-img mx-2' src={people} alt="" />
                            <h5 className='mt-1'>4</h5>
                        </div>
                            <div> 
                                <h5>$90</h5>
                            </div> 
                    </div> 
                    <div className="p-3 mt-3 text-style d-flex  align-items-center justify-content-between">
                        <div className='d-flex align-items-center justify-content-between'>
                        <img className='destination-img mx-1' src={destination.img} alt="" />
                            <h5 className = 'mx-3 mt-1'>{destination.name}</h5>
                            <img className='people-img mx-2' src={people} alt="" />
                            <h5 className='mt-1'>5</h5>
                        </div>
                            <div> 
                                <h5>$100</h5>
                            </div> 
                    </div> 
                    </div>
                </div>
                }
              </div>
             <div className="col-md-7 google_map">
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3749245.2713778643!2d92.15710884062497!3d23.410913435810663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sbn!2sbd!4v1600916539692!5m2!1sbn!2sbd" className="map" frameborder="0" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe> 
             </div>
           </div>
        </div>
    );
};

export default Destination;