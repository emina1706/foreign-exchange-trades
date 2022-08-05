# Salesforce DX Project: Foreign Exchange traders

A Salesforce application that allows us to create and store foreign exchange trades and uses an extarnel service that has an information of the latest currency rates available.

## Configure your environment in order to test this Salesforce DX Project

Follow the next steps in order to create a scratch org containing the app in your Salesforce enviroment:

1. Log into the org you’ve chosen as your Dev Hub;
2. In Setup, enter Dev Hub in the Quick Find box and select Dev Hub -> Enable Div Hub;
3. Create a new scratch org : sfdx force:org:create -f config/project-scratch-def.json -a NameOfScracthOrg;
4. Set your default org : sfdx force:config:set defaultusername=test-scratchorgusername@example.com or choose SFDX: Set a Default Org from the command palette in VS Code (Ctrl/Cmd+Shift+P) to authorize a newly created scratch org;
5. Use sfdx force:source:push command to push source to your org; 

## Where to find and How to use the app
