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

        const SQLKeyWords = ["select", "from", "where", "inner", "natural", "join", "outer", "right", "left", "full", "having", "as", "create", "view", "is", "null", "on", "using", "count", "not", "like", "and", "or", "order", "by", "group", "desc", "union", "with", "distinct", "add", "constraint", "alter", "coloumn", "table", "all", "any", "asc", "database", "between", "case", "check", "index", "replace", "procedure", "unique", "default", "delete", "drop", "exec", "exists", "foreign", "from", "in", "insert", "into", "limit", "primary", "key", "rownum", "set", "top", "trunctate", "update", "values"];
        let editor = vscode.window.activeTextEditor;
        if (editor != undefined) {
            let document = editor.document;
            let text = document.getText();
            let lineArray = [];
			let newLineArray = [];
			
			// creates line array
            for (let index = 0; index < document.lineCount; index++) {
                lineArray.push(document.lineAt(index));
			}
			
			let string : boolean = false;	// check if in string
            for (let index = 0; index < lineArray.length; index++) {
                let lineText = lineArray[index].text;
                let textArray = lineText.split(" ");
				let newTextArray = [];
                
				let comment : boolean = false;	// check if comment line
                for (let index2 = 0; index2 < textArray.length; index2++) {
                    let word = textArray[index2];
					
					if (word.startsWith("--")) {comment = true;}
					if (word.startsWith("'") && word.length != 1) {string = true;}
                    if (word.endsWith("'") && word.length != 1) {string = false;}
                    if (word.replace(";", "").endsWith("'")) {string = false;}
					if (word === "'") {string = !string}
					
                    if (SQLKeyWords.includes(word.replace(";", "").toLowerCase()) && !comment && !string) {
                        newTextArray.push(word.toUpperCase());
                    }
                    else {
                        newTextArray.push(word);
                    }
                }
                let newText = "";
                for (let index2 = 0; index2 < newTextArray.length; index2++) {
                    const word = newTextArray[index2];
                    newText += word + " ";
                }
                newText = newText.slice(0, newText.length - 1);
                newText += "\n";
                newLineArray.push(newText);
            }
            let newText = "";
            for (let index = 0; index < newLineArray.length; index++) {
                newText += newLineArray[index];
			}
			
			//removes last linebreak
            newText = newText.slice(0, newText.length - 1);
            //deletes old text and inserts new
            editor.edit(editBuilder => {
                editBuilder.delete(new vscode.Range(document.positionAt(0), document.positionAt(text.length)));
                let beginning = new vscode.Position(0, 0);
				editBuilder.insert(beginning, newText);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
