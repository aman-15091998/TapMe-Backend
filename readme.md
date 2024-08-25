# TapMe

## Introduction

**TapMe** is a simple Telegram game developed using React, GraphQL, and PostgreSQL (Supabase). Players can tap to earn points and progress to the next level.

## Installation

1. Open VS Code
2. Open terminal
3. **Clone the repository**:
   ```bash
   git clone https://github.com/aman-15091998/TapMe-Backend.git
   ```
4. Move inside the folder
5. Create .env file and add variables
6. Update the [frontend](https://github.com/aman-15091998/TapMe-Frontend.git) url/localhost with yours after setting it up.

```bash
web_app: {
            url: `Your_URL_HERE/${ctx.from.id}/${ctx.from.first_name}`  // app url with user id and name
        }
```

7. npm i
8. npm index.js

## env variables

1. BOT_TOKEN = (create a bot in telegram using botfather and provide the token here)
2. SUPABASE_URL=
3. SUPABASE_ANON_KEY=
