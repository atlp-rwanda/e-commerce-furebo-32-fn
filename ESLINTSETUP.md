# ESLint Setup with Pre-commit Hooks

This document provides instructions on setting up pre-commit hooks to ensure that code is properly formatted and linted, and tests are run before each commit.

## Pre-commit Hook Setup

### 1. Create Husky Directory and Pre-commit File

Navigate to or Create the `.husky` directory and a `pre-commit` file:

```bash
mkdir -p .husky
touch .husky/pre-commit
```

### 2. Add the following to the pre-commit file

``` . "$(dirname "$0")/_/husky.sh" ```

### 3. And finally add this line too

``` npx lint-staged && npm test ```

lint-staged is optional, it is recommended that npm test goes alone

### 4. You can also give permissions to the pre-commit file using chmod

```bash 
chmod +x .husky/pre-commit 
```

