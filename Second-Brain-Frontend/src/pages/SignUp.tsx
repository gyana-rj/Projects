import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { InputBox } from "../components/ui/InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignUp(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        console.log({ username, password });
       await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password
    })
    navigate("/signin")
    alert("You have signed up")
}

    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <InputBox reference={usernameRef} placeholder="Username" />
            <InputBox reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center mt-4">
                <Button variant="primary" size="md" text="SignUp" fullWidth = {true} 
                loading = {false} onClick={signup}/>
            </div>
        </div>
    </div>
}