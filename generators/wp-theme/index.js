'use strict';

var util      = require('util')
  , path      = require('path')
  , generator = require('yeoman-generator');

module.exports = class extends generator {
  prompting() {
    this.log.writeln('\n→ INITIAL SETTINGS');

    return this.prompt([{
      type: 'input',
      name: 'themeName',
      message: 'Theme Name?',
      default: 'myTheme'
    },{
      type: 'input',
      name: 'authorName',
      message: 'Author Name?',
      default: 'mySelf'
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
      this.destinationPath(this.bootAnswers.themeName),
      { globOptions: { dot: true } }
    );

    this.destinationRoot(this.bootAnswers.themeName);
  }

  writing() {
    this.log.writeln('\n→ SETTING FILES');

    this.fs.copyTpl(
      this.templatePath('bower.json'),
      this.destinationPath('bower.json'),
      { themeName: this.bootAnswers.themeName }
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { themeName: this.bootAnswers.themeName }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      { themeName: this.bootAnswers.themeName }
    );

    this.fs.copyTpl(
      this.templatePath('style.css'),
      this.destinationPath('style.css'),
      {
        themeName  : this.bootAnswers.themeName,
        authorName : this.bootAnswers.authorName,
        authorURL  : this.bootAnswers.authorURL,
      }
    );
  }

  install() {
    if (!this.options.skipInstall && !this.options['skip-install']) {
      this.log.writeln('\n→ INSTALLING DEPENDENCIES');

      this.npmInstall();
      this.bowerInstall();
    }
  }

  end() {
    this.log.writeln('\n→ SCAFFOLD COMPLETED');
  }
};
