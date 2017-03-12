'use strict';

var util      = require('util')
  , path      = require('path')
  , chalk     = require('chalk')
  , generator = require('yeoman-generator');

var questions = [{
  name    : 'projectName',
  type    : 'input',
  message : 'Project name?',
  default : 'myProject',
},{
  name    : 'doVersioning',
  type    : 'confirm',
  message : 'Do versioning?',
  default : false
},{
  name    : 'versionEnvironment',
  type    : 'list',
  message : 'Versioning environment?',
  choices : ['github.com', 'bitbucket.org'],
  when    : function(answers){ return answers.doVersioning === true }
},{
  name    : 'Owner',
  type    : 'input',
  message : 'Owner repository?',
  default : 'user',
  when    : function(answers){ return answers.doVersioning === true }
}];

module.exports = class extends generator {
  prompting() {
    this.log.writeln(chalk.bold.yellow('\n→ INITIAL SETTINGS'));

    return this.prompt(questions).then(function (answers) {
      this.answers = answers;
      this.answers.folderName = this.answers.projectName.replace(/\W/g, '-').toLowerCase();
    }.bind(this));
  }

  configuring() {
    this.log.writeln(chalk.bold.yellow('\n→ SETTING FILES'));

    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath(this.answers.folderName),
      { globOptions: { dot: true } }
    );

    this.destinationRoot(this.answers.folderName);

    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      { projectName: this.answers.folderName }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { projectName: this.answers.folderName }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { projectName: this.answers.projectName }
    );
  }

  writing() { }

  install() {
    if (!this.options.skipInstall && !this.options['skip-install']) {
      this.log.writeln(chalk.bold.yellow('\n→ INSTALLING DEPENDENCIES'));

      this.npmInstall();
      this.bowerInstall();
    }
  }

  end() {
    if (this.answers.doVersioning === true) {
      this.log.writeln(chalk.bold.yellow('\n→ INSTALLING GIT'));

      var repository = 'git@'+ this.answers.versionEnvironment +':'+ this.answers.Owner +'/'+ this.answers.projectName  +'.git';

      this.spawnCommandSync('git', ['init']);
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repository]);
      this.spawnCommandSync('git', ['add', '--all']);
      this.spawnCommandSync('git', ['commit', '-m', '"initial commit"']);
    }

    this.log.writeln(chalk.bold.yellow('\n→ SCAFFOLD COMPLETED'));
    this.log.writeln(chalk.bold.green('\n→ PLUGIN FOLDER: ' + this.answers.uniqueIdentifier + '/\n'));
  }
};
