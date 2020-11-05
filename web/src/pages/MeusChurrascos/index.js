import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Template from '../../components/Template' 

import api from '../../services/api'
import NavChurrasco from '../../components/NavChurrasco'
import './churrascos.css'

export default function Entrys() {
    const history = useHistory();
    const [ churrascos, setChurrascos ] = useState([]);

    const token = localStorage.getItem('jwt_token');
    const loggedUser = localStorage.getItem('user');
    
    useEffect(() => {
        const token = window.localStorage.getItem('jwt_token');
        const loggedUser = window.localStorage.getItem('user');
        
        if (!token || !loggedUser) {
            history.push('/logar');
            return;
        }

        const user = JSON.parse(loggedUser)
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }, []);

    useEffect(() => {
        console.log(loggedUser);
        const data = api.get('churrascos/', {
            // headers: {
            //     "authorization": 'Bearer '+ token
            // }
        }).then(res => {
            setChurrascos(res.data);
        })
    }, []);

    return (
        <Template id="churrascos">
            <NavChurrasco />

            <div id="lista">
                <ul>
                    {/* {churrascos.map(churrasco => (
                        <li>
                        <strong>Nome:</strong>
                        
                        <strong>Data:</strong>
                    </li>
                    ))} */}
                </ul>
            </div>
        </Template>
    );
}