import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';

const DataFetcher = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/posts')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold">Fetched Data</h1>
            <ul>
                {data.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default DataFetcher;
