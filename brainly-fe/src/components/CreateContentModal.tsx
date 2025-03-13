
import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";

export function CreateContentModal({open, onClose}:any) {
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
                            <Input placeholder={"Title"} />
                            <Input placeholder={"Link"} />
                            <div className="flex justify-center rounded-md">
                                <Button variant="primary" text="Submit"/>
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

