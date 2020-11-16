import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom';

import api from '../../services/api'

import './listChurrasco.css'

export default function listChurrasco(churrascos) {

    return (
        <div id="lista">
            <ul>
                { churrascos.churrascos.length !=0 ? churrascos.churrascos.churrascos.map(churrasco => (
                    <li key={churrasco._id}>
                        <Link to={`/churrasco/${churrasco._id}`}>
                            <div id="link">
                                <strong>Nome:</strong>
                                <p>{churrasco.name}</p>
                                <strong>Data:</strong>
                                <p>{churrasco.date}</p>
                            </div>
                        </Link>
                    </li>
                )) : <p>carregando</p>
                }
            </ul>
        </div>
    );
}