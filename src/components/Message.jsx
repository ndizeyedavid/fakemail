
const Message = ({ email, subject, date, msg }) => {
    return (
        <div>
            <div className="card-title p-2 flex-col items-start text-sm font-normal border-2" style={{ borderRadius: "10px 10px 0 0" }}>
                <h1 className="text-xl font-bold text-center w-full">{subject}</h1>
                <div className="flex justify-between px-9 w-full">
                    <p>{email}</p>
                    <p>{date}</p>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: msg }} className="card-body p-5" id="bodyMs">
                {/* {msg} */}
            </div>
        </div>
    )
}

export default Message
