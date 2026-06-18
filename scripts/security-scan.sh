#!/bin/bash

echo "Running security scan..."

# Obvious leaked secrets
PATTERNS=(
  "GEMINI_API_KEY"
  "OPENAI_API_KEY"
  "CLAUDE_API_KEY"
  "SUPABASE_SERVICE_ROLE"
  "service_role"
  "DB_PASSWORD"
  "ERP_API_KEY"
  "GPS_API_KEY"
  "AIza"
  "sk-"
  "Bearer "
)

# Join patterns with |
REGEX=$(IFS="|"; echo "${PATTERNS[*]}")

echo "Scanning for dangerous patterns..."

# Exclude list
EXCLUDE="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git --exclude=.env.example --exclude=security-scan.sh"

grep -rE "($REGEX)" src package.json .env* docs scripts $EXCLUDE || true

echo "Security scan finished."
