import {CodeController} from "./controller/CodeController";

export const Routes = [{
    method: "get",
    route: "/generate",
    controller: CodeController,
    action: "generate"
}, {
    method: "post",
    route: "/open",
    controller: CodeController,
    action: "open"
}, {
    method: "put",
    route: "/save",
    controller: CodeController,
    action: "save"
}];