'use strict';

var util      = require('util')
  , path      = require('path')
  , chalk     = require('chalk')
  , generator = require('yeoman-generator');

var questions = [{
  type    : 'input',
  name    : 'themeName',
  message : 'Theme Name?',
  default : 'myTheme'
},{
  type    : 'input',
  name    : 'authorName',
  message : 'Author Name?',
  default : 'mySelf'
},{
  type    : 'input',
  name    : 'authorURL',
  message : 'Author URL?',
  default : 'mySite.com.br'
}];

module.exports = class extends generator {
  prompting() {
    this.log.writeln(chalk.bold.yellow('\n→ INITIAL SETTINGS'));

    return this.prompt(questions).then(function (answers) {
      this.answers = answers
      this.answers.themeNameSpace = this.answers.themeName.replace(/\W/g, '-').toLowerCase();
    }.bind(this));
  }

  configuring() {
    this.log.writeln(chalk.bold.yellow('\n→ INSTALLING'));

    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath(this.answers.themeNameSpace),
      { globOptions: { dot: true } }
    );

    this.destinationRoot(this.answers.themeNameSpace);
  }

  writing() {
    this.log.writeln(chalk.bold.yellow('\n→ SETTING FILES'));

    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      { themeNameSpace: this.answers.themeNameSpace }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { themeNameSpace: this.answers.themeNameSpace }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { themeName: this.answers.themeName }
    );

    this.fs.copyTpl(
      this.templatePath('style.css'),
      this.destinationPath('style.css'),
      {
        themeName  : this.answers.themeName,
        authorName : this.answers.authorName,
        authorURL  : this.answers.authorURL,
      }
    );
  }

  install() {
    if (!this.options.skipInstall && !this.options['skip-install']) {
      this.log.writeln(chalk.bold.yellow('\n→ INSTALLING DEPENDENCIES'));

      this.npmInstall();
      this.bowerInstall();
    }
  }

  end() {
    this.log.writeln(chalk.bold.yellow('\n→ SCAFFOLD COMPLETED'));
    this.log.writeln(chalk.bold.green('\n→ THEME FOLDER: ' + this.answers.themeNameSpace + '/\n'));
  }
};
