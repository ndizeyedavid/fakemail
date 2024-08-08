import { useEffect, useState } from "react"
import Sender from "./Sender"
import Message from "./Message"
const Body = ({ count, msg, loading, empty }) => {
    const [bodyMessage, setbodyMessage] = useState(<div className="w-full h-full flex items-center justify-center"><p>Select a message</p></div>);
    const [active, setActive] = useState(-1);

    return (
        <div className="flex flex-row card m-7 mx-20 h-[600px] border-2 p-1">
            <div className="flex flex-col h-full p-3 w-72 bg-gray-50 text-gray-800">
                <div className="space-y-3 h-full overflow-auto">
                    <div className="flex items-center justify-between">
                        <button className="w-full flex items-center justify-between p-2">
                            <h2 className="text-lg font-bold">Messages</h2>
                            <div className="badge badge-primary">{count}</div>
                        </button>
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center py-4">
                            <button type="submit" className="p-2 focus:outline-none focus:ring">
                                <svg fill="currentColor" viewBox="0 0 512 512" className="w-5 h-5 text-gray-600">
                                    <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
                                </svg>
                            </button>
                        </span>
                        <input type="search" name="Search" placeholder="Search..." className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none bg-gray-100 text-gray-800 focus:bg-gray-50" />
                    </div>
                    <div className="flex-1">
                        <ul className="pt-2 pb-4 space-y-1">
                            {/* <Sender email="davidndizeye101@gmail.com" subject="lorem ipsum dore mi fasola tiko dimo" onClick={(e) => { e.preventDefault(); setbodyMessage(<Message email="davidndizeye101@gmail.com" subject="lorem ipsum dore mi fasola tiko dimo" date="Aug 6, 2024, 3:23 PM" msg="lorem ipsum" />) }} /> */}
                            {msg.map((mes, id) => <Sender key={id} id={id} active={active} email={mes.from} subject={mes.subject} onClick={(e) => { setActive(id); e.preventDefault(); setbodyMessage(<Message email={mes.from} subject={mes.subject} date={mes.timestamp} msg={mes.message} />) }} />)}
                            {empty ? <div role="alert" className="alert"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info h-6 w-6 shrink-0"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg> <span>Empty inbox.</span> </div> : null}
                            {loading ? <div className="flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div> : null}
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="bg-black border-2 h-full" />
            {/* Message body */}
            <div id="body" className="card m-2 shadow-sm w-full h-[98%] overflow-auto">
                {bodyMessage}
            </div>
        </div>
    )
}

export default Body
