interface InputProps {
    placeholder : string;
    reference? : any
} 
export function InputBox( props : InputProps){
    return <div>
        <input ref = {props.reference} placeholder={props.placeholder} type={"text"} className="px-4 py-2 border rounded m-2"/>
    </div>
}