'use strict';

var util      = require('util')
  , path      = require('path')
  , fse       = require('fs-extra')
  , remote    = require('yeoman-remote')
  , rndstr    = require('randomstring')
  , generator = require('yeoman-generator');

module.exports = class extends generator {
  prompting() {
    this.log.writeln('\n→ INITIAL SETTINGS');

    return this.prompt([{
      type: 'input',
      name: 'projectName',
      message: 'Project name?',
      default: 'myWordPress'
    },{
      type: 'input',
      name: 'productionURL',
      message: 'URL Production?',
      default: 'production.com.br'
    },{
      type: 'input',
      name: 'stagingURL',
      message: 'URL Staging?',
      default: 'staging.production.com.br'
    },{
      type: 'input',
      name: 'developmentURL',
      message: 'URL Development?',
      default: 'localhost.development.com.br'
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
    }]).then(function (answers) {
      this.answers = answers
    }.bind(this));
  }

  configuring() {
    cloneWordPress: {
      var done = this.async();

      this.log.writeln('\n→ INSTALLING');
      this.log.writeln('Please wait while WordPress is downloaded');

      this.destinationRoot(this.answers.projectName );

      remote('https://wordpress.org/latest.zip', function (err, remote) {

        this.fs.copy(
          path.join(remote, '**'),
          this.destinationPath('public/'),
          { globOptions: { dot: true } }
        );

        this.fs.delete(this.destinationPath('public/license.txt'));
        this.fs.delete(this.destinationPath('public/readme.html'));
        this.fs.delete(this.destinationPath('public/wp-config-sample.php'));
        this.fs.delete(this.destinationPath('public/wp-content/plugins/hello.php'));

        done();
      }.bind(this));
    }

    copyTemplate: {
      var prefix = rndstr.generate({
        length: 3,
        charset: 'hex'
      });

      this.fs.copy(
        this.templatePath('**'),
        this.destinationPath(),
        { globOptions: { dot: true } }
      );

      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'),
        { projectName: this.answers.projectName }
      );

      this.fs.copyTpl(
        this.templatePath('public/wp-config.php'),
        this.destinationPath('public/wp-config.php'),
        {
          productionURL: this.answers.productionURL,
          stagingURL: this.answers.stagingURL
        }
      );

      this.fs.copyTpl(
        this.templatePath('public/wp-config.development.php'),
        this.destinationPath('public/wp-config.development.php'),
        {
          prefix: prefix,
          dataBaseNameLocal: 'com_' + this.answers.projectName
        }
      );

      this.fs.copyTpl(
        this.templatePath('public/wp-config.staging.php'),
        this.destinationPath('public/wp-config.staging.php'),
        {
          prefix: prefix,
          dataBaseNameStaging: prefix + '_' + this.answers.projectName + '_' + 'staging',
          stagingURL: this.answers.stagingURL
        }
      );

      this.fs.copyTpl(
        this.templatePath('public/wp-config.production.php'),
        this.destinationPath('public/wp-config.production.php'),
        {
          prefix: prefix,
          dataBaseNameProduction: prefix + '_' + this.answers.projectName + '_' + 'production',
          productionURL: this.answers.productionURL,
        }
      );

      this.fs.copyTpl(
        this.templatePath('public/robots.txt'),
        this.destinationPath('public/robots.txt'),
        { productionURL: this.answers.productionURL }
      );
    }
  }

  writing() {
    this.log.writeln('\n→ SETTING FILES');
  }

  install() {
    this.log.writeln('\n→ INSTALL');

    fse.remove(this.destinationPath('public/wp-content/plugins/akismet'), function (err) {
      if (err) return console.error(err)
    })

    fse.emptyDir(this.destinationPath('public/wp-content/themes'), function (err) {
      if (err) return console.error(err)
    })
  }

  end() {
    if (this.answers.versionEnvironment != 'none') {
      this.log.writeln('\n→ INSTALLING GIT');

      var repository = 'git@'+ this.answers.versionEnvironment +':'+ this.answers.Owner +'/'+ this.answers.projectName  +'.git';

      this.spawnCommandSync('git', ['init']);
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repository]);
      this.spawnCommandSync('git', ['add', '--all']);
      this.spawnCommandSync('git', ['commit', '-m', '"initial commit"']);
    }

    this.log.writeln('\n→ SCAFFOLD COMPLETED');
  }
};
