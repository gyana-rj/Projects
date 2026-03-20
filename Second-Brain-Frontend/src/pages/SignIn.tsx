import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { InputBox } from "../components/ui/InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function SignIn(){
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    async function signin(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })
        const jwt = response.data.token;
        localStorage.setItem("token", jwt);
        //redirect the user to the dashboard
        navigate("/dashboard")
    }


    return <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
        <div className="bg-white rounded-xl border min-w-48 p-8">
            <InputBox reference={usernameRef} placeholder="Username" />
            <InputBox reference={passwordRef} placeholder="Password" />
            <div className="flex justify-center mt-4">
                <Button onClick={signin} variant="primary" size="md" text="SignIn" fullWidth = {true} loading = {false}/>
            </div>
        </div>
    </div>
}