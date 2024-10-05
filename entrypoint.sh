#!/bin/bash

echo "El valor de VITE_API_URL es: $VITE_API_URL"
sudo su
echo "VITE_API_URL=$VITE_API_URL" > /usr/src/app/.env.production

cat /usr/src/app/.env.production

npm run build
npm run preview