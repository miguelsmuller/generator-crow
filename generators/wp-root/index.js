'use strict';

var util      = require('util')
  , path      = require('path')
  , chalk     = require('chalk')
  , rndstr    = require('randomstring')
  , generator = require('yeoman-generator');

var questions = [{
  type    : 'input',
  name    : 'projectName',
  message : 'Project name?',
  default : 'myWordPress'
}];

module.exports = class extends generator {
  prompting() {
    this.log.writeln(chalk.bold.yellow('\n→ INITIAL SETTINGS'));

    return this.prompt(questions).then(function (answers) {
      this.answers = answers;

      this.answers.projectNameDash = this.answers.projectName.replace(/\W/g, '-').toLowerCase();
      this.answers.projectNameUnderscore = this.answers.projectName.replace(/\W/g, '_').toLowerCase();

      var dbPrefix = rndstr.generate({ length: 3, charset: 'hex' });
      this.answers.dbPrefix = dbPrefix;

    }.bind(this));
  }

  configuring() {
    this.log.writeln(chalk.bold.yellow('\n→ SETTING FILES'));

    this.destinationRoot(this.answers.projectNameDash);

    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath(),
      { globOptions: { dot: true } }
    );

    this.fs.copyTpl(
      this.templatePath('.env'),
      this.destinationPath('.env'),
      {
        projectName: this.answers.projectName,
        projectNameDash: this.answers.projectNameDash,
        projectNameUnderscore: this.answers.projectNameUnderscore,
        dbPrefix: this.answers.dbPrefix
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        projectName: this.answers.projectName,
        projectNameDash: this.answers.projectNameDash
      }
    );
  }

  writing() {}

  install() {
    if (!this.options.skipInstall && !this.options['skip-install']) {
      this.log.writeln(chalk.bold.yellow('\n→ INSTALLING'));

      this.spawnCommandSync('docker-compose', ['up' , '--detach', '--force-recreate']);
    }
  }

  end() {
    this.log.writeln(chalk.bold.yellow('\n→ SCAFFOLD COMPLETED'));
    this.log.writeln(chalk.bold.green('\n→ PROJECT FOLDER: ' + this.answers.projectNameDash + '/\n'));
  }
};
