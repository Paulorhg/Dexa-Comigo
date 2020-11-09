import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Template from '../../components/Template' 

import api from '../../services/api'
import NavChurrasco from '../../components/NavChurrasco'
import ListChurrasco from '../../components/ListChurrasco'
import './churrascos.css'

export default function Entrys() {
    const history = useHistory();
    const [ churrascos, setChurrascos ] = useState([]);

    const loggedUser = window.localStorage.getItem('user');
    const token = window.localStorage.getItem('jwt_token');

    useEffect(() => {
        if (!token || !loggedUser) {
            history.push('/logar');
            return;
        }
    }, []);

    useEffect(() => {
        try {
            api.get('churrascos', {}).then(res => {
                setChurrascos(res.data);
            })
        } catch (error) {
            
        }
        
    }, [loggedUser]);
    return (
        <Template id="churrascos">
            <NavChurrasco />
            <ListChurrasco churrascos = {churrascos} />
            
        </Template>
    );
}