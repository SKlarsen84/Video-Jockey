import { ChatGPTAPIBrowser } from "chatgpt";

export async function gptWriteRecap(
  title: string,
  content: string,
  comments: string[]
) {
  // use puppeteer to bypass cloudflare (headful because of captchas)
  const api = new ChatGPTAPIBrowser({
    email: process.env.GPT_EMAIL as string,
    password: process.env.GPT_PASSWORD as string,
  });

  console.log("Logging in to chatGPT...");
  await api.initSession();
  console.log("Contacting chatGPT...");
  const result = await api.sendMessage(
    `please write a newscast for a gaming youtube channel.  
    
    ${title} 
    
    ${content}

    comments:
    ${comments}`
  );
  const recap = result.response;

  return {
    script: `
  ${recap}  `,
  };
}
