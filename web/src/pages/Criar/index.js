import React, { useState, useEffect } from 'react'

import Template from '../../components/Template'
import api from '../../services/api'

import './criar.css'


export default function Criar() {

    const data = new FormData();



    function handleSubmit(e){
        e.preventDefault();
    }
    
    return (
        <Template>
            <div id="criar">
                <div id="header">
                    <h1 >CRIAR CHURRASCO</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit} className="create-churrasco">

                    </form>
                </div>
            </div>
            
        </Template>
    );
}