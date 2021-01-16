(function () {
  document.addEventListener("deviceready", onDeviceReady, false);

  function onDeviceReady() {
    showSite();
    window.plugins.OneSignal.setLogLevel({ logLevel: 6, visualLevel: 0 });

    var notificationOpenedCallback = function (jsonData) {
      console.log("notificationOpenedCallback: " + JSON.stringify(jsonData));
    };
    var iosSettings = {};
    iosSettings["kOSSettingsKeyAutoPrompt"] = false;
    iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;

    window.plugins.OneSignal.startInit("dd764a58-b401-40be-8c51-6288826daffb")
      .handleNotificationOpened(notificationOpenedCallback)
      .iOSSettings(iosSettings)
      .inFocusDisplaying(
        window.plugins.OneSignal.OSInFocusDisplayOption.Notification
      )
      .endInit();

    window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(
      function (accepted) {
        console.log("User accepted notifications: " + accepted);
      }
    );
  }

  function showSite() {
    const url = "http://site.com";
    const target = "_blank";
    const options = "location=no,hidden=yes";
    ref = cordova.InAppBrowser.open(url, target, options);
    ref.addEventListener("loadstop", loadStopCallBack);
    ref.addEventListener("loadstop", loadStopCallBack);
    ref.addEventListener("loaderror", loadErrorCallBack);
  }

  function loadStopCallBack() {
    if (ref != undefined) {
      ref.show();
    }
  }

  function loadErrorCallBack(params) {
    const scriptErrorMesssage =
      "alert('Sorry we cannot open that page. Message from the server is : " +
      params.message +
      "');";

    ref.executeScript({ code: scriptErrorMesssage });
    ref.close();
    ref = undefined;
  }
})();
