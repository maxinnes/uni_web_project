import {useParams,useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function VerificationIndex(){
    let navigate = useNavigate()
    const [errorMessage,setErrorMessage] = useState("Loading...")
    const params = useParams()
    //const verificationCode = params.verificationCode
    //setErrorMessage(verificationCode)
    useEffect(()=>{
        const verificationCode = params.verificationCode
        console.log(verificationCode)
        const myHeaders = new Headers();
        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`/api/email/verifyEmailAddress.php?vc=${verificationCode}`, requestOptions)
            .then(async response => {
                const jsonResponse = await response.json()
                switch(jsonResponse.messageType){
                    case "SUCCESS":
                        navigate("/finishAccountSetup")
                        break
                    case "ERROR":
                        setErrorMessage(jsonResponse.message)
                        break
                    default:
                        setErrorMessage("Something went wrong")
                }
            })
            .catch(error => console.log('error', error));
    },[])

    return <div className="row">
        <div className="col">
            <h1>Verification Page</h1>
            <p>{errorMessage}</p>
        </div>
    </div>
}