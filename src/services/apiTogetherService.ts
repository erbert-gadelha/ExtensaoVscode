import Together from 'together-ai';

const TOGETHER_API_KEY = "87654ae15d2fab07594678c07dd208e3216872d162495c69999a3598b0570879";
const TOGETHER_API_URL = "https://api.together.xyz/v1/completions";
//const MODEL_NAME = 'codellama/CodeLlama-7b-Instruct-hf';
const MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.2";


export default class ApiTogetherService {

    async postMessage (prompt:string):Promise<string> {
        console.warn('sending message');
        const client = new Together({ apiKey: TOGETHER_API_KEY });
        const chatCompletion = await client.chat.completions.create({
            messages: [{ role: 'user', content: prompt }],
            model: MODEL_NAME,
        });
        console.warn('message received');
        return chatCompletion.choices[0].message?.content ?? "";
    }
    
} 



