const scriptName = "카트전용";

const { KakaoLinkClient } = require('kakaolink');
const Kakao = new KakaoLinkClient('', 'http://developers.kakao.com');
Kakao.login('@.com','!');

var Key =
"..";

const allsee = "\u200d".repeat (500);

const Jsoup = org.jsoup.Jsoup;
const Fs = FileStream;
const Js = org.jsoup.Jsoup;

const n = "\n";
const nn = "\n".repeat(2);

const LicenseChange = ["", "beginner", "rookie", "l3", "l2", "l1", "pro"];

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  
    if (msg.startsWith(".유저 ")) {
        try {
            User = msg.substr(4);
            let data3 = JSON.parse(Jsoup.connect("https://api.nexon.co.kr/kart/v1.0/users/nickname/" + User)
                .header ("Authorization", Key).data ("nickname", User)
                .ignoreContentType(true).get().text());
            //data3 = JSON.parse(data3);
    
            replier.reply (
                "유저 고유 Id: " + data3 ["accessId"]
                + "\n게임 닉네임: " + data3 ["name"]
                + "\n레벨: " + data3 ["level"]
            );
        } catch (e) {
            replier.reply(
                "존재하지 않는 라이더 이름입니다."
                +n+"(카러플 안됩니다.)"
            );
        }
    }



/*------------------------------..유저------------------------------*/
    if (msg.startsWith("..유저 ")) {
        try {
            //닉네임으로 정보가져오기
            try {
                var userId = Jsoup.connect ("https://api.nexon.co.kr/kart/v1.0/users/nickname/" + msg.substr(5))
                    .header ("Authorization", Key).data ("nickname", msg.substr (5)).ignoreContentType(true).get().text();
            } catch(e) {
                replier.reply("존재하지 않는 닉네임입니다.");
                return 0;
            }
            
            //userId에서 고유번호 가져오고 검색
            let matchData = Jsoup.connect ("https://api.nexon.co.kr/kart/v1.0/users/" + JSON.parse (userId)["accessId"] +"/matches?start_date=&end_date=&offset=&limit=1&match_types=")
            .header ("Authorization", Key).ignoreContentType(true).get().text();

            //matchData에서 캐릭터번호랑 카트번호 가져오기, 없으면 안뜸
            try {
                var characterImg = (JSON.parse(matchData).matches[0].matches[0].player.character);
                var kartImg = (JSON.parse(matchData).matches[0].matches[0].player.kart);
                var LicenseNumber = (JSON.parse(matchData).matches[0].matches[0].player.rankinggrade2);
                LicenseNumber = LicenseChange[LicenseNumber];
            } catch(e) {
                var characterImg = "";
                var kartImg = "";
                var LicenseNumber = "";
                
            }
            var License = LicenseNumber;
            var LicenseLink = "https://tmi.nexon.com/img/icon_";

            let kartList ="";

            const characterUrl = "https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/character/";
            const kartUrl = "https://s3-ap-northeast-1.amazonaws.com/solution-userstats/metadata/kart/";

            //Guild
            var guild = Jsoup.connect("http://kart.nexon.com/Garage/Main?strRiderID="+msg.substr(5)).get().select("span[id=GuildName]").text();
            if (guild == "가입된클럽이없습니다") guild = "클럽 미가입";

            //Level
            var level = Jsoup.connect("http://kart.nexon.com/Garage/Main?strRiderID="+msg.substr(5)).get().select("div[id=GloveImg]").select("img").attr("src");
  

            var KartbodyImg = ""; 
            var KartbodyName = "";

            try {
                KartbodyName = kartList.data.find(e => e.hash === kartImg).KartName;
                KartbodyImg = kartUrl + kartImg + ".png";
            } catch(e) {
                KartbodyName = "전체사진!";
                KartbodyImg = org.jsoup.Jsoup.connect("http://kart.nexon.com/Garage/Main?strRiderID="+msg.substr(5)).get().select("#RiderImg > img").attr("src");
            }

            //Send!
            Kakao.sendLink(room, {
                "link_ver" : "4.0",
                "template_id" : 49018,
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
        } catch(e) {
            Api.reload("카트전용");
            replier.reply(
                "유저 정보를 찾았으나 성공적으로 불러오지 못했습니다.\n재시도 시에도 안된다면 아래 내용을 복사하여 다음으로 보내주세요."
                +nn+"[여기로]"
                +n+"https://open.kakao.com/o/stEAIBDc"
                +nn+"[이것을]"
                +n+e+"::"+e.lineNumber
            );
        }
    }
 
/*------------------------------..유저------------------------------*/




    if (msg == ".카트패치노트") {
        
        var date = new Date();
        var Y = String(date.getFullYear());
        var M = String(date.getMonth()+1);
        if (M.length == 1) M = "0" + M;
        var D = String(date.getDate());
        if (D.length == 1) D = "0" + D;

        var MainUrl = Js.connect("https://kart.nexon.com/Kart/News/Patch/List.aspx").get() .select("#kart_main_sections > section.board > div > div.list_tb.tb_notice > table > tbody");
        var Final = [];
        for (i=1; i<11; i++) {
            var site = MainUrl.select("tr:nth-child("+i+")");
            Final.push(""
                +"["+site.select("td:nth-child(1)").text()+"]"
                +n+"day: "+site.select("td:nth-child(2)").text()
                +n+"views: "+site.select("td:nth-child(3)").text()
                +n+"link: "+site.select("td:nth-child(1) > div > div > a").attr("href")
            );
        }
        replier.reply(
            "최근 10개의 패치노트!"+n+
            "("+Y+"."+M+"."+D+") 기준   "+allsee+nn+
            Final.join(nn)
        );

        Final = [];
    }
  
  
  
    if (msg == ".명령어") {
        replier.reply(
            "[카트라이더 TMI]"+n
            +".유저 {닉네임}"+n
            +"..유저 {닉네임}"
            +nn
            +".카트패치노트"
        );
    }

}
