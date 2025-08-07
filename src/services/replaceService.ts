
import * as vscode from 'vscode';
import ApiTogetherService from './apiTogetherService';
import OpenAiService from './openaiService';
import { match } from 'assert';

export type Mapping = {[key: string]:string|object};

class ReplaceService {

    public apiTogetherService:ApiTogetherService = new ApiTogetherService();
    public openaiService:OpenAiService = new OpenAiService();
    constructor() { }



    async replaceFile(aproach:Aproach, mappings:Mapping, editor:vscode.TextEditor  ) {      
        await this.$replace('file', aproach, mappings, editor)
    }


	async replaceSelection(aproach:Aproach, mappings:Mapping, editor:vscode.TextEditor  ) {      
        await this.$replace('selection', aproach,mappings, editor)
    }


    splitText(text:string):string[] {
        const characters:string[] = ['=', '\n', '\t', ];
        let result:string[] = [text];

        characters.forEach(c => {
            result = result
                        .map(str => 
                            str.split(c)
                        ).flat();
        })

        result = result
                .map(str => str.trim())
                .filter(str => str !== '');

        return result;
    }






extractFunctionCalls(lines:string[]): Match[] {
  const regex = /(?:\w+\.)*\w+(?=\()/g;

  const result:Match[] = [];
  lines.forEach((text, line) => {
    const matches = [...text.matchAll(regex)];
    for (const match of matches)
        result.push({ call:match[0], line });
  });

  return result;
}

resolveMapping(pathParts: string[], mappingObj: any): string | null {
  let current = mappingObj;
  for (let i = 0; i < pathParts.length; i++) {
    const part = pathParts[i];

    if (i === pathParts.length - 1) {
      if (typeof current === "object" && current[part]) {
        return typeof current[part] === "string" ? current[part] : null;
      }
    } else {
      if (typeof current === "object" && current[part]) {
        current = current[part];
      } else {
        return null;
      }
    }
  }

  return null;
}

findDeprecatedApis(matches:Match[], mapping:Mapping):Replace[] {
    const set:Set<string> = new Set();
    matches.forEach(match => set.add(match.call));
    const uniqueCalls:string[] = Array.from(set);

    const results:Replace[] = [];
    for (const call of uniqueCalls) {
        const parts = call.split(".");
        let updated = this.resolveMapping(parts, mapping);

        if (updated) {    
            const deleteCount = updated.split('$').length - 1;
            updated = (parts.splice(0, parts.length - 1 - deleteCount)).join('.') + '.' + updated.replace('$', '');            
            results.push({ outdated: call, updated });
        }
    }
    return results;
}




cleanCodeBlock(text: string): string {
  const codeBlockRegex = /^```(?:\w+)?\n([\s\S]*?)\n```$/;
  const match = text.match(codeBlockRegex);
  return match ? match[1] : text;
}









    async $replace(target:'file'|'selection', aproach:Aproach, mappings:Mapping, editor:vscode.TextEditor) {
        const document:vscode.TextDocument = editor.document;
        const text = target==='file'? document.getText():  document.getText(editor.selection);
        const selection = editor.selection;

		type Replacement = {
			range: vscode.Range;
			obsolete: string;
			updated: string;
		};

        const lines:string[] = text.split('\n');
        let matches:Match[] = this.extractFunctionCalls(lines);
        const replaces:Replace[] = this.findDeprecatedApis(matches, mappings);
        const outdatedMatches = matches.filter(match => replaces.some(({outdated,}) =>  match.call === outdated));

        switch(aproach) {
            case 'INSERT_PROMPT':
                outdatedMatches.reverse().forEach((match:Match) => {
                    const outdated = match.call;
                    const updated = replaces.find(replace => replace.outdated === match.call)?.updated;
                    const prompt = `# "${outdated}" is deprecated, use "${updated}" instead and, revise the return value and arguments.`;
                    lines.splice(match.line, 0, prompt);
                });
                break;
            case 'REPLACE_API':
                outdatedMatches.reverse().forEach((match:Match) => {
                    const outdated = match.call;
                    const updated = replaces.find(replace => replace.outdated === match.call)?.updated;
                    
                    const line = lines[match.line];
                    const indexOf = line.indexOf(outdated);

                    lines[match.line] = indexOf !== -1
                        ? line.slice(0, indexOf) + updated
                        : line;
                });
                break;
        }

        let response!:string;
        switch(aproach) {
            case 'INSERT_PROMPT':
                response = await this.openaiService.postMessage(lines.join('\n'));
                break;
            case 'REPLACE_API':
                response = await this.openaiService.postMessage('# complete the remaining parameters from the code bellow.\n' + lines.join('\n'));
                break;
        }

        const message = this.cleanCodeBlock(response);
        const fullRange = new vscode.Range( document.positionAt(0), document.positionAt(document.getText().length));
        await editor.edit(editBuilder => { editBuilder.replace(fullRange, message); });
				
		if(outdatedMatches.length)
			vscode.window.showInformationMessage(`${outdatedMatches.length} chamadas à APIs atualizadas.`);
		else 
			vscode.window.showInformationMessage(`Não há usos de API obsoletas.`);
    }

}



const replaceService:ReplaceService = new ReplaceService();

type Match = {
    call: string;
    line: number;
}

type Replace = {
    outdated: string;
    updated: string;
}

type Aproach = ('INSERT_PROMPT' | 'REPLACE_API');

export default replaceService;