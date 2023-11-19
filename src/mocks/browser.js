import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const mocker = setupWorker(...handlers);

// 链接：https://juejin.cn/post/7018732383067176991