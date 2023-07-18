import axios from "axios";
import { useEffect, useState } from "react";
// import { RAPID_API_KEY } from '@env';

// const rapidAPIKey = RAPID_API_KEY

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': '2194238450mshbf8d19f4081d17cp11a3abjsn961bbea6cdf4',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options); 

            // console.log(response.data.data[0]);
            setData(response.data.data);
            setError(null);
            setIsLoading(false);
            return;
        } catch (error) {
            console.error(error);
            setError(error);
            alert('There is an error');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refresh = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refresh };
}

export default useFetch;