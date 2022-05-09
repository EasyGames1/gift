import React from 'react';
import Toggler from '../Toggler/Toggler';
import Navbar from '../Navbar/Navbar';

const GeoEnable = (props) => {
    return (
        <div>
            <span style={{display: "flex", justifyContent: "center", flexWrap: "wrap", marginTop: "200px"}}>
                <span style={{fontWeight: "500", fontSize: "24px", textAlign: "center"}}>Вы отозвали доступ к геолокации.</span>
                <h1 className='material-icons text-center mt-5' style={{fontSize: "64px", width: '100%'}}>location_off</h1>
                <Toggler
                    title="Включить"
                    className="mt-5"
                    checked={props.isGeo}
                    setChecked={props.setIsGeo}
                />
            </span>
         </div>
    );
};

export default GeoEnable;