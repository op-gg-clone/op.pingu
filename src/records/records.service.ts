import { Injectable } from '@nestjs/common';
import { Summoner } from './summoner.model';
import { Match } from './matches.model';

@Injectable()
export class RecordsService{

    // constructor( private riotToken : string){
    //     this.riotToken = `${process.env.API_KEY}`
    // }

    async getSummoner(summonerName): Promise<any>{
        try {
            const response = await fetch(
            `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=RGAPI-ff7740cc-ad18-4cd6-8527-546ffc1f92fb`
            ).then((res)=>res.json());
            const res = response
            // const resPingu = 
            // {
            //     id : res["id"],
            //     accountId : res["accountId"],
            //     puuid : res["puuid"],
            //     name : res["name"],
            //     rank : res["rank"],
            //     profileIconId : res["profileIconId"],
            //     revisionDate : res["revisionDate"],
            //     summonerLevel : res["summonerLevel"],
            // }

            return res;

        } catch (e) {
            return e;
        }

    }


    async getMatches (summonerName : string){
        const user = await this.getSummoner(summonerName)
        const puuid = user["puuid"]
        console.log(puuid)
        try {
            const response = await fetch(
                `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=RGAPI-ff7740cc-ad18-4cd6-8527-546ffc1f92fb`
                ).then((res)=>res.json());
                const res = response
                console.log("matchID :", res);
                return res

        } catch (e) {
            return e;
        }
    }

    async getMatchDetail (summonerName:string){
        const matches = await this.getMatches(summonerName);
        try {
            const foundMatches = await Promise.all(
                matches.map((match) => {
                    const response = fetch(
                        `https://americas.api.riotgames.com/lol/match/v5/matches/${match}?api_key=RGAPI-ff7740cc-ad18-4cd6-8527-546ffc1f92fb`,
                    ).then((res)=>res.json())

                return response;
            }))
            //console.log("matchDetail :", foundMatches);
            
            

            const result = await Promise.all([...foundMatches])
            .then(matches=>matches.map(match=>{
                const gamedata = {
                    matchInfo : {
                        gameCreation: match.info.gameCreation,
                        gameDuration: match.info.gameDuration,
                        gameEndTimestamp: match.info.gameEndTimestamp,
                        gameId: match.info.gameId,
                        gameMode: match.info.gameMode,
                        gameName: match.info.gameName,
                        gameStartTimestamp: match.info.gameStartTimestamp,
                        gameType: match.info.gameType,
                        gameVersion: match.info.gameVersion,
                        mapId: match.metadata.mapId
                    },
                    // summonerInfo : match.info.participants.map((summoner)=>{
                    //     return{
                    //         puuid : summoner.puuid,
                    //         summonerName : summoner.summonerName,
                    //         kill : summoner.kill,
                    //         asistant : summoner.asistant,
                    //         death : summoner.death,
                    //         kda : summoner.challenges.kda,
                    //         championName: summoner.championName,
                    //         champLevel: summoner.champLevel,
                    //         item0: summoner.item0,
                    //         item1: summoner.item1,
                    //         item2: summoner.item2,
                    //         item3: summoner.item3,
                    //         item4: summoner.item4,
                    //         item5: summoner.item5,
                    //         item6: summoner.item6,
                    //         mainPerk: summoner.perk.styles[0].style,
                    //         subPerk: summoner.perk.styles[1].style,
                    //         spell1: summoner.summoner1Id,
                    //         spell2: summoner.summoner2Id,
                    //         totalDamageDealt: summoner.totalDamageDealt,
                    //         totalDamageDealtToChampions: summoner.totalDamageDealtToChampions,
                    //         totalDamageShieldedOnTeammates: summoner.totalDamageShieldedOnTeammates,
                    //         totalDamageTaken: summoner.totalDamageTaken,
                    //         totalMinionsKilled: summoner.totalMinionsKilled,
                    //         neutralMinionsKilled :summoner.neutralMinionsKilled,
                    //         visionWardsBoughtInGame: summoner.visionWardsBoughtInGame,
                    //         wardsKilled: summoner.wardsKilled,
                    //         wardsPlaced: summoner.wardsPlaced,
                    //         win: summoner.win
                    //     }
                    // })
                }
            
            return gamedata
            }))

            console.log("정제된 데이터 : " ,result)
            return result
            
            

        } catch (e) {
            return e;
        }

    }



} 


