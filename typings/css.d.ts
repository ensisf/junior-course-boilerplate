import * as CSS from "csstype";

declare module "csstype" {
  interface Properties {
    // allow any css variables
    [index: string]: any;
  }
}
