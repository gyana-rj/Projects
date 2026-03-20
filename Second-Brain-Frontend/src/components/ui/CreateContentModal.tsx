import { useRef, useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import axios from "axios";
import { BACKEND_URL } from "../../config";

enum ContentType {
    Youtube =  "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({open, onClose, onSuccess}){
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube)
    async function addContent(){
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;

        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            link,
            title,
            type
        }, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            }
        })
        onClose();
        if (onSuccess) onSuccess();
    }
    return <div>
        {open && <div className="w-screen h-screen fixed top-0 left-0 bg-black/50 flex justify-center items-center">
            <div className="flex flex-col justify-center">
                <span className="bg-white opacity-100 p-4 rounded">
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer">
                        <CrossIcon size={"md"}/>
                        </div>
                    </div>
                    <div>
                        <InputBox reference={titleRef} placeholder={"Title"}/>
                        <InputBox reference={linkRef} placeholder = {"Link"}/>
                    </div>
                    <h1 className="text-lg font-semibold text-purple-600 drop-shadow-sm mb-3">
                    Type
                    </h1>


                    <div className="flex gap-4 p-4">
                        <Button
                         size="md"
                        text="Youtube"
                        variant={type === ContentType.Youtube ? "primary" : "secondary"}
                        onClick={() => setType(ContentType.Youtube)}
                    />

                    <Button
                        size="md"
                        text="Twitter"
                        variant={type === ContentType.Twitter ? "primary" : "secondary"}
                        onClick={() => setType(ContentType.Twitter)}
                    />
                    </div>


                    <div className="flex justify-center mt-1">
                        <Button variant="primary" size="md" text="Submit" onClick={addContent}/>
                    </div>
                </span>
            </div>
        </div>}
    </div>
}