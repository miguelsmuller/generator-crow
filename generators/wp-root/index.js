'use strict';

var util      = require('util')
  , path      = require('path')
  , chalk     = require('chalk')
  , remote    = require('yeoman-remote')
  , rndstr    = require('randomstring')
  , generator = require('yeoman-generator');

var questions = [{
  type    : 'input',
  name    : 'projectName',
  message : 'Project name?',
  default : 'myWordPress'
},{
  type    : 'input',
  name    : 'productionURL',
  message : 'URL Production?',
  default : 'production.com.br',
  filter: function (str){ return str.toLowerCase() }
},{
  type    : 'input',
  name    : 'stagingURL',
  message : 'URL Staging?',
  default : 'staging.production.com.br',
  filter: function (str){ return str.toLowerCase() }
},{
  type    : 'input',
  name    : 'developmentURL',
  message : 'URL Development?',
  default : 'localhost.production.com.br',
  filter: function (str){ return str.toLowerCase() }
},{
  name    : 'doVersioning',
  type    : 'confirm',
  message : 'Do versioning?',
},{
  type    : 'list',
  name    : 'versionEnvironment',
  message : 'Versioning environment?',
  choices : ['github.com', 'bitbucket.org'],
  when    : function(answers){ return answers.doVersioning === true }
},{
  type    : 'input',
  name    : 'Owner',
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
      this.answers.dbName = this.answers.projectName.replace(/\W/g, '_').toLowerCase();
    }.bind(this));
  }

  configuring() {
    cloneWordPress: {
      var done = this.async();

      this.log.writeln(chalk.bold.yellow('\n→ INSTALLING'));
      this.log.writeln('Please wait while WordPress is downloaded...');

      this.destinationRoot(this.answers.folderName);

      remote('https://wordpress.org/latest.zip', function (err, remote) {

        this.fs.copy(
          path.join(remote, '**'),
          this.destinationPath('public/'),
          { options: { dot: true } }
        );

        this.fs.delete(this.destinationPath('public/license.txt'));
        this.fs.delete(this.destinationPath('public/readme.html'));
        this.fs.delete(this.destinationPath('public/wp-config-sample.php'));
        this.fs.delete(this.destinationPath('public/wp-content/plugins/hello.php'));

        this.fs.delete(
          this.destinationPath('public/wp-content/themes/twenty*/**/*'),
          { options: { dot: true } }
        );

        this.fs.delete(
          this.destinationPath('public/wp-content/plugins/akismet/**/*'),
          { options: { dot: true } }
        );

        done();
      }.bind(this), true);
    }

    copyTemplate: {
      this.log.writeln(chalk.bold.yellow('\n→ SETTING FILES'));

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
          dataBaseNameLocal: 'com_' + this.answers.dbName
        }
      );

      this.fs.copyTpl(
        this.templatePath('public/wp-config.staging.php'),
        this.destinationPath('public/wp-config.staging.php'),
        {
          prefix: prefix,
          dataBaseNameStaging: prefix + '_' + this.answers.dbName + '_' + 'staging',
          stagingURL: this.answers.stagingURL
        }
      );

      this.fs.copyTpl(
        this.templatePath('public/wp-config.production.php'),
        this.destinationPath('public/wp-config.production.php'),
        {
          prefix: prefix,
          dataBaseNameProduction: prefix + '_' + this.answers.dbName + '_' + 'production',
          productionURL: this.answers.productionURL,
        }
      );
    }
  }

  writing() {}

  install() {
    if (this.answers.doVersioning === true) {
      this.log.writeln(chalk.bold.yellow('\n→ INSTALLING GIT'));

      var repository = 'git@'+ this.answers.versionEnvironment +':'+ this.answers.Owner +'/'+ this.answers.folderName  +'.git';

      this.spawnCommandSync('git', ['init']);
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repository]);
      this.spawnCommandSync('git', ['add', '--all']);
      this.spawnCommandSync('git', ['commit', '-m', '"initial commit"']);
    }
  }

  end() {
    this.log.writeln(chalk.bold.yellow('\n→ SCAFFOLD COMPLETED'));
    this.log.writeln(chalk.bold.green('\n→ PROJECT FOLDER: ' + this.answers.folderName + '/\n'));
  }
};
