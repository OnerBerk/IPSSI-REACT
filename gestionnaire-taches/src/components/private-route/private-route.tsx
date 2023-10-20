import {Navigate} from "react-router-dom";

interface PrivateRouteProps {
    isConnected: boolean
    children: any
}

const PrivateRoute = ({isConnected, children}: PrivateRouteProps) => {
if (!isConnected){
    return <Navigate to={"/"}/>
}
return children
}
export default PrivateRoute