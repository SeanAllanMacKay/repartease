export let config: { host?: string } = {
  host: undefined,
};

export const initialize = ({
  config: initConfig,
}: {
  config: Partial<typeof config>;
}) => {
  console.log("API INITIALIZED");
  config = { ...config, ...initConfig };
};
