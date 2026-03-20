import { useEffect, useRef, useState } from "react"
import { WEBSOCKET_URL } from "./config";

function App(){
  const [socket, setSocket] = useState();
  const inputRef = useRef(null);
  function sendMessage(){
    if(!socket){
      return;
    }
    const inputMessage = inputRef.current?.value;
    //@ts-ignore
    socket.send(inputMessage);
  }
  useEffect(() => {
    const ws = new WebSocket(WEBSOCKET_URL);
    setSocket(ws);
    // This is how you receive a message
    ws.onmessage = ((ev) => {
      alert(ev.data)
    })
  }, []);
  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default App