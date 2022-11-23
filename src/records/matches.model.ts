
export interface Match{
    matchInfo : {
        gameCreation: number,
        gameDuration: number,
        gameEndTimestamp: number,
        gameId: number,
        gameMode: string, 
        gameName: string,
        gameStartTimestamp: number,
        gameType: string,
        gameVersion: string,
        mapId: number,
    };
    teamInfo:[
        {
            teamId: number,
            win : boolean
        },
        {
            teamId: number,
            win : boolean
        }
    ]

    summonerInfo : [
        {
            puuid : string,
            summonerName : string,
            kill : number,
            asistant : number,
            death : number,
            kda : number,
            championName: string,
            champLevel: number,
            item0: number,
            item1: number,
            item2: number,
            item3: number,
            item4: number,
            item5: number,
            item6: number,
            mainPerk: number,
            subPerk: number,
            spell1: number,
            spell2: number,
            totalDamageDealt: number,
            totalDamageDealtToChampions: number,
            totalDamageShieldedOnTeammates: number,
            totalDamageTaken: number,
            totalMinionsKilled: number,
            neutralMinionsKilled :number,
            visionWardsBoughtInGame: number,
            wardsKilled: number,
            wardsPlaced: number,
            win: boolean,
        }
    ]
}

