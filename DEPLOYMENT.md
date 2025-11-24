# Dreamhost Deployment Guide

This guide will help you set up automated deployment from GitHub to Dreamhost using GitHub Actions.

## Prerequisites

- A Dreamhost hosting account with SSH access
- SSH key pair for authentication
- GitHub repository with admin access

## Step 1: Generate SSH Key Pair for GitHub Actions

On your local machine, generate a dedicated SSH key pair for deployments:

```bash
ssh-keygen -t ed25519 -C "github-actions-deploy" -f dreamhost_deploy_key
```

This creates two files:
- `dreamhost_deploy_key` (private key - keep this secure!)
- `dreamhost_deploy_key.pub` (public key)

## Step 2: Add Public Key to Dreamhost

1. **Log into your Dreamhost panel** at https://panel.dreamhost.com/

2. **Navigate to Users → Manage Users**

3. **Edit your shell user** and ensure it's set to "Shell User" (not SFTP only)

4. **SSH into your Dreamhost server:**
   ```bash
   ssh your_username@your_domain.com
   ```

5. **Add the public key to authorized_keys:**
   ```bash
   # Create .ssh directory if it doesn't exist
   mkdir -p ~/.ssh
   chmod 700 ~/.ssh
   
   # Add your public key
   echo "your-public-key-content-here" >> ~/.ssh/authorized_keys
   chmod 600 ~/.ssh/authorized_keys
   ```
   
   Replace `your-public-key-content-here` with the contents of `dreamhost_deploy_key.pub`

6. **Test the connection from your local machine:**
   ```bash
   ssh -i dreamhost_deploy_key your_username@your_domain.com
   ```

## Step 3: Configure GitHub Secrets

1. **Go to your GitHub repository**
2. **Navigate to Settings → Secrets and variables → Actions**
3. **Click "New repository secret" and add the following secrets:**

### Required Secrets:

| Secret Name | Description | Example Value |
|------------|-------------|---------------|
| `DREAMHOST_SSH_PRIVATE_KEY` | Contents of your private key file (`dreamhost_deploy_key`) | Paste entire private key including `-----BEGIN OPENSSH PRIVATE KEY-----` and `-----END OPENSSH PRIVATE KEY-----` |
| `DREAMHOST_HOST` | Your Dreamhost server hostname | `your_domain.com` or `server.dreamhost.com` |
| `DREAMHOST_USER` | Your Dreamhost SSH username | `your_username` |
| `DREAMHOST_PORT` | SSH port (usually 22) | `22` |
| `DREAMHOST_TARGET_DIR` | Target directory on Dreamhost | `/home/your_username/your_domain.com/` |

### How to Add Each Secret:

**DREAMHOST_SSH_PRIVATE_KEY:**
- Open the `dreamhost_deploy_key` file in a text editor
- Copy the **entire** contents (including the header and footer lines)
- Paste into the secret value field

**DREAMHOST_HOST:**
- This is typically `your_domain.com` or the server address from Dreamhost
- Check your Dreamhost panel under "Manage Domains" for the server name

**DREAMHOST_USER:**
- Your SSH/Shell username from Dreamhost
- Found in Dreamhost panel under "Users → Manage Users"

**DREAMHOST_PORT:**
- Almost always `22` for Dreamhost
- Only change if Dreamhost specifies a different port

**DREAMHOST_TARGET_DIR:**
- The full path where your website files should be deployed
- Example: `/home/username/yourdomain.com/`
- For subdirectory: `/home/username/yourdomain.com/subdirectory/`
- **Important:** Make sure this directory exists on your Dreamhost server

## Step 4: Verify Directory Structure on Dreamhost

SSH into your Dreamhost server and verify/create the target directory:

```bash
ssh your_username@your_domain.com

# Create your target directory if it doesn't exist
mkdir -p ~/your_domain.com

# Verify permissions
ls -la ~/your_domain.com
```

## Step 5: Test the Deployment

1. **Commit and push** any change to the `main` branch
2. **Go to Actions tab** in your GitHub repository
3. **Watch the workflow run** - it should:
   - Checkout code
   - Setup Node.js
   - Install dependencies
   - Build the Astro site
   - Deploy to Dreamhost via SSH
4. **Check your website** to verify the deployment

## Troubleshooting

### SSH Connection Issues

If deployment fails with SSH errors:

1. **Verify SSH key format:**
   - GitHub secrets don't support passphrases - ensure your key has no passphrase
   - Regenerate without passphrase if needed:
     ```bash
     ssh-keygen -t ed25519 -C "github-actions-deploy" -f dreamhost_deploy_key -N ""
     ```

2. **Check authorized_keys on Dreamhost:**
   ```bash
   cat ~/.ssh/authorized_keys
   ```
   Should contain your public key

3. **Verify permissions:**
   ```bash
   chmod 700 ~/.ssh
   chmod 600 ~/.ssh/authorized_keys
   ```

### Deployment Path Issues

If files deploy but website doesn't update:

1. **Check Dreamhost domain settings:**
   - In Dreamhost panel → Manage Domains
   - Verify the "Web directory" path matches your `DREAMHOST_TARGET_DIR`

2. **Verify deployed files:**
   ```bash
   ssh your_username@your_domain.com
   ls -la ~/your_domain.com
   ```

### Build Issues

If the build step fails:

1. **Test locally first:**
   ```bash
   npm ci
   npm run build
   ```

2. **Check Node.js version compatibility** in the workflow file

## Manual Deployment (Fallback)

If you need to deploy manually:

```bash
# Build locally
npm run build

# Deploy via rsync
rsync -avz --delete dist/ your_username@your_domain.com:~/your_domain.com/
```

## Security Notes

- **Never commit** your private SSH key to the repository
- **Delete** the local private key file after adding it to GitHub secrets
- Keep the public key (`*.pub` file) for reference
- **Use environment-specific keys** - don't reuse personal SSH keys
- **Rotate keys periodically** for security

## Additional Configuration

### Deploy on Pull Request (Optional)

To test deployments on pull requests to a staging environment, modify `.github/workflows/deploy.yml`:

```yaml
on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
```

Add staging secrets for PR deployments with different target directory.

### Deployment Notifications

Consider adding Slack/Discord notifications on deployment success/failure.

## Resources

- [Dreamhost SSH Documentation](https://help.dreamhost.com/hc/en-us/articles/216041267-SSH-overview)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Astro Build Documentation](https://docs.astro.build/en/guides/deploy/)
