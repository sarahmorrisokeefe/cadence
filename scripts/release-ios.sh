#!/usr/bin/env bash
# scripts/release-ios.sh — prep a TestFlight upload.
#
# Does the mechanical parts of a recurring TestFlight release:
#   1) sanity-check git (on main, clean tree, in sync with origin)
#   2) pull latest main
#   3) bump iOS build number by 1 (via agvtool)
#   4) optionally bump marketing version (--version 1.2)
#   5) build web + sync to the iOS Xcode project
#   6) open Xcode positioned for archive
#
# You still archive + upload manually in Xcode — that's an interactive
# flow with code-signing prompts and the Organizer UI. This script just
# removes the boilerplate around it.
#
# Usage:
#   npm run release:ios                  # bump build only (most common)
#   npm run release:ios -- --version 1.2 # bump build AND set marketing to 1.2
#
# Note: ios/ is gitignored, so the version bump changes that aren't
# tracked anywhere — they live only in your local Xcode project. The
# build number persists between uploads as long as you don't delete ios/.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

IOS_DIR="ios/App"
NEW_MARKETING_VERSION=""

# ─── Parse args ─────────────────────────────────────────────────────────────
while [[ $# -gt 0 ]]; do
  case "$1" in
    --version)
      NEW_MARKETING_VERSION="${2:-}"
      if [[ -z "$NEW_MARKETING_VERSION" ]]; then
        echo "✗ --version needs an argument (e.g. --version 1.2)" >&2
        exit 1
      fi
      shift 2
      ;;
    -h|--help)
      sed -n 's/^# \?//;1,/^$/p' "$0" | head -n 30
      exit 0
      ;;
    *)
      echo "✗ Unknown arg: $1" >&2
      echo "  Usage: $0 [--version X.Y]" >&2
      exit 1
      ;;
  esac
done

# ─── Pre-flight ─────────────────────────────────────────────────────────────
echo "▸ Pre-flight checks"

if [[ ! -d "$IOS_DIR" ]]; then
  echo "  ✗ $IOS_DIR not found — run \`npx cap add ios\` first." >&2
  exit 1
fi

if [[ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]]; then
  echo "  ✗ Not on main. Switch to main and retry." >&2
  exit 1
fi

if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "  ✗ Working tree has uncommitted changes. Commit or stash first:" >&2
  git status -s >&2
  exit 1
fi

if ! command -v agvtool >/dev/null 2>&1; then
  echo "  ✗ agvtool not on PATH — install Xcode command-line tools:" >&2
  echo "    xcode-select --install" >&2
  exit 1
fi

echo "  ✓ on main, clean tree, agvtool available"

# ─── Pull main ──────────────────────────────────────────────────────────────
echo "▸ Pulling main from origin"
git pull --ff-only

# ─── Bump versions ──────────────────────────────────────────────────────────
echo "▸ Bumping iOS version"

pushd "$IOS_DIR" > /dev/null

OLD_BUILD=$(agvtool what-version -terse)
agvtool next-version -all > /dev/null
NEW_BUILD=$(agvtool what-version -terse)
echo "  ✓ Build: $OLD_BUILD → $NEW_BUILD"

if [[ -n "$NEW_MARKETING_VERSION" ]]; then
  OLD_VERSION=$(agvtool what-marketing-version -terse1)
  agvtool new-marketing-version "$NEW_MARKETING_VERSION" > /dev/null
  echo "  ✓ Version: $OLD_VERSION → $NEW_MARKETING_VERSION"
fi

CURRENT_VERSION=$(agvtool what-marketing-version -terse1)
popd > /dev/null

# ─── Build + sync ───────────────────────────────────────────────────────────
echo "▸ Building web assets + syncing to iOS"
npm run ios:build > /dev/null

# ─── Open Xcode ─────────────────────────────────────────────────────────────
echo "▸ Opening Xcode"
npx cap open ios > /dev/null 2>&1 &

# ─── Next steps ─────────────────────────────────────────────────────────────
cat <<EOF

──────────────────────────────────────────────────────────────────
✓ Ready to archive: ${CURRENT_VERSION} (build ${NEW_BUILD})
──────────────────────────────────────────────────────────────────

Next steps in Xcode:
  1. Wait for indexing (top status bar quiets down)
  2. Destination dropdown → "Any iOS Device (arm64)"
  3. Product → Archive (about 1–3 min)
  4. Organizer opens → Distribute App → App Store Connect → Upload
  5. Click through defaults → Upload

After "Upload Successful":
  • Build appears in App Store Connect → TestFlight in 5–30 min
  • TestFlight app on your phone shows the update once Apple processes
EOF
