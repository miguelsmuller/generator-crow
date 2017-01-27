# <%= projectName %> #
Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %> - Put here a short description of <%= projectName %>

## Project definition ##

Staging URL: http://staging.com.br 

Production URL: http://production.com.br

## Getting started ##

```
$ npm install
$ bower install
```

## Contributing ##

1. [Fork it!](https://help.github.com/articles/fork-a-repo/)
2. [Configuring](https://help.github.com/articles/configuring-a-remote-for-a-fork/) a remote for a fork
3. [Syncing](https://help.github.com/articles/syncing-a-fork/) a fork with the latest version
4. Create your feature branch: `git checkout -b issue-123`
5. Commit your changes: `git commit -m 'Commit message'`
6. Push to the branch: `git push origin issue-123`
7. [Submit a pull request](https://help.github.com/articles/using-pull-requests/) :D

#### Before commit, double check your code. Please dude. ####
- Execute a `git pull` to keep your checkout up-to-date
- Invoke a `git diff --cached` before committing
- **NOT COMMIT BEFORE RUNNING THE PROJECT LOCALLY AND SEE THE CHANGES RUNNING**
- **MAKE SURE THE CHANGES WORK**

## CSS Preprocessors - SASS  ##
SASS with SCSS format is probably the CSS preprocessor you’re most familiar with. It’s well-established, being an eight-year-old open source project, and it’s really the one that defined the genre of modern CSS preprocessors.

#### CSS Architecture: ITCSS ####

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

#### CSS Methodology: RSCSS ####

The metedoligia which should preferably be used in the project is the RSCSS, consisting of a set of ideas to guide a sustainable way the CSS process of creating a website or application.

More information and details about RSCSS can be seen in:
- [Willian Justen Article](https://willianjusten.com.br/falando-sobre-rscss/)


## Task Runner - Gulp ##

- Watch: `gulp watch`
- All: `gulp all`
- View: `gulp views`
- Script: `gulp scripts`
- Style: `gulp styles`
- Image: `gulp images`

## Deploy Method - Service ##

This project uses automated deployment using the git and [Service tools](https://service.com.br).

Deploybot Credentials: user.deploy.project.name@mail.com.br