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
exports.RecordsController = void 0;
const common_1 = require("@nestjs/common");
const records_service_1 = require("./records.service");
let RecordsController = class RecordsController {
    constructor(recordsService) {
        this.recordsService = recordsService;
    }
    async getMatchesBySummonerName(summonerName) {
        return this.recordsService.getMatchesBySummonerName(summonerName, 0);
    }
    async getSummonerInfoBySummonerName(summonerName) {
        return this.recordsService.getSummonerInfoBySummonerName(summonerName);
    }
};
__decorate([
    (0, common_1.Get)('/matchesInfo/:summonerName'),
    __param(0, (0, common_1.Param)('summonerName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getMatchesBySummonerName", null);
__decorate([
    (0, common_1.Get)('/summonerInfo/:summonerName'),
    __param(0, (0, common_1.Param)('summonerName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RecordsController.prototype, "getSummonerInfoBySummonerName", null);
RecordsController = __decorate([
    (0, common_1.Controller)('records'),
    __metadata("design:paramtypes", [records_service_1.RecordsService])
], RecordsController);
exports.RecordsController = RecordsController;
//# sourceMappingURL=records.controller.js.map