import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Template from '../../components/Template' 
import NavChurrasco from '../../components/NavChurrasco'
import ListChurrasco from '../../components/ListChurrasco'
import api from '../../services/api'

import './futuro.css'

export default function Futuro() {
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
        try {
            var dataHoje = PegaDataAtual();

            api.get(`churrascos/futuro/${dataHoje}`, {}).then(res => {
                setChurrascos(res.data);
                //console.log(res.data);
            })
        } catch (error) {
            
        }
        
    }, [loggedUser]);


    function PegaDataAtual(){
        var dataAtual = new Date();
        var dataFormatada = dataAtual.getFullYear() + "-" + dataAtual.getMonth() + "-" + dataAtual.getDay();
        return dataFormatada;
    }


    return (
        <Template>
            <NavChurrasco />
            <ListChurrasco churrascos = {churrascos}/>
        </Template>
    );
}