"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const fse = require("fs-extra");
const fs = require("fs");
const path = require("path");
const changeCase = require("change-case");
const rxjs_1 = require("rxjs");
class FileHelper {
    static createComponent(componentDir, componentName, globalConfig, config) {
        let templateFileName = this.assetRootDir + '/templates/component.template';
        if (config.component.template) {
            templateFileName = this.resolveWorkspaceRoot(config.component.template);
        }
        let componentContent = fs.readFileSync(templateFileName).toString()
            .replace(/{selector}/g, componentName)
            .replace(/{templateUrl}/g, `${componentName}.component.html`)
            .replace(/{styleUrls}/g, `${componentName}.component.${config.css.extension}`)
            .replace(/{className}/g, changeCase.pascalCase(componentName))
            .replace(/{quotes}/g, this.getQuotes(globalConfig));
        let filename = `${componentDir}/${componentName}.component.${config.component.extension}`;
        if (config.component.create) {
            return this.createFile(filename, componentContent)
                .map(result => filename);
        }
        else {
            return rxjs_1.Observable.of('');
        }
    }
    ;
    static createModule(componentDir, componentName, globalConfig, config) {
        let templateFileName = this.assetRootDir + '/templates/module.template';
        if (config.template) {
            templateFileName = this.resolveWorkspaceRoot(config.template);
        }
        let moduleContent = fs.readFileSync(templateFileName).toString()
            .replace(/{componentName}/g, componentName)
            .replace(/{className}/g, changeCase.pascalCase(componentName))
            .replace(/{quotes}/g, this.getQuotes(globalConfig));
        let filename = `${componentDir}/${componentName}.module.${config.extension}`;
        if (config.create) {
            return this.createFile(filename, moduleContent)
                .map(result => filename);
        }
        else {
            return rxjs_1.Observable.of('');
        }
    }
    ;
    static createHtml(componentDir, componentName, config) {
        let templateFileName = this.assetRootDir + '/templates/html.template';
        if (config.template) {
            templateFileName = this.resolveWorkspaceRoot(config.template);
        }
        let htmlContent = fs.readFileSync(templateFileName).toString();
        let filename = `${componentDir}/${componentName}.component.${config.extension}`;
        if (config.create) {
            return this.createFile(filename, htmlContent)
                .map(result => filename);
        }
        else {
            return rxjs_1.Observable.of('');
        }
    }
    ;
    static createCss(componentDir, componentName, config) {
        let templateFileName = this.assetRootDir + '/templates/css.template';
        if (config.template) {
            templateFileName = this.resolveWorkspaceRoot(config.template);
        }
        let cssContent = fs.readFileSync(templateFileName).toString();
        let filename = `${componentDir}/${componentName}.component.${config.extension}`;
        if (config.create) {
            return this.createFile(filename, cssContent)
                .map(result => filename);
        }
        else {
            return rxjs_1.Observable.of('');
        }
    }
    ;
    static createComponentDir(uri, componentName, globalConfig) {
        let contextMenuSourcePath;
        if (uri && fs.lstatSync(uri.fsPath).isDirectory()) {
            contextMenuSourcePath = uri.fsPath;
        }
        else if (uri) {
            contextMenuSourcePath = path.dirname(uri.fsPath);
        }
        else {
            contextMenuSourcePath = vscode.workspace.rootPath;
        }
        let componentDir = `${contextMenuSourcePath}`;
        if (globalConfig.generateFolder) {
            componentDir = `${contextMenuSourcePath}/${componentName}`;
            fse.mkdirsSync(componentDir);
        }
        return componentDir;
    }
    static getDefaultConfig() {
        let content = fs.readFileSync(this.assetRootDir + '/config/config.json').toString();
        content = content.replace(/\${workspaceRoot}/g, vscode.workspace.rootPath);
        return JSON.parse(content);
    }
    static resolveWorkspaceRoot(path) {
        return path.replace('${workspaceRoot}', vscode.workspace.rootPath);
    }
    static getQuotes(config) {
        return config.quotes === "double" ? '"' : '\'';
    }
}
FileHelper.createFile = rxjs_1.Observable.bindNodeCallback(fse.outputFile);
FileHelper.assetRootDir = path.join(__dirname, '../../assets');
exports.FileHelper = FileHelper;
//# sourceMappingURL=FileHelper.js.map