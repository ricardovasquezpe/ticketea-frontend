#!/bin/bash

#echo "VITE_API_URL=${VITE_API_URL:-http://localhost:3000}" > /usr/src/app/.env.production
echo "El valor de VITE_API_URL es: $VITE_API_URL"
echo "VITE_API_URL=$VITE_API_URL" > /usr/src/app/.env.production

npm run preview