import { DeleteIcon } from "../../icons/DeleteIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import axios from "axios";
import { BACKEND_URL } from "../../config";

interface CardProps{
    title : string;
    link : string;
    type : "twitter" | "youtube";
    contentId: string;
    onDelete?: () => void;
}

export function Card(props : CardProps){
    return <div>
        <div className="p-8 bg-white rounded-md border-gray-100 max-w-72 border">
            
            <div className="flex justify-between">
                <div className="flex pr-2 items-center text-md">
                    <div className="text-gray-500 pr-2">
                        <DocumentIcon size = {"md"}/>
                    </div>
                    {props.title}
                </div>
                <div className="flex items-center">
                    <div className="pr-3 text-gray-500 cursor-pointer">
                        <a href={props.link} target="_blank" rel="noopener noreferrer">
                            <ShareIcon size ={"md"}/>
                        </a>
                    </div>
                    {props.onDelete && (
                        <div className="pr-3 text-gray-500 cursor-pointer" onClick={async () => {
                            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                                data: { contentId: props.contentId },
                                headers: { "Authorization": localStorage.getItem("token") }
                            });
                            if (props.onDelete) props.onDelete();
                        }}>
                            <DeleteIcon size ={"md"}/>
                        </div>
                    )}
                </div>
            </div>
            <div className="pt-4">
            {props.type === "youtube" && <iframe className="w-full" src={props.link.replace("watch", "embed").replace("?v=", "/")} 
            title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; 
            clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

            {props.type === "twitter" && <div className="w-full">
                    <blockquote className="twitter-tweet" data-theme="light">
                    <a href={props.link.replace("x.com", "twitter.com")} ></a> 
                </blockquote>
            </div>}

            </div>
        </div>
    </div>
}