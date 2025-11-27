# Quick Start Guide - Push to GitHub

## 🚀 Fastest Way (One-Click Script)

I've created an automated script for you!

### Prerequisites

1. **Install Git** (if not already installed):
   - Download: https://git-scm.com/download/win
   - Run installer with default settings
   - Restart your computer

2. **Create GitHub Repository**:
   - Go to: https://github.com/new
   - Repository name: `KITOJOBS`
   - Description: `Healthcare Job Portal - Connecting Doctors with Hospitals`
   - Keep it **Public** (or Private if you prefer)
   - **DO NOT** check "Initialize with README"
   - Click **"Create repository"**

### Run the Script

1. Double-click: `push-to-github.bat` in your KITO folder
2. The script will:
   - ✅ Configure Git with your credentials
   - ✅ Initialize the repository
   - ✅ Add all files
   - ✅ Create initial commit
   - ✅ Push to GitHub

3. When prompted for authentication:
   - **Username**: `krishnark7914`
   - **Password**: Use a **Personal Access Token** (not your GitHub password)

### Getting Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Name: `KITO Upload`
4. Select scope: ✅ **repo** (full control)
5. Click **"Generate token"**
6. **Copy the token** (you won't see it again!)
7. Paste it when the script asks for password

---

## ✅ After Successful Push

Your repository will be live at:
**https://github.com/krishnark7914/KITOJOBS**

### Recommended Next Steps

1. **Add Repository Description** (on GitHub):
   > Healthcare Job Portal built with Next.js, TypeScript, and shadcn/ui

2. **Add Topics** (tags for discoverability):
   - `nextjs`
   - `typescript`
   - `tailwindcss`
   - `shadcn-ui`
   - `healthcare`
   - `job-portal`
   - `react`

3. **Update README** (optional):
   - Replace clone URL with: `https://github.com/krishnark7914/KITOJOBS.git`

---

## 🔧 Troubleshooting

### "Git is not recognized"
- Install Git from: https://git-scm.com/download/win
- Restart your computer
- Run the script again

### "Repository not found"
- Make sure you created the repository on GitHub first
- Repository name must be exactly: `KITOJOBS`
- Check it's under your account: `krishnark7914`

### "Authentication failed"
- Don't use your GitHub password
- Use Personal Access Token instead (see above)
- Make sure token has `repo` scope

### "Permission denied"
- Check you're logged into the correct GitHub account
- Verify repository exists and you have access
- Try using GitHub CLI: `gh auth login`

---

## 📱 Alternative: GitHub Desktop (Easier)

If you prefer a GUI:

1. Download **GitHub Desktop**: https://desktop.github.com/
2. Sign in with your GitHub account
3. Click **"Add Local Repository"**
4. Browse to: `C:\Users\hp\Desktop\RK\KITO`
5. Click **"Publish repository"**
6. Name: `KITOJOBS`
7. Click **"Publish"**

Done! ✨

---

## 📞 Need Help?

If you encounter any issues:
1. Check the error message in the script
2. Follow the troubleshooting steps above
3. Make sure Git is installed and repository is created on GitHub

Your KITO Job Portal is ready to go live! 🎉
