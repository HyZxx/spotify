"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsModule = void 0;
const common_1 = require("@nestjs/common");
const tracks_module_1 = require("../tracks/tracks.module");
const database_module_1 = require("../database/database.module");
const albums_controller_1 = require("./albums.controller");
const albums_provider_1 = require("./albums.provider");
const albums_service_1 = require("./albums.service");
let AlbumsModule = class AlbumsModule {
};
AlbumsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, tracks_module_1.TracksModule],
        controllers: [albums_controller_1.AlbumsController],
        providers: [albums_service_1.AlbumsService, ...albums_provider_1.albumsProviders],
        exports: [albums_service_1.AlbumsService]
    })
], AlbumsModule);
exports.AlbumsModule = AlbumsModule;
//# sourceMappingURL=albums.module.js.map