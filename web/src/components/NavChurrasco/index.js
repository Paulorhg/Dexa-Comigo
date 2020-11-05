import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom';

import api from '../../services/api'

import './navChurrasco.css'

export default function NewChurrasco() {

    const { path } = useRouteMatch();

    return (
        <nav id="top-nav" >
            <h1>Meus Churrascos</h1>
            <ul>
                <li className={path === '/passado' ? 'active' : ''}>
                    <Link to="/passado">Passado</Link>
                </li>
                <li className={path === '/futuro' ? 'active' : ''}>
                    <Link to="/futuro">Futuro</Link>
                </li>
            </ul>
        </nav>
    );
}