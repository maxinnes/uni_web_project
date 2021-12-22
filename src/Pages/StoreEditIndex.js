import {useParams} from "react-router-dom";
import {useEffect} from "react";

export default function StoreEditIndex(){
    const params = useParams()

    useEffect(()=>{
        console.log(params)
    })

    return <div className="pt-3 pb-2 mb-3 border-bottom">
        <h2>Store Management</h2>
    </div>
}