# Check Terraform Files are Formatted

1. If not already created, [create a pre-commit hook](../../../tools/husky/guides/create-a-pre-commit-hook.md)
2. [Install terraform](../terraform.md#installation)
3. Add the following `lint` script to your `package.json`.

   ```json
   {
     "scripts": {
       "lint:terraform": "terraform fmt -recursive -check -diff"
     }
   }
   ```

4. Add the following line to your `./.husky/pre-commit` script:

   ```sh
   npm run lint:terraform
   ```

5. Consider running the `lint:terraform` script as part of [unified `lint` script](../../../tools/npm/guides/run-multiple-npm-scripts-with-one-script.md), and potentially running the unified `lint` script in your `.husky/pre-commit` script.
