# panthera-bug-busters-food-delivery

Food Delivery Project (react) - Panthera OSIC

- Use `npm install` to install all the dependencies.
  This project uses .prettier to format the code and .env to store the environment variables.

## Table of contents

- [Installation](#Installation)
- [Folders](#folders)
- [Useful links](#useful-links)
- [Entity relationship diagram](#entity-relationship-diagram)
- [Release instructions](#release-instructions)

## Installation

- Clone the repository
- Run `npm install` to install all the dependencies
- Run `npx prisma migrate dev` to create the database
- Run `npm start` to start the project
- Run `node server/server.js` to start the server

## Folders

- `client`: frontend using React and Redux
- `server`: backend using Node.js and Express.js
- `prisma`: database using Prisma

## Useful links

Jira:

- [Board](https://greenfoxacademy.atlassian.net/jira/software/projects/FDP22/boards/126)

Prisma:

- [Prisma team development](https://www.prisma.io/docs/guides/database/developing-with-prisma-migrate/team-development)

Commits:

- [Semantic commit messages](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
- [Git commit messages](https://chris.beams.io/posts/git-commit/)

## Entity relationship diagram

![Alt text](docs/erd3.png?raw=true 'Title')

![Alt text](docs/erd-legend.png?raw=true 'Title')

## Release instructions

While on development branch, look at tags with `git tag` .

`npm version minor` will bump the version up. If that doesn't work due to the version existing, simply repeat the command and that should bump the version to the correct one in package.json.

`git push --follow-tags` will push the changes and the tags that have been created.

To get the release on github, create a PR and compare the master and development branches to one another, naming it "Release 0.[x].0".

In case of conflict, stay on development branch and do `git merge master`. Most likely most conflicts that need to be resolved will be a case of accepting the incoming changes.

- `git add [file]`

- `git commit -m "Solve merge conflict with master"`

- `git push`

Merge after approval

**Do NOT delete the branch after merging!**

On the repository homepage go to: "releases" -> "Draft a new release" -> select the latest tag -> name "0.[x].0"

Proceed to publish
