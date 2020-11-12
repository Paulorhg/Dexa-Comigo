import React, { useState, useEffect } from 'react'

import Template from '../../components/Template'
import api from '../../services/api'

import './criar.css'


export default function Criar() {

    const loggedUser = window.localStorage.getItem('user');
    const [ itens, setItens ] = useState([]);


    useEffect(() => {
        try {
            api.get('itens', {}).then(res => {
                setItens(res.data);
            })
        } catch (error) {
            
        }
    }, [loggedUser]);
    
    // function handleSubmit(e){
    //     e.preventDefault();

    //     const data = {
    //         name,
    //         date
            
    //     }
    // }
    
    return (
        <Template>
            <div id="criar">
                <div id="header">
                    <h1 >CRIAR CHURRASCO</h1>
                </div>
                <div>
                    {/* <form onSubmit={handleSubmit} className="create-churrasco">

                    </form> */}
                </div>
            </div>
            
        </Template>
    );
}