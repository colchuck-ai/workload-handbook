# Validate Markdown Links

1. If not already added, [create a pre-commit hook](../../../tools/husky/guides/create-a-pre-commit-hook.md)
2. Install `remark` packages required for validating markdown links

   ```sh
   npm install --save-dev remark-cli remark-lint remark-lint-no-dead-urls remark-validate-links
   ```

3. Add the following settings to your `package.json`, or [leverage shared configuration from @engineering/npm-dev-tools](../../../tools/gitlab/guides/leverage-shared-npm-configuration.md) in a `.remarkrc.js`:

   `package.json`

   ```json
   {
     "remarkConfig": {
       "plugins": [
         "remark-validate-links",
         [
           "remark-lint-no-dead-urls",
           {
             "skipOffline": true
           }
         ]
       ]
     }
   }
   ```

   `.remarkrc.js`

   ```js
   module.exports = {
     plugins: [require("@engineering/npm-dev-tools/config/remark/remark")],
   };
   ```

4. Add the following `lint` script to your `package.json`.

   ```json
   {
     "scripts": {
       "lint:markdown": "remark . --quiet --frail"
     }
   }
   ```

5. Add the following line to the end of your `./.husky/pre-commit` script:

   ```sh
   npm run lint:remark
   ```

6. Consider running the `lint:markdown` script as part of [unified `lint` script](../../../tools/npm/guides/run-multiple-npm-scripts-with-one-script.md), and potentially running the unified `lint` script in your `.husky/pre-commit` script.
