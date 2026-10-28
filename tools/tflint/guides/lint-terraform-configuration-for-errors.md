# Lint Terraform Configuration for Errors

1. If not already created, [create a pre-commit hook](../../../tools/husky/guides/create-a-pre-commit-hook.md)
2. [Install tflint](./../tflint.md#installation)
3. Add the following `.tflint.hcl` to your project root. Include any additional plugins as needed. See the [getting started](https://github.com/terraform-linters/tflint?tab=readme-ov-file#getting-started) for options.

   ```hcl
    plugin "terraform" {
      enabled = true
      preset  = "all"
    }

    plugin "aws" {
      enabled = true
      version = "0.28.0"
      source  = "github.com/terraform-linters/tflint-ruleset-aws"
    }
   ```

4. Add the following scripts to your `package.json`.

   ```json
   {
     "scripts": {
       "lint:tflint": "tflint --init && tflint --recursive"
     }
   }
   ```

5. Add the following line to your `./.husky/pre-commit` script:

   ```sh
   npm run lint:tflint
   ```

6. Consider running the `lint:tflint` script as part of [unified `lint` script](../../../tools/npm/guides/run-multiple-npm-scripts-with-one-script.md), and potentially running the unified `lint` script in your `.husky/pre-commit` script.
