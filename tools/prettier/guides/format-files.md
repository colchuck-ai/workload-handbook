# Format Files

1. If not already installed, [install prettier](../prettier.md#installation) as a dev dependency.
2. Add the following script to your `package.json`.

   ```json
   {
     "scripts": {
       "format:files": "prettier --write ."
     }
   }
   ```

3. Consider running the `format:files` script as part of [unified `format` script](../../../tools/npm/guides/run-multiple-npm-scripts-with-one-script.md).
