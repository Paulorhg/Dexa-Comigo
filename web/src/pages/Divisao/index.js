import React, { useState, useEffect } from 'react'

import Template from '../../components/Template' 
import {FiTrash2} from 'react-icons/fi'
import api from '../../services/api'
import { useToasts } from 'react-toast-notifications'

import './divisao.css'

export default function Divisao() {

    const { addToast } = useToasts();
    
    const [ divisao, setDivisao ] = useState([]);
    const [ name, setName ] = useState('');
    const [ balance, setBalance ] = useState(0);

    useEffect(() => {
        
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
  /*      api.post('/api/accounts', { name, balance })
            .then(resp => resp.data)
            .then(resp => {
                setAccounts([...accounts, resp]);
                addToast('Conta adicionada com sucesso', { appearance: 'success' });
            })
            .catch(err => addToast('Erro ao tentar adicionar conta', { appearance: 'error' }))
        */  }

    const handleDelete = (event, id) => {
        event.currentTarget.parentNode.remove();

  /*      api.delete('/api/accounts/' + id)
            .then(resp => {
                addToast('Conta removida com sucesso', { appearance: 'success' });
            })
            .catch(err => addToast('Erro ao tentar remover conta', { appearance: 'error' }))
        */ }
    return (
        <Template>
            <div id="contas">
                <h1>Divisão de contas</h1>

                <form id="addConta" action="" method="post" onSubmit={handleSubmit}>
                    <label htmlFor="nome">Nome da conta</label>
                    <input 
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="saldo">Saldo Inicial</label>
                    <input 
                        type="number" 
                        min="0" 
                        placeholder="R$0,00"
                        value={balance}
                        onChange={e => setBalance(e.target.value)}    
                        required
                    />
                    <button type="submit">Adicionar Conta</button>
                </form>

                <ul id="contasCadastradas">
                    { divisao.map(account => (
                        <li key={account.id}>
                            <p>{account.name}</p>
                            <p id="saldoConta">
                                {new Intl.NumberFormat(
                                    'pt-br', 
                                    { style: 'currency', currency: 'BRL'}
                                ).format(account.balance)}
                            </p>
                            <button type="button" onClick={e => handleDelete(e, account.id)}>
                                <FiTrash2 size={16} color="#a8a8b3" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </Template>
    );
}