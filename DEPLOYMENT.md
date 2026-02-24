# ShopEZ Deployment Guide

Complete guide for deploying ShopEZ to Render.

## Prerequisites

- GitHub account
- Render account
- MySQL database (Render MySQL or external provider)

## Step 1: Prepare Repository

1. Push your code to GitHub
2. Ensure both `shopez-backend` and `shopez-frontend` folders are in the repository

## Step 2: Database Setup

### Option A: Render MySQL (Recommended)

1. Go to Render Dashboard
2. Click "New +" → "MySQL"
3. Configure:
   - Name: `shopez-db`
   - Database: `shopez_db`
   - User: (auto-generated)
   - Region: Choose closest to your users
4. Click "Create Database"
5. Wait for provisioning
6. Note down the connection details:
   - Internal Database URL
   - Username
   - Password

### Option B: External MySQL Provider

Use services like:
- PlanetScale
- AWS RDS
- DigitalOcean Managed Databases

### Initialize Database

Connect to your database and run:

```bash
# Run schema
mysql -h [host] -u [username] -p [database] < shopez-backend/database/schema.sql

# Run demo data
mysql -h [host] -u [username] -p [database] < shopez-backend/database/demo-data.sql
```

Or use a MySQL client like MySQL Workbench, DBeaver, or phpMyAdmin.

## Step 3: Deploy Backend

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:

**Basic Settings:**
- Name: `shopez-backend`
- Region: Same as database
- Branch: `main`
- Root Directory: `shopez-backend`
- Runtime: `Docker` (or `Java` if using native)

**Build Settings:**

If using Docker:
- Build Command: (leave empty, uses Dockerfile)
- Start Command: (leave empty, uses Dockerfile)

If using Native Java:
- Build Command: `mvn clean package -DskipTests`
- Start Command: `java -jar target/shopez-backend-1.0.0.jar`

**Environment Variables:**

Click "Advanced" → "Add Environment Variable"

```
DB_URL=jdbc:mysql://[host]:[port]/shopez_db
DB_USERNAME=[your-db-username]
DB_PASSWORD=[your-db-password]
JWT_SECRET=[generate-strong-256-bit-secret]
CORS_ORIGINS=https://your-frontend-url.onrender.com
PORT=8080
```

**Generate JWT Secret:**
```bash
# Use this command or similar
openssl rand -base64 32
```

5. Click "Create Web Service"
6. Wait for deployment (5-10 minutes)
7. Note your backend URL: `https://shopez-backend-xxxx.onrender.com`

## Step 4: Deploy Frontend

1. Go to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect your GitHub repository
4. Configure:

**Basic Settings:**
- Name: `shopez-frontend`
- Branch: `main`
- Root Directory: `shopez-frontend`

**Build Settings:**
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`

**Environment Variables:**

```
VITE_API_BASE_URL=https://shopez-backend-xxxx.onrender.com
```

Replace with your actual backend URL from Step 3.

5. Click "Create Static Site"
6. Wait for deployment (3-5 minutes)
7. Your frontend URL: `https://shopez-frontend-xxxx.onrender.com`

## Step 5: Update CORS

1. Go to your backend service on Render
2. Update `CORS_ORIGINS` environment variable:
```
CORS_ORIGINS=https://shopez-frontend-xxxx.onrender.com
```
3. Save changes (backend will redeploy)

## Step 6: Verify Deployment

1. Visit your frontend URL
2. Test registration/login
3. Browse products
4. Add items to cart
5. Complete checkout
6. Check admin dashboard (use admin credentials)

## Troubleshooting

### Backend Issues

**Database Connection Failed:**
- Verify DB_URL format: `jdbc:mysql://host:port/database`
- Check username and password
- Ensure database is running
- Check if database allows connections from Render IPs

**JWT Errors:**
- Ensure JWT_SECRET is at least 256 bits (32 characters)
- Don't use special characters that need escaping

**CORS Errors:**
- Verify CORS_ORIGINS matches frontend URL exactly
- Include protocol (https://)
- No trailing slash

### Frontend Issues

**API Calls Failing:**
- Check VITE_API_BASE_URL is correct
- Ensure backend is running
- Check browser console for errors

**Blank Page:**
- Check build logs for errors
- Verify publish directory is `dist`
- Check nginx.conf is properly configured

**Routing Issues (404 on refresh):**
- Ensure nginx.conf has `try_files $uri $uri/ /index.html;`
- Verify nginx.conf is copied in Dockerfile

### Database Issues

**Tables Not Created:**
- Manually run schema.sql
- Check Hibernate ddl-auto setting
- Verify database permissions

**Demo Data Missing:**
- Manually run demo-data.sql
- Check for SQL errors in logs

## Performance Optimization

### Backend

1. **Enable Caching:**
   - Add Redis for session storage
   - Cache product queries

2. **Database Optimization:**
   - Add indexes on frequently queried columns
   - Use connection pooling

3. **Logging:**
   - Set appropriate log levels
   - Use structured logging

### Frontend

1. **CDN:**
   - Render automatically uses CDN for static sites

2. **Image Optimization:**
   - Use optimized images
   - Implement lazy loading

3. **Code Splitting:**
   - Already handled by Vite

## Monitoring

### Render Built-in Monitoring

- View logs in Render dashboard
- Check metrics (CPU, memory, requests)
- Set up alerts

### External Monitoring

Consider adding:
- Sentry for error tracking
- Google Analytics for user analytics
- Uptime monitoring (UptimeRobot, Pingdom)

## Scaling

### Free Tier Limitations

- Backend spins down after 15 minutes of inactivity
- First request after spin-down takes 30-60 seconds
- 750 hours/month free

### Upgrade Options

**Starter Plan ($7/month per service):**
- No spin-down
- Better performance
- More resources

**Standard Plan ($25/month per service):**
- Horizontal scaling
- More CPU/memory
- Priority support

## Security Checklist

- [ ] Strong JWT_SECRET (256-bit minimum)
- [ ] HTTPS enabled (automatic on Render)
- [ ] CORS properly configured
- [ ] Database credentials secure
- [ ] No sensitive data in logs
- [ ] Rate limiting configured
- [ ] Input validation enabled
- [ ] SQL injection prevention (JPA handles this)
- [ ] XSS prevention (React handles this)

## Backup Strategy

### Database Backups

**Render MySQL:**
- Automatic daily backups on paid plans
- Manual backups via mysqldump

**Manual Backup:**
```bash
mysqldump -h [host] -u [username] -p shopez_db > backup.sql
```

**Restore:**
```bash
mysql -h [host] -u [username] -p shopez_db < backup.sql
```

### Code Backups

- Use Git for version control
- Tag releases
- Keep deployment documentation updated

## Custom Domain Setup

### Backend

1. Go to backend service settings
2. Click "Custom Domain"
3. Add your domain: `api.yourdomain.com`
4. Update DNS records as instructed
5. Wait for SSL certificate provisioning

### Frontend

1. Go to frontend site settings
2. Click "Custom Domain"
3. Add your domain: `yourdomain.com` or `www.yourdomain.com`
4. Update DNS records as instructed
5. Wait for SSL certificate provisioning

### Update Environment Variables

After custom domains:
- Update `CORS_ORIGINS` in backend
- Update `VITE_API_BASE_URL` in frontend

## Maintenance

### Regular Tasks

- Monitor error logs weekly
- Check database size monthly
- Review security updates
- Update dependencies quarterly
- Test backup restoration

### Updates

**Backend:**
1. Update code in repository
2. Push to GitHub
3. Render auto-deploys (if enabled)
4. Or manually trigger deploy

**Frontend:**
1. Update code in repository
2. Push to GitHub
3. Render auto-deploys (if enabled)
4. Or manually trigger deploy

## Cost Estimation

### Free Tier
- Backend: Free (with spin-down)
- Frontend: Free
- Database: $7/month (Render MySQL)
- Total: $7/month

### Production Setup
- Backend: $25/month (Standard)
- Frontend: Free
- Database: $15/month (Render MySQL with backups)
- Total: $40/month

## Support Resources

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- Spring Boot Docs: https://spring.io/projects/spring-boot
- React Docs: https://react.dev

## Next Steps

After successful deployment:

1. Set up monitoring and alerts
2. Configure custom domain
3. Enable automatic backups
4. Set up CI/CD pipeline
5. Add more features
6. Optimize performance
7. Implement analytics

## Rollback Procedure

If deployment fails:

1. Go to service in Render dashboard
2. Click "Events" tab
3. Find last successful deployment
4. Click "Rollback to this version"
5. Confirm rollback

Or revert Git commit and redeploy.
