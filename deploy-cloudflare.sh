#!/bin/bash

# Cloudflare Pages Deployment Script
# This script builds and deploys the project to Cloudflare Pages

echo "🚀 Starting Cloudflare Pages deployment..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"

    # Copy Cloudflare configuration files to dist
    echo "📋 Copying Cloudflare configuration files..."
    cp _headers _redirects cloudflare.toml dist/

    echo "🎉 Ready for Cloudflare Pages deployment!"
    echo "📁 Build files are in the 'dist' directory"
    echo "🌐 Upload the 'dist' directory contents to Cloudflare Pages"

else
    echo "❌ Build failed!"
    exit 1
fi
