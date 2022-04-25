import init from "lib/infrastructure/config/bootstrap";
import server from "lib/infrastructure/server/server";

(async () => {
  try {
    const database = await init();
    await server(database);
  } catch (err) {
    console.error(err);
  }
})();
