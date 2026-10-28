# Managing Husky Installation When Building a Docker Image

Husky is a popular tool for managing Git hooks, but it is primarily a development dependency. When deploying applications in CI/CD pipelines or production environments, installing Husky is unnecessary and may cause issues due to the lack of a `.git` directory.

To ensure Husky is only installed in relevant environments, we use a custom installation script, `install.mjs`.

## 1. Add `install.mjs` to the `.husky/` directory:

```sh
mkdir -p .husky && echo "// Husky install script" > .husky/install.mjs
```

## 2. Write the `install.mjs` script

Set the content of `.husky/install.mjs` to the following:

```javascript
// Skip Husky install in production and CI
if (process.env.NODE_ENV === "production") {
  console.log(
    `Will not install husky because NODE_ENV=${process.env.NODE_ENV}`,
  );
  process.exit(0);
} else if (process.env.CI === "true") {
  console.log(`Will not install husky because CI=${process.env.CI}`);
  process.exit(0);
} else {
  const husky = (await import("husky")).default;
  console.log(husky());
}
```

## 3. Reference `install.mjs` in `package.json`

Ensure the `prepare` script runs `install.mjs`:

```json
"scripts": {
  "prepare": "node .husky/install.mjs"
}
```

## 4. Adjust the Dockerfile to Prevent Git Hooks Installation

Since Husky hooks fail without a `.git` directory, we set `HUSKY=0` to disable them:

```dockerfile
# Disable Husky hook installation
ENV HUSKY=0
RUN npm install
```

### 5. Verify the Installation Behavior

Run these commands to check:

#### In Development:

```sh
npm run prepare  # Should install Husky
```

#### In CI or Production:

```sh
NODE_ENV=production npm run prepare  # Should skip Husky
CI=true npm run prepare  # Should skip Husky
```

## Conclusion

This approach ensures Husky is installed only when needed, preventing unnecessary errors and optimizing build performance. By using `install.mjs`, we can maintain a clean development experience while avoiding deployment issues.
