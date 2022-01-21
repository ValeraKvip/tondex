import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Swap from "./pages/swap/Swap";
import Pools from "./pages/Pools";

export const initRouter = ()=> {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Swap />} />
                <Route path="expenses" element={<Pools />} />

            </Routes>
        </BrowserRouter>
    )
}