import "./connection.scss"
import React, {Dispatch, SetStateAction, useContext, useState} from "react";
import {ConnectedContext} from "../../pages/App";

interface ConnectionProps {
    setIsConnected: Dispatch<SetStateAction<boolean>>
}

const Connection = ({setIsConnected}: ConnectionProps) => {
    const {setConnection} = useContext(ConnectedContext)

    const [email, setEmail] = useState<string>('')
    const [pwd, setPwd] = useState<string>('')
    const Submit = (e: React.FormEvent<HTMLFormElement>) => {
        setIsConnected(true)
        localStorage.setItem('isConnected', "true")
        e.preventDefault();
        setConnection && setConnection();

    }
    return (
        <form onSubmit={Submit} className="connection-form">
            <div>
                <label>Email :</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label>Mot de passe</label>
                <input type="text" value={pwd} onChange={(e) => setPwd(e.target.value)}/>
            </div>
            <button type="submit">Envoyer</button>
        </form>
    )
}

export default Connection