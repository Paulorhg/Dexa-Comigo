import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications'

import api from '../../services/api'

import './side-menu.css';

export default function Accounts() {

    const history = useHistory();
    const { addToast } = useToasts();
    const { path } = useRouteMatch();
    
    const [ showSummary, setShowSummary ] = useState(true);
    const [ name, setName ] = useState('');
    const [ summary, setSummary ] = useState(0);
    
    // token & user
    useEffect(() => {
        const token = window.localStorage.getItem('jwt_token');
        const loggedUser = window.localStorage.getItem('user');
        
        if (!token || !loggedUser) {
            history.push('/logar');
            return;
        }

        const user = JSON.parse(loggedUser)
        setName(user.name.split(' ')[0]);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }, []);

    // summary
    useEffect(() => {
        const storageShowSummary = window.localStorage.getItem('showSummary');  
        const boolValue = storageShowSummary === 'true' || storageShowSummary === null;
        setShowSummary(boolValue);

        api.get('/api/accounts')
            .then(resp => resp.data)
            .then(resp => {
                // token expired
                if (resp.hasOwnProperty('valid') && !resp.valid) {
                    window.localStorage.clear();
                    history.push('/logar');
                    return;
                }
                const accounts = resp.Accounts;
                const total = accounts.reduce((total, account) => total + account.balance, 0);
                setSummary(total);
            })
            .catch(err => {
                addToast('Falha ao tentar obter saldo total', { appearance: 'error' });
            })
    }, []);

    return (
        <aside id="side-menu">
            <section className="menu-header">
                <h1>Deixa Comigo</h1>
                <p>Bem vindo, {name}</p>
            </section>
            <nav>
                <ul>
                    <li className={path === '/lançamentos' ? 'active' : ''}>
                        <Link to="/lançamentos">MEUS CHURRASCOS</Link>
                    </li>
                    <li className={path === '/receita' ? 'active' : ''}>
                        <Link to="/receita">DIVISÃO DE CONTAS</Link>
                    </li>
                    <li className={path === '/contas' ? 'active' : ''}>
                        <Link to="/contas">CRIAR CHURRASCO</Link>
                    </li>
                    <li className={path === '/categorias' ? 'active' : ''}>
                        <Link to="/categorias">PREFERÊNCIAS</Link>
                    </li>
                    <li className={path === '/categorias' ? 'active' : ''}>
                        <Link to="/categorias">AMIGOS</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}