interface inputInterface {
    placeholder:string
    reference ?: any
}

export function Input({reference,placeholder}: inputInterface) {
    return <div>
        <input placeholder={placeholder} ref={reference} type={"text"} className="px-4 py-2 border rounded m-2" ></input>
    </div>
}