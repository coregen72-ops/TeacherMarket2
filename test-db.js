// Run this from your project folder: node test-db.js
// It tries all possible Supabase connection URLs and tells you which one works

const { execSync } = require('child_process');

const PROJECT_REF = 'kzngxbpyzzikhzftaveg';
const PASSWORD = 'HomeTutor2024';

const urls = [
  {
    label: '1. Transaction Pooler (port 6543)',
    url: `postgresql://postgres.${PROJECT_REF}:${PASSWORD}@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true`
  },
  {
    label: '2. Session Pooler (port 5432 via pooler)',
    url: `postgresql://postgres.${PROJECT_REF}:${PASSWORD}@aws-0-ap-south-1.pooler.supabase.com:5432/postgres`
  },
  {
    label: '3. Direct connection (port 5432)',
    url: `postgresql://postgres:${PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres`
  },
  {
    label: '4. Direct connection (port 5432) with SSL',
    url: `postgresql://postgres:${PASSWORD}@db.${PROJECT_REF}.supabase.co:5432/postgres?sslmode=require`
  },
];

async function testUrl({ label, url }) {
  const { PrismaClient } = require('@prisma/client');
  process.env.DATABASE_URL = url;
  // Override prisma datasource url at runtime
  const p = new PrismaClient({ datasources: { db: { url } } });
  try {
    const count = await p.user.count();
    console.log(`✅ WORKS - ${label}`);
    console.log(`   URL: ${url}`);
    console.log(`   Users in DB: ${count}`);
    return true;
  } catch (e) {
    console.log(`❌ FAILED - ${label}`);
    console.log(`   Error: ${e.message.split('\n')[0]}`);
    return false;
  } finally {
    await p.$disconnect();
  }
}

(async () => {
  console.log('\n🔍 Testing all Supabase connection URLs...\n');
  for (const u of urls) {
    const ok = await testUrl(u);
    if (ok) {
      console.log('\n✅ USE THIS URL in your .env as DATABASE_URL\n');
      break;
    }
  }
  console.log('\nDone.');
})();
