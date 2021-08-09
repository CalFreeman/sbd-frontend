###
#HELP
-Chrome -> Redux Devtools helps
    + software library in addition to chrome extension
    https://www.npmjs.com/package/redux-devtools-extension
    $npm install --save-dev redux-devtools-extension

###
#TODO
Look -> app.js "Blog"

#There's an existing ESlint rule that can be used to verify that the application uses hooks correctly.
https://www.npmjs.com/package/eslint-plugin-react-hooks
Create-react-app has readily configured rule eslint-plugin-react-hooks that complains if hooks are used in an illegal manner:

#check how outdated dependencies are
$npm outdated --depth 0

#audit dependencies
npm audit

###
#NOTES
npm install @material-ui/core
#add the following head tag in public/index.html
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />

###
#SETUP

$npm install
$npm start
GOTO -> http://localhost:3000/