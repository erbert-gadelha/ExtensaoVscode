
import * as vscode from 'vscode';
import ApiTogetherService from './apiTogetherService';
import OpenAiService from './openaiService';

export type Mapping = {[key: string]:string|object};

class ReplaceService {

    public apiTogetherService:ApiTogetherService = new ApiTogetherService();
    public openaiService:OpenAiService = new OpenAiService();
    constructor() { }



    async replaceFile(mappings:Mapping, editor:vscode.TextEditor  ) {      
        await this.$replace('file', mappings, editor)
    }


	async replaceSelection(mappings:Mapping, editor:vscode.TextEditor  ) {      
        await this.$replace('selection', mappings, editor)
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













    async $replace(target:'file'|'selection', mappings:Mapping, editor:vscode.TextEditor) {
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
        matches = matches.filter(match => replaces.some(({outdated,}) =>  match.call === outdated));
        
        matches.forEach(async (match) => {
            const outdated = match.call;
            const updated = replaces.find(replace => replace.outdated === match.call)?.updated;
            const code = lines.splice(0, match.line+1).join('\n');
            
            const response:string = await this.openaiService.postMessage(
                `# "${outdated}" is deprecated, use "${updated}" instead and, revise the return value and arguments.\n`+
                `${code}`
            );

            console.log({response})
        });


        return;

        /*console.log('matches', matches)
        console.log('replaces', replaces)

        const obsoleteUsages:[outdated:string,updated:string][] =
                replaces.map(({outdated, updated}) => [outdated, updated]);*/
        

        /*await this.apiTogetherService.postMessage2(
            '# COMPLETE THE CODE BELLOW\n'+
            'import torch\n' +
            'A = torch.randn(6, 3)\n' +
            'B = torch.randn(6, 1)\n' +
            'result = torch.linalg.lstsq');*/

        /*console.log(await this.apiTogetherService.postMessage(
            '# {torch.lstsq} is deprecated, use {torch.linalg.lstsq} instead and revise the return value and arguments.n'+
            'import torch\n' +
            'A = torch.randn(6, 3)\n' +
            'B = torch.randn(6, 1)\n' +
            'result = torch.lstsq(A, B)'
        ));*/

        
    	const replacements: Replacement[] = [];
		/*obsoleteUsages.forEach(async ([obsolete, updated]) => {
            const regex = new RegExp(`\\b${obsolete}\\b`, 'g');
            let match;

            while ((match = regex.exec(text)) !== null) {
                if(target === 'file') {
                    const start = document.positionAt(match.index);
                    const end = document.positionAt(match.index + obsolete.length);
                    replacements.push({ range: new vscode.Range(start, end), obsolete, updated });
                } else {
                    const offset = document.offsetAt(selection.start) + match.index;
                    const start = document.positionAt(offset);
                    const end = document.positionAt(offset + obsolete.length);
                    replacements.push({
                        range: new vscode.Range(start, end),
                        obsolete,
                        updated
                    });
                }
            }
        });*/

		// ALTERA DE BAIXO PARA CIMA, OU TERIA PROBLEMA COM OS INDEXES
		replacements.reverse();
		for (const { range, obsolete, updated } of replacements) {
            await editor.edit(editBuilder => {
                editBuilder.replace(range, updated);
            });
		}
				
		if(replacements.length)
			vscode.window.showInformationMessage(`${replacements.length} chamadas à APIs atualizadas.`);
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

export default replaceService;