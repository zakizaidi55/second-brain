import { ShareIcon } from "../Icons/ShareIcon";

interface CardProps {
    link: string;
    title:string;
    type: "twitter" | "youtube"
}

export function Card({title, link, type} : CardProps) {
    return <div>
        <div className="p-4 bg-white rounded-md shadow border-gray-200 max-w-96">
            <div className="flex justify-between">
                <div className="flex items-center gap-1 pr-2">
                    <div className="text-gray-500">
                        <ShareIcon/>
                    </div>
                    {title}
                </div>

                <div className="flex gap-2 text-gray-500">
                    <ShareIcon/>
                    <ShareIcon/>
                </div>
            </div>
        </div>
    </div>
}