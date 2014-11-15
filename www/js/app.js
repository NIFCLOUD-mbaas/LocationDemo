// This is a JavaScript file

$(function(){
    //起動時にmobile backend APIキーを設定
    NCMB.initialize("YOUR_APP_KEY","YOUR_CLIENT_KEY");
});

//位置情報取得に成功した場合のコールバック
var onSuccess = function(position){
    alert("緯度:" + position.coords.latitude + ", 経度:" + position.coords.longitude);
    var current = new CurrentPoint();
    current.distance = CurrentPoint.distance;   //検索範囲の半径を保持する    
    current.geopoint = position.coords;         //位置情報を保存する
    search(current);
};

//位置情報取得に失敗した場合のコールバック
var onError = function(error){
    alert("現在位置を取得できませんでした");
};

//位置情報取得時に設定するオプション
var option = {
    timeout: 6000   //タイムアウト値(ミリ秒)
};

//現在地を取得する
function find(){
    CurrentPoint.distance = 5; //検索距離を5kmに設定
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
}

//現在地を保持するクラスを作成
function CurrentPoint(){
    geopoint=null;  //端末の位置情報を保持する
    distance=0;     //位置情報検索に利用するための検索距離を指定する
}

//mobile backendから位置情報を検索するメソッド
function search(current){
    console.log("search");
    //位置情報を検索するクラスのNCMB.Objectを作成する
    var Station = NCMB.Object.extend("Yokote");

    //NCMB.Queryを作成
    var query = new NCMB.Query(Station);
    //位置情報をもとに検索する条件を設定
    var geoPoint = new NCMB.GeoPoint(current.geopoint.latitude,current.geopoint.longitude);
    query.withinKilometers("location", geoPoint, current.distance);

    //mobile backend上のデータ検索を実行する
    query.find({
        success: function(points) {
            $("#result").html("");
            // 検索が成功した場合の処理
            for (var i = 0; i < points.length; i++){
                var point = points[i];
                $("#result").append("<p>店名：" + point.get("name") + "</p>");
            }
        },
        error: function(error) {
            // 検索に失敗した場合の処理
            console.log(error.message);
        }
    });
}

//店舗を登録する
function savePost(){
    console.log("savePost");
    //位置情報が取得できたときの処理
    var onSuccess = function (location){
        console.log("onSuccess");
        console.log("lat:" + location.coords.latitude + " lon:" + location.coords.longitude);
        
        //記事内容を取得
        var title = $("#name").val();
        
        //位置情報オブジェクトを作成
        var geoPoint = new NCMB.GeoPoint(location.coords.latitude, location.coords.longitude);
        
        //Postクラスのインスタンスを作成★
        
        //値を設定★
        
        //保存を実行★
        
        //前のページに戻る
        myNavigator.popPage();
    }
    
    //位置情報取得に失敗した場合の処理
    var onError = function(error){
        alert("error:" + error.message);
    }
    
    var option = {
        timeout: 6000   //タイムアウト値(ミリ秒)
    };
    
    //位置情報を取得
    navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
}
