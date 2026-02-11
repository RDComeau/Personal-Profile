# Self-Hosted GitHub Actions Runner Setup

This project uses a self-hosted GitHub Actions runner on the homelab for CI/CD.

## Why Self-Hosted?

- **Ghost API Access**: The runner can reach Ghost on the internal Docker network during builds
- **Deploy Access**: The runner can directly update the Astro static files
- **No Secrets Exposure**: Ghost stays private, no need to expose APIs publicly

## Prerequisites

- Docker and Docker Compose installed on homelab
- GitHub Personal Access Token (PAT) with `repo` scope

## Setup Steps

### 1. Generate GitHub Token

1. Go to https://github.com/settings/tokens
2. Generate new token (classic) with `repo` scope
3. Copy the token — you'll need it for the runner registration

### 2. Get Runner Registration Token

```bash
# Using GitHub CLI (recommended)
gh api -X POST repos/YOUR_USERNAME/Personal-Profile/actions/runners/registration-token --jq '.token'

# Or use the PAT with curl
curl -X POST \
  -H "Authorization: token YOUR_PAT" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/YOUR_USERNAME/Personal-Profile/actions/runners/registration-token
```

### 3. Create Runner Directory

```bash
mkdir -p ~/actions-runner && cd ~/actions-runner
```

### 4. Download and Configure Runner

```bash
# Download latest runner (check https://github.com/actions/runner/releases for version)
curl -o actions-runner-linux-x64.tar.gz -L \
  https://github.com/actions/runner/releases/download/v2.321.0/actions-runner-linux-x64-2.321.0.tar.gz

tar xzf ./actions-runner-linux-x64.tar.gz

# Configure
./config.sh --url https://github.com/YOUR_USERNAME/Personal-Profile \
  --token YOUR_REGISTRATION_TOKEN \
  --name homelab-runner \
  --labels self-hosted,linux,x64 \
  --work _work

# Install as service
sudo ./svc.sh install
sudo ./svc.sh start
```

### 5. Configure Environment

The runner needs access to deploy files. Set these environment variables:

```bash
# Add to runner's .env or systemd service
DEPLOY_PATH=/path/to/Personal-Profile/deploy/astro
```

Or configure via GitHub repo secrets (recommended):
- `GHOST_URL`: http://personal-profile-ghost:2368 (internal Docker network)
- `GHOST_CONTENT_API_KEY`: Your Ghost Content API key
- `DEPLOY_PATH`: /absolute/path/to/deploy/astro

### 6. Verify Network Access

The runner needs to reach Ghost. If running outside Docker:

```bash
# Test Ghost is accessible
curl http://localhost:8080/ghost/api/content/posts/?key=YOUR_API_KEY

# If Ghost is only on Docker network, runner needs host networking or to run in Docker
```

## Alternative: Runner in Docker

For easier networking, run the runner as a Docker container:

```bash
docker run -d \
  --name github-runner \
  --restart unless-stopped \
  --network personal-profile_default \
  -e RUNNER_TOKEN=YOUR_TOKEN \
  -e RUNNER_REPOSITORY_URL=https://github.com/YOUR_USERNAME/Personal-Profile \
  -e RUNNER_NAME=homelab-docker-runner \
  -v /path/to/deploy:/deploy \
  -v /var/run/docker.sock:/var/run/docker.sock \
  myoung34/github-runner:latest
```

## Security Notes

1. **Fork PRs are blocked** — The CI workflow checks PR origin and skips self-hosted jobs for forks
2. **Secrets are safe** — GitHub masks secret values in logs
3. **Network isolation** — Runner only needs access to Ghost and deploy directory

## Troubleshooting

### Runner can't reach Ghost

```bash
# Check Ghost is running
docker ps | grep ghost

# Check network connectivity
docker network inspect personal-profile_default
```

### Permission denied on deploy

```bash
# Ensure deploy directory exists and is writable
mkdir -p /path/to/deploy/astro
chmod 755 /path/to/deploy/astro
```

### Runner offline in GitHub

```bash
# Check runner status
sudo ./svc.sh status

# View logs
sudo journalctl -u actions.runner.YOUR_USERNAME-Personal-Profile.homelab-runner
```
