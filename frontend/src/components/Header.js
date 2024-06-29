import React from 'react';
import logo from '../Icons/knight.jpg';
import '../App.css';

const Header = () => {
    const headerStyle = {
        position: 'sticky',
        top: '0',
        zIndex: '2',
    };

    return (
        <div className='header' style={headerStyle}>
            <img src={logo} alt="Logo" />
            <p>Chess Player Management Platform</p>
        </div>
    );
};

export default Header;