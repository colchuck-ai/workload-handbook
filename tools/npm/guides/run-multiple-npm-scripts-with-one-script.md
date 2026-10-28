# Run Multiple NPM Scripts with One Script

When using NPM to run scripts, we can sometimes find our `package.json` in a state like this:

```js
{
  "scripts": {
    "lint:files": "prettier --ignore-unknown --check .",
    "lint:markdown": "remark . --quiet --frail"
  }
}
```

As a developer, if I wanted to lint _all the things_, I would have to run:

```sh
npm run lint:files
npm run lint:markdown
```

By adding a single script that calls other scripts in a single command, we can retain the ability to run individual scripts, and add the ability to perform more broad functions.

```js
{
  "scripts": {
    "prepare": "husky",
    "lint": "npm run lint:files && npm run lint:markdown",
    "lint:files": "prettier --ignore-unknown --check .",
    "lint:markdown": "remark . --quiet --frail"
  }
}
```

Now, as a developer, if I wanted to lint _all the things_, I would simply run:

```sh
npm run lint
```
