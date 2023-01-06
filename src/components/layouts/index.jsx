import { Outlet } from "react-router-dom";
import Footer from "./footer";
import Header from "./header";



function Layout(props) {
    return (
        <>
            <Header />
        
            <Outlet />

            <Footer/>
        </>
    )
}


export default Layout;

