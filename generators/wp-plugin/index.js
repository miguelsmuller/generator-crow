'use strict';

var util      = require('util')
  , path      = require('path')
  , generator = require('yeoman-generator');

module.exports = class extends generator {
  prompting() {
    this.log.writeln('\n→ INITIAL SETTINGS');

    return this.prompt([{
      type: 'input',
      name: 'pluginName',
      message: 'Plugin Name?',
      default: 'Plugin Name Format'
    },{
      type: 'input',
      name: 'uniqueIdentifier',
      message: 'Unique Identifier? (plugin-name-format)',
      default: 'plugin-name-format'
    },{
      type: 'input',
      name: 'mainClass',
      message: 'Main Class? (Plugin_Name_Format)',
      default: 'Plugin_Name_Format'
    },{
      type: 'input',
      name: 'authorName',
      message: 'Author Name?',
      default: 'mySelf'
    },{
      type: 'input',
      name: 'authorNameWordpress',
      message: 'Author Name Wordpress?',
      default: 'myself'
    },{
      type: 'input',
      name: 'authorURL',
      message: 'Author URL?',
      default: 'mysite.com.br'
    }]).then(function (bootAnswers) {
      this.bootAnswers = bootAnswers
    }.bind(this));
  }

  configuring() {
    this.log.writeln('\n→ INSTALLING');

    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath(this.bootAnswers.uniqueIdentifier),
      { globOptions: { dot: true } }
    );

    this.destinationRoot(this.bootAnswers.uniqueIdentifier);
  }

  writing() {
    this.log.writeln('\n→ SETTING FILES');

    this.fs.copyTpl(
      this.templatePath('scheme-plugin.php'),
      this.destinationPath(this.bootAnswers.uniqueIdentifier + '.php'),
      {
        pluginName       : this.bootAnswers.pluginName,
        authorName       : this.bootAnswers.authorName,
        authorURL        : this.bootAnswers.authorURL,
        uniqueIdentifier : this.bootAnswers.uniqueIdentifier,
        mainClass        : this.bootAnswers.mainClass,
      }
    );

    this.fs.delete(this.destinationPath('scheme-plugin.php'));

    this.fs.copyTpl(
      this.templatePath('readme.txt'),
      this.destinationPath('readme.txt'),
      {
        pluginName       : this.bootAnswers.pluginName,
        authorNameWordpress: this.bootAnswers.authorNameWordpress
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        pluginName : this.bootAnswers.pluginName,
        authorName : this.bootAnswers.authorName,
        authorURL  : this.bootAnswers.authorURL,
      }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        uniqueIdentifier : this.bootAnswers.uniqueIdentifier,
        pluginName       : this.bootAnswers.pluginName,
        authorName       : this.bootAnswers.authorName,
        authorURL        : this.bootAnswers.authorURL,
      }
    );
  }

  install() {
    if (!this.options.skipInstall && !this.options['skip-install']) {
      this.log.writeln('\n→ INSTALLING DEPENDENCIES');

      this.npmInstall();
    }
  }

  end() {
    this.log.writeln('\n→ SCAFFOLD COMPLETED');
  }
};
