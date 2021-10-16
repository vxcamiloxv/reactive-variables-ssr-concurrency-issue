# Reactive variables concurrency issue

Reproducible repository with Next.js for Apollo client reactive variables concurrency
issue in SSR.

### Expected behavior
If in the render of a componente we set a reactive variable they
should keep the value only until the cache is clean or apollo instance
is begin destroyed on SSR or CSR

### Current behavior
The reactive variable keep the same value across request on SSR event
if the apollo client even if stopped / destroyed or the cache was
cleaned/reset, it becomes a global variable in server.
