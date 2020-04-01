This html email coding template is used to create html email templates using some cool technologies.  
## Setup
### Prerequisities
* Git
* Nodejs
* Jdk 8+

### Download
 
 * Clone this repository.
 * Delete git metadata to obtain pure local sources: `rm -rf .git`

### Install
* Run node command `npm install`

##Structure and Technology
### Structure
* __src/parts__ - html parts e.g. header.html, footer.html<br>
* __src/scss__ - scss parts <br>
* __src/templates__ - html or ftl templates

### Technology
This tool using external libraries:
- [gulp](https://www.npmjs.com/package/gulp) 
- [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [juice](https://www.npmjs.com/package/juice)
- [freemarker](https://www.npmjs.com/package/freemarker)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- and other cool libraries #see package.json


## Usage
*`npm run build`*

This take templates form `src/templates` and process:
- html parts including 
- scss processing
- inlining css
- output is in _dist directory

<hr>

*`npm run build-freemarker`*
 
Same as `npm run build` plus:
- freemarker processing 

<hr>

*`npm start`*

Same as `npm run build` but runs develop server with livereload

<hr>

*`npm run start-freemarker`*
 
Same as `npm run build-freemarker` but runs develop server with livereload

## Working with templates
Html email renders are different. You must use some special non-standard process 

#### Using table layout
- use table layout due to different html email renders

#### Using css inlining
- your styles will be inlined. See [juice](https://www.npmjs.com/package/juice) 

#### Using outlook specific styles
>  p.MsoNormal { margin: 0px; }

#### Using outlook if
`<!--[if gte mso 9]>`

_this content will be shown in outlook only in outlook_

`<![endif]-->`

or you can use tags

`<outlook-only-start/>`

_this content will be shown in outlook only in outlook_

`<outlook-only-end/>`


#### Using outlook hide
`<![if !mso]>`

_this content will be hide in outlook_

`<![if !mso]>`

or you can use tags

`<outlook-hide-start/>`

_this content will be hide in outlook_

`<outlook-hide-end/>`






