import React, { useState, useEffect } from 'react'

import Template from '../../components/Template' 

import api from '../../services/api'

import './churrascos.css'

export default function Entrys() {

    const [ churrascos, setChurrascos ] = useState([]);

    useEffect(() => {
        const data = api.get('/churrascos/')
    }, []);

    return (
        <Template id="churrascos">
            <h1>Meus Churrascos</h1>
            <div>
                
            </div>
        </Template>
    );
}