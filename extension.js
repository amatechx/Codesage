const vscode = require('vscode');
const axios = require('axios');

// You would need to replace this with your actual AI API endpoint
const AI_API_ENDPOINT = 'YOUR_AI_API_ENDPOINT';

function getWebviewContent(message) {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AI Assistant Response</title>
        <style>
            body { 
                padding: 20px;
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            }
            pre {
                background-color: #f5f5f5;
                padding: 10px;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div>${message}</div>
    </body>
    </html>`;
}

function activate(context) {
    console.log('AI Assistant is now active!');

    // Register the askAI command
    let askAIDisposable = vscode.commands.registerCommand('aiassistant.askAI', async () => {
        try {
            const editor = vscode.window.activeTextEditor;
            if (!editor) {
                vscode.window.showInformationMessage('No active text editor found');
                return;
            }

            const selection = editor.selection;
            const text = editor.document.getText(selection);

            if (!text) {
                vscode.window.showInformationMessage('Please select some code or text to ask about');
                return;
            }

            const question = await vscode.window.showInputBox({
                placeHolder: "What would you like to know about this code?",
                prompt: "Ask AI Assistant"
            });

            if (!question) return;

            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "AI Assistant is thinking...",
                cancellable: false
            }, async (progress) => {
                try {
                    // Mock API call - replace with actual AI service integration
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    const panel = vscode.window.createWebviewPanel(
                        'aiResponse',
                        'AI Assistant Response',
                        vscode.ViewColumn.Beside,
                        {}
                    );

                    panel.webview.html = getWebviewContent("This is a mock response. In a real implementation, this would be the AI's analysis of your code.");
                } catch (error) {
                    vscode.window.showErrorMessage('Error getting AI response: ' + error.message);
                }
            });
        } catch (error) {
            vscode.window.showErrorMessage('Error: ' + error.message);
        }
    });

    // Register the generateCode command
    let generateCodeDisposable = vscode.commands.registerCommand('aiassistant.generateCode', async () => {
        try {
            const prompt = await vscode.window.showInputBox({
                placeHolder: "Describe the code you want to generate",
                prompt: "Generate Code with AI"
            });

            if (!prompt) return;

            await vscode.window.withProgress({
                location: vscode.ProgressLocation.Notification,
                title: "Generating code...",
                cancellable: false
            }, async (progress) => {
                try {
                    // Mock API call - replace with actual AI service integration
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    
                    const editor = vscode.window.activeTextEditor;
                    if (editor) {
                        editor.edit(editBuilder => {
                            editBuilder.insert(editor.selection.start, 
                                '// Generated code would be inserted here\n' +
                                '// Replace this with actual AI-generated code\n' +
                                'function example() {\n' +
                                '    console.log("Hello from AI!");\n' +
                                '}\n'
                            );
                        });
                    }
                } catch (error) {
                    vscode.window.showErrorMessage('Error generating code: ' + error.message);
                }
            });
        } catch (error) {
            vscode.window.showErrorMessage('Error: ' + error.message);
        }
    });

    context.subscriptions.push(askAIDisposable, generateCodeDisposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
