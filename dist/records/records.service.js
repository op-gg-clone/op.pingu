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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordsService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let RecordsService = class RecordsService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getMatchesBySummonerName(summonerName, start) {
        try {
            const { puuid } = await this.getSummonerId(summonerName);
            const matchesId = await this.getMatches(puuid, start);
            const matchesDetail = await Promise.all(matchesId.map((matchId) => {
                return this.getMatchDetail(matchId);
            }));
            return matchesDetail;
        }
        catch (e) {
            console.log('error : ', e.message);
            return e;
        }
    }
    async getSummonerInfoBySummonerName(summonerName) {
        try {
            const { id } = await this.getSummonerId(summonerName);
            const summonerInfo = await this.getSummonerInfo(id);
            return summonerInfo;
        }
        catch (e) {
            console.log('error : ', e.message);
            return e;
        }
    }
    async getSummonerId(summonerName) {
        try {
            return (await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`, {
                headers: { 'X-Riot-Token': process.env.API_KEY },
            }))).data;
        }
        catch (e) {
            console.log('error : ', e.message);
            return e;
        }
    }
    async getSummonerInfo(summonerId) {
        try {
            const info = await (await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`, {
                headers: { 'X-Riot-Token': process.env.API_KEY },
            }))).data[0];
            console.log(info);
            const summonerInfo = {
                tier: info.tier,
                rank: info.rank,
                wins: info.wins,
                losses: info.losses,
            };
            console.log(summonerInfo);
            return summonerInfo;
        }
        catch (e) {
            console.log('error : ', e.message);
            return e;
        }
    }
    async getMatches(puuid, start) {
        try {
            return (await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=5`, {
                headers: { 'X-Riot-Token': process.env.API_KEY },
            }))).data;
        }
        catch (e) {
            console.log('error : ', e.message);
            return e;
        }
    }
    async getMatchDetail(matchId) {
        try {
            const foundMatch = (await (0, rxjs_1.firstValueFrom)(this.httpService.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchId}`, {
                headers: { 'X-Riot-Token': process.env.API_KEY },
            }))).data;
            const spellData = Object.values((await (0, rxjs_1.firstValueFrom)(this.httpService.get(`http://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/data/en_US/summoner.json`))).data.data);
            const refineMatchDetail = (match) => {
                return {
                    matchInfo: {
                        gameCreation: match.info.gameCreation,
                        gameDuration: match.info.gameDuration,
                        gameEndTimestamp: match.info.gameEndTimestamp,
                        gameId: match.info.gameId,
                        gameMode: match.info.gameMode,
                        gameName: match.info.gameName,
                        gameStartTimestamp: match.info.gameStartTimestamp,
                        gameType: match.info.gameType,
                        gameVersion: match.info.gameVersion,
                        queueId: match.queueId,
                    },
                    summonerInfo: match.info.participants.map((summoner) => {
                        return {
                            puuid: summoner.puuid,
                            summonerName: summoner.summonerName,
                            kills: summoner.kills,
                            assist: summoner.assist,
                            deaths: summoner.deaths,
                            kda: summoner.challenges.kda,
                            championName: summoner.championName,
                            championImage: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/champion/${summoner.championName}.png`,
                            champLevel: summoner.champLevel,
                            item0: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item0}.png`,
                            item1: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item1}.png`,
                            item2: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item2}.png`,
                            item3: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item3}.png`,
                            item4: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item4}.png`,
                            item5: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item5}.png`,
                            item6: `https://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/item/${summoner.item6}.png`,
                            mainPerk: `https://cdn.darkintaqt.com/lol/c-assets/perk-images/Styles/Domination/Electrocute/Electrocute.png`,
                            subPerk: `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png`,
                            spell1: `http://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/spell/SummonerFlash.png`,
                            spell2: `http://ddragon.leagueoflegends.com/cdn/${process.env.API_VER}/img/spell/SummonerFlash.png`,
                            totalDamageDealt: summoner.totalDamageDealt,
                            totalDamageDealtToChampions: summoner.totalDamageDealtToChampions,
                            totalDamageShieldedOnTeammates: summoner.totalDamageShieldedOnTeammates,
                            totalDamageTaken: summoner.totalDamageTaken,
                            totalMinionsKilled: summoner.totalMinionsKilled,
                            neutralMinionsKilled: summoner.neutralMinionsKilled,
                            visionWardsBoughtInGame: summoner.visionWardsBoughtInGame,
                            wardsKilled: summoner.wardsKilled,
                            wardsPlaced: summoner.wardsPlaced,
                            win: summoner.win,
                        };
                    }),
                };
            };
            return refineMatchDetail(foundMatch);
        }
        catch (e) {
            console.log('error : ', e.message);
            return e;
        }
    }
};
RecordsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], RecordsService);
exports.RecordsService = RecordsService;
//# sourceMappingURL=records.service.js.map