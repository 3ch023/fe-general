# FE Process for general webpack set up

This is a FE General Demo project. 


## Description

In maven Build:
 - Webpack is triggered. -> result is in /dist
 - Clientlibs generator is triggered -> result is copied to ui.apps and turned into clientlib (all config nodes generated) 
In Dev mode:
 - Webpack is in watch, when triggered. -> result is in /dist
 - result (.js and .css) copied to ui.apps
 - aemfed watches ui.apps -> files deployed to aem
Webpack is triggered.
Then file 

## Try it out

To check synchronisation:


1. Go to to ui.frontend and install dependencies:
    ```
        git checkout develop
        git pull
        cd ui.frontend 
        npm install
     ```      
2. Deploy project with maven

3. Start synch

    ```
     npm run start
    ```
* Open http://localhost:4502/editor.html/content/fe-general/us/en.html and add text component
* Open text.scss and set "background: green;", save
* Check the color applied at Proxy 
    * Open http://localhost:3000/editor.html/content/fe-general/us/en.html
    * Verify new styles were inject into the page without reload

    
* Check the color applied in AEM 
    * Open http://localhost:4502/editor.html/content/fe-general/us/en.html
    * run Command+Shift+R
    * verify new styles applied




## How to build

To build all the modules run in the project root directory the following command with Maven 3:

    mvn clean install

If you have a running AEM instance you can build and package the whole project and deploy into AEM with

    mvn clean install -PautoInstallPackage

Or to deploy it to a publish instance, run

    mvn clean install -PautoInstallPackagePublish

Or alternatively

    mvn clean install -PautoInstallPackage -Daem.port=4503

Or to deploy only the bundle to the author, run

    mvn clean install -PautoInstallBundle

## Testing

There are three levels of testing contained in the project:

* unit test in core: this show-cases classic unit testing of the code contained in the bundle. To test, execute:

    mvn clean test

* server-side integration tests: this allows to run unit-like tests in the AEM-environment, ie on the AEM server. To test, execute:

    mvn clean verify -PintegrationTests

* client-side Hobbes.js tests: JavaScript-based browser-side tests that verify browser-side behavior. To test:

    in the browser, open the page in 'Developer mode', open the left panel and switch to the 'Tests' tab and find the generated 'MyName Tests' and run them.

## Maven settings

The project comes with the auto-public repository configured. To setup the repository in your Maven settings, refer to:

    http://helpx.adobe.com/experience-manager/kb/SetUpTheAdobeMavenRepository.html
