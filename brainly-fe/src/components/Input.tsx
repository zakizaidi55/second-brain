interface inputInterface {
    placeholder:string
    reference ?: any
    textType?: any 
}

export function Input({reference,placeholder, textType}: inputInterface) {
    return <div>
        <input placeholder={placeholder} ref={reference} type={textType} className="px-20 py-2 border rounded m-2 text-center" ></input>
    </div>
}