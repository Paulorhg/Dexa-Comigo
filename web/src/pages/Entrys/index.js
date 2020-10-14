import React, { useState, useEffect } from 'react'

import Template from '../../components/Template' 

import api from '../../services/api'

import './entrys.css'

export default function Entrys() {

    const [ entries, setEntries ] = useState([]);

    useEffect(() => {
        // const data = api.get('/entry')
    }, []);

    return (
        <Template id="entrys">
            <h1>Histórico de lançamentos</h1>

            
        </Template>
    );
}