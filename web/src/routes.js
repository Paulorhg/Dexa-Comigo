import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import MeusChurrascos from './pages/MeusChurrascos'
import Preferencias from './pages/Preferencias'
import Divisao from './pages/Divisao'
import Passado from './pages/Passado'
import Futuro from './pages/Futuro'
import Criar from './pages/Criar'
import Amigos from './pages/Amigos'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Register} />
                <Route path="/logar" component={Login} />
                <Route path="/churrascos" component={MeusChurrascos} />
                <Route path="/passado" component={Passado} />
                <Route path="/preferencias" component={Preferencias} />
                <Route path="/divisao" component={Divisao} />
                <Route path="/futuro" component= {Futuro} />
                <Route path="/criar" component= {Criar} />
                <Route path="/amigos" component= {Amigos} />
            </Switch>
        </BrowserRouter>
    )
}