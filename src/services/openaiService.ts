import 'dotenv/config';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});




export default class OpenAiService {

    async postMessage (prompt:string):Promise<string> {
        console.log(`sending message:\n"${prompt}"`);
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{
                    role: "system",
                    content: "Você é um autocompletador de código. Responda apenas com código corrigido ou sugerido. Sem explicações, sem comentários, sem prefixos.",
                }, {
                    role: "user",
                    content: prompt
                }
            ],
        });

        console.log('message received');
        return chatCompletion.choices[0].message?.content ?? "";
    }
}