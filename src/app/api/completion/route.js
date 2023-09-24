
import { Configuration, OpenAIApi } from "openai-edge"
import { OpenAIStream, StreamingTextResponse } from "ai"
//Le decimos a Vercel donde queremos ejecutar este Enpoint
//Crear el cliente de OpenAI

export const runtime = 'edge'

// -> Edge tiene mejor rendimiento
// y soporta streaming de datos

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(config)

export async function POST(request) {
    const response = await openai.createChatCompletion({
        model:'gpt-3.5-turbo',
        stream: true,
        messages: [
            {
                role: "system",
                content: "Comportate como mi abuela regañadome por no asistir a la universidad hoy"
            },
            {
                role: "user",
                content: "Abuela no me encuentro bien para ir a la universidad"
            }
        ],
        max_tokens:500,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1
    })
    
    //Ttansformar la respuesta de OpenAi en un text-stream

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}
