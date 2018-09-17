# **<%= projectName %>**  
------ 
Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %>  

**Stable tag:** 0.0.0  
**License:** Proprietary - Private Use  
All Rights Reserved - Unauthorized copying of any file of this project, via any medium is strictly prohibited.  
  
  
  
  
## **Project environment definition**
------ 
- **Staging URL:** <http://staging.com.br>
- **Production URL:** <http://production.com.br>
  
  
  
  
## **Environment integration and continuous deploy**  
------ 
This project uses automated deployment using the git and [Buddy Works](https://app.buddy.works) tools.

### Deploybot credentials:
- **Deploybot URL:** [Account Buddy Works](DeployCustomURL)  
- **Usuário:** DeployUser  
  
  
  
  
## **Git Project Workflow** 
------ 
This workflow uses two branches to record the history of the project. The `master` branch stores the official release history, and the `develop` branch serves as an integration branch for features. It's also convenient to tag all commits in the master branch with a version number.

Each new feature should reside in its own branch. But, instead of branching off of `master`, feature branches use `develop` as their parent branch. When a feature is complete, it gets merged back into `develop`. Features should never interact directly with master.
  
  
  
  
## **Make the right Contribution**
------
1. [Fork it!](https://help.github.com/articles/fork-a-repo/)
2. [Configuring](https://help.github.com/articles/configuring-a-remote-for-a-fork/) a remote for a fork
3. [Syncing](https://help.github.com/articles/syncing-a-fork/) a fork with the latest version
4. Create your feature branch: `git checkout -b feature-123`
5. Commit your changes: `git commit -m 'Commit message'`
6. Push to the branch: `git push origin feature-123`
7. [Submit a pull request](https://help.github.com/articles/using-pull-requests/) :D

##### **Before commit, double check your code. Please dude.**
- Always check a branch that is being used: `git status`
- Execute a `git pull` to keep your checkout up-to-date
- Invoke a `git diff --cached` before committing
- **NOT COMMIT BEFORE RUNNING THE PROJECT LOCALLY AND SEE THE CHANGES RUNNING**
- **MAKE SURE THE CHANGES WORK**

> **[Here is a quick guide to git command](https://gist.github.com/leocomelli/2545add34e4fec21ec16)**
  
  
  
  
## **Putting the project to run**  
------
This project use `docker` and the benefits of `docker-compose`. Docker is not a traditional virtualization system. Docker facilitates the creation and management of isolated environments. and docker-compose is a tool for defining and running multi-container Docker applications and allows works in all environments: production, staging, development, testing, as well as CI workflows.

### **Start up application** 
- Builds, (re)creates, starts, and attaches to containers for a service - `docker-compose up --detach --force-recreate --build`
- Access the container - `docker-compose exec CONTAINER_NAME bash`

### **Install Dependencies**  
- Installing initial dependencies of PHP - `docker-compose exec app composer install` 
- Installing initial dependencies of NPM - `docker-compose exec app npm install`
- Installing initial external components - `docker-compose exec app bower install`

It is necessary at this point to configure the `.env` file.
The value of the DB_HOST variable in `.env` is the name of the database container.  

### **Database**  
- Create Database Schema - `docker-compose exec app php artisan migrate` 
- Seed Database with test data - `docker-compose exec app php artisan db:seed`  

### **Using the application**  
If the contenders project are already allocated in Docker will not be necessary to build them and create, and will not need to also install the several dependencies.  

- Starts existing containers for a service - `docker-compose start`
  
  
  
  
## **CSS Preprocessors - SASS**
------ 
SASS with SCSS format is probably the CSS preprocessor you’re most familiar with. It’s well-established, being an eight-year-old open source project, and it’s really the one that defined the genre of modern CSS preprocessors.

#### **CSS Architecture: ITCSS**  
Folder | Definition
:----|:----
***1- Settings***   | Variables that will define colors, spacings and other details
***2- Tools***      | All the globals mixins and functions
***3- Generic***    | Generic properties including all third-party css.
***4- Elements***   | Styling for HTML tags no classes or IDs
***5- Objects***    | Reusable objects and their variations, without positions or other properties that immobilize the object
***6- Components*** | More specific styling instructions for group of objects.
***7- Trumps***     | Helper classes to override other styles (.collapse, .hidden)

More information and details about ITCSS can be seen in:  
- [Willian Justen Article](https://willianjusten.com.br/organizando-seu-css-com-itcss/)
- [Hugo Bessa Article](http://hugobessa.com.br/2014/11/19/ITCSS-uma-maneira-de-pensar-arquiteturas-css/)
- [Jordan Koschei Article](https://medium.com/@jordankoschei/how-i-shrank-my-css-by-84kb-by-refactoring-with-itcss-2e8dafee123a#.913e4b961)
- [Lubos Kmetko Article](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)

#### **CSS Methodology: RSCSS**  
The metedoligia which should preferably be used in the project is the RSCSS, consisting of a set of ideas to guide a sustainable way the CSS process of creating a website or application.

More information and details about RSCSS can be seen in:
- [Willian Justen Article](https://willianjusten.com.br/falando-sobre-rscss/)
  
  
  
  
## **Task Runner - Gulp**  
------ 
- Watch: `gulp watch`
- All: `gulp all`
- View: `gulp views`
- Script: `gulp scripts`
- Style: `gulp styles`
- Image: `gulp images`  
  
  
  
  
## **Changelog**  
= **0.0.0 - 0000-00-00** =  
Project released