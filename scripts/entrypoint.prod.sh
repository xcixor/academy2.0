#!/bin/sh

echo 'Starting app...'
npx prisma migrate dev --name init
npx prisma db push --accept-data-loss 
npx prisma generate
npm start