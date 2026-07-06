# Deployment Guide: Norhan Habila's Full-Stack Portfolio

This guide explains how to deploy your React (Vite) frontend and Node.js (Express) backend. 

We will cover two main deployment strategies:
1. **Render** (Recommended: free tier, supports monorepos, and is easiest for full-stack Node/React).
2. **AWS** (Amplify for frontend, EC2/Elastic Beanstalk for backend - matching your CV profile).

---

## Preparation: Environment Variable Check
Before pushing to production, verify that:
1. **Frontend API URL**: The frontend is configured to call `import.meta.env.VITE_API_URL`. When deploying the frontend, you must set `VITE_API_URL` to your live backend domain.
2. **Backend SMTP Credentials**: In the live backend environment settings, configure the following variables:
   - `PORT=5000` (or let the host assign one)
   - `SMTP_HOST=smtp.gmail.com` (or other SMTP)
   - `SMTP_PORT=587`
   - `SMTP_USER=your-authenticated-email@gmail.com`
   - `SMTP_PASS=your-16-character-app-password`
   - `TO_EMAIL=norhan.habila@gmail.com`

---

## Strategy 1: Deploying on Render (Free, Fast, and Easiest)

Render is highly recommended because you can deploy both your frontend and backend as separate services directly from your GitHub repository.

### Step 1. Deploy the Backend (Web Service)
1. Sign in to [Render](https://render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following configurations:
   - **Name**: `norhan-portfolio-backend`
   - **Region**: Select closest to your users (e.g. Frankfurt or US East)
   - **Language**: `Node`
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
5. Click **Advanced** and add the following **Environment Variables**:
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = *(your email address)*
   - `SMTP_PASS` = *(your app password)*
   - `TO_EMAIL` = `norhan.habila@gmail.com`
6. Click **Create Web Service**. 
7. Once deployed, Render will provide a URL like `https://norhan-portfolio-backend.onrender.com`. Copy this URL.

### Step 2. Deploy the Frontend (Static Site)
1. On Render, click **New +** and select **Static Site**.
2. Connect your GitHub repository.
3. Set the following configurations:
   - **Name**: `norhan-portfolio-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Click **Advanced** and add the following **Environment Variable**:
   - `VITE_API_URL` = *(Paste the backend URL you copied from Step 1, e.g., `https://norhan-portfolio-backend.onrender.com`)*
5. Click **Create Static Site**.

---

## Strategy 2: Deploying on AWS (Production Grade)

Since you specialize in AWS cloud infrastructures, this strategy outlines how to host your application on AWS.

### Step 1. Frontend (AWS Amplify - Easiest & Continuous Deployment)
AWS Amplify connects to GitHub and automatically builds and hosts Vite/React apps on S3/CloudFront.
1. Sign in to the **AWS Console** and search for **AWS Amplify**.
2. Click **New app** > **Host web app**.
3. Choose **GitHub** and authorize Amplify. Select your repository and `main` branch.
4. In **Build Settings**, select the `frontend` subfolder.
5. In **Environment Variables**, add:
   - Key: `VITE_API_URL`
   - Value: *(your AWS Elastic Beanstalk or EC2 backend URL)*
6. Click **Save and deploy**. Amplify handles caching, SSL, and custom domain names.

### Step 2. Backend (AWS Elastic Beanstalk or EC2)

#### Option A: Elastic Beanstalk (Recommended for Node.js APIs)
Elastic Beanstalk automates load balancing, provisioning, and environment scaling.
1. Search for **Elastic Beanstalk** in the AWS console.
2. Click **Create Application**. Select **Web server environment**.
3. Choose Platform: **Node.js** (select latest LTS).
4. For Application Code, package your `backend` directory into a `.zip` file:
   *(Note: Ensure your backend package.json compiles TypeScript on start or pre-builds before uploading).*
5. Under **Configuration** > **Updates, monitoring, and logging** > **Environment properties**, insert your `.env` variables (`SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `TO_EMAIL`).
6. Click **Create Environment**.

#### Option B: EC2 (Virtual Server)
If you prefer full control:
1. Launch an **Amazon Linux 2** or **Ubuntu** EC2 instance.
2. Configure **Security Group** to expose ports `22` (SSH) and `5000` (Custom TCP).
3. SSH into the instance and install Node.js, Git, and PM2 (Process Manager):
   ```bash
   sudo apt update
   sudo apt install nodejs npm -y
   sudo npm install -p pm2
   ```
4. Clone your repository, navigate to `backend/`, and install dependencies:
   ```bash
   cd backend
   npm install
   npm run build
   ```
5. Create a local `.env` file containing your SMTP credentials.
6. Launch using PM2:
   ```bash
   pm2 start dist/server.js --name portfolio-api
   ```
