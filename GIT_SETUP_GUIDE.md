# Git Setup Guide for KITO Job Portal

Since Git is not currently installed on your system, here's a comprehensive guide to push your KITO project to GitHub.

## Option 1: Install Git and Push via Command Line (Recommended)

### Step 1: Install Git

1. Download Git from: https://git-scm.com/download/win
2. Run the installer with default settings
3. Restart your terminal/PowerShell

### Step 2: Configure Git (First Time Only)

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Create GitHub Repository

1. Go to https://github.com
2. Click the "+" icon in the top right
3. Select "New repository"
4. Name it: `KITOJOBS`
5. Keep it Public or Private (your choice)
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

### Step 4: Push Your Code

Open PowerShell in your project directory (`C:\Users\hp\Desktop\RK\KITO`) and run:

```bash
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: KITO Healthcare Job Portal"

# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/KITOJOBS.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Option 2: Use GitHub Desktop (Easiest)

### Step 1: Install GitHub Desktop

1. Download from: https://desktop.github.com/
2. Install and sign in with your GitHub account

### Step 2: Add Your Project

1. Click "File" → "Add Local Repository"
2. Browse to: `C:\Users\hp\Desktop\RK\KITO`
3. If prompted to create a repository, click "Create Repository"

### Step 3: Publish to GitHub

1. Click "Publish repository" button
2. Name it: `KITOJOBS`
3. Add description: "Healthcare Job Portal - Connecting Doctors with Hospitals"
4. Choose Public or Private
5. Click "Publish Repository"

---

## Option 3: Upload via GitHub Web Interface

### Step 1: Create Repository on GitHub

1. Go to https://github.com
2. Click "+" → "New repository"
3. Name: `KITOJOBS`
4. Click "Create repository"

### Step 2: Upload Files

1. On the repository page, click "uploading an existing file"
2. Drag and drop your entire KITO folder
3. Or click "choose your files" and select all files
4. Add commit message: "Initial commit: KITO Healthcare Job Portal"
5. Click "Commit changes"

**Note**: This method doesn't preserve Git history but is the quickest if Git is not installed.

---

## Important Files to Include

Make sure these files are in your repository:

✅ All source code files
✅ `package.json` and `package-lock.json`
✅ `README.md` (already created)
✅ `.gitignore` (already created)
✅ `next.config.js`
✅ `tailwind.config.js`
✅ `tsconfig.json`

**Excluded by .gitignore:**
- `node_modules/` (dependencies - will be installed via npm)
- `.next/` (build files)
- `.env*.local` (environment variables)

---

## After Pushing to GitHub

### Update README with Your Repository URL

Replace `yourusername` in README.md with your actual GitHub username:

```markdown
git clone https://github.com/YOUR_USERNAME/KITOJOBS.git
```

### Add Repository Description

On GitHub, add this description:
> Healthcare Job Portal built with Next.js, TypeScript, and shadcn/ui - Connecting doctors with healthcare facilities

### Add Topics (Tags)

Add these topics to your repository for better discoverability:
- `nextjs`
- `typescript`
- `tailwindcss`
- `shadcn-ui`
- `healthcare`
- `job-portal`
- `react`

---

## Recommended: Create a .env.example File

Create a `.env.example` file for future environment variables:

```env
# Add your environment variables here
# NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## Quick Command Reference

```bash
# Check Git status
git status

# Add specific files
git add filename.tsx

# Commit changes
git commit -m "Your commit message"

# Push changes
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

---

## Need Help?

If you encounter any issues:

1. **Git not recognized**: Restart your terminal after installing Git
2. **Authentication failed**: Use GitHub Personal Access Token instead of password
3. **Permission denied**: Check your GitHub account has access to the repository

For more help, visit: https://docs.github.com/en/get-started

---

## Next Steps After Pushing

1. ✅ Verify all files are on GitHub
2. ✅ Update README with correct repository URL
3. ✅ Add repository description and topics
4. ✅ Consider adding a LICENSE file
5. ✅ Set up GitHub Actions for CI/CD (optional)
6. ✅ Enable GitHub Pages for documentation (optional)

Your KITO Job Portal is ready to share with the world! 🚀
