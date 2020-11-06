import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom';

import api from '../../services/api'

import './listChurrasco.css'

export default function listChurrasco(churrascos) {

    return (
        <div id="lista">
            {console.log(churrascos)}
            <ul>
                { churrascos.churrascos.length !=0 ? churrascos.churrascos.churrascos.map(churrasco => (
                    <li>
                        <strong>Nome:</strong>
                        <p>{churrasco.name}</p>
                        <strong>Data:</strong>
                        <p>{churrasco.date}</p>
                    </li>
                )) : <p>carregando</p>
                }
            </ul>
        </div>
    );
}