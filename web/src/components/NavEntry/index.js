import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom';

import api from '../../services/api'

import './navEntry.css'

export default function NewEntry() {

    const { path } = useRouteMatch();


    return (
        <nav>
            <h1>Adicionar Lançamento</h1>
            <ul>
                <li className={path === '/receita' ? 'active' : ''}>
                    <Link to="/receita">Receita</Link>
                </li>
                <li className={path === '/despesa' ? 'active' : ''}>
                    <Link to="/despesa">Despesa</Link>
                </li>
                <li className={path === '/transferencia' ? 'active' : ''}>
                    <Link to="/transferencia">Transferencia</Link>
                </li>
            </ul>
        </nav>

    );
}