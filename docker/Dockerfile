FROM node:20 AS base

# Add ARG instructions to accept build-time variables
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY

ENV PORT=3000 \
    APP_HOME=/app \
    NEXT_TELEMETRY_DISABLED=1 \
    NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_UR} \
    NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}

WORKDIR ${APP_HOME}

COPY package*.json ./

RUN npm ci
COPY . .

# Development
FROM base AS development
ENV NODE_ENV=development
EXPOSE ${PORT}
CMD [ "npm", "run", "dev" ]

# Builder
FROM base AS build_nextjs
ENV NEXT_TELEMETRY_DISABLED=1
COPY --chown=node:node ../ ./
RUN NODE_ENV="production" \
    npm run build

# Production
FROM build_nextjs AS production
ENV NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1
CMD [ "npm", "run", "start" ]
EXPOSE ${PORT}