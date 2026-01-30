## Current System Characteristics

- Monolithic Next.js application with API routes
- Shared runtime for web requests and background work
- Puppeteer jobs running in-process or via worker
- External APIs (AI models, image generation, storage)
- Limited isolation between user-triggered actions

## Key Risks Identified

- Puppeteer processes can exhaust memory/CPU
- API endpoints lack fine-grained permission checks
- External API failures propagate to user requests
- Dependency updates are reactive, not proactive
