import replaceService from './services/replaceService';
import pytorch from './mappings/pytorch';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	// HELLO WORLD
	context.subscriptions.push(vscode.commands.registerCommand('replacing-deprecated-apis.helloWorld', () => {
		vscode.window.showInformationMessage('Ler seleçao e mandar para uma llm');
	}));

	// MAPEAMENTO DA APIS
	const mappings = [pytorch];


	// CORRIGIR SELECAO
	context.subscriptions.push(
		vscode.commands.registerCommand('replacing-deprecated-apis.replaceSelection', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;
			replaceService.replaceSelection(mappings, editor);	
		})
	);

	// CORRIGIR ARQUIVO
	context.subscriptions.push(
		vscode.commands.registerCommand('replacing-deprecated-apis.replaceFile', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;
			replaceService.replaceFile(mappings, editor);	
		})
	);

	
}

export function deactivate() {}