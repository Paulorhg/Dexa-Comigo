import React, { useState, useEffect } from 'react'

import Template from '../../components/Template' 
import {AiFillPlusSquare} from 'react-icons/ai'
import {FiTrash2} from 'react-icons/fi'
import { useToasts } from 'react-toast-notifications'
import api from '../../services/api'

import './categories.css'

export default function Categories() {

    const { addToast } = useToasts();

    const [categories, setCategories] = useState([]);
    const [name, setName] = useState('');
    const [type, setType] = useState('income');

    useEffect(() => {
        api.get('/api/categories')
            .then(resp => resp.data)
            .then(resp => {
                setCategories(resp)
                console.log(resp);
            })
            .catch(err => {
                addToast(err.message, { appearance: 'error' });
            })
    }, []);

    const handleSubmit = event => {
        event.preventDefault();

        api.post('/api/categories', { name, type })
            .then(resp => resp.data)
            .then(resp => {
                console.log(resp);
                setCategories([...categories, resp]);
                addToast('Categoria cadastrada', { appearance: 'success' });
            })
            .catch(err => {
                console.error(err);
                addToast(err.message, { appearance: 'error' });
            });
    }

    const handleDelete = (event, id) => {
        event.currentTarget.parentNode.remove();
        api.delete('/api/categories/' + id)
        .then(resp => {
            console.log(resp);
            addToast('Categoria deletada', { appearance: 'success' });
        })
        .catch(err => {
            console.error(err.message);
            addToast(err.message, { appearance: 'error' });
        });
    }

    return (
        <Template>
            <div id="categorias">
                <h1>CATEGORIAS</h1>

                <form id="addCat" action="" method="post" onSubmit={handleSubmit}>
                    <label htmlFor="novaCat">Descrição</label><br/>
                    <input id="novaCat" type="text" value={name} onChange={e => setName(e.target.value)} />
                    <br/>
                    <label htmlFor="type">Tipo</label><br/>
                    <div className="inline-radio">                    
                        <div>
                            <input 
                                type="radio" 
                                name="type" 
                                value="income"
                                checked={type === 'income'}
                                onChange={e => setType(e.target.value)}
                            />
                            <label htmlFor="type">Receita</label>
                            <input 
                                type="radio" 
                                name="type" 
                                value="expense"
                                checked={type === 'expense'}
                                onChange={e => setType(e.target.value)}
                            />
                            <label htmlFor="type">Despesa</label>
                        </div>
                        <button type="submit">
                            <AiFillPlusSquare size={32} color="#1AD274" />
                        </button>
                    </div>
                </form>

                <h3>Receitas</h3>
                <ul className="catCadastradas">
                    {categories.filter(cat => cat.type === 'income').map(category => (
                        <li key={category.id} className='income'>
                            <p>{category.name}</p>
                            <button onClick={e => handleDelete(e, category.id)}>
                                <FiTrash2 size={28} color="#FFFFFF"/>
                            </button>
                        </li>
                    ))}
                </ul>
                <h3>Despesas</h3>
                <ul className="catCadastradas">
                    {categories.filter(cat => cat.type === 'expense').map(category => (
                        <li key={category.id} className='expense'>
                            <p>{category.name}</p>
                            <button onClick={e => handleDelete(e, category.id)}>
                                <FiTrash2 size={28} color="#FFFFFF"/>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </Template>
    );
}