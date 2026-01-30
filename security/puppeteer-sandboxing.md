## Problems

- Unbounded page execution
- Arbitrary JS from third-party sites
- Resource exhaustion risks

## Mitigations

- Disable unnecessary Chromium features
- Enforce navigation and execution timeouts
- Limit concurrent browser instances
- Enforce memory and CPU constraints
- Run Puppeteer in restricted sandbox mode

## Rollout

- Apply limits behind feature flags
- Monitor crash rate and execution time
- Increase strictness gradually
