---
name: Imported static app runtime
description: Runtime constraint for this imported static project in the Replit environment.
---

The imported project should use the available Node.js runtime for its static preview server; Python is not available in this environment.

**Why:** The original imported workflow used Python's built-in HTTP server, which cannot start here.

**How to apply:** Keep the lightweight Node static server and port 5000 workflow unless the project gains a package-managed development server.