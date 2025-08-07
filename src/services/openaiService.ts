import 'dotenv/config';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export default class OpenAiService {

    async postMessage (prompt:string):Promise<string> {
        console.log(`sending message:\n'''\n${prompt}\n'''\n`);
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [{
                    role: "system",
                    //content: "Você é um autocompletador de código. Responda apenas com código corrigido ou sugerido. Sem explicações, sem comentários, sem prefixos.",
                    content: "Você é um assistente de codificação que sempre retorna o arquivo .py completo, já corrigido, sem explicações. Mantenha todo o código original, exceto pelas correções necessárias."

                }, {
                    role: "user",
                    content: prompt
                }
            ],
        });
        return chatCompletion.choices[0].message?.content ?? "";
    }
}