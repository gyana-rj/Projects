import { useEffect, useRef, useState } from 'react'
import './App.css'
import { WEBSOCKETSERVER_URL } from './config'

function App() {
  const [messages, setMessages] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')
  const wsRef = useRef<WebSocket>(null)

  useEffect(() => {
    const ws = new WebSocket(WEBSOCKETSERVER_URL)
    wsRef.current = ws

    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

    return () => {
      ws.close()
    }
  }, [])

  const handleSend = () => {
    if (inputValue.trim() && wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: "chat",
        payload: {
          message: inputValue,
          roomId: "red"
        }
      }))
      setInputValue('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className='h-screen bg-gray-100 flex flex-col'>
      {/* Header */}
      <div className='bg-white border-b border-gray-200 px-4 py-3'>
        <h1 className='text-lg font-semibold text-gray-800'>Chat</h1>
      </div>

      {/* Messages */}
      <div className='flex-1 overflow-y-auto p-4 bg-white'>
        {messages.length === 0 ? (
          <div className='h-full flex items-center justify-center text-gray-400'>
            No messages yet
          </div>
        ) : (
          <div className='space-y-2'>
            {messages.map((message, index) => (
              <div key={index} className='bg-gray-100 rounded-lg px-4 py-2'>
                <p className='text-sm text-gray-800'>{message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className='bg-white border-t border-gray-200 p-4'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Type a message...'
            className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className='px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed'
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
