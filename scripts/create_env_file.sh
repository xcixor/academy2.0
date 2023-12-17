#!/usr/bin/env bash

create_env_file() {
    touch .env
    echo "DATABASE_URL=${DATABASE_URL}" >> .env
    echo "GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}" >> .env
    echo "GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}" >> .env
    echo "NEXTAUTH_URL=${NEXTAUTH_URL}" >> .env
    echo "NEXTAUTH_SECRET=${NEXTAUTH_SECRET}" >> .env
    echo "GS_BUCKET_URL=${GS_BUCKET_URL}" >> .env
    echo "GS_CREDENTIALS=${GS_CREDENTIALS}" >> .env
    echo "GS_BUCKET_NAME=${GS_BUCKET_NAME}" >> .env
    echo "GS_LOCATION=${GS_LOCATION}" >> .env
    echo "PAYPAL_CLIENT_ID=${PAYPAL_CLIENT_ID}" >> .env
    echo "PAYPAL_CLIENT_SECRET=${PAYPAL_CLIENT_SECRET}" >> .env
    echo "NODE_ENV=${NODE_ENV}" >> .env

}
main(){
    create_env_file
}
main