'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const changeCase = require("change-case");
const rxjs_1 = require("rxjs");
const FileHelper_1 = require("./FileHelper");
const _ = require("lodash");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.genAngular2ComponentFiles', (uri) => {
        // The code you place here will be executed every time your command is executed
        let configPrefix = 'ng2ComponentGenerator';
        let _workspace = vscode.workspace;
        let defaultConfig = FileHelper_1.FileHelper.getDefaultConfig();
        let userConfig = _workspace.getConfiguration((configPrefix + '.config'));
        let config;
        if (userConfig) {
            config = _.assign(config, defaultConfig, userConfig);
        }
        // Display a dialog to the user
        let enterComponentNameDialog$ = rxjs_1.Observable.from(vscode.window.showInputBox({ prompt: 'Please enter component name in camelCase' }));
        enterComponentNameDialog$
            .concatMap(val => {
            if (val.length === 0) {
                throw new Error('Component name can not be empty!');
            }
            let componentName = changeCase.paramCase(val);
            let componentDir = FileHelper_1.FileHelper.createComponentDir(uri, componentName, config.global);
            return rxjs_1.Observable.forkJoin(FileHelper_1.FileHelper.createComponent(componentDir, componentName, config.global, config.files), FileHelper_1.FileHelper.createHtml(componentDir, componentName, config.files.html), FileHelper_1.FileHelper.createCss(componentDir, componentName, config.files.css), FileHelper_1.FileHelper.createModule(componentDir, componentName, config.global, config.files.module));
        })
            .concatMap(result => rxjs_1.Observable.from(result))
            .filter(path => path.length > 0)
            .first()
            .concatMap(filename => rxjs_1.Observable.from(vscode.workspace.openTextDocument(filename)))
            .concatMap(textDocument => {
            if (!textDocument) {
                throw new Error('Could not open file!');
            }
            ;
            return rxjs_1.Observable.from(vscode.window.showTextDocument(textDocument));
        })
            .do(editor => {
            if (!editor) {
                throw new Error('Could not open file!');
            }
            ;
        })
            .subscribe(() => vscode.window.setStatusBarMessage('Component Successfuly created!'), err => vscode.window.showErrorMessage(err.message));
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map