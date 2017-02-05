'use strict';

var util      = require('util')
  , path      = require('path')
  , chalk     = require('chalk')
  , generator = require('yeoman-generator');

var questions = [{
  type    : 'input',
  name    : 'pluginName',
  message : 'Plugin Name?',
  default : 'Plugin Name Format'
},{
  type    : 'input',
  name    : 'authorName',
  message : 'Author Name?',
  default : 'mySelf'
},{
  type    : 'input',
  name    : 'authorNameWordpress',
  message : 'Author Name Wordpress?',
  default : 'myself'
},{
  type    : 'input',
  name    : 'authorURL',
  message : 'Author URL?',
  default : 'mysite.com.br'
}];

module.exports = class extends generator {
  prompting() {
    this.log.writeln(chalk.bold.yellow('\n→ INITIAL SETTINGS'));

    return this.prompt(questions).then(function (answers) {
      this.answers = answers;
      this.answers.uniqueIdentifier = this.answers.pluginName.replace(/\W/g, '-').toLowerCase();
      this.answers.mainClass = this.answers.pluginName.replace(/\b\w/g, l => l.toUpperCase()).replace(/\W/g, '_');
    }.bind(this));
  }

  configuring() {
    this.log.writeln(chalk.bold.yellow('\n→ INSTALLING'));

    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath(this.answers.uniqueIdentifier),
      { globOptions: { dot: true } }
    );

    this.destinationRoot(this.answers.uniqueIdentifier);
  }

  writing() {
    this.log.writeln(chalk.bold.yellow('\n→ SETTING FILES'));

    this.fs.copyTpl(
      this.templatePath('scheme-plugin.php'),
      this.destinationPath(this.answers.uniqueIdentifier + '.php'),
      {
        pluginName       : this.answers.pluginName,
        authorName       : this.answers.authorName,
        authorURL        : this.answers.authorURL,
        uniqueIdentifier : this.answers.uniqueIdentifier,
        mainClass        : this.answers.mainClass,
      }
    );

    this.fs.delete(this.destinationPath('scheme-plugin.php'));

    this.fs.copyTpl(
      this.templatePath('readme.txt'),
      this.destinationPath('readme.txt'),
      {
        pluginName       : this.answers.pluginName,
        authorNameWordpress: this.answers.authorNameWordpress
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        pluginName : this.answers.pluginName,
        authorName : this.answers.authorName,
        authorURL  : this.answers.authorURL,
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        uniqueIdentifier : this.answers.uniqueIdentifier,
        pluginName       : this.answers.pluginName,
        authorName       : this.answers.authorName,
        authorURL        : this.answers.authorURL,
      }
    );
  }

  install() {
    if (!this.options.skipInstall && !this.options['skip-install']) {
      this.log.writeln(chalk.bold.yellow('\n→ INSTALLING DEPENDENCIES'));

      this.npmInstall();
    }
  }

  end() {
    this.log.writeln(chalk.bold.yellow('\n→ SCAFFOLD COMPLETED'));
    this.log.writeln(chalk.bold.green('\n→ PLUGIN FOLDER: ' + this.answers.uniqueIdentifier + '/\n'));
  }
};
