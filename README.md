# Salesforce DX Project: Foreign Exchange Traders

A Salesforce application that allows us to create and store foreign exchange trades and uses an external service that has an information of the latest currency rates available.

## Configure your environment in order to test this Salesforce DX Project

Follow the next steps in order to create a scratch org containing the app in your Salesforce enviroment:

1. Choose ***SFDX: Authorize a Dev Hub*** from the command palette in VS Code and then Log into the org you’ve chosen as your Dev Hub;
2. In ***Setup***, enter ***Dev Hub*** in the Quick Find box and select Dev Hub -> ***Enable Dev Hub***;
3. Create a new scratch org : ***sfdx force:org:create -f config/project-scratch-def.json -a NameOfScracthOrg***;
4. Set your default org : ***sfdx force:config:set defaultusername=test-scratchorgusername@example.com*** or choose ***SFDX: Set a Default Org*** from the command palette in VS Code (Ctrl/Cmd+Shift+P) to authorize a newly created scratch org;
5. Use ***sfdx force:source:push*** command to push source to your org; 

## Where to find and How to use the app

1. Search for "Foreign Exchange Trades" app in App launcher; 
2. The app will open with datatable containing inormation about existing trades; 
3. If you want to add a new trade click on New Trade button and enter Sell Currency, Buy Currency and Sell Amount. After that Rate and Buy Amount will be caclulated;
4. Click on the "Create" button and new Trade has been added;
5. Also, a new chatter group with Trade Reviewers name is created if does not exist already;
6. Go to chatter and you will find infos about newly created trade.
