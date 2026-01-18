# GitHub Actions Workflow Documentation

## Build Angular and Push to Node Repo

### Overview

This GitHub Actions workflow automates the process of building an Angular application and deploying the production build to a separate Node.js repository. The workflow is designed to maintain a clean separation between the Angular source code repository and the deployment repository.

### Workflow Name
**Build Angular and Push to Node Repo**

### Trigger Conditions

The workflow is **conditionally** triggered when:
- Code is pushed to the `master` branch **AND** the commit message contains `[deploy]` or `[release]`
- Manually triggered from the GitHub Actions UI (workflow_dispatch)

```yaml
on:
  push:
    branches: [ master ]
  workflow_dispatch:  # Allows manual triggering from GitHub UI
```

#### How to Trigger Deployment

**Option 1: Using Commit Message (Recommended)**
Include `[deploy]` or `[release]` in your commit message:

```bash
git commit -m "Update contact form [deploy]"
git push origin master
```

Examples:
- `"Fix button styling [deploy]"`
- `"Add new feature [release]"`
- `"Update dependencies [deploy]"`

**Option 2: Manual Trigger**
1. Go to your repository on GitHub
2. Click on the "Actions" tab
3. Select "Build Angular and Push to Node Repo" workflow
4. Click "Run workflow" button
5. Select the branch (usually `master`)
6. Click "Run workflow"

**Note**: Regular commits without `[deploy]` or `[release]` will **NOT** trigger the workflow, saving CI/CD minutes and preventing unnecessary builds.

### Workflow Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions Runner                    │
│                    (Ubuntu Latest)                          │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  1. Checkout Angular Repository                             │
│     └─> Gets source code from current repo                  │
│                                                              │
│  2. Setup Node.js Environment                               │
│     └─> Installs Node.js version 18                         │
│                                                              │
│  3. Install Dependencies                                    │
│     └─> Runs: npm install                                    │
│                                                              │
│  4. Build Angular Application                               │
│     └─> Runs: npm run build -- --configuration production   │
│     └─> Output: dist/ folder with production build           │
│                                                              │
│  5. Clone Node.js Repository                                │
│     └─> Clones: swarajkc-portfolio.git                      │
│     └─> Uses: NODE_REPO_TOKEN secret for authentication     │
│                                                              │
│  6. Copy Build Files                                        │
│     └─> Removes old: node-repo/dist                         │
│     └─> Creates: node-repo/dist/                            │
│     └─> Copies: dist/* → node-repo/dist/                    │
│                                                              │
│  7. Commit and Push Changes                                 │
│     └─> Configures git user                                 │
│     └─> Commits with message: "Auto update Angular build"   │
│     └─> Pushes to Node.js repository                         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Detailed Step Breakdown

#### Step 0: Check Commit Message (Conditional Check)
```yaml
- name: Check commit message
  id: check
  run: |
    COMMIT_MSG=$(git log -1 --pretty=%B)
    if [[ "$COMMIT_MSG" == *"[deploy]"* ]] || [[ "$COMMIT_MSG" == *"[release]"* ]] || [[ "${{ github.event_name }}" == "workflow_dispatch" ]]; then
      echo "should-deploy=true" >> $GITHUB_OUTPUT
    else
      echo "should-deploy=false" >> $GITHUB_OUTPUT
    fi
```
- **Purpose**: Checks if the commit message contains deployment trigger keywords
- **Keywords**: `[deploy]` or `[release]`
- **Manual Trigger**: Always allows deployment when triggered manually
- **Result**: Sets `should-deploy` output to `true` or `false`
- **Build Job**: Only runs if `should-deploy == 'true'`

#### Step 1: Checkout Angular Repo
```yaml
- name: Checkout Angular Repo
  uses: actions/checkout@v4
```
- **Purpose**: Retrieves the source code from the current repository
- **Action**: Uses the official GitHub checkout action (v4)
- **Result**: Source code is available in the workspace

#### Step 2: Setup Node.js
```yaml
- name: Setup Node
  uses: actions/setup-node@v4
  with:
    node-version: 18
```
- **Purpose**: Installs and configures Node.js environment
- **Version**: Node.js 18.x
- **Action**: Uses the official setup-node action (v4)
- **Result**: Node.js and npm are available for use

#### Step 3: Install Dependencies
```yaml
- name: Install dependencies
  run: npm install
```
- **Purpose**: Installs all project dependencies defined in `package.json`
- **Command**: `npm install`
- **Result**: All npm packages are installed in `node_modules/`

#### Step 4: Build Angular Application
```yaml
- name: Build Angular
  run: npm run build -- --configuration production
```
- **Purpose**: Creates an optimized production build of the Angular application
- **Command**: `npm run build -- --configuration production`
- **Configuration**: Uses production configuration from `angular.json`
- **Output**: Production-ready files in the `dist/` directory
- **Features**:
  - Minification
  - Tree-shaking
  - AOT (Ahead-of-Time) compilation
  - Optimized bundles

#### Step 5: Clone Node.js Repository
```yaml
- name: Clone Node Repo
  run: |
    git clone https://${{ secrets.NODE_REPO_TOKEN }}@github.com/Swaraj55/swarajkc-portfolio.git node-repo
```
- **Purpose**: Clones the target Node.js repository where the build will be deployed
- **Repository**: `Swaraj55/swarajkc-portfolio`
- **Authentication**: Uses `NODE_REPO_TOKEN` secret (GitHub Personal Access Token)
- **Directory**: Cloned into `node-repo/` folder
- **Security**: Token is stored as a GitHub Secret for security

#### Step 6: Copy Angular Build to Node Repo
```yaml
- name: Copy Angular build to Node dist
  run: |
    rm -rf node-repo/dist
    mkdir -p node-repo/dist
    cp -r dist/* node-repo/dist/
```
- **Purpose**: Transfers the production build to the Node.js repository
- **Process**:
  1. Removes existing `node-repo/dist` directory (if exists)
  2. Creates new `node-repo/dist` directory
  3. Copies all files from `dist/` to `node-repo/dist/`
- **Result**: Node.js repo now contains the latest Angular build

#### Step 7: Commit and Push Changes
```yaml
- name: Commit and push
  run: |
    cd node-repo
    git config user.name "GitHub Action"
    git config user.email "action@github.com"
    git add .
    # Check if there are changes to commit
    if git diff --staged --quiet; then
      echo "ℹ️  No changes to commit. Working tree is clean."
      exit 0
    else
      git commit -m "Auto update Angular build"
      git push
    fi
```
- **Purpose**: Commits and pushes the build files to the Node.js repository
- **Git Configuration**:
  - User name: "GitHub Action"
  - User email: "action@github.com"
- **Git Operations**:
  1. Stages all changes: `git add .`
  2. Checks if there are staged changes
  3. If changes exist: Commits with message "Auto update Angular build" and pushes
  4. If no changes: Skips commit/push gracefully (workflow still succeeds)
- **Result**: Node.js repository is updated with the latest build (if changes exist)
- **Note**: If the build output is identical to the previous build, the step will skip committing and the workflow will still succeed

### Required Secrets

#### NODE_REPO_TOKEN
- **Type**: GitHub Personal Access Token (PAT)
- **Purpose**: Authenticates with the Node.js repository for cloning and pushing
- **Required Permissions**:
  - `repo` scope (full repository access)
- **Setup Instructions**:
  1. Go to GitHub Settings → Developer settings → Personal access tokens
  2. Generate a new token with `repo` scope
  3. Go to your repository Settings → Secrets and variables → Actions
  4. Add a new secret named `NODE_REPO_TOKEN`
  5. Paste the token value

### Repository Structure

#### Source Repository (Angular)
```
swaraj-portfolio/
├── src/
├── angular.json
├── package.json
├── dist/              # Generated during build
└── .github/
    └── workflows/
        └── build-and-push.yml
```

#### Target Repository (Node.js)
```
swarajkc-portfolio/
├── dist/              # Updated by workflow
│   ├── index.html
│   ├── main.*.js
│   ├── polyfills.*.js
│   └── assets/
└── (other Node.js files)
```

### Workflow Benefits

1. **Automation**: Eliminates manual build and deployment steps
2. **Consistency**: Ensures production builds are always created the same way
3. **Separation of Concerns**: Keeps source code and deployment separate
4. **Version Control**: All deployments are tracked in git history
5. **CI/CD Integration**: Part of continuous integration/deployment pipeline

### Commit Message Examples

#### ✅ Will Trigger Deployment
```bash
git commit -m "Update contact form [deploy]"
git commit -m "Add new feature [release]"
git commit -m "Fix bug [deploy]"
git commit -m "Version 2.0 [release]"
```

#### ❌ Will NOT Trigger Deployment
```bash
git commit -m "Update contact form"
git commit -m "Add new feature"
git commit -m "Fix bug"
git commit -m "WIP: testing changes"
```

### Troubleshooting

#### Common Issues

1. **Workflow Not Running**
   - Check if commit message contains `[deploy]` or `[release]`
   - Verify you're pushing to the `master` branch
   - Check workflow logs to see if it was skipped
   - Use manual trigger if needed

2. **Build Fails**
   - Check Node.js version compatibility
   - Verify all dependencies are correctly defined
   - Review build errors in workflow logs

2. **Clone Fails**
   - Verify `NODE_REPO_TOKEN` secret is set correctly
   - Ensure token has `repo` permissions
   - Check repository URL is correct

3. **Push Fails**
   - Verify token has write access to the repository
   - Check if repository has branch protection rules
   - Ensure no conflicts exist in the target repository

4. **Files Not Copied**
   - Verify build completed successfully
   - Check `dist/` directory exists after build
   - Review file permissions

5. **"No changes to commit" Message**
   - This is **normal** and not an error
   - Occurs when the build output is identical to the previous build
   - The workflow will complete successfully without committing
   - This saves unnecessary commits when nothing has changed

### Monitoring

- **Workflow Runs**: View in the "Actions" tab of your GitHub repository
- **Logs**: Click on any workflow run to see detailed logs for each step
- **Status**: Check commit status indicators on pull requests

### Best Practices

1. **Branch Protection**: Consider protecting the `master` branch
2. **Testing**: Add test steps before building
3. **Notifications**: Add notification steps for build failures
4. **Caching**: Consider caching `node_modules` for faster builds
5. **Build Artifacts**: Optionally store build artifacts for debugging

### Future Enhancements

Potential improvements to consider:

1. **Multi-branch Support**: Deploy different branches to different environments
2. **Build Caching**: Cache dependencies to speed up builds
3. **Testing Integration**: Run tests before building
4. **Deployment Notifications**: Send notifications on success/failure
5. **Rollback Mechanism**: Keep previous builds for quick rollback
6. **Environment Variables**: Support different configurations per environment
7. **Build Optimization**: Add build size analysis and optimization reports

### Related Files

- **Workflow File**: `.github/workflows/build-and-push.yml`
- **Angular Config**: `angular.json`
- **Package Config**: `package.json`
- **Node.js Repo**: `https://github.com/Swaraj55/swarajkc-portfolio`

### Version History

- **Current Version**: v1.0
- **Last Updated**: 2024
- **Node.js Version**: 18.x
- **Angular Version**: 18.0.0

---

**Note**: This workflow assumes the Node.js repository is set up to serve the Angular build files from the `dist/` directory. Ensure your Node.js server configuration matches this structure.
