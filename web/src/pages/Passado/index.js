import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Template from '../../components/Template' 
import NavChurrasco from '../../components/NavChurrasco'
import api from '../../services/api'

import './passado.css'

export default function Passado() {
    const [ churrascos, setChurrascos ] = useState([]);
    const history = useHistory();
    
    const loggedUser = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('jwt_token');

    useEffect(() => {
        if (!token || !loggedUser) {
            history.push('/logar');
            return;
        }
    }, []);

    useEffect(() => {
        api.get('churrascos', {}).then(response => {
            setChurrascos(response.data);
        })
    }, [loggedUser]);
    return (
        <Template>
            <NavChurrasco />
        </Template>
    );
}