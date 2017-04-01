# Overview

Heroku app to handle long running request: importing ticket audits.

Please see [US258](https://rally1.rallydev.com/#/58107682671d/detail/userstory/61061019169) for more information.



# Running the app:

### Locally:
Run the following command locally and open your browser to [http://localhost:5000/canvas](http://localhost:5000/canvas)

	. setupConfigVars.sh
	
then run the following:

	heroku local web
	
To run the worker

	heroku local worker
	

### Heroku:

[https://ticket-scale-import.herokuapp.com/canvas](https://ticket-scale-import.herokuapp.com/canvas)

### Visualforce (using signed request)

[/apex/TEST_TicketScaleImport](https://lne--dev0--c.cs2.visual.force.com/apex/TEST_TicketScaleImport)

### Connected App

[Connected App 1](https://lne--dev0.cs2.my.salesforce.com/app/mgmt/forceconnectedapps/forceAppDetail.apexp?applicationId=06PR00000008RAl&notify=true&id=0CiR00000004Krr)

[Connected App 2](https://lne--dev0.cs2.my.salesforce.com/_ui/core/application/force/connectedapp/ForceConnectedApplicationPage/d?applicationId=06PR00000008RAl)


# Debugging the app

run node-inspector in a separate browser window

then run heroku local webdebug

@TODO - include more info

# Fixing permissions

Sometimes people have different umask settings on their machines, meaning files generated appear modified when instead they just have different permissions.

Navigate to the base of the repo and run this shellscript:

	git config --global --add alias.permission-reset '!git diff -p -R --no-color | grep -E "^(diff|(old|new) mode)" --color=never | git apply'

Now, you can run this git command 

	git permission-reset

All files are reset back to the permission known within git.


# Common Links

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
- [Platform connect](https://developer.salesforce.com/docs/atlas.en-us.platform_connect.meta/platform_connect/canvas_app_oauth_code_example.htm)
- [JSForce](https://jsforce.github.io/document/)
- [Lightning Design System - LDS](https://www.lightningdesignsystem.com)