import {ReactNode} from "react";
import "./layout.scss"

interface LayoutProps {
    children: ReactNode
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div className="layout-main">
            {children}
        </div>
    )
}
export default Layout