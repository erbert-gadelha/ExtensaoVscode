import Together from 'together-ai';

const TOGETHER_API_KEY = "87654ae15d2fab07594678c07dd208e3216872d162495c69999a3598b0570879";
const TOGETHER_API_URL = "https://api.together.xyz/v1/completions";
//const MODEL_NAME = 'codellama/CodeLlama-7b-Instruct-hf';
const MODEL_NAME = "meta-llama/Llama-3.3-70B-Instruct-Turbo";


export default class ApiTogetherService {

    async postMessage (prompt:string):Promise<string> {
        console.warn(`sending message:\n"${prompt}"`);
        const client = new Together({ apiKey: TOGETHER_API_KEY });
        const chatCompletion = await client.chat.completions.create({
            messages: [{
                    role: "system",
                    content: "Você é um assistente de codificação que sempre retorna o arquivo .py completo, já corrigido, sem explicações. Mantenha todo o código original, exceto pelas correções necessárias."

                }, {
                    role: "user",
                    content: prompt
                }
            ],
            model: MODEL_NAME,
        });
        console.warn('message received');
        return chatCompletion.choices[0].message?.content ?? "";
    }
    
} 



