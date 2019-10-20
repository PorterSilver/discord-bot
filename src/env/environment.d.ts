import * as ts from 'typescript'

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        BOT_TOKEN: string;
        CONNECTION_STRING: string;
        PREFIX: string;
      }
    }
  }