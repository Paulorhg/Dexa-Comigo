import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Entrys from './pages/Entrys'
import Categories from './pages/Categories'
import Accounts from './pages/Accounts'
import Income from './pages/Income'
import Expense from './pages/Expense'
import Transfer from './pages/Transfer'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Register} />
                <Route path="/logar" component={Login} />
                <Route path="/lançamentos" component={Entrys} />
                <Route path="/receita" component={Income} />
                <Route path="/categorias" component={Categories} />
                <Route path="/contas" component={Accounts} />
                <Route path="/despesa" component= {Expense} />
                <Route path="/transferencia" component= {Transfer} />
            </Switch>
        </BrowserRouter>
    )
}