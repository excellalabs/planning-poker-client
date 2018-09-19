# Planning Poker Client

## Quickstart

### Dependency installation
```bash
$ npm install
```

### Starting the app in HMR mode
```bash
$ npm start
```

### Checking the validity of the app
NOTE: There isn't a solid setup for tests yet
```bash
# unit tests
$ npm test

# lint the app code
$ npm start lint
```

### Other information about the scripts
Under the hood, `npm start` is simpy running the `nps` command.  If you wish, you can install this script globally using `npm i -g nps` and run the scripts by typing, for instance: `nps docker.down`.  Globally installing `nps` also allows you to get auto-completion in a `bash` environment (or `zsh` with [`bashcompinit` enabled](https://stackoverflow.com/a/27853970/2939688)) by adding the following to your `.bash_profile` or `.bashrc` (or `.zshrc`):
```bash
source <(nps completion)
```

In addition, once the `docker-compose.yml` file is generated, you can use the `docker-compose` command with [its CLI](https://docs.docker.com/compose/reference/overview/).

To view all available scripts and execute one using an interactive shell, run:
```bash
$ npm run interactive
```
