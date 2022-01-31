import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Swap from "./pages/swap/Swap";
import {Pool} from "./pages/pools/Pool";

export const initRouter = ()=> {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Swap />} />
                <Route path="expenses" element={<Pool />} />

            </Routes>
        </BrowserRouter>
    )
}