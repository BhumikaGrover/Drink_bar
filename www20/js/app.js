// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.directives','app.services','google.places','ngCordova','ngMap','timer','ion-gallery','pascalprecht.translate'])
.constant("Base_URL","http://ec2-52-59-3-162.eu-central-1.compute.amazonaws.com/freedrink/api/")
.run(function($ionicPlatform,$window,$state,$cordovaStatusbar, $cordovaSplashscreen,$timeout,$rootScope) {
  $ionicPlatform.ready(function() {
    //  alert("dhsu")
      
      cordova.getAppVersion(function (version) {
        appVersion = version;
        $rootScope.vers=appVersion;       //// shown on contact us page
       // alert("grover"+appVersion);
      });
        var deviceInformation = ionic.Platform.device();
        var isIOS = ionic.Platform.isIOS();
        var isAndroid = ionic.Platform.isAndroid();

        var currentPlatform = ionic.Platform.platform();
        var currentPlatformVersion = ionic.Platform.version();
 // alert("bhumika"+currentPlatformVersion);
        $rootScope.platvers=currentPlatformVersion; //// shown on contact us page
      $cordovaStatusbar.overlaysWebView(true);
      $cordovaStatusBar.styleColor('white'); //Black, transulcent
      
      //added later
      $timeout(function(){
               $cordovaSplashscreen.hide();
             //  alert('Bhumi')
        }, 500);
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // 
    // for form inputs)
    
    
   if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
       // alert("my");
    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    FCMPlugin.onNotification(function(data){
    if(data.wasTapped){
      //  alert("hey");
    //   alert( JSON.stringify(data));
         $state.go('menu.slider');
      //Notification was received on device tray and tapped by the user.
//      alert( JSON.stringify(data) );
//       if($window.localStorage.getItem('user_id')){
//                    alert(JSON.stringify(data));
//                    alert("my");
//                    alert(data.data.alert);
//                    alert("my1");
//                $state.go('menu.notification');
//              }else{
//                  $state.go('menu.login');
//              }
     
    //  $state.go("menu.notification");
      
    }else{
      //Notification was received in foreground. Maybe the user needs to be notified.
      alert( JSON.stringify(data) );
    }
});
    
  });
})


.config(function($ionicConfigProvider) {
  $ionicConfigProvider.views.swipeBackEnabled(false);
})
.config(function ($ionicConfigProvider) {
        $ionicConfigProvider.scrolling.jsScrolling(false);           
    })
.config(function($translateProvider) {
        $translateProvider.translations('English', {
           // hello_message: "Howdy",
          //  goodbye_message: "Goodbye"
         //////signup/////////////
          First_Name: "First name",
          Last_Name: "Last Name",
          Email_Address:"Email Address",
          Phone_Number_Optional:"Phone Number (Optional)",
          Optional:"Optional",
          Birthday:"Birthday",
          City:"City",
          Gender:"Gender (Optional)",
          Country:"Country",
          Password:"Password",
          Confirm_Password:"Confirm Password",
          SIGN_UP:"SIGN UP",
          Already_have_an_account:"Already have an account?",
          Forgot_Password:"Forgot Password",
          Sign_In:"Sign In",
          Field_Required:"Field Required",
          Invalid_Email_Address:"Invalid Email Address",
          Male:"Male",
          Female:"Female",
          Other:"Other",
          //////signup/////////////
          ///////Referral code////////
          If_you_got_a_Referral_Code_Please_enter_here:"If you got a Referral Code, Please enter here",
          Apply:"Apply",
          If_you_donot_have_a_Referral_Code_click_here_to_continue:"If you don't have a Referral Code, click here to continue",
          ///////Referral code////////
          ////////location//////////
          Search_Venue_Name:"Search Venue Name",
          Search_Venue:"Search Venue",
          Venues_near_by_me:"Venues near by me",
          Show_All_Cities:"Show All Cities",
          ////////location//////////
          ////////citing listing////////
          Enter_Venue_Name:"Enter Venue Name",
          Recommended_Venues:"Recommended Venues",
          Available_Cities:"Available Cities",
          Show_Venues_near_by_me:"Show Venues near by me",
          /////////login/////
          Sign_in_with_email:"Sign in with email",
          SIGN_IN:"SIGN IN",
          New_here:"New here?",
          Sign_Up:"Sign Up",
         //////filter//////
         SELECT_VENUES:"SELECT VENUES",
         ////discover/////
         Free_Months:"Free Months",
         Earn_A_Free_Month_Now:"Earn A Free Month Now!",
         Your_Code:"Your Code",
         Invite_your_friends_and_your_friends_will_receive_1_drink_for_free_and_will_pay_only_499_instead_of_999_for_their_first_month_For_every_new_friend_who_becomes_a_member_you_get_1_FREE_MONTH_for_yourself_You_can_earn_up_to_6_Month_for_free_Start_now_inviting_your_friends:"Invite your friends and your friends will receive 1 drink for free and will pay only 4,99 € instead of 9,99 € for their first month. For every new friend who becomes a member you get 1 FREE MONTH for yourself. You can earn up to 6 Month for free! Start now inviting your friends!",
         Invite_More_Friends_to_Earn:"Invite More Friends to Earn",
         ////////contact us/////
         Select_a_reason:"Select a reason",
         Customer_Service:"Customer Service",
         Venue_Partnership:"Venue Partnership",
         Other_Business_Inquiries:"Other Business Inquiries",
         Message:"Message",
         SUBMIT:"SUBMIT",
         Name:"Name",
         Email:"Email",
         /////////menu////////
         View_Account:"View Account",
         Search_Venues:"Search Venues",
         Venues_List:"Venues List",
         Drink_History:"Drink History",
         Plan_Billing:"Plans & Billing",
         Earn_FREE_Months:"Earn FREE Months",
         Contact_Us:"Contact Us",
         //////profile/////////
         Member_status:"Member status",
         Phone_number:"Phone number",
         Edit_Info:"Edit Profile",
         Change_Password:"Change Password",
         SIGN_OUT:"SIGN OUT",
         SAVE:"SAVE",
         /////changepassword////
//         Change_Password:"Change Password",
         Old_Password:"Old Password",
         New_Password:"New Password",
//         Confirm_Password:"Confirm Password",
         /////plan and billing////////
         Amount:"Amount",
         Discount:"Discount",
         Pay:"Pay",
         Apply_Code:"Apply Code",
         Invite_Code:"Invite Code",
         Remove_Code:"Remove Code",
         pay_button:"Pay now and start to get your free drinks every day",
         /////////rest_detail////
         Get_Direction:"Get Direction",
         Show_available_free_drinks:"Show available free drinks",
         SHOW_ON_MAP:"SHOW ON MAP",
         About_the_Venue:"About the Venue:",
         Opening_Hours:"Opening Hours",
         Closing:"Closing",
         Opening:"Opening",
         SUNDAY:"SUNDAY",
         MONDAY:"MONDAY",
         TUESDAY:"TUESDAY",
         WEDNESDAY:"WEDNESDAY",
         THURSDAY:"THURSDAY",
         FRIDAY:"FRIDAY",
         SATURDAY:"SATURDAY",
         ADDRESS:"ADDRESS",
         Website:"Website",
         Facebook:"Facebook",
         Phone:"Phone",
         Closed:"Closed",
         CATEGORY:"CATEGORY",
         ///////mainmenu//////
         Available_Free_Drinks:"Available Free Drinks",
         ///////mainmenu2/////
         Drink_at_the_moment_not_available_Please_choose_another_Drink:"Drink at the moment not available. Please choose another Drink!",
         Select_this_free_drink:"Select this free drink",               
         DESCRIPTION:"DESCRIPTION",
         INGREDIENTS:"INGREDIENTS",
         //////confirmation//////
         Show_this_to_your_Bartender_or_Server_at :"Show this to your Bartender or Server at ",
         You_have:"You have",
         to_Show_This_Screen_to_a_Bartender:"to Show This Screen to a Bartender",
         I_Got_My_Drink:"I Got My Drink",
         Confirmation:"Confirmation",
         Thank_You:"Thank You !",
         Drinks_Filter:"Drinks Filter",
         Thank_You_For:"Thank You For",
         Subscription:"Subscription !",
         Drink_History:"Drink History",
         SAVE_AND_CONTINUE:"SAVE AND CONTINUE",
         Edit_Profile:"Edit Profile",
         Apply_Drinks_Filter:"Apply Drinks Filter",
         Sign_Up_with:"Sign Up with",
         First_rounds_on_us_every_day:"First round's on us, every day",
         Bring_your_friends_along_and_their_first_drink_is_on_us_too:"Bring your friends along, and their first drink is on us too.",
         Enjoy_one_free_drink_a_day_at_the_best_bars_in_your_city:"Enjoy one free drink a day at the best bars in your city.",
         Select_Language:"Select Language",
         My_Profile:"My Profile",
         Change_Language:"Change Language",
         enjoy_your_drink_every_day_and_invite_your_friends:"- enjoy your drink every day and invite your friends!",
         Thank_You_For_purchasing:"Thank you for purchasing",
         You_have_earned:"You have earned",
         out_of_6_Month_possible:"out of 6 Month possible.",
         free_Month:"free Month"
        
         
          
        });
        $translateProvider.translations('Deutsche', {
           // hello_message: "Hola",
           // goodbye_message: "Adios"
           /////signup/////////////
          First_Name: "Vorname",
          Last_Name: "Familienname",
          Email_Address:"E-Mail-Addresse",
          Phone_Number_Optional:"Telefonnummer (freiwillig)",
          Optional:"Optional",
          Birthday:"Geburtstag",
          City:"Stadt",
          Gender:"Geschlecht  (freiwillig)",
          Country:"Land",
          Password:"Passwort",
          Confirm_Password:"Bestätige das Passwort",
          SIGN_UP:"Anmelden",
          Already_have_an_account:"Hast du schon ein Konto?",
          Forgot_Password:"Passwort vergessen",
          Sign_In:"Anmelden",
          Field_Required:"Pflichtfeld",
          Invalid_Email_Address:"Ungültige E-Mail-Adresse",
          Male:"Männlich",
          Female:"Weiblich",
          Other:"Andere",
          //////signup/////////////
          ///////Referral code////////
          If_you_got_a_Referral_Code_Please_enter_here:"Wenn du einen Empfehlungscode hast, bitte hier eintragen",
          Apply:"Anwenden",
          If_you_donot_have_a_Referral_Code_click_here_to_continue:"Wenn Sie keinen Empfehlungscode haben, klicken Sie hier, um fortzufahren",
          ///////Referral code////////
           ////////location//////////
           Search_Venue_Name:"Suche Venue Name",
           Search_Venue:"Suche Venue",
           Venues_near_by_me:"Venues in der Nähe von mir",
           Show_All_Cities:"Alle Städte anzeigen",
          ////////location//////////
          ////////citing listing////////
          Enter_Venue_Name:"Geben Sie den Venuenamen ein",
          Recommended_Venues:"Empfohlene Venues",
          Available_Cities:"Verfügbare Städte",
          Show_Venues_near_by_me:"Zeige Venues in der Nähe von mir",
          /////////login///////
          Sign_in_with_email:"Einloggen mit E-Mail",
          SIGN_IN:"EINLOGGEN",
          New_here:"Neu hier?",
          Sign_Up:"Registrieren",
          /////filter/////
          SELECT_VENUES:"WÄHLEN SIE VENUES",
          //////discover/////
          Free_Months:"Konstenlose Monate",
          Earn_A_Free_Month_Now:"Verdiene kostenlose Monate!",
          Your_Code:"Dein Code",
          Invite_your_friends_and_your_friends_will_receive_1_drink_for_free_and_will_pay_only_499_instead_of_999_for_their_first_month_For_every_new_friend_who_becomes_a_member_you_get_1_FREE_MONTH_for_yourself_You_can_earn_up_to_6_Month_for_free_Start_now_inviting_your_friends:"Laden Sie Ihre Freunde ein und Ihre Freunde erhalten 1 Getränk kostenlos und zahlen nur 4,99 € statt 9,99 € für ihren ersten Monat. Für jeden neuen Freund, der Mitglied wird, bekommst du 1 KOSTENLOSER MONAT für Dich. Du kannst bis zu 6 Monate kostenlos verdienen! Beginne jetzt deine Freunde einzuladen!",
          Invite_More_Friends_to_Earn:"Lade weitere Freunde ein, um kostenlose Monate zu verdienen",
          ////////contact us//////
          Select_a_reason:"Wähle einen Grund",
          Customer_Service:"Kundendienst",
          Venue_Partnership:"Venue Partnerschaft",
          Other_Business_Inquiries:"Andere Geschäftsanfragen",
          Message:"Nachricht",
          SUBMIT:"ABSENDEN",
          Name:"Name",
          Email:"Email",
          ///////menu///////
          View_Account:"Konto anzeigen",
          Search_Venues:"Suche Venues",
          Venues_List:"Venues Liste",
          Drink_History:"Eingelöste Getränke",
          Plan_Billing:"Mitgliedschaft & Bezahlung",
          Earn_FREE_Months:"Verdiene KOSTENLOSE Monate",
          Contact_Us:"Kontaktiere uns",
          //////profile/////////
          Member_status:"Mitgliedsstatus",
          Phone_number:"Telefonnummer",
          Edit_Info:"Profil bearbeiten",
          Change_Password:"Passwort ändern",
          SIGN_OUT:"AUSLOGGEN",
          SAVE:"SPAREN",
          /////changepassword////
//         Change_Password:"Passwort ändern",
         Old_Password:"Altes Passwort",
         New_Password:"Neues Passwort",
//         Confirm_Password:"Bestätige das Passwort",
         /////plan and billing////////
         Amount:"Menge",
         Discount:"Rabatt",
         Pay:"Zahlen",
         Apply_Code:"Code anwenden",
         Invite_Code:"Einladungscode",
         Remove_Code:"Code entfernen",
         pay_button:"Bezahle jetzt und erhalten jeden Tag ein kostenloses Getränk",
         /////////rest_detail////
         Get_Direction:"Wegbeschreibung",
         Show_available_free_drinks:"Zeige verfügbare kostenlose Getränke",
         SHOW_ON_MAP:"AUF DER KARTE ZEIGEN",
         About_the_Venue:"AUF DER KARTE ZEIGEN",
         Opening_Hours:"Öffnungszeiten",
         Closing:"Schließen",
         Opening:"Öffnung",
         SUNDAY:"SONNTAG",
         MONDAY:"MONTAG",
         TUESDAY:"DIENSTAG",
         WEDNESDAY:"MITTWOCH",
         THURSDAY:"DONNERSTAG",
         FRIDAY:"FREITAG",
         SATURDAY:"SAMSTAG",
         ADDRESS:"ADRESSE",
         Website:"Webseite",
         Facebook:"Facebook",
         Phone:"Telefon",
         Closed:"Geschlossen",
         CATEGORY:"KATEGORIE",
         ///////mainmenu///////
         Available_Free_Drinks:"Verfügbare kostenlose Getränke",
         //////mainmenu2/////
         Drink_at_the_moment_not_available_Please_choose_another_Drink:"Getränk im Moment nicht verfügbar. Bitte wähle ein anderes Getränk!",
        Select_this_free_drink:"Wähle dieses kostenlose Getränk",
        DESCRIPTION :"BESCHREIBUNG",
        INGREDIENTS:"ZUTATEN",
        Show_this_to_your_Bartender_or_Server_at :"Zeige das dem Barkeeper oder Kellner in ",
        You_have:"Du hast",
        to_Show_This_Screen_to_a_Bartender:"Um diesen Bildschirm einem Barkeeper oder Kellner zu zeigen",
        I_Got_My_Drink:"Ich habe mein Getränk bekommen",
        Confirmation:"Bestätigung",
        Thank_You :"Danke !",
        Drinks_Filter:"Getränke Filter",
        Thank_You_For:"Danke für",
        Subscription:"Abonnement !",
        Drink_History:"Eingelöste Getränke",
        SAVE_AND_CONTINUE:"SPEICHERN UND FORTFAHREN",
        Edit_Profile:"Profil bearbeiten",
        Apply_Drinks_Filter:"Bestätigung Getränke Filte?",
        Sign_Up_with:"Anmelden mit",
        First_rounds_on_us_every_day:"Die erste Runde geht auf uns und das jeden Tag",
        Bring_your_friends_along_and_their_first_drink_is_on_us_too:"Bringen Sie Ihre Freunde mit, und ihr erstes Getränk ist auch auf uns, sobald sie die Boozie App nutzen.",
        Enjoy_one_free_drink_a_day_at_the_best_bars_in_your_city:"Genießen Sie jeden Tag ein kostenloses Getränk in den besten Venues der Stadt.",
        Select_Language:"Sprache auswählen",
        My_Profile:"My Profile",
        Change_Language:"Sprache ändern",
        enjoy_your_drink_every_day_and_invite_your_friends:" Mitgliedschaft - Geniesse Deinen Drink jeden Tag und lade Deine Freunde ein!",
        Thank_You_For_purchasing:"Danke für",
        You_have_earned:"Du hast",
        out_of_6_Month_possible:"6 möglichen kostenlosen Monaten verdient.",
        free_Month:"von"
        
        
          
        
        });
        $translateProvider.preferredLanguage("English");
        $translateProvider.fallbackLanguage("English");
    })
  .directive('hrefInappbrowser', function() {
  return {
    restrict: 'A',
    replace: false,
    transclude: false,
    link: function(scope, element, attrs) {
      var href = attrs['hrefInappbrowser'];

      attrs.$observe('hrefInappbrowser', function(val){
        href = val;
      });
      
      element.bind('click', function (event) {

        window.open(href, '_system', 'location=yes');

        event.preventDefault();
        event.stopPropagation();

      });
    }
  };
});


