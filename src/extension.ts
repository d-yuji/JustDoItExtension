// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "justdoitextension" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	context.subscriptions.push(
		vscode.commands.registerCommand('extension.justdoit', () => {
			const panel = vscode.window.createWebviewPanel(
				'justDoIt',
				'Just Do It',
				vscode.ViewColumn.One, {}
			);
			const onDiskGifPath = vscode.Uri.file(
				path.join(context.extensionPath, 'src/media/', 'JustDoIt.gif')
			);
			const onDiskCSSPath = vscode.Uri.file(
				path.join(context.extensionPath, 'src/style/', 'style.css')
			);
			const justDoItGifsrc = onDiskGifPath.with({ scheme: 'vscode-resource' });
			const csssrc = onDiskCSSPath.with({ scheme: 'vscode-resource' });

			panel.webview.html = getWebviewContent(justDoItGifsrc, csssrc);
			// Display a message box to the user
			vscode.window.showInformationMessage('Just Do It!');
		})
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }

function getWebviewContent(justDoItsrc: vscode.Uri, csssrc: vscode.Uri) {

	return `<!DOCTYPE html>
  <html lang="en">
  <head>
	  <meta charset="utf-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge">
	  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src vscode-resource:; style-src vscode-resource:;">
	  <title>Just Do It</title>
	  <link rel="stylesheet" href="${csssrc}">
  </head>
  <body>
	<h1>Just Do It</h1>
	<div class="container">
		<img src="${justDoItsrc}" class="gif-image">
	</div>
  </body>
  </html>`;
}
