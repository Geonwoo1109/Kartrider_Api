const scriptName = "Kartrider Test Api";


const kalingModule = require('kaling').Kakao();
const Kakao = new kalingModule();
Kakao.init(''); //자스키
Kakao.login('',''); //아디•비번



var Key = ""; //넥슨꺼
var allsee = "\u200d".repeat (500);

const Jsoup = org.jsoup.Jsoup;
const Fs = FileStream;

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {



if (msg.startsWith(".유저 ")) {
     try {
     User = msg.substr(4);
//     replier.reply (msg.substr (4));
    let data3 = Jsoup.connect ("https://api.nexon.co.kr/kart/v1.0/users/nickname/" + User)
    .header ("Authorization", Key).data ("nickname", User)
    .ignoreContentType(true).get().text();
    data3 = JSON.parse(data3);
    
     replier.reply (
     "유저 고유 Id: " + data3 ["accessId"]
     + "\n게임 닉네임: " + data3 ["name"]
     + "\n레벨: " + data3 ["level"]);
   } catch (e) {
     replier.reply("존재하지 않는 라이더 이름입니다.\n검색할 수 없는 이유는? -> [.이유]");
   }
  }
  if (msg == ".이유") {
    replier.reply("[닉네임이 검색되지 않는 경우]\n\n1. 존재하지 않는 유저일 때\n2. 닉네임이 변경되었을 때\n3. 오랫동안 접속하지 않은 복귀유저일 때");
  }

//매치데이터

if (msg.startsWith(".매치 ")) {
  
  try {
    let userId = Jsoup.connect ("https://api.nexon.co.kr/kart/v1.0/users/nickname/" + msg.substr(4))
    .header ("Authorization", Key).data ("nickname", msg.substr (4))
    .ignoreContentType(true).get().text();
    
    let matchData = Jsoup.connect (
    "https://api.nexon.co.kr/kart/v1.0/users/"
    + JSON.parse (userId)["accessId"] +
    "/matches?start_date=&end_date=&offset=&limit=1&match_types=")
    .header ("Authorization", Key).ignoreContentType(true).get().text();
    
    try {
    let Final = Jsoup.connect(
    "https://api.nexon.co.kr/kart/v1.0/matches/"
    + JSON.parse (matchData).matches[0].matches[0].matchId)
    .header ("Authorization", Key).ignoreContentType(true).get().text();
    
    var a = [];
    for (i=0; i<JSON.parse (Final)["players"].length; i++) {
      
      a.push (JSON.parse (Final).players[i].characterName);
      //replier.reply (JSON.parse (Final).players[i].characterName);
    }
    replier.reply ("[개인전] 참여선수목록\n\n" + a.join ("\n"));
    a = [];
    replier.reply (a);
    
  } catch (e1) {
    let Final = Jsoup.connect(
    "https://api.nexon.co.kr/kart/v1.0/matches/"
    + JSON.parse (matchData).matches[0].matches[0].matchId)
    .header ("Authorization", Key).ignoreContentType(true).get().text();
    
    a = [];
    for (i=0; i<JSON.parse (Final).teams[0].players.length; i++) {
      a.push (JSON.parse (Final).teams[0].players[i].characterName);
    }
    a.push ("vs");
    
    for (i=0; i<JSON.parse (Final).teams[0].players.length; i++) {
      a.push (JSON.parse (Final).teams[1].players[i].characterName);
    }
    replier.reply ("[팀전] 참여선수목록\n\n" + a.join ("\n"));
    a = [];
    
  }

  } catch (e) {
    replier.reply ("기록이 존재하지 않습니다.");
  }


}
  
  if (msg.startsWith("..유저 ")) {

try {
  //닉네임으로 정보가져오기
    var userId = Jsoup.connect (
    "https://api.nexon.co.kr/kart/v1.0/users/nickname/" + msg.substr(5))
    .header ("Authorization", Key).data ("nickname", msg.substr (5))
    .ignoreContentType(true).get().text();
    
    //userId에서 고유번호 가져오고 검색
    let matchData = Jsoup.connect (
    "https://api.nexon.co.kr/kart/v1.0/users/" + JSON.parse (userId)["accessId"] +
    "/matches?start_date=&end_date=&offset=&limit=1&match_types=")
    .header ("Authorization", Key).ignoreContentType(true).get().text();
    
    //matchData에서 캐릭터번호랑 카트번호 가져오기, 없으면 안뜸
    try {
         var characterImg = (JSON.parse(matchData).matches[0].matches[0].player.character);
         var kartImg = (JSON.parse(matchData).matches[0].matches[0].player.kart);
         var LicenseNumber = (JSON.parse(matchData).matches[0].matches[0].player.rankinggrade2);
    } catch(e){
         var characterImg = "";
         var kartImg = "";
         var LicenseNumber = "";
    }
    var License = "";
    var LicenseLink = "https://tmi.nexon.com/img/icon_";
    switch(LicenseNumber)
            {
                case '1':
                    License = "beginner";
                    break;
                case '2':
                    License = "rookie";
                    break;
                case '3':
                    License = "l3";
                    break;
                case '4':
                    License = "l2";
                    break;
                case '5':
                    License = "l1";
                    break;
                case '6':
                    License = "pro";
                    break;
                default:
                    License = "";
                    break;
            }
    
//카트리스트 가져오는거 없어짐..
          let kartList =
          JSON.parse(org.jsoup.Jsoup.connect('https://tmi.nexon.com/apis/KartNames')
        .header('referer', "https://tmi.nexon.com/kart/user?nick=" + msg.substr(5))
        .header('apikey', 'ZG9uJ3QgYWNjZXNzIHBsZWFzZQ==')
        .ignoreContentType(true).ignoreHttpErrors(true).get().text())
        
        //replier.reply(kartList.data.find(e => e.hash === kartImg).KartName);
 
        const characterUrl = "https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/character/";
        const kartUrl = "https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/";
    
        

    
  var guild = Jsoup.connect("http://kart.nexon.com/Garage/Main?strRiderID="+msg.substr(5)).get().select("span[id=GuildName]").text();
  if (guild == "가입된클럽이없습니다") {
    guild = "클럽 미가입";
  }
  //replier.reply(guild);
  
    var level = Jsoup.connect("http://kart.nexon.com/Garage/Main?strRiderID="+msg.substr(5))
    .get().select("div[id=GloveImg]").select("img").attr("src");
    //replier.reply(level.text());
  //replier.reply(String.data+"\n"+String.data1+/*"\n"+data2+*/"\n"+String.data3+"\n"+String.data4+"\n"+String.data5+"\n");
  //replier.reply(JSON.parse(userId)["level"]);
  

  var KartbodyImg = ""; 
  var KartbodyName = "";
  //replier.reply(KartImg);
  try {
    KartbodyName = kartList.data.find(e => e.hash === kartImg).KartName;
    KartbodyImg = kartUrl + kartImg + ".png";
  } catch(e) {
    KartbodyName = "흠.. 무슨 카트일까요";
    KartbodyImg = org.jsoup.Jsoup.connect("http://kart.nexon.com/Garage/Main?strRiderID="+msg.substr(5)).get().select("#RiderImg > img").attr("src");
  }
  var ac = "T";
} catch(e) {
  var ac = "F";
}
//replier.reply(userId)
//replier.reply(ac)
if (ac == "T") {
try {
  
//replier.reply(userId)
Kakao.send(room, {"link_ver" : "4.0",
                  "template_id" : 45757,
                  "template_args" : {
                    Nickname: msg.substr(5),
                    Avatar: characterUrl + characterImg + ".png",
                    Kartbody: KartbodyName,
                    KartbodyImg: KartbodyImg,
                    Guild: guild,
                    License: License,
                    LicenseImg: LicenseLink + License + ".png",
                    Level: JSON.parse(userId)["level"],
                    LevelImg: level
                  }
                 }, "custom");
                 
//replier.reply(KartbodyName + KartbodyImg);
} catch(e) {
  Api.reload("Kartrider Test Api");
  replier.reply(e+e.lineNumber+"유저 정보를 찾았으나 성공적으로 불러오지 못했습니다.\n다시한번 부탁드립니다.");
}

} else {
  replier.reply("유저를 찾지 못했습니다.");
}

}
}
