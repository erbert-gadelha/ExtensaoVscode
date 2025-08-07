import replaceService from './services/replaceService';
import { Mapping } from './services/replaceService';

import numpy from './mappings/numpy';
import pandas from './mappings/pandas';
import scipy from './mappings/scipy';
import seaborn from './mappings/seaborn';
import sklearn from './mappings/sklearn';
import tensorflow from './mappings/tensorflow';
import torch from './mappings/torch';
import transformers from './mappings/transformers';


import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	// MAPEAMENTO DA APIS
	const mapping:Mapping = {
		numpy,
		pandas,
		scipy,
		seaborn,
		sklearn,
		tensorflow,
		torch,
		transformers
	};

	// HELLO WORLD
	context.subscriptions.push(vscode.commands.registerCommand('replacing-deprecated-apis.helloWorld', () => {
		vscode.window.showInformationMessage('Ler seleçao e mandar para uma llm');
	}));


	// CORRIGIR SELECAO INSERT PROMPT
	context.subscriptions.push(
		vscode.commands.registerCommand('replacing-deprecated-apis.insertPromptSelection', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;
			replaceService.replaceSelection('INSERT_PROMPT', mapping, editor);
		})
	);

	// CORRIGIR SELECAO REPLACE API
	context.subscriptions.push(
		vscode.commands.registerCommand('replacing-deprecated-apis.replaceApiSelection', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;
			replaceService.replaceSelection('REPLACE_API', mapping, editor);
		})
	);




	// CORRIGIR ARQUIVO  INSERT PROMPT
	context.subscriptions.push(
		vscode.commands.registerCommand('replacing-deprecated-apis.insertPromptFile', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;
			replaceService.replaceFile('INSERT_PROMPT', mapping, editor);
		})
	);

	// CORRIGIR ARQUIVO REPLACE API
	context.subscriptions.push(
		vscode.commands.registerCommand('replacing-deprecated-apis.replaceApiFile', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;
			replaceService.replaceFile('REPLACE_API', mapping, editor);
		})
	);	
}

export function deactivate() {}