"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlbumsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const albums_service_1 = require("./albums.service");
let AlbumsController = class AlbumsController {
    constructor(albumsService) {
        this.albumsService = albumsService;
    }
    async getAlbums(page, limit) {
        return this.albumsService.findAll(limit, page);
    }
    async getAlbum(id) {
        return this.albumsService.findOne(id);
    }
    async getAlbumsForArtist(id) {
        return this.albumsService.findByArtist(id);
    }
};
__decorate([
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        type: Number,
        required: false,
        description: 'how many results per page. Used only if page is set'
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        type: Number,
        required: false,
        description: 'page number'
    }),
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "getAlbums", null);
__decorate([
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "getAlbum", null);
__decorate([
    (0, common_1.Get)("/artist/:id"),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AlbumsController.prototype, "getAlbumsForArtist", null);
AlbumsController = __decorate([
    (0, common_1.Controller)('albums'),
    __metadata("design:paramtypes", [albums_service_1.AlbumsService])
], AlbumsController);
exports.AlbumsController = AlbumsController;
//# sourceMappingURL=albums.controller.js.map