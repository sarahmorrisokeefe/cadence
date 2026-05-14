# Cadence — TestFlight

Two sections:
- **Recurring releases** — what you do for every update once the app is on TestFlight.
- **First-time setup** — what you did once to get Cadence onto TestFlight initially. Keep for reference / fresh laptops.

---

## Recurring releases

For every TestFlight update once Cadence is set up:

```bash
npm run release:ios                  # bump build only (most common)
# or
npm run release:ios -- --version 1.2 # bump build AND set marketing version
```

What that does:
1. Refuses to run unless you're on `main` with a clean working tree
2. `git pull` main
3. Bumps the iOS build number by 1 (via `agvtool next-version -all`)
4. Optionally sets a new marketing version (e.g. 1.0 → 1.2)
5. Runs `npm run ios:build` to refresh the iOS bundle from the latest web code
6. Opens Xcode positioned for archive

Then **in Xcode**:

1. Wait for indexing — top status bar quiets down (~30 sec).
2. Destination dropdown next to ▶/■ → **Any iOS Device (arm64)**.
3. **Product → Archive** (≈1–3 min). Organizer opens automatically.
4. With the top archive selected → **Distribute App** → **App Store Connect** → **Next** → **Upload** → keep all default checkboxes → **Upload**.
5. Wait for **Upload Successful** dialog (2–10 min).

Then **wait for Apple**:

- 5–30 min for automated processing. You'll get email subject `App Store Connect — Build N has been processed`.
- Build appears in [App Store Connect](https://appstoreconnect.apple.com) → Apps → Cadence → TestFlight tab.
- Internal testers (you) get the update in the TestFlight app on your phone automatically.
- External testers need a one-time beta review (24–48 hr) per major version, then they get every subsequent build instantly.

### Version conventions

- **Marketing version** (`1.0`, `1.1`, `2.0`) — what users see in TestFlight + App Store. Bump for user-visible feature milestones.
- **Build** (`1`, `2`, `3`, …) — unique identifier per upload. **Apple rejects duplicates** even from deleted builds. The script auto-increments this.

### Encryption-compliance prompt

First upload after a marketing version bump prompts in App Store Connect: *"Does your app use encryption?"* Cadence uses HTTPS only — answer **No** to non-exempt encryption. Once per marketing version.

### When it goes wrong

| Symptom | Fix |
|---|---|
| Script refuses: "Working tree has uncommitted changes" | Commit / stash / discard the changes, then retry |
| Script refuses: "Not on main" | `git checkout main` first |
| Xcode "No matching provisioning profile" | App target → Signing & Capabilities → ✓ Automatically manage signing |
| Apple rejects upload: "Build number X already used" | Script's job is to prevent this — but if you uploaded manually elsewhere, bump again with `cd ios/App && agvtool next-version -all` and re-archive |
| ITMS-90809 / privacy manifest warning | Add `PrivacyInfo.xcprivacy` in `ios/App/App/` — only needed for certain SDKs, current Cadence dependencies don't trigger this |

---

## First-time setup

You did all of this once already. Keep this section in case you set up a fresh laptop, hand the project off, or need to remember why something exists.

### Prerequisites

- [ ] Apple Developer account ($99/year) enrolled and active
- [ ] Xcode 15+ installed (from Mac App Store)
- [ ] iOS device or Simulator for testing
- [ ] App record created in App Store Connect

---

### Step 1: Local Setup

- [ ] Run `npm install` to install all dependencies
- [ ] Run `npm run build` to build web assets
- [ ] Run `npx cap add ios` (first time only — regenerates the `ios/` Xcode project)
- [ ] Run `npm run ios:open` to open the project in Xcode

---

### Step 2: Xcode — Signing & Capabilities

- [ ] In Xcode, select the **App** target
- [ ] Go to **Signing & Capabilities** tab
- [ ] Set **Team** to your Apple Developer account
- [ ] Confirm **Bundle Identifier** is `com.sarahoke.cadence`
- [ ] Enable **Automatically manage signing**
- [ ] Verify a provisioning profile is created/downloaded successfully

---

### Step 3: Info.plist Configuration

Open `ios/App/App/Info.plist` and add/verify these entries:

- [ ] `UIRequiresFullScreen` → `Boolean: YES`
- [ ] `UISupportedInterfaceOrientations` → Array containing only `UIInterfaceOrientationPortrait`
- [ ] `ITSAppUsesNonExemptEncryption` → `Boolean: NO` (Cadence only uses iOS-native TLS via HTTPS — declaring this skips App Store Connect's encryption-compliance prompt on every upload)

```xml
<key>UIRequiresFullScreen</key>
<true/>
<key>UISupportedInterfaceOrientations</key>
<array>
    <string>UIInterfaceOrientationPortrait</string>
</array>
<key>ITSAppUsesNonExemptEncryption</key>
<false/>
```

---

### Step 4: App Icon

- [ ] Generate icon: `node scripts/generate-icon.js` (see instructions it prints)
- [ ] In Xcode: open **Assets.xcassets → AppIcon**
- [ ] Drag `assets/icon.png` (1024x1024) into the App Store slot
- [ ] Verify no missing icon warnings in Xcode
- [ ] **OR** use `npx @capacitor/assets generate --ios` to auto-fill all sizes

---

### Step 5: Splash Screen

- [ ] Capacitor splash screen is configured in `capacitor.config.ts` (cadence purple background, 2s duration)
- [ ] Verify `LaunchScreen.storyboard` loads correctly on first run (Xcode → Run on Simulator)
- [ ] If customizing further: edit `ios/App/App/Base.lproj/LaunchScreen.storyboard`

---

### Step 6: Build Settings

- [ ] Set **Deployment Target** to iOS 14.0 or higher (Capacitor 8 minimum)
- [ ] Set **Device** to iPhone (Portrait only per Info.plist)
- [ ] Confirm **Swift Language Version** is set (usually Swift 5)
- [ ] Set build scheme to **Release** (Product → Scheme → Edit Scheme → Run → Release)

---

### Step 7: Test on Simulator

- [ ] Build and run on iPhone 15 Pro simulator (Cmd+R)
- [ ] Verify safe area insets render correctly (no content behind notch/Dynamic Island)
- [ ] Verify bottom nav is above home indicator
- [ ] Verify dark mode toggle works and status bar color changes
- [ ] Verify all 5 nav tabs navigate correctly
- [ ] Verify splash screen appears and hides cleanly
- [ ] Verify data persists across app restarts (Capacitor Preferences)
- [ ] Verify practice quiz completes without crashing

---

### Step 8: Test on Physical Device

- [ ] Connect iPhone via USB
- [ ] Select physical device in Xcode device dropdown
- [ ] Build and run (Cmd+R) — accept trust prompt on device if needed
- [ ] Repeat all simulator checks on real device
- [ ] Test on at least one device with a notch (iPhone X or later)
- [ ] Test with keyboard: any text input fields

---

### Step 9: Archive for Distribution

- [ ] Set the active scheme destination to **Any iOS Device (arm64)**
- [ ] Product → **Archive** (this may take a few minutes)
- [ ] Wait for the Organizer window to open
- [ ] Verify archive appears in Organizer → Archives

---

### Step 10: App Store Connect Setup

- [ ] Log in to [appstoreconnect.apple.com](https://appstoreconnect.apple.com)
- [ ] Create new App (if not done): **My Apps → + → New App**
  - Platform: iOS
  - Name: Cadence
  - Bundle ID: `com.sarahoke.cadence`
  - Primary Language: English (US)
  - SKU: `cadence-ios-001`
- [ ] Fill in app metadata:
  - [ ] App description: "Cadence is an offline music theory study app with gamified lessons covering notation, rhythm, scales, intervals, and chords. Designed for beginners through AP Music Theory."
  - [ ] Keywords: music, theory, AP, study, quiz, education
  - [ ] Support URL
  - [ ] Marketing URL (optional)
  - [ ] Privacy Policy URL (required for App Store)
- [ ] Upload screenshots for iPhone 6.7" display (required)
- [ ] Set age rating (4+)
- [ ] Select category: Education

---

### Step 11: Upload Build to TestFlight

- [ ] In Xcode Organizer: click **Distribute App**
- [ ] Choose **TestFlight & App Store** → **Next**
- [ ] Choose **Upload** → **Next**
- [ ] Leave all distribution options checked → **Next**
- [ ] Xcode will sign and upload the build (takes 2-10 minutes)
- [ ] Wait for build to appear in App Store Connect → TestFlight tab
- [ ] Wait for Apple's automated review (usually 15-30 min for TestFlight)

---

### Step 12: Configure TestFlight

- [ ] In App Store Connect → TestFlight → your build
- [ ] Add **What to Test** notes describing this build
- [ ] Set **Test Information** (privacy policy URL required)
- [ ] Under **Internal Testing**: add yourself as internal tester
- [ ] Accept TestFlight invite email on your iPhone
- [ ] Install via TestFlight app and do final smoke test

---

### Step 13: External TestFlight (Optional)

- [ ] Create an **External Testing** group
- [ ] Submit build for Beta App Review (usually reviewed within 24-48 hours)
- [ ] Once approved, share the public TestFlight link with beta testers

---

## Useful Commands Reference

```bash
# Build web + sync native
npm run ios:build

# Open Xcode
npm run ios:open

# After Xcode project changes (e.g. adding a plugin):
npx cap update ios

# Check Capacitor doctor
npx cap doctor
```

---

## Common Issues

| Problem | Fix |
|---------|-----|
| "No provisioning profile" | Signing & Capabilities → enable Automatically manage signing |
| App crashes on launch | Check Xcode console for errors; verify `capacitor.config.ts` `webDir` is `dist` |
| Safe areas wrong | Verify `viewport-fit=cover` in `index.html` and `safe-top`/`safe-bottom` CSS classes |
| Dark status bar on light background | Check `StatusBar.setStyle` call in `App.tsx` |
| Data not persisting | Verify `@capacitor/preferences` is in `node_modules`; run `npx cap sync` |
| Build fails: "missing Swift Package" | Run `npx cap update ios` then clean build (Cmd+Shift+K) |
