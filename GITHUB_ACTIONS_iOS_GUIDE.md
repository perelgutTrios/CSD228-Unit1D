# 🍎 GitHub Actions iOS Build Guide

## 🚀 Automated iOS Builds in the Cloud

Your Flutter Tip Calculator now has **three different iOS build workflows** set up on GitHub Actions that will automatically build iPhone apps using Apple's macOS cloud servers - **completely free!**

### 📋 Available Workflows

#### 1. 🔥 **Quick iOS Build** (`quick-ios-build.yml`)
- **Trigger**: Manual button click
- **Purpose**: Fast development builds for testing
- **Output**: Unsigned iOS app for quick testing
- **Runtime**: ~5-8 minutes

#### 2. 🍎 **iOS Build & Release** (`ios-build.yml`) 
- **Trigger**: Automatic on push to `TipCalcFlutterNative` branch
- **Purpose**: Comprehensive build with full testing
- **Output**: Production-ready iOS app bundle
- **Runtime**: ~8-12 minutes

#### 3. 📱 **iOS Multi-Build Pipeline** (`ios-multi-build.yml`)
- **Trigger**: Manual with options, or version tags (v1.0.0)
- **Purpose**: Professional builds with multiple variants
- **Output**: Device + Simulator builds, automatic releases
- **Runtime**: ~10-15 minutes

---

## 🎯 How to Use GitHub Actions iOS Builds

### ✅ **Method 1: Automatic Builds (Easiest)**

1. **Push code changes** to the `TipCalcFlutterNative` branch:
   ```bash
   git add .
   git commit -m "Update app features"
   git push origin TipCalcFlutterNative
   ```

2. **GitHub automatically builds iOS app** (takes ~8 minutes)

3. **Download your iOS app**:
   - Go to your GitHub repository
   - Click **"Actions"** tab
   - Click on the latest build
   - Download the `ios-build-XXX` artifact

### ⚡ **Method 2: Quick Manual Build**

1. **Go to GitHub Actions**:
   - Navigate to your repository on GitHub
   - Click **"Actions"** tab
   - Click **"🔥 Quick iOS Build"** on the left

2. **Trigger the build**:
   - Click **"Run workflow"** button
   - Optionally enter a build name
   - Click **"Run workflow"**

3. **Wait ~5 minutes** for the build to complete

4. **Download the iOS app** from the artifacts section

### 🏷️ **Method 3: Release Builds (Most Professional)**

1. **Create a version tag**:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. **GitHub automatically**:
   - Builds iOS app for devices AND simulator
   - Runs full test suite
   - Creates a GitHub Release with download links
   - Packages everything professionally

---

## 📥 Installing Your iOS App

### 📱 **On Physical iPhone/iPad**

After downloading the build artifact:

1. **Extract the ZIP file**
2. **Copy `Runner.app` to a Mac with Xcode**
3. **Connect your iOS device**
4. **In Xcode**:
   - Go to **Window > Devices and Simulators**
   - Select your device
   - Click **"+"** under Installed Apps
   - Select the `Runner.app` file
   - Click **"Install"**

### 📲 **In iOS Simulator** 

1. **Open Xcode on Mac**
2. **Open iOS Simulator**
3. **Drag and drop** the `Runner.app` onto the simulator
4. **App installs automatically**

---

## 🔧 Advanced Options

### 🛠️ **For App Store Distribution**

To distribute via App Store, you'll need:

1. **Apple Developer Account** ($99/year)
2. **Code signing certificates** 
3. **Modify the workflow** to include your signing credentials

### 📊 **Build Monitoring**

- **View build logs**: Click on any workflow run to see detailed logs
- **Get notifications**: GitHub can email you when builds complete
- **Build status badges**: Add status badges to your README

### 🔄 **Customizing Builds**

You can modify the workflows to:
- Change Flutter version
- Add additional testing
- Include custom build scripts
- Deploy to TestFlight automatically

---

## 📋 **What You Get**

### ✅ **Each Build Includes**:
- Native iOS app (`Runner.app`)
- Installation instructions
- Build information (date, commit, Flutter version)
- Error logs (if build fails)

### 📱 **iOS App Features**:
- Full native iOS performance
- iOS-style interface elements  
- App Store ready (with proper signing)
- Works on iPhone and iPad
- All tip calculator functionality preserved

---

## 🎉 **Summary**

You now have **professional iOS build automation** that:

✅ **Builds iOS apps automatically** when you push code  
✅ **Costs $0** (uses GitHub's free macOS runners)  
✅ **No Mac required** on your end  
✅ **Professional packaging** with releases and artifacts  
✅ **Multiple build types** for different needs  
✅ **Easy to use** - just push code or click a button  

Your **Windows version stays completely untouched** while you get native iPhone apps built in the cloud!

---

## 🚀 Next Steps

1. **Commit and push** these workflow files to activate the builds
2. **Try a quick build** using the manual trigger
3. **Push a code change** to see automatic builds in action
4. **Create a version tag** (like `v1.0.0`) for a full release build

**Your iOS builds will be available within minutes of pushing code!** 🎯