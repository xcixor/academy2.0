#!/bin/sh

echo 'Starting app...'
RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npx prisma db push --accept-data-loss 
node seed.ts
npm start