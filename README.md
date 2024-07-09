<div align=center>

# Fastlane

## Building from Source

</div>

- Fetch latest source code from master branch.

```
git clone https://github.com/narasim-teja/FastLane
cd FastLane
```

```
cp .env.example .env.local
```

- Run the app with VS Code or the command line:

> [!IMPORTANT]  
> It is recommended to use [Bun](https://bun.sh/) package manager for this project.

```
bun i
bun dev
```

<div align=center>

### Docker and Makefile

</div>

- Build the Docker Image and start the container:

```
make build
make start
```

- Stop the Docker container:

```
make stop
```

<div align=center>

### Available Scripts

</div>

In the project directory, you can run:

| **Script**    | **Description**                                      |
| ------------- | ---------------------------------------------------- |
| `dev`         | Runs the app in the development mode.                |
| `build`       | Builds the app for production to the `.next` folder. |
| `start`       | Runs the built app in the production mode.           |
| `preview`     | Builds and serves the app in the production mode.    |
| `db:generate` | Generates the migration files.                       |
| `db:migrate`  | Migrates the database.                               |
| `db:drop`     | Drops the database.                                  |
| `db:push`     | Pushes the database schema to the server.            |
| `db:pull`     | Pulls the database schema from the server.           |
| `db:studio`   | Opens the Drizzle db studio.                         |
| `db:check`    | Checks the database schema.                          |
| `lint`        | Runs next lint on the project.                       |
| `type-check`  | Runs TypeScript type checker.                        |
| `fmt`         | Formats the code with Prettier.                      |
| `fmt:check`   | Checks if the code is formatted with Prettier.       |
| `ui`          | Runs the `shadcn/ui` CLI tool                        |
| `analyze`     | Analyzes the bundle size.                            |
