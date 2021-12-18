import {useState, useEffect,useRef} from "react";

//API使わない場合
const App=()=> {
  
//------CSS--------------------------------------------------------------------------
  /*絵札表示*/
const div0 = {
  /*子要素のimg画像を中央に配置*/
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const efuda = {
  /*絵札用*/
  // width: "150px",
  // height: "150px",
  objectFit: "scale-down", /*原画比率維持*/
  cursor: "pointer",
  border: "none",
}
const efudaAnswered = {
  /*絵札用*/
  // width: "150px",
  // height: "150px",
  objectFit: "scale-down", /*原画比率維持*/
  // cursor: "pointer",
  border: "none",
  opacity: 1,
}

const handCss = {
    // width: "110px",
    // height: "110px",
    objectFit: "scale-down", /*原画比率維持*/
    position: "absolute", /*これがないと画像が縦に並ぶ*/
}

const handPcCss = {
  // width: "110px",
  // height: "110px",
  objectFit: "scale-down", /*原画比率維持*/
  position: "absolute", /*これがないと画像が縦に並ぶ*/
}

/* ミニ絵札*/
const miniCss = {
  maxWidth: "50px",
  maxHeight: "40px",
}

/*画像（ポップアップ画面）*/
const popupImg = {
  maxWidth: "150px",
  maxHeight: "150px",
}
/*画像（試合結果画面）*/
const resultImg = {
  maxWidth: "200px",
  maxHeight: "200px",
}

  /*タイトル名*/
const title= {
  color: "#979797",
}

  const header ={
    maxWidth: "900px",
    height:"auto",
    margin: "0px auto 0",
    background: "#fff",
    borderRadius: "4px",
    padding: "0px",
    textAlign: "center",
    fontSize: "14px",
    fontFamily: "Verdana, sans-serif",
    position: "relative",
}

const playArea = {

  height: "750px",
  margin: "0 auto",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundImage: "url(../images/worldmap.png)", 
  /* flexで絵札一覧を中央に配置 */
  display:"flex",
  justifyContent: "center",
  position: "relative",
}

/* 絵札エリア(Grid) */
const fuda = {
  width: "960px",
  height: "650px",
  margin: "50px auto 10px",
  // border:"dashed thin grey",
  /*子要素の絵札をgrid制御*/
  display: "grid",
  gridTemplateColumns: "repeat(5, 160px)",
  gridTemplateRows: "repeat(3, 160px)",
  justifyCcontent: "center",
  alignContent: "center",
  justifyItems: "center",
  alignItems: "start",
  /* 位置(ShowEfudaが基点） */
  top: "0px",
  position: "absolute",
}

/* -----ミニ絵札エリア------*/
/*手前*/
const miniArea ={
  position: "absolute",
  bottom: "0px",
  left: "0px",
  listStyle: "none",
  /* ミニ絵札（手前）をflexで配置 */
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "left",
}

/*敵側 */
const miniPcArea = {
  position: "absolute",
  top: "15px",
  left: "0px",
  listStyle: "none",
  /* ミニ絵札（相手側）をflexで配置 */
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "left",
  alignContent: "center",
}

const isPlacedFalse ={
  width: "100px",
  background: "red",
  padding: "8px",
  borderRradius: "4px",
  textAlign: "center",
  color: "white",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "20px",
  display: "block",
  cursor: "pointer",
}


/*ボタン（ゲーム開始）*/
const isStartedTrue={
  width: "100px",
  background: "grey",
  padding: "8px",
  borderRadius: "4px",
  textAlign: "center",
  color: "white",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "20px",
  display: "block",
}
const isStartedFalse ={
  width: "100px",
  background: "#3498db",
  padding: "8px",
  borderRadius: "4px",
  textAlign: "center",
  color: "white",
  marginLeft: "auto",
  marginRight: "auto",
  marginBottom: "20px",
  display: "block",
  cursor: "pointer", /*カーソル重ねると、手形*/
}

const input ={
  width: "80%",
	margin: "40px 3%",
  
}

   //■■■■■Popup関数■■■■■
  const popupWindow ={
    /* Box枠の設定 */
    width: "200px",
    background: "#fff",
    padding: "30px",
    boxSshadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRradius: "4px",
    margin: "0 auto", /* 画面を中央に配置 */
    textAlign: "center",/* 画面内要素を中央に */
    transition: "0.001s",
    /* 画面の位置設定（基点は親要素のshowEfuda) */
    position: "absolute",
    top: "250px",
    left: "0px",
    right: "0",
  }
      
  /*メッセージ（ポップアップ）*/
  const popupMsg ={
    fontSize:"18px"
  }

  const popupBtn ={
    display:"block",
    background: "#3498db",
    padding: "8px",
    borderRradius: "4px",
    textAalign: "center",
    color: "#fff",
    boxShadow: "0 4px 0 #287fb9",
    width: "150px",
    margin:"5px auto",
    cursor: "pointer",
    // "&:hover": {
    //   backgroundColor: grey[200],
    // }  
    
  }
  const resultBtn ={
    background: "#3498db",
    padding: "8px",
    borderRradius: "4px",
    textAalign: "center",
    color: "#fff",
    boxShadow: "0 4px 0 #287fb9",
    width: "150px",
    margin:"5px, auto",
    cursor: "pointer",
    
  }

  /* 画面枠（試合結果） */
  const resultWindow ={
    width: "200px",
    background: "#fff",
    padding: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "0 auto",
    borderRadius: "4px",
    textAlign: "center",
    transition: "1.1s",
    /* 画面の位置設定（基点は親要素のshowEfuda) */
    
    position: "absolute",
    top: "300px",
    left: "0px",
    right: "0",
  }

/*スコア通知（試合結果）*/
const resultScore = {
  fontSize: "24px",
}

/*メッセージ（試合結果）*/
  const resultMsg = {
  fontSize: "24px",
}


const dataLists =
[
  {
  id:1,
  clue: "By the river, a brown tower stands alone.",
  yomiku:"青タイルが 光るレンガの ミナレット",
  answer: "../images/pictures/001_p.png",
  read: "../sounds/en/001_en.mp3",
  yomu: "../sounds/001_jp.mp3",
  flag:"../images/flags/001_AFG_50.png",
  subject:"Minaret of Jam, Afghanistan",
  area: "asia"
},
{
  id:2,
  clue: "Not a pet. Cats live in the desert.",
  yomiku:"砂漠に暮らす 足裏黒い 元気な猫",
  answer: "../images/pictures/002_p.png",
  read: "../sounds/en/002_en.mp3",
  yomu: "../sounds/002_jp.mp3",
  flag:"../images/flags/028_BRN_50.png",
  subject:"Arabian Sand Cats, Bahrain",
  area: "asia"
},
{
  id:3,
  clue: "Beat drums and carry paper animals in the New Year.",
  yomiku:"新年に はりぼて担ぎ 太鼓打つ",
  answer: "../images/pictures/003_p.png",
  read: "../sounds/en/003_en.mp3",
  yomu: "../sounds/003_jp.mp3",
  flag:"../images/flags/015_BAN_50.png",
  subject:"Pahela Baishakh (Bengali New Year), Bangladesh",
  area: "asia"
},
{
  id:4,
  clue: "Dressed in traditional costume, the King and Queen look happy.",
  yomiku:"国王に よりそう王妃 幸福の国",
  answer: "../images/pictures/004_p.png",
  read: "../sounds/en/004_en.mp3",
  yomu: "../sounds/004_jp.mp3",
  flag:"../images/flags/021_BHU_50.png",
  subject:"A Happy Country,Bhutan",
  area: "asia"
},
{id:5,
  clue: "By the water, a white building with a gold roof",
  yomiku:"水辺に映る ブルネイの誇り",
  answer: "../images/pictures/005_p.png",
  read: "../sounds/en/005_en.mp3",
  yomu: "../sounds/005_jp.mp3",
  hand: "../images/hand-5.png",
  hand2:"../images/aite-5.png",
  flag:"../images/flags/029_BRU_50.png",
  subject:"Omar Ali Saifuddien Mosque, Brunei Darussalam",
  area: "africa"
},
{id:6,
  clue: "Put them in a pot, fry in oil and eat.",
  yomiku:"鍋に入れ 油で揚げた クモ食べる",
  answer: "../images/pictures/006_p.png",
  read: "../sounds/en/006_en.mp3",
  yomu: "../sounds/006_jp.mp3",
  flag:"../images/flags/033_CAM_50.png",
  subject:"Fried Spider, Cambodia",
  area: "africa"
},
{id:7,
  clue: "Fireworks in the night sky of a growing city",
  yomiku:"101 街の夜空に 咲く花火",
  answer: "../images/pictures/007_p.png",
  read: "../sounds/en/007_en.mp3",
  yomu: "../sounds/007_jp.mp3",
  flag:"../images/flags/189_TPE_50.png",
  subject:"Taipei 101 Tower, Chinese Taipei",
  area: "africa"
},
{id:8,
  clue: "Dance and smile together in yellow or pink costumes.",
  yomiku:"",
  answer: "../images/pictures/008_p.png",
  read: "../sounds/en/008_en.mp3",
  yomu: "../sounds/008_jp.mp3",
  flag:"../images/flags/154_PRK_50.png",
  subject:"Dancing Ceremony, Democratic People's Republic of Korea",
  area: "africa"
},
{id:9,
  clue: "Walk around with a long monster to the beat of drums.",
  yomiku:"",
  answer: "../images/pictures/009_p.png",
  read: "../sounds/en/009_en.mp3",
  yomu: "../sounds/009_jp.mp3",
  flag:"../images/flags/082_HKG_50.png",
  subject:"Tai Hang Fire Dragon Dance, Hong Kong, China",
  area: "europe"
},
{id:10,
  clue: "Temples and festivals around the wheel",
  yomiku:"",
  answer: "../images/pictures/010_p.png",
  read: "../sounds/en/010_en.mp3",
  yomu: "../sounds/010_jp.mp3",
  flag:"../images/flags/086_IND_50.png",
  subject:"Indian Beauty, India",
  area: "europe"
},
{id:11,
  clue: "Move arms and legs with a folding fan in hand.",
  yomiku:"",
  answer: "../images/pictures/011_p.png",
  read: "../sounds/en/011_en.mp3",
  yomu: "../sounds/011_jp.mp3",
  flag:"../images/flags/085_INA_50.png",
  subject:"Balinese Dance, Indonesia",
  area: "europe"
},
{id:12,
  clue: "Houses are crowded on top of the rocky mountain.",
  yomiku:"",
  answer: "../images/pictures/012_p.png",
  read: "../sounds/en/012_en.mp3",
  yomu: "../sounds/012_jp.mp3",
  flag:"../images/flags/089_IRQ_50.png",
  subject:"Amadiya (mountain top town), Iraq",
  area: "europe"
},
{id:13,
  clue: "In winter, get together and enjoy food and poems.",
  yomiku:"",
  answer: "../images/pictures/013_p.png",
  read: "../sounds/en/013_en.mp3",
  yomu: "../sounds/013_jp.mp3",
  flag:"../images/flags/087_IRI_50.png",
  subject:"Yalda Eve Ceremony, Islamic Republic of Iran",
  area: "americas"
},
{id:14,
  clue: "In the wind, a family of fish swims above the roof.",
  yomiku:"",
  answer: "../images/pictures/014_p.png",
  read: "../sounds/en/014_en.mp3",
  yomu: "../sounds/014_jp.mp3",
  flag:"../images/flags/097_JPN_50.png",
  subject:"Koinobori (carp streamer), Japan",
  area: "americas"
},
{id:15,
  clue: "Cut out a rocky mountain to build a town.",
  yomiku:"",
  answer: "../images/pictures/015_p.png",
  read: "../sounds/en/015_en.mp3",
  yomu: "../sounds/015_jp.mp3",
  flag:"../images/flags/096_JOR_50.png",
  subject:"Petra Ruins, Jordan",
  area: "americas"
},
{id:16,
  clue: "Ride horses and catch an animal to the goal.",
  yomiku:"",
  answer: "../images/pictures/016_p.png",
  read: "../sounds/en/016_en.mp3",
  yomu: "../sounds/016_jp.mp3",
  flag:"../images/flags/098_KAZ_50.png",
  subject:"Kokpar (horse game), Kazakhstan",
  area: "americas"
},
{id:17,
  clue: "Towers have blue and white lines, waiting for the rain.",
  yomiku:"",
  answer: "../images/pictures/017_p.png",
  read: "../sounds/en/017_en.mp3",
  yomu: "../sounds/017_jp.mp3",
  flag:"../images/flags/105_KUW_50.png",
  subject:"Kuwait Water Towers, Kuwait",
  area: "oceania"
},
{id:18,
  clue: "Snow mountains, and the brown tower on the land",
  yomiku:"",
  answer: "../images/pictures/018_p.png",
  read: "../sounds/en/018_en.mp3",
  yomu: "../sounds/018_jp.mp3",
  flag:"../images/flags/100_KGZ_50.png",
  subject:"Burana Tower, Kyrgyzstan",
  area: "oceania"
},
{id:19,
  clue: "Over the net, hit a ball with feet and head.",
  yomiku:"",
  answer: "../images/pictures/019_p.png",
  read: "../sounds/en/019_en.mp3",
  yomu: "../sounds/019_jp.mp3",
  flag:"../images/flags/106_LAO_50.png",
  subject:"Katow (kick volleyball), Lao People's Democratic Republic",
  area: "oceania"
},
{id:20,
  clue: "People believe God planted the trees here.",
  yomiku:"",
  answer: "../images/pictures/020_p.png",
  read: "../sounds/en/020_en.mp3",
  yomu: "../sounds/020_jp.mp3",
  flag:"../images/flags/112_LIB_50.png",
  subject:"The Cedars of God, Lebanon",
  area: "oceania"
},
] 

const koukaSounds = [
  "sounds/effects/siin.mp3",
  "sounds/effects/pan.mp3", 
  "sounds/effects/bubu.mp3", 
  "sounds/effects/chan.mp3",
  "sounds/effects/clap.mp3",
  "sounds/effects/chiin.mp3", 
]

//------JavaScript--------------------------------------------------------------------------

 //■■■■■useState■■■■■
 const [basicLists,setBasicLists] = useState(dataLists);    //読句用データ配列（使用札選出済）
 const [karutaLists,setKarutaLists] = useState(basicLists);  //絵札用データ配列
 const [miniPictures, setMiniPictures] = useState([]);      //ミニ絵札データ配列
 const [miniPcPictures, setMiniPcPictures] = useState([]);  //ミニ絵札データ配列（PC)

 const [currentTurn, setCurrentTurn] = useState(0);         //turnカウント
 const [score, setScore] = useState(0);                     //スコア・カウント
 const [isScored, setIsScored] = useState(false);           //player得点の有無

 const [isPlaced, setIsPlaced] = useState(false)            //「札を並べる」ボタンの反応制御
 const [isStarted, setIsStarted] = useState(false)           //「ゲーム開始」ボタンの反応制御
 const [isAnswered, setIsAnswered] = useState(true);        //絵札クリックの可否を制御

 const [placeholder, setPlaceholder] = useState('');        //読み句一文字づつ表示
 const letterCount = useRef(0);                              //読み句文字数カウント 
 const timerRef = useRef(null);                              //タイマー設定用  

 const [isKaruta, setIsKaruta] = useState(false);           //絵札一覧の表示・非表示
 const [isPopup, setIsPopup] = useState(false);             //ポップアップの表示・非表示
 const [isResult, setIsResult] = useState(false);           //ゲーム結果の表示・非表示



   //読み句、絵札をセット（並べ替え、指定枚数選出）
   const setCards =() => {
    shuffle(basicLists)
    // shuffle(basicLists).splice(0,5)
    const result = shuffle([...basicLists]);
    setKarutaLists(result)
  };

//エリア別札選出（例：アジア）
    const chooseArea = () => {
      const asia= basicLists.filter(list => list.area==="asia");
      setBasicLists(asia);
      setKarutaLists(asia);
      const result = shuffle([...asia]);
      setBasicLists(result)
      const result2 = shuffle([...asia]);
      setKarutaLists(result2)
    }

    //「札を並べる」ボタンを押すーーーーーーーーーーー
  const placeKaruta = () => {
    setCards();
    chooseArea();
    setIsKaruta(true);  //絵札一覧を表示
    setIsPlaced(true);  //「札を並べる」ボタンの反応停止
    playKouka(0);       //効果音 
  }//placeKaruta

  //「ゲーム開始」ボタンを押すーーーーーーーーー
  const startGame =() => {
    timerStart();           //タイマー設定（１枚目のみ）
    setIsAnswered(false);   //絵札のクリック可能にする
    setIsStarted(true)　    //「ゲーム開始」ボタンの反応停止
    readClue(currentTurn);  //読み句の読みあげ
  }//startGame 

  //札をタッチした場合-----------------------------
  const efudaClick = (selectedId)=> { 

    setIsAnswered(true);      //絵札のクリックを不可にする
    timerStop();              //タイマー解除（PCplayer)
    // clueStop(currentTurn);
    // stopReadClue();
  

    //正解の場合
    if (selectedId ===basicLists[currentTurn].id) {
      playKouka(1);
      setIsPopup(true);       
      placeHand();
      //player独自の操作
      setScore(score + 1);    //スコア加点
      setIsScored(true)       //ミニ絵札表示（手前）の有無を決める基準
      //最後の１枚を撮った場合に加点
      if (currentTurn===basicLists.length -2)
      setScore(score + 2);   
    }
    //不正解の場合
    else{
      setTimeout(()=>{playerPc()}, 300);
    }
  }//efudaClick

  //ポップアップボタンを押した場合-----------------------------
  const pressPopupBtn = () => {

     //setCurrentTurn変更がすぐ反映されないため手動で１を加える（or最初の句が２回読まれる）
     const newCurrentTurn = currentTurn + 1;
     setCurrentTurn(newCurrentTurn);
    
    //いろいろ消す
    hide();
    
    //ミニ絵札表示(手前)
    if (isScored) {
      addMini(currentTurn);
      //最後の１枚を追加表示
      if (currentTurn === basicLists.length -2 ){
        addMini(currentTurn + 1);
       }
    }
    else {
      addMiniPc(currentTurn);
      //最後の１枚を追加表示
      if (currentTurn === basicLists.length -2 ){
        addMiniPc(currentTurn + 1);
      }
    }
    
    //次の準備ーーーーーーーーーーーーーーーーーーーーーーーーーーーー

    // 「次」ボタンを押した時
     if (currentTurn < basicLists.length-1) { //0,1,2,3,4,5]

      //readClueの引数に手動で１を加えた数値を入れる
      setTimeout(()=>{readClue(newCurrentTurn)}, 500);
      setIsAnswered(false);   //絵札のクリックを可にする
      setIsScored(false);    
      letterCount.current=0;  //表示する読み句の文字数をゼロに戻す
     }

    //タイマー設定（最後手前の札まで
    // currentTurnでなくnewCurrentTurnにする。or 終了後に最後のタイマーが作動しポップアップが表示される。
    if (newCurrentTurn < basicLists.length-1) {
    // timerStart(newCurrentTurn);
    timerStart2(newCurrentTurn);
     }
     
     //「結果を見る」ボタンを押した時
    if (currentTurn === basicLists.length - 2) { //5
       setIsResult(true);    //結果画面を表示する
       soundResult();        //結果画面表示時の効果音
    }
  };//pressPopupBtn

  //------関数--------------------------------------------------------------------------
 
  
    //読み句一文字づつ表示
    const isFirstRender = useRef(false)

    useEffect(() => { // このeffectは初回レンダー時のみ呼ばれるeffect
      isFirstRender.current = true
    }, [])
    
    useEffect(() => {// 『count』 が更新された場合『と』初回レンダー時に動くeffect
      if(isFirstRender.current) { // 初回レンダー判定
        isFirstRender.current = false // もう初回レンダーじゃないよ代入
      } else {
        const clueWords = basicLists[currentTurn].clue
         
          const showClue =()=> {
            if(currentTurn < basicLists.length-1){
              setPlaceholder(prev => prev + clueWords[letterCount.current]);
              letterCount.current++;
            }
          }
      if (letterCount.current <clueWords.length) {
        let addChar = setTimeout(()=>{showClue(currentTurn)} , 100);
        return () => clearTimeout(addChar);
      }
    } // eslint-disable-next-line
    }, [placeholder, isStarted]);  

  //シャッフル関数
  const shuffle=(arr) => { 
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
    }

  //PC player timer （useCallback付けると御作動する）
  const timerStart = () => {
    timerRef.current = setTimeout(() => {
      playerPc();
    }, 5000);
  };

  const timerStop = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  //timer2 (引数 newCurrentTurn)
  //useCallback付けると誤作動
  const timerStart2 = (newCurrentTurn) => {
    timerRef.current = setTimeout(() => {
      playerPc2(newCurrentTurn);
    }, 5000);
  };

  //PCplayerの動き　引数なし
   const playerPc = () =>{
    placeHandPc();
    setIsPopup(true);
    playKouka(2);
    setIsAnswered(true);
  }
  //PCplayer2の動き　(引数 newCurrentTurn)
   const playerPc2 = (newCurrentTurn) =>{
    placeHandPc2(newCurrentTurn);
    setIsPopup(true);
    setIsAnswered(true);
    playKouka(3);
  }

  //読みあげ （引数あり）
  let yomiku=new Audio();
  
  const readClue = (currentNum)=> {

    if (currentNum < basicLists.length -1){
    yomiku.src = basicLists[currentNum].read; //英語
    // yomiku.src = basicLists[currentNum].yomu; //日本語
    yomiku.play();}
    yomiku.preload = "auto";
    yomiku.loop = false;
  }

  //効果音
  let kouka=new Audio();

  const playKouka= (koukaNum)=> {
    kouka.preload = "auto";
    kouka.src = koukaSounds[koukaNum];
    kouka.load();
    kouka.loop = false;
    kouka.play();
  }

  //消す（ポップアップボタン押した後）
  const hide =() => {

    //読み句を消す？？
    setPlaceholder("");

    //絵札と手を消す
    if(isScored){
      eraseEfudaHand();
     }
    else{
      eraseEfudaHandPc();
    }
    //ポップアップ画面を消す
    setIsPopup(false);      

    //最後の１枚を消す
    if (currentTurn === basicLists.length - 2) { 
      eraseLast();          
    }
  }
  //読み句音声ファイルを削除（ただし再生済みの音声を停止に失敗）
  // const stopReadClue = () => {
  //   const result = basicLists.map(list => list.id===basicLists[currentTurn].id ? {...list, read:""} : list ) //英語
  //   setBasicLists(result);  
  // };

    //正解の絵札の上に手を表示
    const placeHand = () => {
      const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, hand:"/images/hand.png"} : list)
      setKarutaLists(result);  
    };
    
    //手を表示(PC playerお手つき、PCplayer１回目用)
    const placeHandPc = () => {
      const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, handPc:"/images/handPc.png"} : list )
      setKarutaLists(result);  
    };

    //手を表示(PC playerお手つき, 2回目以降用)
    const placeHandPc2 = (currentNum) => {
      const result = karutaLists.map(list => list.id===basicLists[currentNum].id ? {...list, handPc:"/images/handPc.png"} : list )
      //currentTurnの更新時期のずれにより、不要な所に手や絵が表示されてしまう。その手を消すために以下を実行
      const result1 = result.map(list => list.id===basicLists[currentTurn].id ? {...list, answer:"", handPc:"", hand:""} : list )
      setKarutaLists(result1);  
    } 
    //重要：絵と手を別々の関数にすると、片方しか機能しない。なので同時に処理する

    //正解の絵と手を消す(player)-同じ行にanswer, handを書ける
    const eraseEfudaHand = () => {
      const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, answer:"", hand:""} : list )
      setKarutaLists(result);  
    } 

    //正解の絵と手(PC)を消す
    const eraseEfudaHandPc = () => {
      const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, answer:"", handPc:""} : list )
      setKarutaLists(result);  
    } 

    //最後2枚の絵札と手(player, pc)を消す
    const eraseLast = () => {
      const result = karutaLists.map(list => list.id===basicLists[currentTurn].id ? {...list, answer: "", hand:"", handPc:""} : list )
      const result2 = result.map(list => list.id===basicLists[currentTurn+1].id ? {...list, answer: ""} : list )
      setKarutaLists(result2);  
    }
  
    //引数にcurrentTurnを入れないとうまくいかない
    //mini絵札を追加する(player)
    const addMini = (currentTurn) => {
      setMiniPictures((prevMiniPictures) => {
        const newMiniPictures = [...prevMiniPictures, basicLists[currentTurn].answer]
        return newMiniPictures;
      });
    }
    
    //mini絵札を追加する(PC)
    const addMiniPc = (currentTurn) => {
      setMiniPcPictures((prevMiniPcPictures) => {
        const newMiniPcPictures = [...prevMiniPcPictures, basicLists[currentTurn].answer]
        return newMiniPcPictures;
      });
    }

    //結果画面表示時の効果音
    const soundResult =() => {
      if (score>=basicLists.length * 0.5) {
        playKouka(4);
      }else
      {
        playKouka(5);
      }
    }
  
  //次のゲーム
  const newGame =() => {
    window.location.reload();
  }

  //--switch

// 　let area;  
//   const areas = () => {
//     switch(area){
//       case 'asia':
        
//         return(
//         <div>
//           <p>asia</p>
         
//         </div>
//       )
      
//        case 'africa':
//          return(
//          <div>
//           <p>africa</p>
//          </div>
//       )
//       default:
//         return(
//         <div>
//           <p>default</p>
//         </div>
//       )
//     }
//   }

  

//------JSX------------------------------------------------------------------------------
  return (
    <div>
      {/* <button onClick={()=> areas()}>アジア</button>
        {areas()} */}
    <header style={header}>
      <h1 style={title}>世界200ケ国かるた</h1>
      {isPlaced ?
       <>
        {isStarted ?
          <button style={isStartedTrue}>ゲーム中</button>
          :
          <button style={isStartedFalse} onClick={()=> startGame()}>ゲーム開始</button>
        }
        </>
        :
        <button style={isPlacedFalse} onClick={placeKaruta} >札を並べる</button> 

      }
        <div style={input}>
          <input 
            type="text"
            size="100"
            placeholder = "ここに読み句が表示されます"
            defaultValue={placeholder}
        />
        </div>
        
        {/* {isPlaced &&
          <p style={clueLine}>
            {placeholder}
          </p>
        } */}
      
      {/* <p>スコア：{score}</p> <p>Turn: {currentTurn}</p> */}

    </header>

    <main style={playArea}>
      {isKaruta &&
        <ul style={fuda}>
          {/* {karutaLists.map((list) =>{ */}
          {karutaLists.map(({id, answer, hand,handPc}) =>{  //分割代入を利用した場合
            return(
              <li style={div0} key={id} >
                {isAnswered ? (
                  <img alt ="" style={efudaAnswered} src={answer} />
                  ):( 
                  <img alt ="" style={efuda} src={answer} onClick={() =>efudaClick(id)} />
                  )}
                  <img  alt ="" style={handCss}  src={hand} />
                  <img  alt ="" style={handPcCss}   src={handPc} /> 
              </li> 
                )
          })}
        </ul>
      }

    {isPopup ? (
      <div style={popupWindow}> 
        <p style={popupMsg}>
          {isScored ?
            "取りました！"
            :
            "残念、取られました！"
          }
        </p>
        <img alt="correct card" style={popupImg} src={basicLists[currentTurn].answer} />
        <p>{basicLists[currentTurn].subject} </p>
        <img alt ="flag" src={basicLists[currentTurn].flag} />
        <button style = {popupBtn} onClick={()=>pressPopupBtn()} >
          {currentTurn<basicLists.length-3 &&
             "次"
          }
          {currentTurn===basicLists.length-3 &&
             "次に取ると"
          }
          {currentTurn===basicLists.length-2 &&
             "結果を見る"
          }
        </button>
      </div>
    ) : null
    }
     
      <ul style={miniArea}>
        {miniPictures.map(picture =>{
          return(
            <li key={picture}>
              <img alt="player's card" style={miniCss}  src={picture} />
            </li>
          )
        })}
      </ul>
    
      <ul style={miniPcArea}>
      {miniPcPictures.map(picture =>{
        return(
          <li key={picture}>
            <img alt="pc player's card"style={miniCss}  src={picture} />
          </li>
        )
      })}
    </ul>
    
    {isResult&& 
        <div style={resultWindow}> 
          <p style={resultScore}>{score}枚取りました。</p>
          {score>=basicLists.length * 0.5 ? (
            <>
              <p style={resultMsg}>勝ちました！</p>
              <img alt ="prize" style={resultImg} src="../images/gold.png" />
            </>
            ):(
              <p style={resultMsg}>残念！負けました</p>
            )
          }
          <button style={resultBtn} onClick={newGame}>もう一回？</button>
        </div>
    }  
    </main>
  </div>        
	) //return
} //App



export default App;


// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


