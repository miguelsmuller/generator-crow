# <%= themeName %> #
Put here a short description of <%= themeName %> - Put here a short description of <%= themeName %> - Put here a short description of <%= themeName %> - Put here a short description of <%= themeName %> - Put here a short description of <%= themeName %> - Put here a short description of <%= themeName %>

## Versioning and Deployment ##

If the theme is part of a complete WordPress project versioning and deployment is made from the project root folder.

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