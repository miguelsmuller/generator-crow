'use strict';

var util   = require('util');
var path   = require('path');
var yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
    constructor: function () {
        yeoman.Base.apply(this, arguments);
    },

    prompting: function() {
        this.log.writeln('\n→ INITIAL SETTINGS');

        return this.prompt([{
            type: 'input',
            name: 'projectName',
            message: 'Project name?',
            default: 'project'
        },{
            type: 'list',
            name: 'versionEnvironment',
            message: 'Versioning environment?',
            choices: ['github.com', 'bitbucket.org', 'none']
        },{
            type: 'input',
            name: 'Owner',
            message: 'Owner repository?',
            default: 'user'
        }]).then(function (bootAnswers) {
            this.bootAnswers = bootAnswers
        }.bind(this));
    },

    configuring: function() {
        this.log.writeln('\n→ INSTALLING');

        this.fs.copy(
            this.templatePath('**'),
            this.destinationPath(this.bootAnswers.projectName),
            { globOptions: { dot: true } }
        );

        this.destinationRoot(this.bootAnswers.projectName);
    },

    writing: {
        app: function () {
            this.log.writeln('\n→ SETTING FILES');

            this.fs.copyTpl(
                this.templatePath('bower.json'),
                this.destinationPath('bower.json'),
                { projectName: this.bootAnswers.projectName }
            );

            this.fs.copyTpl(
                this.templatePath('package.json'),
                this.destinationPath('package.json'),
                { projectName: this.bootAnswers.projectName }
            );

            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'),
                { projectName: this.bootAnswers.projectName }
            );
        },
    },

    install: {
        installDependencies: function () {
            if (!this.options.skipInstall && !this.options['skip-install']) {
                this.log.writeln('\n→ INSTALLING DEPENDENCIES');

                this.npmInstall();
                this.bowerInstall();
            }
        },
    },

    end: function() {
        if (this.bootAnswers.versionEnvironment != 'none') {
            this.log.writeln('\n→ INSTALLING GIT');

            var repository = 'git@'+ this.bootAnswers.versionEnvironment +':'+ this.bootAnswers.Owner +'/'+ this.bootAnswers.projectName  +'.git';

            this.spawnCommandSync('git', ['init']);
            this.spawnCommandSync('git', ['remote', 'add', 'origin', repository]);
            this.spawnCommandSync('git', ['add', '--all']);
            this.spawnCommandSync('git', ['commit', '-m', '"initial commit"']);
        }

        this.log.writeln('\n→ SCAFFOLD COMPLETED');
    },
});
