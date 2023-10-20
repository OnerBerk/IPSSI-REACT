import React, {createContext, useEffect, useState} from 'react';
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Connection from "../components/connection/connection";
import Layout from "../components/layout/layout";
import Dashboard from "../components/dashboard/dashboard";
import TaskList from "../components/task-list/task-list";
import Task from "../components/task/task";
import PrivateRoute from "../components/private-route/private-route";

export interface IConnectionContext {
    isConnected: boolean;
    setConnection?: () => void;
}

const defaultState = {
    isConnected: false
}
export const ConnectedContext = createContext<Partial<IConnectionContext>>(defaultState)

function App() {
    const navigate = useNavigate();
    const location = useLocation()
    const l = localStorage.getItem('isConnected')
    const [isConnected, setConnected] = useState(l !== null && l.includes('true'))
    const setConnection = () => setConnected(true)
    const setDeconnect = () => {
        localStorage.removeItem('isConnected')
        setConnected(false)
    }

    useEffect(() => {
        !isConnected && l !== null && l.includes('true') && setConnected(true)
    }, [l, isConnected])
    useEffect(() => {
        if (l !== null && l.includes('true')) {
            if (!location.pathname.includes("/task")) {
                isConnected && navigate("/dashboard")
            }
        } else {
            navigate("/")
        }
    }, [isConnected, l])

    return (
        <ConnectedContext.Provider value={{isConnected, setConnection}}>
            <div className="App">
                {isConnected && <button onClick={setDeconnect}>deconnection</button>}
                <Layout>
                    <Routes>
                        <Route path="/dashboard"
                               element={<PrivateRoute isConnected={isConnected}><Dashboard/> </PrivateRoute>}/>
                        <Route path="/tasks"
                               element={<PrivateRoute isConnected={isConnected}><TaskList/> </PrivateRoute>}/>
                        <Route path="/task/:id"
                               element={<PrivateRoute isConnected={isConnected}><Task/> </PrivateRoute>}/>
                        <Route path={'/'} element={<Connection setIsConnected={setConnection}/>}/>
                    </Routes>
                </Layout>
            </div>
        </ConnectedContext.Provider>
    );
}

export default App;
