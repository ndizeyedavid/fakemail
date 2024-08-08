
const Sender = ({ id, email, subject, onClick, active }) => {
    // console.log(key)
    return (
        <div>
            <li className={active == id ? "rounded-sm text-gray-900 bg-gray-200" : "rounded-sm text-gray-900 hover:bg-gray-200"}>
                <a rel="noopener noreferrer" href="#" onClick={onClick} className="flex flex-col gap-2 p-2 rounded-md">
                    <h2 className="text-lg font-semibold">{email}</h2>
                    <span className="flex items-center space-x-1">
                        <p className="text-xs hover:underline text-gray-600">{subject}</p>
                    </span>
                </a>
            </li>
        </div >
    )
}

export default Sender
