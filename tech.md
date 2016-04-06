## Tech Selection
---
####Backend:
1. Server: Expressjs
2. Socket: Socketio
3. Database: SQLite
4. Session management: express-session
5. User Management: Passport (with passport-local Strategy)

#### Frontend:
1. UI Framework: Reactjs(together with express-react-views)
2. CSS Framework: SemanticUI(built by gulp)
3. Module Bundler: Webpack

#### Support Tools
1. Test: Circle CI
2. Editor: Spacemacs

#### Team Colloboration:
1. Version Control: Git by Github
2. Project Management: Trello
3. Team Communication: Gitter

#### Code Style Guidance
1. [Javascript](https://google.github.io/styleguide/javascriptguide.xml)
2. [HTML/CSS](https://google.github.io/styleguide/htmlcssguide.xml)

#### Why
Our whole project would mainly use the Nodejs, so we decide to choose Expressjs as our server framework. As socketio is very powerful and convenient, so we use it for the socket part. Due to the considerantion of the board's performance, we would like to use SQLite for database. For the user management, we will combine express-session and passport together to provide convenience and security.

For frontend, we choose to challenge ourself and use some awesome tools to build the UI, like reactjs, and semantic. Also, we will use webpack for generating the static assests.

As support tools, we will deploy Travis CI for our code test, it will provide automatically code test after a pull request is created, and the reviewer can only merge pull request after it pass the CI test. Editor we will mainly use spacemacs for coding.

We have 3 different team colloboration tools, github for code verion control, trello for project management, gitter for team communication.

Before contributing to our project, every team member should read the two code style guidance first. During the whole project process, make sure they obey the code style rules.


#### Gap
Most gaps come from the Reactjs, Webpack, and Travis CI. However, these techniques are most advanced and popular in development. This is also the reason why I choose them for our project. Although, there would be a lot to learn, but it would be interesting challenge!


