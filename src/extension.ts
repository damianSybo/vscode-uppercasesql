// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable : vscode.Disposable = vscode.commands.registerCommand('extension.SQLuppercase', () => {
		// The code you place here will be executed every time your command is executed

		let SQLKeyWords : string[] = ["select","from","where","inner","natural","join","outer","right","left","full","having","as","create","view","is","null","on","using","count","not","like","and","or","order","by","group","desc","union","with","distinct","add","constraint","alter","coloumn","table","all","any","asc","database","between","case","check","index","replace","procedure","unique","default","delete","drop","exec","exists","foreign","from","in","insert","into","limit","primary","key","rownum","set","top","trunctate","update","values"];
		let editor : vscode.TextEditor | undefined = vscode.window.activeTextEditor;

		if (editor != undefined) {
			let document : vscode.TextDocument = editor.document;
			let text : string = document.getText();
			let lines : string[] = text.split("\n");
			let newLines : string[] = [];
			let newText : string = "";
			

			for (let i = 0; i < lines.length; i++) {
				let tempText = lines[i];
				for (let j = 0; j < SQLKeyWords.length; j++) {
					tempText = tempText.replace(SQLKeyWords[j] + " ", SQLKeyWords[j].toUpperCase() + " ");
				}
				newLines.push(tempText);
			}

			for (let i = 0; i < newLines.length; i++) {
				newText += newLines[i] + "\n";
			}

			newText = newText.slice(0, newText.length-1);

			editor.edit(editBuilder => {
				editBuilder.delete(new vscode.Range(document.positionAt(0), document.positionAt(text.length)));
				let beginning : vscode.Position = new vscode.Position(0, 0);
				editBuilder.insert(beginning, newText);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
