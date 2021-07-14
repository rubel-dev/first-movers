import React from 'react';
import { useHistory } from 'react-router-dom';
import './Transport.css'

const Transport = (props) => { 
    const {img,transportType,name} = props.vehicles; 

    const history = useHistory()
    const handleTransport =(type)=>{
        history.push(`/transportType/${type}`)
    }
    return (
        <div className='col-md-3'>
            <div className='single-transport'>
                <div onClick={()=>handleTransport(transportType)} className='vehicle'>
                    <img src={img} className='img-fluid' alt="" />
                    <h4 className='ms-5'>{name}</h4>
                </div>
            </div>
            
        </div>
    );
};

export default Transport;