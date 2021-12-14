import { useState, useEffect } from 'react';
import axios from 'axios';

export const API_ENDPOINT = 'https://localhost:4001/api/todoitems';
export const useTodoEvents = () => {
    const [description, setDescription] = useState('');
    const [items, setItems] = useState([]);
    const [error, setErrors] = useState('');

    useEffect(() => {
        getItems();
    }, []);

    const handleDescriptionChange = (event) => {
        setErrors('');
        setDescription(event.target.value);
    }

    async function getItems() {
        setErrors('');
        axios.get(API_ENDPOINT)
        .then(resp => {
            setItems(resp.data);
        })
        .catch(({ response }) => {
            setErrors(response?.data);
        });
    }

    async function handleAdd() {
        setErrors('');
        axios.post( API_ENDPOINT, { description } )
        .then(resp => {
            if(resp.status === 201) {
                setDescription('');

            }
        })
        .catch((error) => {
            console.log(error);
            setErrors(error?.response?.data);
        });
    }

    function handleClear() {
        setErrors('');
        setDescription('')
    }

    async function handleMarkAsComplete({ id }) {
        setErrors('');
        axios.put(`${API_ENDPOINT}/${id}`, { id, isCompleted: true })
        .then(resp => {
            getItems();
        })
        .catch(({ response }) => {
            setErrors(response?.data);
        });
    }

    return {
        description,
        items,
        error,
        getItems,
        handleAdd,
        handleClear,
        handleDescriptionChange,
        handleMarkAsComplete,
    }
}
