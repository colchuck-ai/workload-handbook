# Check Files are Formatted

1. If not already added, [create a pre-commit hook](../../../tools/husky/guides/create-a-pre-commit-hook.md).
2. If not already installed, [install prettier](../prettier.md#installation) as a dev dependency.
3. Add the following script to your `package.json`.

   ```json
   {
     "scripts": {
       "lint:files": "prettier --check ."
     }
   }
   ```

4. Add the following line to your `./.husky/pre-commit` script:

   ```sh
   npm run lint:files
   ```

5. Consider running the `lint:files` script as part of [unified `lint` script](../../../tools/npm/guides/run-multiple-npm-scripts-with-one-script.md), and potentially running the unified `lint` script in your `.husky/pre-commit` script.
