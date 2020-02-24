import {initSequelize} from "./rest/utils/sequelize";
import secrets from "./rest/config/secrets";
import serverWS from "./rest/serverWS";

(async () => {
  initSequelize();

  if (secrets.server.ws.isEnabled) {
    await serverWS();
  }
  if (secrets.server.cp.isEnabled) {
    // await serverCp();
  }
})();
