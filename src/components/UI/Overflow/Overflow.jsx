import React from 'react';
import Navbar from '../Navbar/Navbar';
import Modals from '../Modals/Modals';

const Overflow = (props) => {
    return (
        <div>
            <Navbar
              theme={props.theme}
              setTheme={props.setTheme}
              isGeo={props.isGeo}
              coords={props.coords}
            />
            <Modals
              theme={props.theme}
              setTheme={props.setTheme}
              isGeo={props.isGeo}
              setIsGeo={props.setIsGeo}
              AgentModalGeo={props.AgentModalGeo}
              setAgentModalGeo={props.setAgentModalGeo}
            />
        </div>
    );
};

export default Overflow;