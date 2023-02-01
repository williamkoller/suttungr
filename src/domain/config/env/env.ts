type EnvType = {
  appUrl: string;
  nodeEnv: string;
  port: number;
};

export const env = (): EnvType => ({
  appUrl: process.env.APP_URL,
  nodeEnv: process.env.NODE_ENV,
  port: Number(process.env.PORT),
});

export default {
  defaultFolder: process.env.DEFAULT_FOLDER,
};
