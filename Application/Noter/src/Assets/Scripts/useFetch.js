import { useState, useEffect } from "react";

const useFetch = (url, pathToData=null) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const abortController = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortController.signal})
            .then(res => {
                if(!res.ok){
                    throw Error('could not fetch the data for this resource');
                }
                console.log(res);
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if(data && pathToData){
                    data = extractData(data, pathToData);
                }

                setData(data);
                // isPending = false
                setIsPending(false);
                setError(null);
            })
            .catch(err => {
                if(err.name === 'AbortError'){
                    console.log('fetch aborted');
                }
                else{
                    setIsPending(false);
                    setError(err.message);
                }
            })
        }, 1000);

        //only runs when user changes page that used this hook
        return () => {abortController.abort();}; 
    }, [url])
    return {data, isPending, error};
}

function extractData(data, path){
    const properties = path.split('.');

    let res = data;
    for(let i = 0; i < properties.length; i++){
        if(properties[i]) res = res && res[properties[i]];
    }
    
    console.log(res);

    return res;
}

export default useFetch;