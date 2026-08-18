const net = require("net");

const databaseUrl = process.env.DATABASE_URL || "postgres://postgres:postgres@postgres:5432/medusa-biotill";

function getHostAndPort(urlStr) {
  try {
    // Clean protocol if needed
    const parsed = new URL(urlStr.replace(/^postgres:\/\//, "http://"));
    return {
      host: parsed.hostname || "postgres",
      port: parseInt(parsed.port, 10) || 5432,
    };
  } catch (err) {
    return { host: "postgres", port: 5432 };
  }
}

const { host, port } = getHostAndPort(databaseUrl);
console.log(`⏳ Waiting for PostgreSQL at ${host}:${port} to be ready...`);

let retries = 30;

function tryConnect() {
  const socket = new net.Socket();
  socket.setTimeout(2000);

  socket.on("connect", () => {
    console.log(`✅ PostgreSQL at ${host}:${port} is reachable and accepting connections!`);
    socket.destroy();
    process.exit(0);
  });

  socket.on("error", (err) => {
    socket.destroy();
    retries--;
    if (retries <= 0) {
      console.error(`❌ Timed out waiting for PostgreSQL at ${host}:${port} (${err.message})`);
      process.exit(1);
    }
    setTimeout(tryConnect, 1000);
  });

  socket.on("timeout", () => {
    socket.destroy();
    retries--;
    if (retries <= 0) {
      console.error(`❌ Connection to PostgreSQL at ${host}:${port} timed out.`);
      process.exit(1);
    }
    setTimeout(tryConnect, 1000);
  });

  socket.connect(port, host);
}

tryConnect();
