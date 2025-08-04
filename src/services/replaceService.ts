
import * as vscode from 'vscode';
import ApiTogetherService from './apiTogetherService';

export type Mapping = {[key: string]:string|object};

class ReplaceService {

    public apiTogetherService:ApiTogetherService = new ApiTogetherService();
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






extractFunctionCalls(code: string): string[] {
  const regex = /(?:\w+\.)*\w+(?=\()/g;
  return code.match(regex) || [];
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

findDeprecatedApis(code: string, mapping:Mapping) {
    const matches = this.extractFunctionCalls(code);
    const results: { original: string; replacement: string }[] = [];
    for (const match of matches) {
        const parts = match.split(".");
        let replacement = this.resolveMapping(parts, mapping);

        if (replacement) {    
            const deleteCount = replacement.split('$').length - 1;
            replacement = (parts.splice(0, parts.length - 1 - deleteCount)).join('.') + '.' + replacement.replace('$', '');            
            results.push({ original: match, replacement });
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

        const replaces = this.findDeprecatedApis(text, mappings);
        const obsoleteUsages:[outdated:string,updated:string][] =
                replaces.map(({original, replacement}) => [original, replacement]);
        

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
		obsoleteUsages.forEach(async ([obsolete, updated]) => {
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
        });

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


export default replaceService;