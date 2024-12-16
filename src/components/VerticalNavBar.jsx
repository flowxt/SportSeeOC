import React from 'react';
import yoga from '../assets/icon.png';
import swim from '../assets/icon-2.png';
import bike from '../assets/icon-3.png';
import fitness from '../assets/icon-4.png';



const VerticalNavBar = () => {
    return (
        <div className='container-navVertical'>
            <img src={yoga} alt="icone de yoga"/>
            <img src={swim} alt="icone de nage"/>
            <img src={bike} alt="icone de vélo"/>
            <img src={fitness} alt="icone de fitness"/>
            <p>Copyright SportSee 2024</p>
        </div>
    );
};

export default VerticalNavBar;