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
}];

module.exports = class extends generator {
  prompting() {
    this.log.writeln(chalk.bold.yellow('\n→ INITIAL SETTINGS'));

    return this.prompt(questions).then(function (answers) {
      this.answers = answers;

      this.answers.projectNameDash = this.answers.projectName.replace(/\W/g, '-').toLowerCase();
      this.answers.projectNameUnderscore = this.answers.projectName.replace(/\W/g, '_').toLowerCase();

    }.bind(this));
  }

  configuring() {
    this.log.writeln(chalk.bold.yellow('\n→ SETTING FILES'));

    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath(this.answers.projectNameDash),
      { globOptions: { dot: true } }
    );

    this.destinationRoot(this.answers.projectNameDash);

    this.fs.copyTpl(
      this.templatePath('.env'),
      this.destinationPath('.env'),
      {
        projectName: this.answers.projectName,
        projectNameDash: this.answers.projectNameDash,
        projectNameUnderscore: this.answers.projectNameUnderscore
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectName: this.answers.projectName
      }
    );

    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      {
        projectName: this.answers.projectName,
        projectNameDash: this.answers.projectNameDash,
        projectNameUnderscore: this.answers.projectNameUnderscore
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        projectName: this.answers.projectName,
        projectNameDash: this.answers.projectNameDash,
        projectNameUnderscore: this.answers.projectNameUnderscore
      }
    );
  }

  writing() { }

  install() {
    if (!this.options.skipInstall && !this.options['skip-install']) {
      this.log.writeln(chalk.bold.yellow('\n→ INSTALLING PREREQUISITES'));

      this.spawnCommandSync('docker-compose', ['up' , '--detach', '--force-recreate']);

      this.npmInstall();
      this.bowerInstall();
    }
  }

  end() {
    this.log.writeln(chalk.bold.yellow('\n→ SCAFFOLD COMPLETED'));
    this.log.writeln(chalk.bold.green('\n→ PLUGIN FOLDER: ' + this.answers.projectNameDash + '/\n'));
  }
};
