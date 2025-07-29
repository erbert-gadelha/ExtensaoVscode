
import * as vscode from 'vscode';

type Mappings = ([string, string][])[];

class ReplaceService {

    async replaceFile(mappings:Mappings, editor:vscode.TextEditor  ) {      
        await this.$replace('file', mappings, editor)
    }


	async replaceSelection(mappings:Mappings, editor:vscode.TextEditor  ) {      
        await this.$replace('selection', mappings, editor)
    }



    async $replace(target:'file'|'selection', mappings:Mappings, editor:vscode.TextEditor) {
        const document:vscode.TextDocument = editor.document;
        const text = target==='file'? document.getText():  document.getText(editor.selection);
        const selection = editor.selection;

		type Replacement = {
			range: vscode.Range;
			obsolete: string;
			updated: string;
		};

    	const replacements: Replacement[] = [];
		
		mappings.forEach(mapping => {
			mapping.forEach(async ([obsolete, updated]) => {
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