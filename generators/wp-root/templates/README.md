# **<%= projectName %>**  
Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %>  

- **Stable tag:** 0.0.0
- **License:** Proprietary - Private Use
- All Rights Reserved - Unauthorized copying of any file of this project, via any medium is strictly prohibited.

## **Project definition**
- **Staging URL:** <http://staging.com.br>
- **Production URL:** <http://production.com.br>

## **Project Workflow**
This workflow uses two branches to record the history of the project. The `master` branch stores the official release history, and the `develop` branch serves as an integration branch for features. It's also convenient to tag all commits in the master branch with a version number.

Each new feature should reside in its own branch. But, instead of branching off of `master`, feature branches use `develop` as their parent branch. When a feature is complete, it gets merged back into `develop`. Features should never interact directly with master.

## **Using**
This project use `docker` and the benefits of `docker-compose`. Docker is not a traditional virtualization system. Docker facilitates the creation and management of isolated environments. and docker-compose is a tool for defining and running multi-container Docker applications and allows works in all environments: production, staging, development, testing, as well as CI workflows.

### **Start up application**
- Builds, (re)creates, starts, and attaches to containers for a service - `docker-compose up --detach --force-recreate --build`
- Access the container - `docker exec -it CONTAINER_NAME bash`
- Create content in database - `docker exec -itd CONTAINER_NAME bash /var/config/script_bd.sh`
- Create content in upload - `docker exec -itd CONTAINER_NAME bash /var/config/script_app.sh`

## **Deploy Method - Service**
This project uses automated deployment using the git and [DeployService](DeployURL) tools.

##### Deploybot credentials: #####
- **Deploybot URL:** <DeployCustomURL>
- **Usuário:** DeployUser

## **Contributing**
1. [Fork it!](https://help.github.com/articles/fork-a-repo/)
2. [Configuring](https://help.github.com/articles/configuring-a-remote-for-a-fork/) a remote for a fork
3. [Syncing](https://help.github.com/articles/syncing-a-fork/) a fork with the latest version
4. Create your feature branch: `git checkout -b feature-123`
5. Commit your changes: `git commit -m 'Commit message'`
6. Push to the branch: `git push origin feature-123`
7. [Submit a pull request](https://help.github.com/articles/using-pull-requests/) :D

#### **Before commit, double check your code. Please dude.**
- Execute a `git pull` to keep your checkout up-to-date
- Invoke a `git diff --cached` before committing
- **NOT COMMIT BEFORE RUNNING THE PROJECT LOCALLY AND SEE THE CHANGES RUNNING**
- **MAKE SURE THE CHANGES WORK**

## **Changelog**  
= **0.0.0 - 0000-00-00** =  
Project released