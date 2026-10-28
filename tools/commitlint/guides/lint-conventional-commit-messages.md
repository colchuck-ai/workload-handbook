# Lint Conventional Commit Messages

We can create guardrails to ensure that commit messages follow the [conventional commit format](https://www.conventionalcommits.org/en/v1.0.0/).

For example, we can prevent commit message from being made by linting commit messages in `commit-msg` git hooks.

1. If not already added, [create a commit-msg hook](../../husky/guides/create-a-commit-msg-hook.md)
2. If not already installed, [install commitlint](../commitlint.md#installation).
3. Add the following settings to your `package.json`, or [leverage shared configuration from @engineering/npm-dev-tools](../../gitlab/guides/leverage-shared-npm-configuration.md) in a `.commitlintrc.js`:

   `.commitlintrc.js`

   ```js
   module.exports = require("@engineering/npm-dev-tools/config/commitlint/commitlint");
   ```

   `package.json`

   ```json
   {
     "commitlint": {
       "extends": ["@commitlint/config-conventional"]
     }
   }
   ```

4. Add the following to your `./.husky/commit-msg` hook file

   ```sh
   npx --no -- commitlint --edit "$1"
   ```
