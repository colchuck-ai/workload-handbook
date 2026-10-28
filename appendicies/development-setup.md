# Development Setup

1. [Create a gitlab personal access token](https://docs.gitlab.com/user/profile/personal_access_tokens/#create-a-personal-access-token). Note that your user must be at least the `guest` level role in projects where this project pulls packages from.
2. Set the `GITLAB_PERSONAL_ACCESS_TOKEN` environment variable. It can be helpful to do this as part of your `~/.bashrc` or `~/.zshenv` file.
3. Create the following `.npmrc` file

   ```
   # Authenticates to the engineering/dev-tools/packages/internal group package registry
   //gitlab.example.com/api/v4/groups/1234/-/packages/npm/:_authToken=${GITLAB_PERSONAL_ACCESS_TOKEN}

   # Installs @engineering packages from the engineering/dev-tools/packages/internal group package registry level
   @engineering:registry=https://gitlab.example.com/api/v4/groups/1234/-/packages/npm/
   ```

4. Install npm packages

   ```sh
   npm install
   ```
