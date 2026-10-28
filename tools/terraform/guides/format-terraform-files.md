# Format Terraform Files

1. [Install terraform](./../terraform.md#installation)
2. Add the following `format` script to your `package.json`

   ```json
   {
     "scripts": {
       "format:terraform": "terraform fmt -recursive -write"
     }
   }
   ```

3. Consider running the `format:terraform` script as part of [unified `format` script](../../../tools/npm/guides/run-multiple-npm-scripts-with-one-script.md).
