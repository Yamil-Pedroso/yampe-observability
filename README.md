# yampe-observability

A lightweight observability toolkit for Node.js, Full-Stack and AI applications.

## Installation

```bash
npm install yampe-observability
```

## Usage

```ts
import { measure } from "yampe-observability";

const result = await measure(
  "database-query",
  async () => {
    return fetch("/api/users");
  },
);

console.log(result.durationMs);
```
