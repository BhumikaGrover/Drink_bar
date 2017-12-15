angular.module('app.translate', ['pascalprecht.translate'])
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
          Gender:"Gender",
          Country:"Country",
          Password:"Password",
          Confirm_Password:"Confirm Password",
          SIGN_UP:"SIGN UP",
          Already_have_an_account:"Already have an account",
          Forgot_Password:"Forgot Password",
          Sign_In:"Sign In",
          Field_required:"Field required",
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
         Email:"Email"
        
          
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
          Gender:"Gender",
          Country:"Geschlecht",
          Password:"Passwort",
          Confirm_Password:"Bestätige das Passwort",
          SIGN_UP:"Anmelden",
          Already_have_an_account:"Hast du schon ein Konto",
          Forgot_Password:"Passwort vergessen",
          Sign_In:"Anmelden",
          Field_required:"Pflichtfeld",
          Invalid_Email_Address:"Ungültige E-Mail-Adresse",
          Male:"Männlich",
          Female:"Weiblich",
          Other:"Andere",
          //////signup/////////////
          ///////Referral code////////
          If_you_got_a_Referral_Code_Please_enter_here:"Wenn du einen Empfehlungscode hast, bitte hier eintragen",
          Apply:"Sich bewerben",
          If_you_donot_have_a_Referral_Code_click_here_to_continue:"Wenn Sie keinen Empfehlungscode haben, klicken Sie hier, um fortzufahren",
          ///////Referral code////////
           ////////location//////////
           Search_Venue_Name:"Suche Veranstaltungsort Name",
           Search_Venue:"Suche Veranstaltungsort",
           Venues_near_by_me:"Orte in der Nähe von mir",
           Show_All_Cities:"Alle Städte anzeigen",
          ////////location//////////
          ////////citing listing////////
          Enter_Venue_Name:"Geben Sie den Veranstaltungsortnamen ein",
          Recommended_Venues:"Empfohlene Veranstaltungsorte",
          Available_Cities:"Verfügbare Städte",
          Show_Venues_near_by_me:"Show Locations in der Nähe von mir",
          /////////login///////
          Sign_in_with_email:"Melden Sie sich mit E-Mail",
          SIGN_IN:"ANMELDEN",
          New_here:"Neu hier?",
          Sign_Up:"Anmelden",
          /////filter/////
          SELECT_VENUES:"WÄHLEN SIE VENUES",
          //////discover/////
          Free_Months:"Freie Monate",
          Earn_A_Free_Month_Now:"Verdienen Sie einen freien Monat jetzt!",
          Your_Code:"Dein Code",
          Invite_your_friends_and_your_friends_will_receive_1_drink_for_free_and_will_pay_only_499_instead_of_999_for_their_first_month_For_every_new_friend_who_becomes_a_member_you_get_1_FREE_MONTH_for_yourself_You_can_earn_up_to_6_Month_for_free_Start_now_inviting_your_friends:"Laden Sie Ihre Freunde ein und Ihre Freunde erhalten 1 Getränk kostenlos und zahlen nur 4,99 € statt 9,99 € für ihren ersten Monat. Für jeden neuen Freund, der Mitglied wird, bekommst du 1 KOSTENLOSER MONAT für dich. Sie können bis zu 6 Monate kostenlos verdienen! Beginne jetzt deine Freunde!",
          Invite_More_Friends_to_Earn:"Laden Sie weitere Freunde ein, um zu verdienen",
          ////////contact us//////
          Select_a_reason:"Wähle einen Grund",
          Customer_Service:"Kundendienst",
          Venue_Partnership:"Ort Partnerschaft",
          Other_Business_Inquiries:"Ort Partnerschaft",
          Message:"Nachricht",
          SUBMIT:"EINREICHEN",
          Name:"Name",
          Email:"Email"
          
        
        });
        $translateProvider.preferredLanguage("English");
        $translateProvider.fallbackLanguage("English");
    })