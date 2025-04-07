
import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

export function CreateContentModal({open, onClose}:any) {

    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube)
    
    async function addContent() {
        const title = titleRef?.current?.value;
        const link = linkRef?.current?.value

        if(!title || !link) {
            alert("Please add content");
            return;
        }

        await axios.post(`${BACKEND_URL}/api/v1/content` ,{
            title,
            link,
            type
        }, {
            headers : {
                "Authorization" : localStorage.getItem("token")
            } 
        })

        onClose();
    }

    return <div>
        {open && <div> 
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">   
            </div>
            <div className="w-screen h-screen fixed top-0 left-0 flex justify-center">
                <div className="flex justify-center items-center">
                    <span className="bg-white opacity-100 p-4 rounded-md fixed">
                        <div className="flex justify-end">
                            <div onClick={onClose} className="cursor-pointer">
                                <CrossIcon />
                            </div>
                        </div>
                        <div>
                            <Input reference={titleRef} placeholder={"Title"} />
                            <Input reference={linkRef} placeholder={"Link"} />
                            <div className="flex justify-around mb-2 transition-all duration-1000">
                                {/* add button for youtube/twitter */}
                                <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"}
                                onClick={() => setType(ContentType.Youtube)}/>
                                <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"}
                                onClick={() => setType(ContentType.Twitter)}
                                />
                            </div>
                            <div className="flex justify-center rounded-md">
                                <Button onClick={addContent} variant="primary" text="Submit"/>
                            </div>
                           
                        </div>
                        <div>
                            
                        </div>
                        <div className="flex justify-center">
                            
                        </div>
                    </span>
                </div>     
            </div>
            
        </div>}
    </div>
}

