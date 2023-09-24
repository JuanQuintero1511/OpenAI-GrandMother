
'use client'
import React from 'react'
import { useChat } from 'ai/react'

export default function Chat () {
    const { messages, input, handleInputChange, handleSubmit } = useChat()

    return (
        <div className = "flex flex-col max-w-xl px-8 mx-auto grid place-content-center h-screen">
            {
                messages.map(messages => {
                   return(
                    <div key={messages.id}>
                        <p>{messages.content}</p>
                    </div>
                   ) 
                })
            }

            <form onSubmit={handleSubmit}>
                <label>
                    Escribe a la abuelita para conocer su consejo:
                </label>
                <input type='text' name='content' value={input} onChange={handleInputChange}></input>
            </form>
        </div>
    )
}