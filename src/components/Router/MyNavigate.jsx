import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MyNavigate = ({to}) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    }, []);
    return (
        <div/>
    );
};

export default MyNavigate;