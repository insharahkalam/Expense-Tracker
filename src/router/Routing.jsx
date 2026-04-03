import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import ErrorPage from '../pages/ErrorPage'

const Routing = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/home" element={<Home />} />
                    <Route path={'*'} element={<ErrorPage />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing
