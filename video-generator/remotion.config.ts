import { Config } from "@remotion/cli/config";
import path from "path";

Config.overrideWebpackConfig((config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      symlinks: false,
      // Tell webpack to look for modules in the pnpm workspace root
      // (BrownsStudio/node_modules) as well as locally
      modules: [
        path.resolve(__dirname, "node_modules"),
        path.resolve(__dirname, "../node_modules"),
        "node_modules",
      ],
    },
  };
});
