// import {UserController} from "./controller/UserController";
import {CodeController} from "./controller/CodeController";

// export const Routes = [{
//     method: "get",
//     route: "/users",
//     controller: UserController,
//     action: "all"
// }, {
//     method: "get",
//     route: "/users/:id",
//     controller: UserController,
//     action: "one"
// }, {
//     method: "post",
//     route: "/users",
//     controller: UserController,
//     action: "save"
// }, {
//     method: "delete",
//     route: "/users",
//     controller: UserController,
//     action: "remove"
// }];

export const Routes = [{
    method: "get",
    route: "/generate",
    controller: CodeController,
    action: "generate"
}, {
    method: "get",
    route: "/open",
    controller: CodeController,
    action: "open"
}, {
    method: "put",
    route: "/save",
    controller: CodeController,
    action: "save"
}];