import { Dashboard } from "./pages/DashBoard"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
import { SharedBrain } from "./pages/SharedBrain"
import { BrowserRouter, Routes, Route } from "react-router-dom"



function App(){
    return <BrowserRouter>
        <Routes>
            <Route path="/signup" element = {<SignUp/>} />
            <Route path="/signin" element = {<SignIn/>} />
            <Route path="/dashboard" element = {<Dashboard/>} />
            <Route path="/brain/:shareLink" element = {<SharedBrain/>} />
        </Routes>
    </BrowserRouter>
}

export default App