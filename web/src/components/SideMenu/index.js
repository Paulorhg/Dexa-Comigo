import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

import api from '../../services/api'

import './side-menu.css';

export default function Accounts() {

    const history = useHistory();
    const { addToast } = useToasts();
    const { path } = useRouteMatch();
    
    const [ name, setName ] = useState('');
    
    // token & user
    useEffect(() => {
        const token = localStorage.getItem('jwt_token');
        const loggedUser = localStorage.getItem('user');
        
        if (!token || !loggedUser) {
            history.push('/logar');
            return;
        }

        const user = JSON.parse(loggedUser)
        setName(user.name.split(' ')[0]);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }, []);

    // summary
    const handleLogout = (e) => {
        localStorage.clear();

        history.push('/logar');
    };

    return (
        <aside id="side-menu">
            <section className="menu-header">
                <h1>Deixa Comigo</h1>
                <p>Bem vindo, {name}</p>
            </section>
            <nav>
                <ul>
                    <li className={path === '/churrascos' ? 'active' : ''}>
                        <Link to="/churrascos">MEUS CHURRASCOS</Link>
                    </li>
                    <li className={path === '/divisao' ? 'active' : ''}>
                        <Link to="/divisao">DIVISÃO DE CONTAS</Link>
                    </li>
                    <li className={path === '/criar' ? 'active' : ''}>
                        <Link to="/criar">CRIAR CHURRASCO</Link>
                    </li>
                    <li className={path === '/preferencias' ? 'active' : ''}>
                        <Link to="/preferencias">PREFERÊNCIAS</Link>
                    </li>
                    <li className={path === '/amigos' ? 'active' : ''}>
                        <Link to="/amigos">AMIGOS</Link>
                    </li>
                </ul>

                <div className = "menu-footer">
                    <button type="button" onClick={e => handleLogout(e)}>
                        Sair
                    </button>
                </div>
                
            </nav>
        </aside>
    );
}