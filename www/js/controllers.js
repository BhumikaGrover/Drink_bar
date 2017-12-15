angular.module('app.controllers', [])
.controller('favoritesCtrl', 
function ($scope, $stateParams,$http,Base_URL,$state,$ionicLoading,$rootScope,$window,$httpParamSerializer,$ionicPopup) {
    $scope.data = {};
 
    
  var app = {
      initialize: function() {
        this.bindEvents();
    },
     bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        
    },
    receivedEvent: function(id) {
       
        app.initPaymentUI();
    },
      initPaymentUI : function () {
      var clientIDs = {
        "PayPalEnvironmentProduction": "Live",
        "PayPalEnvironmentSandbox": "Sandbox"
      };
      PayPalMobile.init(clientIDs, app.onPayPalMobileInit);

    },
       onSuccesfulPayment : function(payment) {
            $ionicLoading.show();
      console.log("payment success: " + JSON.stringify(payment, null, 4));
      // var paymentst = paymentstatus.replace(/\,/g, "");
           //alert(paymentst);
           var paymentid = JSON.stringify(payment.response.id);
           var paymenti = paymentid.replace(/\,/g, "");
          
        
delete $rootScope.coupanused;
      $rootScope.Userid = $window.localStorage.getItem("user_id");
      var data = $httpParamSerializer({
                    userid:$rootScope.Userid,
                    planid:$rootScope.planid,
                    payment_id:paymenti,
                    price:$scope.plan_dis,
                    original_price:$rootScope.plan_price,
                    discount:$rootScope.plan_discount,
                    couponcode:$rootScope.coupan_code,
                    usedtype:$rootScope.type_plan
                    	
                    })
            console.log(data);
            //console.log(Base_URL+'api/users/loginwork');
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'Testapi/planbuy',data)
                .success(function (response)
                {
                    console.log(response);
                    
                    if(response.error == 0){
                         if($rootScope.currentLanguage=="English"){
                        $rootScope.plan_name=response.plandetail[0].SubscriptionPlan.name;
                        console.log($rootScope.plan_name);
                    }else{
                        $rootScope.plan_name=response.plandetail[0].SubscriptionPlan.name_german;
                    }
                         $ionicLoading.hide();
                        $state.go("menu.paymentconfirmation");
                    }else{
                          $ionicLoading.hide();
                         if($rootScope.currentLanguage=="English"){
                         $ionicLoading.hide();
                         var myPopup = $ionicPopup.show({
                          
                          //  title: 'Email Address is not valid',
                          template: "Something going wrong",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             $ionicLoading.hide();
                            var myPopup = $ionicPopup.show({
                          
                          //  title: 'Email Address is not valid',
                          template: "Etwas ist schiefgelaufen",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                    }
                })
      
      
    },
    onCardIOComplete: function(card) {
      console.log("Card Scanned success: " + JSON.stringify(card, null, 4));
    },
    onAuthorizationCallback : function(authorization) {
      console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    createPayment : function () {
      // for simplicity use predefined amount
      // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
              
        
       
              
               if($rootScope.testdata==""){
                   return false;
               }else{
                   var price = $scope.plan_dis; 
                    var paymentDetails = new PayPalPaymentDetails(price);
           var payment = new PayPalPayment(price, "EUR", "Total", "Sale", paymentDetails);
          console.log(paymentDetails);
           console.log(payment);
//      var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale", paymentDetails);
      return payment;
               }
         

    },
    configuration : function () {
      // for more options see `paypal-mobile-js-helper.js`
      var config = new PayPalConfiguration({merchantName: "Heissam", merchantPrivacyPolicyURL: Base_URL+"staticpages/view/3", merchantUserAgreementURL:  Base_URL+"staticpages/view/3"});
      return config;
    },
    onPrepareRender : function() {
         var buyNowBtn = document.getElementById("buyNowBtn");
                  buyNowBtn.onclick = function(e) {
             if($scope.plan_dis <= 0){
                // alert("my");
                 delete $rootScope.coupanused;
      $rootScope.Userid = $window.localStorage.getItem("user_id");
      var data = $httpParamSerializer({
                    userid:$rootScope.Userid,
                    planid:$rootScope.planid,
                    payment_id:"0",
                    price:$scope.plan_dis,
                    original_price:$rootScope.plan_price,
                    discount:$rootScope.plan_discount,
                    couponcode:$rootScope.coupan_code,
                    usedtype:$rootScope.type_plan
                    	
                    })
            console.log(data);
          //  alert(data);
            //console.log(Base_URL+'api/users/loginwork');
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'Testapi/planbuy',data)
                .success(function (response)
                {
                    console.log(response);
                    // alert(response);
                    if(response.error == 0){
                      //  alert(JSON.stringify(response.plandetail));
                         if($rootScope.currentLanguage=="English"){
                        $rootScope.plan_name=response.plandetail[0].SubscriptionPlan.name;
                        console.log($rootScope.plan_name);
                    }else{
                        $rootScope.plan_name=response.plandetail[0].SubscriptionPlan.name_german;
                    }
                    console.log($rootScope.plan_name);
                         $ionicLoading.hide();
                        $state.go("menu.paymentconfirmation");
                    }else{
                          $ionicLoading.hide();
                         if($rootScope.currentLanguage=="English"){
                         $ionicLoading.hide();
                         var myPopup = $ionicPopup.show({
                          
                          //  title: 'Email Address is not valid',
                          template: "Something going wrong",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             $ionicLoading.hide();
                            var myPopup = $ionicPopup.show({
                          
                          //  title: 'Email Address is not valid',
                          template: "Etwas ist schiefgelaufen",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                       // alert(response.msg);
                    }
                })
             }else{
        // single payment
        PayPalMobile.renderSinglePaymentUI(app.createPayment(), app.onSuccesfulPayment, app.onUserCanceled);
      };
         }
    },
    onPayPalMobileInit : function() {
      // must be called
      // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
      PayPalMobile.prepareToRender("PayPalEnvironmentProduction", app.configuration(), app.onPrepareRender);
    },
onUserCanceled : function(result) {
      console.log(result);
    }
      
  };
  app.initialize();
  
          
//               $rootScope.cate_monthly=0;  
//               $rootScope.cate_yearly=0;  
//               console.log($rootScope.cate_monthly,$rootScope.cate_yearly);

           $scope.plans_list=function(){
               
               delete $scope.plan_dis;
               $scope.plan_dis='';
               $rootScope.testdata="";
               
                $ionicLoading.show();
                delete $rootScope.coupanused;
                $rootScope.Userid = $window.localStorage.getItem("user_id");
           var userdata1 = $httpParamSerializer({
                            userid:$rootScope.Userid
                                })
      $http.post(Base_URL+'testapi/codetest',userdata1)
                        .success(function (response)
                        {
                         console.log(response);
                         $rootScope.coupan_used=response.type;
                         console.log($rootScope.coupan_used);
                         $rootScope.coupan_code=response.coupon;
                         console.log($rootScope.coupan_code);
                         console.log(response.type.length);
                          $rootScope.refe_discount=response.discount;
                               console.log($rootScope.refe_discount);
                           $rootScope.category=response.category;
                               console.log($rootScope.category); 
                               
                              if(response.category==0){
                                $rootScope.cate_monthly=1;  
                                $rootScope.cate_yearly=0; 
                                $rootScope.refe_discount_month = response.discount;
                                $rootScope.refe_discount_year=0;
                             }
                             else if(response.category==1){
                               $rootScope.cate_monthly=0;  
                                    $rootScope.cate_yearly=1;
                                    
                                    $rootScope.refe_discount_year = response.discount;
                                $rootScope.refe_discount_month=0;
                             }
                             else{
                                 $rootScope.cate_monthly=1;  
                                 $rootScope.cate_yearly=1;
                                  $rootScope.refe_discount_year = response.discount;
                                $rootScope.refe_discount_month=response.discount;
                             }
                             console.log('simer')
                             console.log(typeof($rootScope.cate_yearly));
                             console.log($rootScope.cate_yearly,$rootScope.cate_monthly);
                               
                         if(response.type.length != 0)
                         {
                             $rootScope.coupanused=0;
                             console.log($rootScope.coupanused);
                         }
                     });
            
             $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
             //alert("location_2")
            
            $http.post(Base_URL+'products/plans')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0){
                $ionicLoading.hide();
                $rootScope.plan_montly=response.data
                console.log($rootScope.plan_montly);
               
              
                   for(j=0;j<2;j++){
                   $rootScope.plan_id=response.data[j].SubscriptionPlan.id
                   console.log(typeof $rootScope.plan_id)
         
               }
               
                 $state.go("menu.favorites");
            }else{
                $ionicLoading.hide();
                
            };
          
       });  
   }

      $scope.planbuy=function(plan_id,price,image,dis,name,discount){

        
          console.log(plan_id,image,dis,name,discount);
          $rootScope.planid=plan_id;
          $rootScope.plan_price=price; 
          $rootScope.planimage=image;
          $scope.plan_dis=parseFloat(dis).toFixed(2);
          
          $rootScope.testdata="abc";
          $rootScope.planname=name;
          $rootScope.plan_discount=discount;
           $rootScope.type_plan="Invite";
          console.log($rootScope.planid);
          console.log($rootScope.planimage);
          console.log($rootScope.planname);
          console.log($scope.plan_dis);
          console.log($rootScope.plan_discount);
          console.log($rootScope.plan_price);
        
       //   $state.go("menu.paymentInformations");
          
       }
        $scope.planbuy1=function(plan_id,price,image,name){          ///////////////simple plan///////
        
          console.log(plan_id,price,image,name);
          $rootScope.planid=plan_id;
          $scope.plan_dis=parseFloat(price).toFixed(2);
          $rootScope.planimage=image;
          $rootScope.planname=name;
          $rootScope.testdata="abc";
          console.log($rootScope.planid);
          console.log($scope.plan_dis);
          console.log($rootScope.planimage);
          console.log($rootScope.planname);
          $rootScope.plan_price= 0;
          $rootScope.plan_discount=0;
          $rootScope.coupan_code='';
          $rootScope.type_plan='';
       //  $state.go("menu.paymentInformations");
          
       }
        $scope.planbuy2=function(plan_id,price,image,dis,name,discount){

        
          console.log(plan_id,image,dis,name,discount);
          $rootScope.planid=plan_id;
          $rootScope.plan_price=price; 
          $rootScope.planimage=image;
          $rootScope.testdata="abc";
          $scope.plan_dis=parseFloat(dis).toFixed(2);
          $rootScope.planname=name;
          $rootScope.plan_discount=discount;
           $rootScope.type_plan="Referral";
          console.log($rootScope.planid);
          console.log($rootScope.planimage);
          console.log($rootScope.planname);
          console.log($scope.plan_dis);
          console.log($rootScope.plan_discount);
          console.log($rootScope.plan_price);
        
       //   $state.go("menu.paymentInformations");
          
       }
       
       
       
       
             ///////////////////////////////removecode///////////////////////////////////////
        $scope.removecode = function(){
         //alert("remove")
               
               
                $ionicLoading.show();
        $rootScope.Userid = $window.localStorage.getItem("user_id");
        var remove = $httpParamSerializer({
                     type:$rootScope.coupan_used,
                     coupon:$rootScope.coupan_code,
                      userid:$rootScope.Userid
                                })
        console.log(remove); 
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
        $http.post(Base_URL+'Testapi/removecode',remove)
                        .success(function (response)
                
                        {
                            $ionicLoading.hide();
                         console.log(response);
        if(response.error == 0){
                          delete $rootScope.coupanused;
        $rootScope.Userid = $window.localStorage.getItem("user_id");
        var userdata1 = $httpParamSerializer({
                        userid:$rootScope.Userid
                                });
                                 $ionicLoading.show();
                                 console.log(userdata1);
      $http.post(Base_URL+'testapi/codetest',userdata1)
                        .success(function (response)
                        {
                             $ionicLoading.hide();
                         console.log(response);
                         $rootScope.coupan_used=response.type;
                         console.log($rootScope.coupan_used);
                         $rootScope.coupan_code=response.coupon;
                         console.log($rootScope.coupan_code);
                           $rootScope.refe_discount=response.discount;
                               console.log($rootScope.refe_discount);
                       //  console.log(response.type.length);
                         if(response.type.length != 0)
                         {
                             $rootScope.coupanused=0;
                             console.log($rootScope.coupanused);
                         }
                     });
            
 
            }
                     });
           
   
   }
  

})

.controller('loginCtrl', function($scope,$http,$rootScope,Base_URL,$state,$ionicLoading,$window,$httpParamSerializer,$ionicPopup,$ionicSideMenuDelegate) {
    
    
    $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
    $scope.data={};
     var deviceInformation = ionic.Platform.device();
        $rootScope.deviceid = deviceInformation.uuid;
     
      console.log($window.localStorage.getItem('face_book'));
     $http.post(Base_URL+'testapi/background')
                        .success(function (response)
                        {
                         console.log(response);
                         $rootScope.Dynam_image=response.data.name;
                         console.log($rootScope.Dynam_image);
                     });
                     
    $scope.login=function(){
FCMPlugin.getToken(function(token){
   // alert(token);
        $ionicLoading.show();
        var data = $httpParamSerializer({
                    email:$scope.data.email,
                    password:$scope.data.password,
                    token:$rootScope.deviceid,
                    device_id:token
                    	
                    })
            console.log(data);
            //console.log(Base_URL+'api/users/loginwork');
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'users/login',data)
                .success(function (response)
                {
                    console.log(response);
                    if(response.status == 3)
                    {
                      //  $ionicLoading.hide();
                    
                        $window.localStorage.setItem("user_id", response.id);
                        $rootScope.Userid = $window.localStorage.getItem("user_id");
                        var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.msg == "Success"){
                             $ionicLoading.hide();
                            //  alert("signIn successfull");
                            console.log(response);
                            $rootScope.User_data = response.data[0].User;
                            console.log($rootScope.User_data);
                            $window.localStorage.setItem("customer_data", response.data[0].User);
                            $rootScope.profilepic= $rootScope.User_data.image;
                            
                            console.log($rootScope.profilepic);
                        $window.localStorage.setItem('count',JSON.stringify(1));           /////for home button

                            $state.go("menu.location");
                         }
                     });
                    } if(response.status == 0){
                         $ionicLoading.hide();
                        if($rootScope.currentLanguage=="English")
                        {
                       
                        var myPopup = $ionicPopup.show({
                          
                            title: 'Email Address is not valid',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title: 'Email Adresse ist nicht gültig',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                        //alert("User is not valid");
                       
                    }
                    if(response.status == 1){
                        $ionicLoading.hide();
                       if($rootScope.currentLanguage=="English") {
                        
                        var myPopup = $ionicPopup.show({
                          
                          title: "You already registered with the email "+response.email +" please not that only one registration per mobile phone is allowed",
                            //template: response.email,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                            title: 'Du bist bereits registriert mit der email ' +response.email+ 'bitte verstehe das nur eine registrierung pro mobile phone erlaubt ist.',
                            // template: response.email,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                       // alert("You are already registered with "+ response.email);
                         
                    }
                    if(response.status == 2){
                        $ionicLoading.hide();
                        if($rootScope.currentLanguage=="English") {
                        var myPopup = $ionicPopup.show({
                          
                            title: 'Your Email Address or Password are incorrect'  ,
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title: 'Ihre E-Mail-Adresse oder Ihr Passwort sind falsch'  ,
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                       // alert(response.msg);
                       
                    }
//                    if(response.status == 3){
//                        alert(response.msg);
//                        $ionicLoading.hide();
//                    }
                });
                      
});
          }; 
        
        })
.controller('signupCtrl', function($scope,$http,Base_URL,$state,$ionicLoading,$httpParamSerializer,$window,$rootScope,$ionicPopup,$translate,$ionicSideMenuDelegate) {
    $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
    $scope.data={};
    
     // $rootScope.currentLanguage='English';
      $rootScope.select_Language=0;
   // console.log($rootScope.currentLanguage);
     $scope.setLang = function(langKey,lan_g) {
        // alert(langKey);
    // You can change the language during runtime
    console.log(lan_g);
    $rootScope.change_lang=lan_g;
    console.log($rootScope.change_lang);
    if(langKey == "English"){
       $rootScope.select_Language=0;
    }else if(langKey == "Deutsche"){
        console.log("")
       $rootScope.select_Language=1;
    }else{
        $rootScope.select_Language=lan_g;
    }
    console.log($rootScope.select_Language)
    $rootScope.select_Language=lan_g
    $translate.use(langKey);
    $rootScope.currentLanguage = $translate.use();
    console.log($translate.use())
  };
    
    $http.get(Base_URL+'users/countryall')  
                        .success(function (response)
                        {
                         console.log(response);
            $scope.countrylist = response.country;
            console.log($scope.countrylist)
                     });
     $http.post(Base_URL+'testapi/background')
                        .success(function (response)
                        {
                         console.log(response);
                         $rootScope.Dynam_image=response.data.name;
                         console.log($rootScope.Dynam_image);
                     });
                     
     
    
    $rootScope.password=$window.localStorage.getItem('fab')
   
    
    var d = new Date();
        $rootScope.min_age = new Date(d.getFullYear()-18);
        console.log($rootScope.min_age);
        
    $scope.signupp=function(){
       console.log($scope.data.lang);
         $rootScope.select_Language=0;
        if($scope.data.lang=="Deutsche"){
             $rootScope.select_Language=1;
        }else{
           $rootScope.select_Language=0;  
        }
       
       // NativeKeyboard.hideKeyboard();
        var deviceInformation = ionic.Platform.device();
        $rootScope.deviceid = deviceInformation.uuid;
       // console.log($rootScope.deviceid );
        //alert($rootScope.deviceid);
FCMPlugin.getToken(function(token){
   // alert(token);
//console.log(token);
        if ($scope.data.password == $scope.data.cpassword) {
           
                /////////////////
                var userAge = new Date($scope.data.dob);
                  var today = new Date();
                  var age = today.getFullYear() - userAge.getFullYear();
                  var month = today.getMonth() - userAge.getMonth();

                  if (month < 0 || (month === 0 && today.getDate() < userAge.getDate())) {
                      age--;
                   } //this condition checks the month/date difference of both the dates 
                  console.log(age);
        
                  if(age > 18 || age == 18){
                    //registration
                  
                               /////////////////
          
            
        $ionicLoading.show();
        console.log($rootScope.select_Language);
         var data  = $httpParamSerializer({
             language:$rootScope.select_Language,
                name: $scope.data.fullname,
                last_name:$scope.data.Lastname,
                phone: $scope.data.phone,
                email: $scope.data.email,
                password: $scope.data.password,
                dob:$scope.data.dob,
                country:$scope.data.country,
                gender:$scope.data.gender,
                city:$scope.data.City,
                token:$rootScope.deviceid,
                device_id:token
           });
        
         console.log(data);
         
      //  console.log(language);
        //alert(data;
       $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
         
        $http.post(Base_URL+'users/registration', data)
                .success(function (response)
                {
                    console.log(response);
                    
                    if(response.status == 3)
                    {
                       ///////////login/////////////////
                    console.log(response.msg);
                var data = $httpParamSerializer({
                    email:$scope.data.email,
                    password:$scope.data.password,
                     token:$rootScope.deviceid,
                device_id:token
                    })
               
                    console.log(data);
        $http.post(Base_URL+'users/login',data)
                .success(function (response)
                {
                    console.log(response);
                    if(response.status == 3)
                    {
                        //$ionicLoading.hide();
                       // alert(response.msg);
                        console.log(response.msg);
                        $window.localStorage.setItem("user_id", response.id);
                        $rootScope.Userid = $window.localStorage.getItem("user_id");
                        console.log($rootScope.Userid);
                        var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.msg == "Success"){
                            // alert("signIn successfull");
                             $ionicLoading.hide();
                            console.log(response);
                            $rootScope.User_data = response.data[0].User;
                            console.log($rootScope.User_data);
                             $window.localStorage.setItem("customer_data", response.data[0].User);
                            $rootScope.profilepic= $rootScope.User_data.image
                            console.log($rootScope.profilepic);
                            $window.localStorage.setItem('count',JSON.stringify(1));
                            $state.go("menu.location");
                            
                         }
                     }); 
                  }
              });
          }
                  
                //  else{
//                        $ionicLoading.hide();
//                        alert(response.msg);
//                        $state.go("menu.signup");
//                    }
                    if(response.status == 0){
                        
                        
                        $ionicLoading.hide();
                        if($rootScope.currentLanguage=="English") {
                        var myPopup = $ionicPopup.show({
                          
                            title: 'The email ' + $scope.data.email + ' is already registered with another device',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                            title: 'Die Email ' + $scope.data.email + 'Ist bereits bei einem anderen Gerät registriert',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                        //alert("User is not valid");
                       
                    }
                    if(response.status == 1){
                        $ionicLoading.hide();
                        if($rootScope.currentLanguage=="English") {
                        
                        var myPopup = $ionicPopup.show({
                          
                            title: "You already registered with the email "+response.email +" please not that only one registration per mobile phone is allowed",
                           // template: response.email,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                            title: 'Du bist bereits registriert mit der email ' +response.email+ ' bitte verstehe das nur eine registrierung pro mobile phone erlaubt ist.',
                            template: response.email,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                       // alert("You are already registered with "+ response.email);
                         
                    }
                    if(response.status == 2){
                        $ionicLoading.hide();
                        if($rootScope.currentLanguage=="English") {
                        var myPopup = $ionicPopup.show({
                          
                            title: 'Your Email Address or Password are incorrect'  ,
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title: 'Ihre E-Mail-Adresse oder Ihr Passwort sind falsch'  ,
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                       // alert(response.msg);
                       
                    }
//                    if(response.status == 3){
//                        alert(response.msg);
//                        $ionicLoading.hide();
//                    }
                
                       /////////////////login////////////////
            
                });
                
                
                ////////////////////////////////////
                } else {
                   // alert("underage");
                   if($rootScope.currentLanguage=="English") {
                      var myPopup = $ionicPopup.show({
                          
                            title: 'Birthday Error',
                            template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title: 'Geburtstagsfehler',
                            template: "Du musst 18 oder älter sein, um Boozie zu benutzen.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                    //underage
                  }
            
        }else{
               // alert("Password Mismatch");
                if($rootScope.currentLanguage=="English") {
                 var myPopup = $ionicPopup.show({
                          
                            title: 'Password Mismatch',
                          //  template: "Password Mismatch",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title: 'Die Passwörter stimmen nicht überein',
                          //  template: "Password Mismatch",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
            }
        
 }); 
        }
         $scope.facebookSignIn_signuo = function() {
       var deviceInformation = ionic.Platform.device();
        $rootScope.deviceid = deviceInformation.uuid;
       // alert($rootScope.deviceid);
   facebookConnectPlugin.login(["public_profile","email"], fbLoginSuccess,
function loginError (error) {
alert(JSON.stringify(error))
console.log(JSON.stringify(error));
});
  };
//////////////////////////////
var fbLoginSuccess = function(successdata) {
 //alert("my");
  console.log(successdata);
 // alert(JSON.stringify(successdata))
//alert("hello");
//facebookConnectPlugin.api('/me?fields=id,email,name,birthday,locale,age_range,gender,first_name,last_name&access_token=' + successdata.authResponse.accessToken, ['email','public_profile'],
facebookConnectPlugin.api('/me?fields=id,email,name,birthday,locale,age_range,gender,first_name,last_name&access_token=' + successdata.authResponse.accessToken, ['email','public_profile'],
function(profileresponse) {

console.log(profileresponse);
console.log(profileresponse.email+"msk");
if(profileresponse.birthday!=null){
 var birthday  = profileresponse.birthday;
 //alert(birthday+"my")
 console.log(birthday+"my")
}else{
    var birthday  = profileresponse.birthday; 
    
   
}
if(profileresponse.age_range!=null){
 var age1  = profileresponse.age_range;
 var age2  = profileresponse.age_range.min;
 //alert(birthday+"my")
 console.log(age1+"age1");
 console.log(age2+"age2");
}else{
    var age2  = profileresponse.age_range.min; 
    console.log(age2);
   
}

if(profileresponse.gender!=null){
 var gender  = profileresponse.gender;
 console.log(gender+"gender")
}else{
    var gender  = ""; 
    console.log(gender+"gender1")
}
if(profileresponse.first_name!=null){
 var first_name  = profileresponse.first_name;
 console.log(first_name+"first_name")
}else{
    var first_name  = ""; 
    console.log(first_name+"first_name1")
}
if(profileresponse.last_name!=null){
 var last_name  = profileresponse.last_name;
 console.log(last_name+"last_name")
}else{
    var last_name  = ""; 
    console.log(last_name+"last_name1")
}
if(profileresponse.hometown!=null){
 var hometown  = profileresponse.hometown;
 console.log(hometown+"hometown")
}else{
    var hometown  = ""; 
    
}
if(age2 == undefined){
    if($rootScope.currentLanguage=="English") {
     var myPopup = $ionicPopup.show({
                          
                            title: 'Birthday not found on facebook account.',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $scope.fblogout();
                            }}
                            ]
                            });
                        }else{
                           var myPopup = $ionicPopup.show({
                          
                            title: 'Geburtstag nicht auf Facebook Konto gefunden.',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $scope.fblogout();
                            }}
                            ]
                            }); 
                        }
   // alert("birthday invalid");
   $scope.fblogout=function(){
      facebookConnectPlugin.logout(function(){
                    $ionicLoading.hide();
                    console.log('log out successfully')
                    $window.localStorage.removeItem("user_id");
        delete $rootScope.User_data;
          $window.localStorage.clear();
          $ionicHistory.clearCache();
           $ionicHistory.clearHistory();
        
                  },
                  function(fail){
                      console.log('failed')
                    $ionicLoading.hide();
                  });
              }
}else{
//    var userAge = new Date(birthday);
//                  var today = new Date();
//                  var age = today.getFullYear() - userAge.getFullYear();
//                  var month = today.getMonth() - userAge.getMonth();
//
//                  if (month < 0 || (month === 0 && today.getDate() < userAge.getDate())) {
//                      age--;
//                   } //this condition checks the month/date difference of both the dates 
//                  console.log(age);
        
//                  if(age > 18 || age == 18){
                       if(age2 > 18 || age2 == 18){
$rootScope.profilepicface="https://graph.facebook.com/"+profileresponse.id+"/picture?type=large"
$window.localStorage.setItem('profilepic',$rootScope.profilepicface);
$rootScope.profilepic =$window.localStorage.getItem('profilepic');
FCMPlugin.getToken(
 function(token){
//     $scope.data.city="";
//     $scope.data.lastname="";
//     $scope.data.country="";
//     $scope.data.gender="";
//     $scope.data.dob="";

     var facebkdata= $httpParamSerializer({
    facebook_id: profileresponse.id,
    name: first_name,
    email: profileresponse.email,
    image:$rootScope.profilepic,
    token:$rootScope.deviceid,
    city:hometown,
    last_name:last_name,
    country: null,
    gender: gender,
    dob:birthday,
    device_id:token
    

    });
    console.log(facebkdata);
  $ionicLoading.show();
 
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(Base_URL+'users/fblogin',  facebkdata)
        .then(function(dataresponse) { 
// alert("lllll");
//lert(JSON.stringify(dataresponse));
//alert(JSON.stringify(dataresponse.data));
console.log(dataresponse.data);
$ionicLoading.hide();
if(dataresponse.data.status == 3){
    $ionicLoading.hide();
////$window.localStorage.setItem('User_Data', JSON.stringify(dataresponse.data));
$window.localStorage.setItem('user_id', dataresponse.data.data.User.id);
$rootScope.User_data = dataresponse.data.data.User;
console.log($rootScope.User_data);
     $window.localStorage.setItem('face_book',JSON.stringify(1));
     $window.localStorage.setItem('count',JSON.stringify(1));
    // console.log($window.localStorage.getItem('face_book'));
//alert($rootScope.User_data);
//$window.localStorage.setItem('loginstatus', "1"); 
//$rootScope.userd=JSON.stringify(dataresponse.data.data.User.id);
//    alert($rootScope.userd);

                if(dataresponse.data.data.User.is_complete == 0){
$state.go('menu.editfacebook');
}else{
    $state.go('menu.location');
}
}
if(dataresponse.data.status  == 0){
                        
                        if($rootScope.currentLanguage=="English") {
                        $ionicLoading.hide();
                        var myPopup = $ionicPopup.show({
                          
                            title: 'The email ' + profileresponse.email + ' is already registered with another device',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                           // $scope.fblogout();
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title: 'Die Email ' + profileresponse.email + ' Ist bereits bei einem anderen Gerät registriert',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                           // $scope.fblogout();
                            }}
                            ]
                            });
                        }
                        //alert("User is not valid");
                       
                    }
                    if(dataresponse.data.status  == 1){
                        $ionicLoading.hide();
                        if($rootScope.currentLanguage=="English") {
                        
                        var myPopup = $ionicPopup.show({
                          
                            title: "You already registered with the email "+ dataresponse.data.email +" please not that only one registration per mobile phone is allowed",
                           // template: response.email,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                            title: 'Du bist bereits registriert mit der email ' + dataresponse.data.email+ ' bitte verstehe das nur eine registrierung pro mobile phone erlaubt ist.',
                          //  template: response.email,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                       // alert("You are already registered with "+ response.email);
                         
                    }
                    if(dataresponse.data.status  == 2){
                        $ionicLoading.hide();
                        if($rootScope.currentLanguage=="English") {
                        var myPopup = $ionicPopup.show({
                          
                            title: 'Your Email Address or Password are incorrect'  ,
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                           // $scope.fblogout();
                            }}
                            ]
                            });
                       // alert(response.msg);
                       
                }else{
                    var myPopup = $ionicPopup.show({
                          
                            title: 'Ihre E-Mail-Adresse oder Ihr Passwort sind falsch'  ,
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                           // $scope.fblogout();
                            }}
                            ]
                            });
                }
            };
      
}, function errorCallback(error){
//  alert(JSON.stringify(error))  
});
// } ,
//function(errorres) {
//console.log(response);
//info.reject(response);
//}
//);
 
 })
                  }else{
                      if($rootScope.currentLanguage=="English") {
                      var myPopup = $ionicPopup.show({
                          
                           title: 'Birthday Error',
                            template: "You must be 18 or older to use Boozie.",
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $scope.fblogout();
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           title: 'Geburtstagsfehler',
                            template: "Du musst 18 oder älter sein, um Boozie zu benutzen.",
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $scope.fblogout();
                            }}
                            ]
                            }); 
                        }
                      $scope.fblogout=function(){
                      facebookConnectPlugin.logout(function(){
                    $ionicLoading.hide();
                    console.log('log out successfully')
                    $window.localStorage.removeItem("user_id");
        delete $rootScope.User_data;
          $window.localStorage.clear();
          $ionicHistory.clearCache();
           $ionicHistory.clearHistory();
        
                    //$ionicHistory.clearCache();
                    //$ionicHistory.clearHistory();
                   // console.log($rootScope.cartItemsCount+'hfgh')
                   // $rootScope = $rootScope.$new(true);
                    //console.log($rootScope.cartItemsCount)
                    // $state.go('welcome');
                   // $state.go("signin",{},{reload:true});
                  },
                  function(fail){
                      console.log('failed')
                    $ionicLoading.hide();
                  });
              }
                      //alert("below 18 year");
                  }
 }
});

};
      
        
    }) 
.controller('forgotPasswordCtrl', function($scope,$http,Base_URL,$state,$httpParamSerializer,$ionicLoading,$rootScope,$window,$ionicPopup) {
                    $scope.data = {};
            $scope.forgot_password=function(){
               // alert("forgot_password");
                 $rootScope.Userid = $window.localStorage.getItem("user_id");
            console.log($scope.data.email);
           var User= $httpParamSerializer({
                username:$scope.data.email
                })
            $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';  
            $http.post(Base_URL+"users/forgetpwd", User).then(function (res){
            $scope.response = res.data;
            console.log($scope.response);
            if(res.data.isSucess == 0){
            $ionicLoading.hide();
             if($rootScope.currentLanguage=="English") {
            var myPopup = $ionicPopup.show({
                          
                           // title: 'Password Mismatch',
                           template: "Check your Email to reset your password",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                              $state.go("menu.login");
                            }}
                            ]
                            });
           // alert(res.data.msg); 
          
                    }else{
                        var myPopup = $ionicPopup.show({
                          
                           // title: 'Password Mismatch',
                           template: "Überprüfen Sie Ihre E-Mail, um Ihr Passwort zurückzusetzen",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                              $state.go("menu.login");
                            }}
                            ]
                            });
                    }
                }
                if(res.data.isSucess == 1){
              
            $ionicLoading.hide();  
            if($rootScope.currentLanguage=="English") {
            var myPopup = $ionicPopup.show({
                          
                           // title: 'Password Mismatch',
                           template: "Email id not exist",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                           // title: 'Password Mismatch',
                           template: "E-Mail-ID existiert nicht",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
          //  alert(res.data.msg);  
          }else{
               if($rootScope.currentLanguage=="English") {
              var myPopup = $ionicPopup.show({
                           template: "Error Generating Reset link. Please try Again. ",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                           template: "Fehler beim Erstellen des Reset-Links. Bitte versuche es erneut. ",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
          }
        });
    }
})


.controller('changepasswordCtrl', function($scope,$http,$ionicLoading,Base_URL,$httpParamSerializer,$window,$rootScope,$ionicPopup,$state) {
    $scope.data={};
    console.log( $scope.data);
    $scope.change_password=function(){
        //alert("change_password");
        if ($scope.data.password == $scope.data.cpassword) {
        $rootScope.Userid = $window.localStorage.getItem("user_id");
         console.log( $scope.data);
          var User= $httpParamSerializer({
               username:$rootScope.Userid,
               old_password:$scope.data.oldpassword,
               new_password:$scope.data.password
                })
                console.log(User);
                
            $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';  
            $http.post(Base_URL+"users/changepasswordwork", User).then(function (response){
            
            console.log(response.data);
            if(response.data.isSucess == "true"){
                $ionicLoading.hide();
                 if($rootScope.currentLanguage=="English") {
                  var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "Password updated successfully",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                              $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "Passwort erfolgreich aktualisiert",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                              $state.go('menu.profile');
                            }}
                            ]
                            }); 
                        }
                
                
            }else{
                 $ionicLoading.hide();
                if($rootScope.currentLanguage=="English") {
                  var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "Your old password did not match.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "Ihr altes Passwort stimmt nicht überein.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
               
                
            }
            
        });
        }else{
            if($rootScope.currentLanguage=="English") {
            var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "Password Mismatch",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "Die Passwörter stimmen nicht überein",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
            
            
        }
    }
    

})

.controller('locationCtrl', function($scope,$http,$rootScope,$state,Base_URL,$cordovaGeolocation,$ionicLoading,$httpParamSerializer,$window,$ionicPopup,$translate) {
    $scope.data={};
    //$rootScope.currentLanguage='English';
    console.log($state.current.name);
    $rootScope.state = $state.current.name;
     console.log($window.localStorage.getItem('face_book'));
    $rootScope.face_book=$window.localStorage.getItem('face_book');
    
     $rootScope.Userid = $window.localStorage.getItem("user_id");
     $window.localStorage.setItem("uu",0);
      $rootScope.veanu_hide=$window.localStorage.getItem("uu");
      console.log($rootScope.veanu_hide);
      $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
     console.log($rootScope.Userid);
     $http.post(Base_URL+'testapi/background')
                        .success(function (response)
                        {
                         console.log(response);
                         $rootScope.Dynam_image=response.data.name;
                         console.log($rootScope.Dynam_image);
     var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.msg == "Success"){
                             $ionicLoading.hide();
                            //  alert("signIn successfull");
                            console.log(response);
                            $rootScope.User_data = response.data[0].User;
                            $rootScope.plan_disc = response.data[0].User.latest_plan;
                            if($rootScope.change_lang != 7){
                            if(response.data[0].User.language == "0"){
                                 $rootScope.currentLanguage =$translate.use("English");
                                 $rootScope.currentLanguage='English';
                                 console.log($rootScope.currentLanguage);
                            }else{
                                $rootScope.currentLanguage =$translate.use("Deutsche");
                                $rootScope.currentLanguage='Deutsche';
                                console.log($rootScope.currentLanguage);
                            }
                        }
                            $window.localStorage.setItem("customer_data", response.data[0].User);
                            $rootScope.profilepic= $rootScope.User_data.image;
                            $rootScope.shw_plan = response.data[0].User.latest_plan;
     
       console.log($rootScope.shw_plan);
       if($rootScope.shw_plan == "0"){
       console.log("trail"); 
       if($rootScope.currentLanguage == "English"){
       $scope.status = "No active membership";
   }else{
        $scope.status = "Keine aktive Mitgliedschaft"
   }
       console.log( $scope.trail);
       }else if($rootScope.shw_plan == "2"){
           if($rootScope.currentLanguage == "English"){
            console.log("asd");  
       $scope.status = "Yearly";
   }else{
       $scope.status = "Jährlich";
   }
       }else{
           if($rootScope.currentLanguage == "English"){
          $scope.status = "Monthly"; 
      }else{
           $scope.status = "Monatlich"; 
      }
       }
                      
                        }
                    })
  })
  //////////////////////////////////////////////////////////////////////////////
    $scope.search =function(){
        $rootScope.searchforfilter=0;
        console.log($rootScope.searchforfilter);
        var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat_set = position.coords.latitude;
            $rootScope.long_set = position.coords.longitude;
            console.log($rootScope.lat_set,$rootScope.long_set);
            //$scope.coords = position.coords;
            $window.localStorage.setItem('lat',$rootScope.lat_set);
            $window.localStorage.setItem('long',$rootScope.long_set);
      
        if($scope.data.city){
//      var   cityname = $scope.data.city.formatted_address.split(',');
//         
//         console.log(cityname[0]);
          $ionicLoading.show();
         //$rootScope.formatted_address=cityname[0];
//        $http.post('https://maps.googleapis.com/maps/api/geocode/json?address=(' + $rootScope.formatted_address + ')').success(function (response) {
//
//        }).success(function(rest) 
//        {
            //console.log(rest);
            $rootScope.lat= $rootScope.lat_set;
            $rootScope.long = $rootScope.long_set;
            console.log($rootScope.lat);
            console.log($rootScope.long);
            console.log($scope.data.city);
            $rootScope.searchbynamer=$scope.data.city;
           // $window.localStorage.setItem('lat_serach',$rootScope.lat_serach);
           // $window.localStorage.setItem('long_search',$rootScope.long_serach);
           // if(rest.status == "OK"){
            var loaction = $httpParamSerializer({
                        latitude: $rootScope.lat, 
                        longitude: $rootScope.long,
                        name:$scope.data.city
                    })
                             
            console.log(loaction);
            $http.post(Base_URL+'restaurants/searchbynameresturent', loaction)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSuccess ==  "true")
            {
                $ionicLoading.hide();
                $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                 $window.localStorage.setItem('count',JSON.stringify(0));           /////for home button
               
                ///////Drink Filter///////
                $http.post(Base_URL+'restaurants/getalltype')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSuccess == "true"){
                $rootScope.Drink_filter= response.data;
                console.log($rootScope.Drink_filter);
               
            }else{
                
            }
            
            $http.post(Base_URL+'testapi/getallcity')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0){
                $rootScope.all_city=response.data
                console.log($rootScope.all_city);
            }
                    });
            
            
                        var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.msg == "Success"){
                             $ionicLoading.hide();
                            //  alert("signIn successfull");
                            console.log(response);
                            $rootScope.User_data = response.data[0].User;
                            console.log($rootScope.User_data);
                            $rootScope.profilepic= $rootScope.User_data.image
                            console.log($rootScope.profilepic);
                        };
                       
                        })
                   
                        
                   
        })
         $state.go("menu.nearestRestaurants");
        //////////////////////////////////
            }else{
                $ionicLoading.hide();
                 if($rootScope.currentLanguage=="English") {
                 var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "There are no Boozie venues near you. Soon you will find Boozie venues to a city near you.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "Es gibt aktuell keine Boozie Venues in Ihrer Nähe. Bald finden Sie Boozie Venues in einer Stadt in Ihrer Nähe.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                //alert("no venues around you ");
               // $state.go("menu.location");
            }
                    })
//            }else{
//                $ionicLoading.hide();
//                alert("location not found");
//            }
          //  }); 
        }else{
            if($rootScope.currentLanguage=="English") {
            var myPopup = $ionicPopup.show({
                          
                           // title: 'Password Mismatch',
                            template: "Fill the venue name",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           // title: 'Password Mismatch',
                            template: "Füllen Sie den Venue Namen aus",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            }); 
                        }
                            
        };
    },
     function(err) {
          if($rootScope.currentLanguage=="English") {
                                    
                                    var fav_lis11 = $ionicPopup.show({
                             title:"Please allow BOOZIE to access your location, so that we can show Venues near you",
                        // subTitle: '<p>you already submitted a review for this order</p>',
                             cssClass: 'value_sec',
                             scope: $scope,
                            buttons: [
                             { text: '<span class="oky">Okay</span>',
                              onTap: function(e) {
                             
                                            }}
                                        ]
                                      });
                                  }else{
                                      var fav_lis11 = $ionicPopup.show({
                             title:"Bitte erlaube BOOZIE auf deinen Standort zuzugreifen, damit wir dir Venues in deiner Nähe zeigen können.",
                        // subTitle: '<p>you already submitted a review for this order</p>',
                             cssClass: 'value_sec',
                             scope: $scope,
                            buttons: [
                             { text: '<span class="oky">Okay</span>',
                              onTap: function(e) {
                             
                                            }}
                                        ]
                                      });
                                  }
                                   // alert(JSON.stringify(err));
      // error
    } 
            );
        };
             $scope.geo_loaction=function(){
            $rootScope.searchforfilter=1;
            console.log($rootScope.searchforfilter);
        //  alert("location");
          delete $rootScope.formatted_address;
          // alert("n");
            var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat = position.coords.latitude;
            $rootScope.long = position.coords.longitude;
            //$scope.coords = position.coords;
            $window.localStorage.setItem('lat',$rootScope.lat);
            $window.localStorage.setItem('long',$rootScope.long);
            
            $rootScope.latitude_first= $rootScope.lat;
            $rootScope.longitude_first= $rootScope.long;
            var loaction = $httpParamSerializer({
                        latitude: $rootScope.lat, 
                        longitude: $rootScope.long
                                });
                          
            console.log(loaction);
            $ionicLoading.show();
            $http.post(Base_URL+'restaurants/restaurantslist', loaction)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSuccess ==  "true")
            {
               // $ionicLoading.hide();
                $rootScope.resturant_list = response.data.Restaurant;
                $window.localStorage.setItem('count',JSON.stringify(0));
                console.log($rootScope.resturant_list);
                            $rootScope.clat =  $rootScope.lat;
                            $rootScope.clong = $rootScope.long;
                                    console.log($rootScope.clat);
                                    console.log($rootScope.clong);
			var link = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+$rootScope.clat+','+$rootScope.clong+'&key=AIzaSyBQrWZPh0mrrL54_UKhBI2_y8cnegeex1o';
                            $http.post(link).success(function(response) {
                            console.log(response);
                            //document.getElementById('place').innerHTML= res[3];
                             cityname = response.results[0].address_components[3].long_name;
                        console.log(cityname);
                         $ionicLoading.hide();
                    $rootScope.formatted_address =cityname; 
                    $state.go("menu.nearestRestaurants");
                     $http.post(Base_URL+'restaurants/getalltype')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSuccess == "true"){
                $rootScope.Drink_filter= response.data;
                console.log($rootScope.Drink_filter);
            }else{
                
            }
            $http.post(Base_URL+'testapi/getallcity')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0){
                $rootScope.all_city=response.data;
                console.log($rootScope.all_city);
            };
                    });
       
                  
                var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.msg == "Success"){
                             $ionicLoading.hide();
                            //  alert("signIn successfull");
                            console.log(response);
                            $rootScope.User_data = response.data[0].User;
                            console.log($rootScope.User_data);
                            $rootScope.profilepic= $rootScope.User_data.image
                            console.log($rootScope.profilepic);
                        }
                     })  
                            })
                              })
            }else{
                 $ionicLoading.hide();
           
                if($rootScope.currentLanguage=="English") {
                var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "There are no Boozie venues near you. Soon you will find Boozie venues to a city near you.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                              $state.go("menu.location");
                            }}
                            ]
                            });
               // alert("no venues around you" );
               
                $state.go("menu.location");
            }else{
                var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "Es gibt aktuell keine Boozie Venues in Ihrer Nähe. Bald finden Sie Boozie Venues in einer Stadt in Ihrer Nähe..",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                              $state.go("menu.location");
                            }}
                            ]
                            });
            }
            }
                    })
                },  function(err) {
          if($rootScope.currentLanguage=="English") {
                                    
                                    var fav_lis11 = $ionicPopup.show({
                             title:"Please allow BOOZIE to access your location, so that we can show Venues near you",
                        // subTitle: '<p>you already submitted a review for this order</p>',
                             cssClass: 'value_sec',
                             scope: $scope,
                            buttons: [
                             { text: '<span class="oky">Okay</span>',
                              onTap: function(e) {
                             
                                            }}
                                        ]
                                      });
                                  }else{
                                      var fav_lis11 = $ionicPopup.show({
                             title:"Bitte erlaube BOOZIE auf deinen Standort zuzugreifen, damit wir dir Venues in deiner Nähe zeigen können.",
                        // subTitle: '<p>you already submitted a review for this order</p>',
                             cssClass: 'value_sec',
                             scope: $scope,
                            buttons: [
                             { text: '<span class="oky">Okay</span>',
                              onTap: function(e) {
                             
                                            }}
                                        ]
                                      });
                                  }
                                   // alert(JSON.stringify(err));
      // error
    } );
        }
        $scope.geo_loaction1=function(){
              $rootScope.searchforfilter=2;
            console.log($rootScope.searchforfilter);
        //  alert("location");
          delete $rootScope.formatted_address;
          // alert("n");
            var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat = position.coords.latitude;
            $rootScope.long = position.coords.longitude;
            //$scope.coords = position.coords;
            $window.localStorage.setItem('lat',$rootScope.lat);
            $window.localStorage.setItem('long',$rootScope.long);
            var loaction = $httpParamSerializer({
                        latitude: $rootScope.lat, 
                        longitude: $rootScope.long
                                });
                          
            console.log(loaction);
            $ionicLoading.show();
            $http.post(Base_URL+'restaurants/restaurantslist', loaction)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSuccess ==  "true")
            {
               // $ionicLoading.hide();
                $rootScope.resturant_list = response.data.Restaurant;
                $window.localStorage.setItem('count',JSON.stringify(0));
                console.log($rootScope.resturant_list);
                            $rootScope.clat =  $rootScope.lat;
                            $rootScope.clong = $rootScope.long;
                                    console.log($rootScope.clat);
                                    console.log($rootScope.clong);
			var link = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+$rootScope.clat+','+$rootScope.clong+'&key=AIzaSyBQrWZPh0mrrL54_UKhBI2_y8cnegeex1o';
                            $http.post(link).success(function(response) {
                            console.log(response);
                            //document.getElementById('place').innerHTML= res[3];
                             cityname = response.results[0].address_components[3].long_name;
                        console.log(cityname);
                         $ionicLoading.hide();
                    $rootScope.formatted_address =cityname; 
                    $state.go("menu.nearestRestaurants");
                     $http.post(Base_URL+'restaurants/getalltype')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSuccess == "true"){
                $rootScope.Drink_filter= response.data;
                console.log($rootScope.Drink_filter);
            }else{
                
            }
            $http.post(Base_URL+'testapi/getallcity')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0){
                $rootScope.all_city=response.data;
                console.log($rootScope.all_city);
            };
                    });
       
                  
                var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.msg == "Success"){
                             $ionicLoading.hide();
                            //  alert("signIn successfull");
                            console.log(response);
                            $rootScope.User_data = response.data[0].User;
                            console.log($rootScope.User_data);
                            $rootScope.profilepic= $rootScope.User_data.image
                            console.log($rootScope.profilepic);
                        }
                     })  
                            })
                              })
            }else{
                $ionicLoading.hide();
                 if($rootScope.currentLanguage=="English") {
                var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "There are no Boozie venues near you. Soon you will find Boozie venues to a city near you.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                              $state.go("menu.location");
                            }}
                            ]
                            });
               // alert("no venues around you" );
                
                $state.go("menu.location");
            }else{
                 var myPopup = $ionicPopup.show({
                          
                          //  title: 'There are no Boozie venues near you. ',
                            template: "Es gibt aktuell keine Boozie Venues in Ihrer Nähe. Bald finden Sie Boozie Venues in einer Stadt in Ihrer Nähe.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                              $state.go("menu.location");
                            }}
                            ]
                            });
            }
        }
                    })
                },
                function(err) {
          if($rootScope.currentLanguage=="English") {
                                    
                                    var fav_lis11 = $ionicPopup.show({
                             title:"Please allow BOOZIE to access your location, so that we can show Venues near you",
                        // subTitle: '<p>you already submitted a review for this order</p>',
                             cssClass: 'value_sec',
                             scope: $scope,
                            buttons: [
                             { text: '<span class="oky">Okay</span>',
                              onTap: function(e) {
                             
                                            }}
                                        ]
                                      });
                                  }else{
                                      var fav_lis11 = $ionicPopup.show({
                             title:"Bitte erlaube BOOZIE auf deinen Standort zuzugreifen, damit wir dir Venues in deiner Nähe zeigen können.",
                        // subTitle: '<p>you already submitted a review for this order</p>',
                             cssClass: 'value_sec',
                             scope: $scope,
                            buttons: [
                             { text: '<span class="oky">Okay</span>',
                              onTap: function(e) {
                             
                                            }}
                                        ]
                                      });
                                  }
                                   // alert(JSON.stringify(err));
      // error
    } );
        }
        
        $scope.allcities=function(){
            $rootScope.searchforfilter=2;
            console.log($rootScope.searchforfilter);
             var posOptions = {timeout: 10000, enableHighAccuracy: true};
            $cordovaGeolocation
            .getCurrentPosition(posOptions)
           
            .then(function (position) {
               // alert("location1");
            $rootScope.lat = position.coords.latitude;
            $rootScope.long = position.coords.longitude;
            //$scope.coords = position.coords;
          
            $window.localStorage.setItem('lat',$rootScope.lat);
            $window.localStorage.setItem('long',$rootScope.long);
            
             $ionicLoading.show();
             $http.post(Base_URL+'testapi/getallcity')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error== 0){
                $ionicLoading.hide();              
                $rootScope.all_city = response.data;
                $state.go("menu.citylisting");
                  $http.post(Base_URL+'restaurants/getalltype')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSuccess == "true"){
                $rootScope.Drink_filter= response.data;
                console.log($rootScope.Drink_filter);
            }else{
                
            }
                    });
            }else{
                $ionicLoading.hide();
                
            }
                    });
                }, function(err) {
          if($rootScope.currentLanguage=="English") {
                                    
                                    var fav_lis11 = $ionicPopup.show({
                             title:"Please allow BOOZIE to access your location, so that we can show Venues near you",
                        // subTitle: '<p>you already submitted a review for this order</p>',
                             cssClass: 'value_sec',
                             scope: $scope,
                            buttons: [
                             { text: '<span class="oky">Okay</span>',
                              onTap: function(e) {
                             
                                            }}
                                        ]
                                      });
                                  }else{
                                      var fav_lis11 = $ionicPopup.show({
                             title:"Bitte erlaube BOOZIE auf deinen Standort zuzugreifen, damit wir dir Venues in deiner Nähe zeigen können.",
                        // subTitle: '<p>you already submitted a review for this order</p>',
                             cssClass: 'value_sec',
                             scope: $scope,
                            buttons: [
                             { text: '<span class="oky">Okay</span>',
                              onTap: function(e) {
                             
                                            }}
                                        ]
                                      });
                                  }
                                   // alert(JSON.stringify(err));
      // error
    } 
                        )
                    
        }
        
        
    })

  
  
.controller('editinfoCtrl', function($scope,$httpParamSerializer,$http,Base_URL,$rootScope,$window,$ionicPopup,$ionicLoading,$cordovaCamera,$state,$translate) {
      $scope.data={};
        $http.get(Base_URL+'users/countryall')  
                        .success(function (response)
                        {
                         console.log(response);
            $scope.countrylist = response.country;
            console.log($scope.countrylist)
                     });
     $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
     
            //$rootScope.User_data = response.data[0].User;
             console.log($rootScope.User_data);
//             if($rootScope.User_data.language == "0")
//             {
//                 console.log("mee")
//                $scope.data.lang="English" 
//             }else{
//                 $scope.data.lang="Deutsch" 
//             }
             $scope.data.editname=$rootScope.User_data.name;
             $scope.data.phn=$rootScope.User_data.phone;
             $scope.data.email=$rootScope.User_data.email;
             $scope.data.lastname=$rootScope.User_data.last_name;
             $scope.data.dob=new Date($rootScope.User_data.dob);
             $scope.data.City=$rootScope.User_data.city;
             $scope.data.gender=$rootScope.User_data.gender;
             $scope.data.country=$rootScope.User_data.country;
           $scope.language=$rootScope.User_data.language;
           
           switch($scope.language){
               case "0":
                   $scope.data.lang="English";
                   break;
               case "1":
                $scope.data.lang="Deutsche";
                   break;   
           }
           
     console.log($scope.data);
    
      $rootScope.Userid = $window.localStorage.getItem("user_id");
      
      
  
      
            $scope.editinfo=function(){
                console.log($scope.data.lang);
              
                switch($scope.data.lang){
               case "Deutsche":
                   $scope.data.lang="1";
                   break;
               case "English":
                $scope.data.lang="0";
                   break;   
           }
                
                
           var editdata=$httpParamSerializer({
            id:$rootScope.Userid ,
            email:$scope.data.email
        })
        console.log(editdata);
         $ionicLoading.show();
         $http.post(Base_URL+'users/emailmatch',editdata)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0)
            {
             delete $rootScope.User_data;
                
                  
        console.log($scope.data);
        var editdata=$httpParamSerializer({
            id:$rootScope.Userid,
            name:$scope.data.editname,
            phone:$scope.data.phn,
            email:$scope.data.email,
            dob:$scope.data.dob,
            city:$scope.data.City,
            gender:$scope.data.gender,
            country:$scope.data.country,
            last_name:$scope.data.lastname,
            language:$scope.data.lang
        })
        console.log(editdata);
         $ionicLoading.show();
         $http.post(Base_URL+'users/editprofile',editdata)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSucess == "true"){
               // $ionicLoading.hide();
                  var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
        $http.post(Base_URL+'users/user',userdata)
            .success(function (response)
                        {
            console.log(response);
                         if(response.msg == "Success"){
                            $ionicLoading.hide();
                           // console.log(response);
                            $rootScope.User_data = response.data[0].User;
                            console.log($rootScope.User_data);
                            $rootScope.profilepic= $rootScope.User_data.image
                            console.log($rootScope.profilepic);
                           
                            $state.go("menu.profile")
                         }
                         else{
                           $ionicLoading.hide();  
                         };
                     });
              
                
            }else{
                $ionicLoading.hide();
                
            };
        })
    }else{
        $ionicLoading.hide();
        if($rootScope.currentLanguage=="English") {
         var myPopup = $ionicPopup.show({
                                         
        title: 'Email Id already exist',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }else{
         var myPopup = $ionicPopup.show({
                                         
        title: 'E-Mail-ID existiert bereits',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }
    }
    })
    }
    
    
     $scope.setLang_edit = function(langKey,lan_g) {
        // alert(langKey);
    // You can change the language during runtime
    console.log(lan_g);
    $rootScope.change_lang=lan_g;
    console.log($rootScope.change_lang);
    if(langKey == "English"){
       $rootScope.select_Language=0;
    }else if(langKey == "Deutsche"){
        console.log("")
       $rootScope.select_Language=1;
    }else{
        $rootScope.select_Language=lan_g;
    }
    console.log($rootScope.select_Language)
    $rootScope.select_Language=lan_g
    $translate.use(langKey);
    $rootScope.currentLanguage = $translate.use();
    console.log($translate.use())
  };
    
    
    
    
    
    
    
    
    
          $scope.picture = function (options) {
 $rootScope.myPopup = $ionicPopup.show({
   scope: $scope,
    template: '<div ng-controller="editinfoCtrl" class="pop_profile"><button class="button-full icon-left ion-camera button-small" ng-click = "takePicture()" style="margin-bottom:8px; background: #29e6f2; color: #fff; border:none;"> Take Picture</button><button class="button-full icon-left ion-images button-small" ng-click = "getPicture()" style="background: #29e6f2; color: #fff; border:none;"> Open Gallery</button></div>',
    title: 'Picture',
    buttons: [
      { text: 'Cancel',
        type:'button button-login' }
    ]
  });
    };
               $scope.takePicture = function (options) {
  //alert('bhu');
    var options = {
     quality: 50,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: Camera.PictureSourceType.CAMERA,
  allowEdit: true,
    encodingType: Camera.EncodingType.JPEG,
    targetWidth: 100,
    targetHeight: 100,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false,
    correctOrientation:true
    };
     $cordovaCamera.getPicture(options).then(function(imageData) {
//alert(imageData);
    $rootScope.dataImg = imageData; // <--- this is your Base64 string 
$rootScope.imgUrl =  imageData;
//$rootScope.dataImg = "data:image/jpeg;base64," + imageData;
$rootScope.Userid=JSON.parse(localStorage.getItem('user_id'));
//$scope.useriid = JSON.parse(($window.localStorage.getItem('User_Data')));
//$scope.userid = $scope.useriid.user_id;
  var editdata1=$httpParamSerializer({
        id:$rootScope.Userid,
        img:$rootScope.dataImg
    });
    //alert(editdata1);
    $ionicLoading.show();
$http.post(Base_URL+'users/saveimage',editdata1).success(function(response)
{
    //alert("hh");
   //alert(JSON.stringify(response));
if(response.data==true){
       var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                            });
  console.log($scope.cddata);
  $http.post(Base_URL+'users/user',userdata).success(function(response)
  {
     
  // alert("edit");
   console.log(response);
     if(response.msg == "Success"){
         //alert("2")
         $ionicLoading.hide();
        // alert("my");
        // alert(response.data[0].User);
        $rootScope.User_data = response.data[0].User;
        console.log($rootScope.User_data);
        $rootScope.profilepic= $rootScope.User_data.image
        console.log($rootScope.profilepic);
   $rootScope.myPopup .close();
     }else{
         //alert("hey2")
         $ionicLoading.hide();
         if($rootScope.currentLanguage=="English") {
          var myPopup = $ionicPopup.show({
                                         
        title: 'Profile data not access',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }else{
        var myPopup = $ionicPopup.show({
                                         
        title: 'Können auf Profildaten nicht zugreifen',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }
    }
});
 $rootScope.myPopup.close();
 
 }else{
     $ionicLoading.hide();
     $rootScope.myPopup.close();
    // alert("false");
     if($rootScope.currentLanguage=="English") {
      var myPopup = $ionicPopup.show({
                                         
        title: 'Profile data not access',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }else{
        var myPopup = $ionicPopup.show({
                                         
        title: 'Können auf Profildaten nicht zugreifen',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }
 }
});
    }, function(err) {
    alert(err);
    });
    };  
    
    $scope.getPicture = function (options) {
  //alert('helloooqqq');
    var options = {
    quality: 30,
    destinationType: Camera.DestinationType.DATA_URL,
    sourceType: 0,
    allowEdit: true,
    encodingType: Camera.EncodingType.JPEG,
    popoverOptions: CameraPopoverOptions,
    saveToPhotoAlbum: false,
    correctOrientation:true
    };
   $cordovaCamera.getPicture(options).then(function(imageData) {
  // alert("imageData");
    $rootScope.dataImg = imageData; // <--- this is your Base64 string 
$rootScope.imgUrl = imageData;
//$rootScope.dataImg = "data:image/jpeg;base64," + imageData;
 $rootScope.Userid=JSON.parse(localStorage.getItem('user_id'));
//$scope.useriid = JSON.parse(($window.localStorage.getItem('User_Data')));
//$scope.userid = $scope.useriid.user_id;
 var editdata2=$httpParamSerializer({
        id:$rootScope.Userid,
        img:$rootScope.dataImg
    });
    console.log(editdata2);
   //alert("hgjhgjhh")
      $ionicLoading.show();
      console.log("my1")
$http.post(Base_URL+'users/saveimage',editdata2).success(function(response)
{
    //alert("hh1");
//alert(JSON.stringify(response));
console.log("my")
console.log(JSON.stringify(response));

if(response.data==true){
    var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                            });
  //console.log($scope.cddata);
  $ionicLoading.show();
  $http.post(Base_URL+'users/user',userdata).success(function(response)
  {
     
  // alert("edit");
   console.log(response);
     if(response.msg == "Success"){
         //alert("2")
         $ionicLoading.hide();
        // alert("my");
        // alert(response.data[0].User);
        $rootScope.User_data = response.data[0].User;
        console.log($rootScope.User_data);
        $rootScope.profilepic= $rootScope.User_data.image
        console.log($rootScope.profilepic);
   $rootScope.myPopup .close();
     }else{
         //alert("hey2")
         $ionicLoading.hide();
         if($rootScope.currentLanguage=="English") {
          var myPopup = $ionicPopup.show({
                                         
                                        title: 'Profile data not access',
                                        cssClass: 'value_sec',
                                        scope: $scope,
                                        buttons: [
                                          { text: '<span class="oky">Okay</span>',
                                          onTap: function(e) {
                                             // $state.go('menu.profile');
                                            }}
                                        ]
                                      });
                                  }else{
        var myPopup = $ionicPopup.show({
                                         
        title: 'Können auf Profildaten nicht zugreifen',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }
      //  alert("Profile data not access");
          }
        });
 
    }else{
        $ionicLoading.hide();
     $rootScope.myPopup.close();
    // alert("false");
     if($rootScope.currentLanguage=="English") {
      var myPopup = $ionicPopup.show({
                                         
        title: 'Profile data not access',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }else{
        var myPopup = $ionicPopup.show({
                                         
        title: 'Können auf Profildaten nicht zugreifen',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }
// alert("false");
 }
});
    }, function(err) {
   // alert(err);
    });
    };   
            
})

.controller('termsCtrl', function($scope,$ionicLoading,$http,Base_URL,$httpParamSerializer,$state,$rootScope) {
})
    
.controller('FAQCtrl', function($scope,$ionicLoading,$http,Base_URL,$httpParamSerializer,$state,$rootScope,$stateParams,$sce) {
   // $scope.idd = $stateParams.idd;
    //console.log($scope.idd)


$scope.trustAsHtml = function(string) {
    return $sce.trustAsHtml(string);
};


////////////////////////// menu data display////////////////
$scope.faq=function(id){
  console.log(id)
   var userdata = $httpParamSerializer({
    id:id
        })
     console.log(userdata);
     $ionicLoading.show();
     $http.post(Base_URL+'staticpages/view',userdata)
     .success(function (response)
            {
     
     if(response.isSucess == "true"){
         $ionicLoading.hide();
     $rootScope.listview = response.data.Staticpage;
     console.log($rootScope.listview);
     $state.go("menu.FAQ")
     $ionicLoading.hide();
             }
     else{
         $ionicLoading.hide();
              } 
         })
         }
                
})
   	
	
  
.controller('sliderCtrl', function ($scope, $ionicPlatform,$stateParams, $state, $translate,$ionicSlideBoxDelegate,$ionicSideMenuDelegate,$rootScope,$window,$http,$ionicHistory,Base_URL,$httpParamSerializer,$ionicLoading,$ionicPopup) {

          $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  //alert("my");
     if($window.localStorage.getItem('user_id')){
      // alert($window.localStorage.getItem('user_id'));
                     var userdata = $httpParamSerializer({
                            id:$window.localStorage.getItem('user_id')
                                })
                            console.log(userdata);
                            $ionicLoading.show();
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                       // alert(JSON.stringify(response));
                         $ionicLoading.hide();
                         if(response.msg == "Success"){
                           //  alert(JSON.stringify(response.data[0].User));
                            $rootScope.User_data = response.data[0].User
                              if(response.data[0].User.is_complete == 0){
                                 // alert("editfacebook");
                                    $state.go("menu.editfacebook");
                                    }else{
                                      //   alert("location");
                                $state.go("menu.location");
                            }
                            $window.localStorage.setItem('count',JSON.stringify(1)); ///// for home button
                            console.log(response);
                           // $rootScope.plan_disc = response.data[0].User.latest_plan;
                        }
                    })
//            $ionicViewService.nextViewOptions({
//            disableAnimate: true,
//             disableBack: false
//              });
// $rootScope.User_data=$window.localStorage.setItem("customer_data");

              
              }
           /*    $ionicPlatform.registerBackButtonAction(function(event) {
                  
                             if (true) { // your check here
                             //alert('abfdhc'
                             ////var path_value = $location.path()
                                //alert(path_value)
                            
    $ionicPopup.confirm({
     title: 'Boozie',
     template: 'Are you sure you want to exit?',
                                        cssClass: 'value_sec',
                                        }).then(function(res) {
     if (res) {
      navigator['app'].exitApp(); 
       //ionic.Platform.exitApp();
     }
                                     })
                                
                            }
                        }, 1000); */

// Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
  $scope.lockSlide = function () {
        $ionicSlideBoxDelegate.enableSlide( false );
    };
    $scope.$on('$ionicView.enter', function(){
      $ionicSideMenuDelegate.canDragContent(false);
    });
    var deviceInformation = ionic.Platform.device();
        $rootScope.deviceid = deviceInformation.uuid;
        $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
     $http.post(Base_URL+'testapi/background')
                        .success(function (response)
                        {
                         console.log(response);
                         $rootScope.Dynam_image=response.data.name;
                         console.log($rootScope.Dynam_image);
                          var change = $httpParamSerializer({
                            tokenhash:$rootScope.deviceid
                                })
                            console.log(change);
                           $http.post(Base_URL+'testapi/checklanguage',change)
                        .success(function (response)
                        {
                         console.log(response);
                            
                            if(response.data == "0"){
                                 $rootScope.currentLanguage =$translate.use("English");
                                 $rootScope.currentLanguage='English';
                                 console.log($rootScope.currentLanguage);
                            }else{
                                $rootScope.currentLanguage =$translate.use("Deutsche");
                                $rootScope.currentLanguage='Deutsche';
                                console.log($rootScope.currentLanguage);
                            }
                       // }
                    });
                     })
   
  $scope.facebookSignIn = function() {
     // alert("11111");
       var deviceInformation = ionic.Platform.device();
        $rootScope.deviceid = deviceInformation.uuid;
       // alert($rootScope.deviceid);
   facebookConnectPlugin.login(["public_profile","email"], fbLoginSuccess,
function loginError (error) {
//alert(JSON.stringify(error));
console.log(JSON.stringify(error));
});
  };
//////////////////////////////
var fbLoginSuccess = function(successdata) {
 
  console.log(successdata);
   //alert("54");
 // alert(JSON.stringify(successdata))
//alert("hello");
//facebookConnectPlugin.api('/me?fields=id,email,name,birthday,locale,age_range,gender,first_name,last_name&access_token=' + successdata.authResponse.accessToken, ['email','public_profile'],
facebookConnectPlugin.api('/me?fields=id,email,name,birthday,locale,age_range,gender,first_name,last_name&access_token=' + successdata.authResponse.accessToken, ['email','public_profile'],
function(profileresponse) {

//console.log(profileresponse);
//console.log(profileresponse.email+"msk");
if(profileresponse.birthday!=null){
 var birthday  = profileresponse.birthday;
 //alert(birthday+"my")
 console.log(birthday+"my")
}else{
    var birthday  = profileresponse.birthday; 
    
   
}
if(profileresponse.age_range!=null){
 var age1  = profileresponse.age_range;
 var age2  = profileresponse.age_range.min;
 //alert(birthday+"my")
 console.log(age1+"age1");
 console.log(age2+"age2");
}else{
    var age2  = profileresponse.age_range.min; 
    console.log(age2);
   
}

if(profileresponse.gender!=null){
 var gender  = profileresponse.gender;
 console.log(gender+"gender")
}else{
    var gender  = ""; 
    console.log(gender+"gender1")
}
if(profileresponse.first_name!=null){
 var first_name  = profileresponse.first_name;
 console.log(first_name+"first_name")
}else{
    var first_name  = ""; 
    console.log(first_name+"first_name1")
}
if(profileresponse.last_name!=null){
 var last_name  = profileresponse.last_name;
 console.log(last_name+"last_name")
}else{
    var last_name  = ""; 
    console.log(last_name+"last_name1")
}
if(profileresponse.hometown!=null){
 var hometown  = profileresponse.hometown;
 console.log(hometown+"hometown")
}else{
    var hometown  = ""; 
    
}
if(age2 == undefined){
    if($rootScope.currentLanguage=="English") {
     var myPopup = $ionicPopup.show({
                          
                            title: 'Birthday not found on facebook account.',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $scope.fblogout();
                            }}
                            ]
                            });
                        }else{
                           var myPopup = $ionicPopup.show({
                          
                            title: 'Geburtstag nicht vom Facebook Konto gefunden.',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $scope.fblogout();
                            }}
                            ]
                            }); 
                        }
   // alert("birthday invalid");
   $scope.fblogout=function(){
      facebookConnectPlugin.logout(function(){
                    $ionicLoading.hide();
                    console.log('log out successfully')
                    $window.localStorage.removeItem("user_id");
        delete $rootScope.User_data;
          $window.localStorage.clear();
          $ionicHistory.clearCache();
           $ionicHistory.clearHistory();
        
                  },
                  function(fail){
                      console.log('failed')
                    $ionicLoading.hide();
                  });
              }
}else{
//    var userAge = new Date(birthday);
//                  var today = new Date();
//                  var age = today.getFullYear() - userAge.getFullYear();
//                  var month = today.getMonth() - userAge.getMonth();
//
//                  if (month < 0 || (month === 0 && today.getDate() < userAge.getDate())) {
//                      age--;
//                   } //this condition checks the month/date difference of both the dates 
//                  console.log(age);
        
//                  if(age > 18 || age == 18){
                       if(age2 > 18 || age2 == 18){
                          // alert("123456")
$rootScope.profilepicface="https://graph.facebook.com/"+profileresponse.id+"/picture?type=large"
$window.localStorage.setItem('profilepic',$rootScope.profilepicface);
$rootScope.profilepic =$window.localStorage.getItem('profilepic');
FCMPlugin.getToken(
 function(token){
//     $scope.data.city="";
//     $scope.data.lastname="";
//     $scope.data.country="";
//     $scope.data.gender="";
//     $scope.data.dob="";

     var facebkdata= $httpParamSerializer({
    facebook_id: profileresponse.id,
    name: first_name,
    email: profileresponse.email,
    image:$rootScope.profilepic,
    token:$rootScope.deviceid,
    city:hometown,
    last_name:last_name,
    country: null,
    gender:gender,
    dob:birthday,
    device_id:token
    

    });
    console.log(facebkdata);
   // alert(facebkdata);
  $ionicLoading.show();
 
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $http.post(Base_URL+'users/fblogin',  facebkdata)
        .then(function(dataresponse) { 
// alert("lllll");
//lert(JSON.stringify(dataresponse));
//alert(JSON.stringify(dataresponse.data));
console.log(dataresponse.data);
$ionicLoading.hide();
if(dataresponse.data.status == 3){
    $ionicLoading.hide();
////$window.localStorage.setItem('User_Data', JSON.stringify(dataresponse.data));
$window.localStorage.setItem('user_id', dataresponse.data.data.User.id);
$rootScope.User_data = dataresponse.data.data.User;
console.log($rootScope.User_data);
     $window.localStorage.setItem('face_book',JSON.stringify(1));
     $window.localStorage.setItem('count',JSON.stringify(1));
    // console.log($window.localStorage.getItem('face_book'));
//alert($rootScope.User_data);
//$window.localStorage.setItem('loginstatus', "1"); 
//$rootScope.userd=JSON.stringify(dataresponse.data.data.User.id);
//    alert($rootScope.userd);
$ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                if(dataresponse.data.data.User.is_complete == 0){
$state.go('menu.editfacebook');
}else{
    $state.go('menu.location');
}
}
if(dataresponse.data.status  == 0){
                        
                        if($rootScope.currentLanguage=="English") {
                        $ionicLoading.hide();
                        var myPopup = $ionicPopup.show({
                          
                            title: 'The email ' + profileresponse.email + ' is already registered with another device',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                           // $scope.fblogout();
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title: 'Die Email ' + profileresponse.email + ' Ist bereits bei einem anderen Gerät registriert',
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                           // $scope.fblogout();
                            }}
                            ]
                            });
                        }
                        //alert("User is not valid");
                       
                    }
                    if(dataresponse.data.status  == 1){
                        $ionicLoading.hide();
                          if($rootScope.currentLanguage=="English") {
                        
                        var myPopup = $ionicPopup.show({
                          
                            title: "You already registered with the email "+ dataresponse.data.email +" please not that only one registration per mobile phone is allowed",
                           // template: response.email,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                            title: 'Du bist bereits registriert mit der email ' + dataresponse.data.email+ ' bitte verstehe das nur eine registrierung pro mobile phone erlaubt ist.',
                          //  template: response.email,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                       // alert("You are already registered with "+ response.email);
                         
                    }
                    if(dataresponse.data.status  == 2){
                        $ionicLoading.hide();
                        if($rootScope.currentLanguage=="English") {
                        var myPopup = $ionicPopup.show({
                          
                            title: 'Your Email Address or Password are incorrect'  ,
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                           // $scope.fblogout();
                            }}
                            ]
                            });
                       // alert(response.msg);
                       
                }else{
                    var myPopup = $ionicPopup.show({
                          
                            title: 'Ihre E-Mail-Adresse oder Ihr Passwort sind falsch'  ,
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                           // $scope.fblogout();
                            }}
                            ]
                            });
                }
            };
      
}, function errorCallback(error){
//  alert(JSON.stringify(error))  
});
// } ,
//function(errorres) {
//console.log(response);
//info.reject(response);
//}
//);
 
 })
                  }else{
                      if($rootScope.currentLanguage=="English") {
                      var myPopup = $ionicPopup.show({
                          
                           title: 'Birthday Error',
                            template: "You must be 18 or older to use Boozie.",
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $scope.fblogout();
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           title: 'Fehler Geburtsdatum',
                            template: "Du musst 18 oder älter sein, um Boozie zu benutzen.",
                           // template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $scope.fblogout();
                            }}
                            ]
                            }); 
                        }
                      $scope.fblogout=function(){
                      facebookConnectPlugin.logout(function(){
                    $ionicLoading.hide();
                    console.log('log out successfully')
                    $window.localStorage.removeItem("user_id");
        delete $rootScope.User_data;
          $window.localStorage.clear();
          $ionicHistory.clearCache();
           $ionicHistory.clearHistory();
        
                    //$ionicHistory.clearCache();
                    //$ionicHistory.clearHistory();
                   // console.log($rootScope.cartItemsCount+'hfgh')
                   // $rootScope = $rootScope.$new(true);
                    //console.log($rootScope.cartItemsCount)
                    // $state.go('welcome');
                   // $state.go("signin",{},{reload:true});
                  },
                  function(fail){
                      console.log('failed')
                    $ionicLoading.hide();
                  });
              }
                      //alert("below 18 year");
                  }
 }
});

};

})
   
.controller('createProfileCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('step1Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('finalStepCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('menuCtrl', 
function ($scope, $stateParams,$window,$state,$rootScope,$httpParamSerializer,$http,Base_URL,$ionicLoading,$ionicSideMenuDelegate) {
  $http.get(Base_URL+'staticpages/pageslist')  
  .success(function (response)
                        {
            console.log(response);
            $rootScope.list = response.data;
            console.log($rootScope.list)
                     });

                  
$window.localStorage.setItem("uu",1);
    $rootScope.veanu_hide=$window.localStorage.getItem("uu");
    // console.log($rootScope.veanu_hide);
 //console.log("dfdddddddddddddddddd");
$scope.home_page=function(){
    if($window.localStorage.getItem("count") == 1){
        $state.go("menu.location")
          var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.msg == "Success"){
                            
                            //  alert("signIn successfull");
                            console.log(response);
                            $rootScope.User_data = response.data[0].User;
                            $rootScope.plan_disc = response.data[0].User.latest_plan;
                            console.log($rootScope.plan_disc);
                            console.log($rootScope.User_data);
                        }
                        })
    }else{
        $state.go("menu.nearestRestaurants")
         var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.msg == "Success"){
                            
                            //  alert("signIn successfull");
                            console.log(response);
                            $rootScope.User_data = response.data[0].User;
                            $rootScope.plan_disc = response.data[0].User.latest_plan;
                            console.log($rootScope.plan_disc);
                            console.log($rootScope.User_data);
                        }
                        })
    
    }
}
   

})
   
.controller('nearestRestaurantsCtrl', 
function ($scope, $cordovaGeolocation, $ionicModal,$rootScope,$http,Base_URL,$state,$httpParamSerializer,$window,$ionicLoading,$ionicPopup) {
   
    $rootScope.resturant_list;
     $window.localStorage.setItem("uu",1);
      $rootScope.veanu_hide=$window.localStorage.getItem("uu");
     console.log($rootScope.veanu_hide)
    console.log($rootScope.resturant_list);
    
    $rootScope.Userid = $window.localStorage.getItem("user_id");
    
  
    $scope.lat =  $window.localStorage.getItem('lat');
    $scope.long =  $window.localStorage.getItem('long');
    
     $rootScope.Userid = $window.localStorage.getItem("user_id");
     $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
     console.log($rootScope.Userid);
     $http.post(Base_URL+'testapi/background')
                        .success(function (response)
                        {
                         console.log(response);
                         $rootScope.Dynam_image=response.data.name;
                         console.log($rootScope.Dynam_image);
                    
     var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.msg == "Success"){
                             $ionicLoading.hide();
                            //  alert("signIn successfull");
                            console.log(response);
                            $rootScope.User_data = response.data[0].User;
                            $rootScope.plan_disc = response.data[0].User.latest_plan;
                            console.log($rootScope.plan_disc);
                            console.log($rootScope.User_data);
                            $window.localStorage.setItem("customer_data", response.data[0].User);
                            $rootScope.profilepic= $rootScope.User_data.image;
//                             var userdata1 = $httpParamSerializer({
//                            userid:$rootScope.Userid
//                                })
//      $http.post(Base_URL+'testapi/codetest',userdata1)
//                        .success(function (response)
//                        {
//                         console.log(response);
//                         $rootScope.coupan_used=response.error;
//                         console.log($rootScope.coupan_used);
//                     });
                        }
                    })
  })
    
    $scope.rest_details=function(restid,lat,long){
       // alert(restid)
        var restdata = $httpParamSerializer({
            res_id:restid,
            user_id:$rootScope.Userid,
            longitude:$scope.long,
            latitude:$scope.lat 
        })
       
        console.log(restdata);
        $ionicLoading.show();
         $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
         $http.post(Base_URL+'restaurants/restaurantbyid',restdata)
         .success(function (response)
            {
                console.log(response);
                if(response.isSucess == "true"){
                   $ionicLoading.hide();
                   $rootScope.rest_detail=response.data;
                  // $rootScope.gallery_data = response.gallery;
                  // console.log($rootScope.gallery_data)
                   
                   $rootScope.gallery_lenght = response.gallery.length;
                   console.log($rootScope.gallery_lenght)
                     if(response.gallery.length >= 4){ 
                         
                          var gallery_images=[]
                   for(var i=0; i<4 ;i++){
                   gallery_images.push(response.gallery[i]);
                   }
                  $rootScope.gallery_data=gallery_images;
                     }else{
                         $rootScope.gallery_data=response.gallery;
                         
                         //delete $rootScope.gallery_data;
                     }
                   $rootScope.rest_id=response.data.id;
                   $rootScope.rest_lat=response.data.latitude;
                    $rootScope.rest_long=response.data.longitude;
                  
                   $window.localStorage.setItem("rest_id", response.data.id);
                        
                   $rootScope.distance=response.distance;
                 //  $rootScope.image={"0":response.data.bannerone,"1":response.data.bannertwo,"2":response.data.bannerthree,"3":response.data.bannerfour};
                   
                 //  console.log($rootScope.image)
                   $state.go("menu.restaurantDetails"); 
                }else{
                    $ionicLoading.hide();
                    if($rootScope.currentLanguage=="English") {
                     var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Venue Detail not available",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Venue Detail nicht verfügbar",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                    
                   // alert("no data");
                }
                
                     });
        
        }
    
     ////////////// searchbyname////////////////
     
     $scope.data={};
     $scope.lat =  $window.localStorage.getItem('lat');
             $scope.long =  $window.localStorage.getItem('long');
   
     $scope.serch_by_name=function(){
         $rootScope.formatted_address="Bar"
         if($scope.data.resname){
         console.log($scope.data.resname);
      
         var serchname = $httpParamSerializer({
            name:$scope.data.resname,
           // tt:'xxx',
            longitude:$scope.long,
            latitude:$scope.lat,
          //  type:'--1--2--3'
        });
         console.log(serchname);
      //  console.log(serchname);
        $ionicLoading.show();
         $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
         $http.post(Base_URL+'restaurants/searchbynameresturent',serchname)
         .success(function (response)
            {
                console.log(response);
                if(response.isSuccess == "true"){
                $ionicLoading.hide();
                $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                $scope.modal2.hide();
                   $http.post(Base_URL+'restaurants/getalltype')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSuccess == "true"){
                $rootScope.Drink_filter= response.data;
                console.log($rootScope.Drink_filter);
               
            }else{
                
            }
        })
                }else{
                    $ionicLoading.hide();
                    if($rootScope.currentLanguage=="English") {
                     var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "There are no Boozie Venue available of this name. Search for other Boozie Venue",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Es gibt keine Boozie Venue mit diesem Namen. Bitte andere Boozie Venue suchen.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                   // alert("no venues around you ");
                }
            })
     }else{
         if($rootScope.currentLanguage=="English") {
          var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Fill in Venue name",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Füllen Sie den Namen der Venue aus",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
       //  alert("Fill bar name")
     }
 }
     /////////////////filter/////////////////////////
     $scope.data={};
     $scope.drink_filter_list=function(){
          var cousines = "";    
          angular.forEach($scope.data.cousines,function(key,value){
      if(key == true){
      
      cousines+=value+'--';
    }
  },cousines);
  if($scope.data.drinkcat){
  var drinkcat = "";
  console.log($scope.data.drinkcat);
  angular.forEach($scope.data.drinkcat,function(key,value){
      
      console.log(value);
 
      
      if(key == true){
      
      drinkcat+=value+'--';
    
    }
  },drinkcat);
  }
       console.log(drinkcat) ;  
            if($rootScope.searchforfilter==0){
             
            var api="restaurants/searchbynameresturent";
                         
           if(drinkcat) {if(drinkcat.length!=0){
                $scope.drinkcat = drinkcat;
                                }}
            var data= {
                        latitude: $scope.lat, 
                        longitude: $scope.long,
                        type:cousines,
                        name:$rootScope.searchbynamer,
                        drinkcat:$scope.drinkcat
                      };
                              
          }else if($rootScope.searchforfilter==1){
                               
           if(drinkcat) {if(drinkcat.length!=0){
                $scope.drinkcat = drinkcat;
                                }}
               var data= {
                        latitude:  $rootScope.latitude_first,
                        longitude: $rootScope.longitude_first,
                        type:cousines,
                        drinkcat:$scope.drinkcat
                        
                             };
                             
                 var api="restaurants/restaurantslist";
          }else if($rootScope.searchforfilter==2){
                  
               var data= {
                        latitude:  $rootScope.lat,
                        longitude: $rootScope.long,
                        type:cousines,
                        
                       
                             };
                             
           if(drinkcat) {if(drinkcat.length!=0){
                $scope.drinkcat = drinkcat;
                                }}

                 var api="restaurants/restaurantslist";
          }else if($rootScope.searchforfilter==3){
                                 
           if(drinkcat) {
               if(drinkcat.length!=0){
                $scope.drinkcat = drinkcat;
                                }
                            }
                 var data= {
                        latitude:  $scope.lat,
                        longitude: $scope.long,
                        //type:cousines,
                         catid:$rootScope.iddddd,
                         drinkcat:$scope.drinkcat
                       
                            };
                          
                            console.log("here")
                      console.log(data);       
           var api="restaurants/topbar";
           
          }else {
              
                             
           if(drinkcat) {if(drinkcat.length!=0){
                   console.log(drinkcat);
                   console.log("my")
                $scope.drinkcat = drinkcat;
                //console.log(data.drinkcat)
                                }}
              var data= {
                        latitude:  $scope.lat,
                        longitude: $scope.long,
                       // type:cousines,
                        city:$rootScope.searchfgfhr,
                         drinkcat:$scope.drinkcat
                       
                            };
                            console.log(data+"my")
             var api="restaurants/searchbycity";
             
          }

 
 
    var loaction = $httpParamSerializer(data);
                          
            console.log(loaction,Base_URL+api);
             $ionicLoading.show();
             //alert("location_2")
            $http.post(Base_URL+api, loaction)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSuccess ==  "true")
            {
       
                $ionicLoading.hide();
                $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                            $rootScope.clat =  $rootScope.lat;
                            $rootScope.clong = $rootScope.long;
                            //  $rootScope.favrest = response.data.favrest;
                           
                                    console.log($rootScope.clat);
                                    console.log($rootScope.clong);
			var link = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+$rootScope.clat+','+$rootScope.clong+'&key=AIzaSyBQrWZPh0mrrL54_UKhBI2_y8cnegeex1o';
                            $http.post(link).success(function(response) {
                            console.log(response);
                            //document.getElementById('place').innerHTML= res[3];
                             cityname = response.results[0].address_components[3].long_name;
                        console.log(cityname);
                         $ionicLoading.hide();
                    $rootScope.formatted_address =cityname; 
                    $scope.modal1.hide();
                     $scope.modals.hide();
                  
                    });
                
            }else{
                $ionicLoading.hide();
                if($rootScope.currentLanguage=="English") {
                
                var myPopup = $ionicPopup.show({
                          
                            title: 'Drink currently not available'  ,
                          // template: response.msg,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                            title: 'Getränk im moment nicht verfügbar'  ,
                          // template: response.msg,
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
             //  alert(response.msg)
            }
          
       })
     
     }
     ///////////////////////////////////////////start new fliter /////////////////////////////////////////
     $ionicModal.fromTemplateUrl('templates/filterdrinknew.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modals = modal;
   });
	
   $scope.openModal = function() {
      $scope.modals.show();
   };
	
   $scope.closeModal = function() {
      $scope.modals.hide();
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modals.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
	
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });
   
   $scope.data={}
    //alert("drink fliter")
       $http.get(Base_URL+'testapi/getalldrink')  
            .success(function (resp)
                {
            console.log(resp);
    if(resp.error == 0){
     $scope.filterdata = resp.data;
     console.log($scope.filterdata)
   //  $state.go("menu.filterdrinknew")
    }  else{
      // alert("no data ")
   }      
          
                     });
     /////////////////filter/////////////////////////
   
     $scope.drinkfilter_list=function(){
      
     var drinkcat = "";
  console.log($scope.data.drinkcat);
  angular.forEach($scope.data.drinkcat,function(key,value){
      
      console.log(value);
 
      
      if(key == true){
      
      drinkcat+=value+'--';
    
    }
  },drinkcat);
    console.log(drinkcat);
    var loaction = $httpParamSerializer({
                        latitude: $scope.lat, 
                        longitude: $scope.long,
                        drinkcat:drinkcat
                                });
                          
            console.log(loaction);
           //  $ionicLoading.show();
             //alert("location_2")
            $http.post(Base_URL+'restaurants/restaurantslist', loaction)
                    .success(function (response) 
                    {
            console.log(response);
             $ionicLoading.hide();
            if(response.isSuccess ==  "true")
            {
               
                $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                            $rootScope.clat =  $rootScope.lat;
                            $rootScope.clong = $rootScope.long;
                            //  $rootScope.favrest = response.data.favrest;
                           
                                    console.log($rootScope.clat);
                                    console.log($rootScope.clong);
			var link = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+$rootScope.clat+','+$rootScope.clong+'&key=AIzaSyBQrWZPh0mrrL54_UKhBI2_y8cnegeex1o';
                            $http.post(link).success(function(response) {
                            console.log(response);
                            //document.getElementById('place').innerHTML= res[3];
                             cityname = response.results[0].address_components[3].long_name;
                        console.log(cityname);
                         $ionicLoading.hide();
                    $rootScope.formatted_address =cityname; 
//                     console.log($rootScope.searchforfilter);
//         alert($rootScope.searchforfilter);
//         if($rootScope.searchforfilter==0){
//           alert($rootScope.searchforfilter);
//             console.log("kkkkkkkkk")
//     $scope.lat =  $window.localStorage.getItem('lat');
//     $scope.long =  $window.localStorage.getItem('long');
//     console.log($rootScope.searchbynamer) ;
//         $rootScope.formatted_address="Bar"
//        var serchname = $httpParamSerializer({
//            name:$rootScope.searchbynamer,
//           // tt:'xxx',
//            longitude:$scope.long,
//            latitude:$scope.lat,
//          //  type:'--1--2--3'
//        });
//         console.log(serchname);
//      //  console.log(serchname);
//        $ionicLoading.show();
//         $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//         $http.post(Base_URL+'restaurants/searchbynameresturent',serchname)
//         .success(function (response)
//            {
//                console.log(response);
//                if(response.isSuccess == "true"){
//                $ionicLoading.hide();
//                $rootScope.resturant_list = response.data.Restaurant;
//                console.log($rootScope.resturant_list);
//                $scope.modal2.hide();
//                   $http.post(Base_URL+'restaurants/getalltype')
//                    .success(function (response) 
//                    {
//            console.log(response);
//            if(response.isSuccess == "true"){
//                $rootScope.Drink_filter= response.data;
//                console.log($rootScope.Drink_filter);
//               
//            }else{
//                
//            }
//        })
//                }else{
//                    $ionicLoading.hide();
//                     var myPopup = $ionicPopup.show({
//                          
//                           // title: 'Your Email Address or Password are incorrect'  ,
//                           template: "There are no Boozie Bar availbale of this name. Search other Boozie bar",
//                            cssClass: 'value_sec',
//                            scope: $scope,
//                            buttons: [
//                            { text: '<span class="oky">Okay</span>',
//                            onTap: function(e) {
//                             // $state.go('menu.profile');
//                            }}
//                            ]
//                            });
//                   // alert("no venues around you ");
//                }
//            })
//    
//         }else if($rootScope.searchforfilter==1){
//               delete $rootScope.formatted_address;
//          // alert("n");
//            var posOptions = {timeout: 10000, enableHighAccuracy: true};
//            $cordovaGeolocation
//            .getCurrentPosition(posOptions)
//           
//            .then(function (position) {
//               // alert("location1");
//            $rootScope.lat = position.coords.latitude;
//            $rootScope.long = position.coords.longitude;
//            //$scope.coords = position.coords;
//            $window.localStorage.setItem('lat',$rootScope.lat);
//            $window.localStorage.setItem('long',$rootScope.long);
//            var loaction = $httpParamSerializer({
//                        latitude: $rootScope.lat, 
//                        longitude: $rootScope.long
//                                });
//                          
//            console.log(loaction);
//            $ionicLoading.show();
//            $http.post(Base_URL+'restaurants/restaurantslist', loaction)
//                    .success(function (response) 
//                    {
//            console.log(response);
//            if(response.isSuccess ==  "true")
//            {
//               // $ionicLoading.hide();
//                $rootScope.resturant_list = response.data.Restaurant;
//                $window.localStorage.setItem('count',JSON.stringify(0));
//                console.log($rootScope.resturant_list);
//                            $rootScope.clat =  $rootScope.lat;
//                            $rootScope.clong = $rootScope.long;
//                                    console.log($rootScope.clat);
//                                    console.log($rootScope.clong);
//			var link = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+$rootScope.clat+','+$rootScope.clong+'&key=AIzaSyBgdQ9h1BXJOBQ2pgMn4eXz_sffMn7vyrE';
//                            $http.post(link).success(function(response) {
//                            console.log(response);
//                            //document.getElementById('place').innerHTML= res[3];
//                             cityname = response.results[0].address_components[3].long_name;
//                        console.log(cityname);
//                         $ionicLoading.hide();
//                    $rootScope.formatted_address =cityname; 
//                    $state.go("menu.nearestRestaurants");
//                     $http.post(Base_URL+'restaurants/getalltype')
//                    .success(function (response) 
//                    {
//            console.log(response);
//            if(response.isSuccess == "true"){
//                $rootScope.Drink_filter= response.data;
//                console.log($rootScope.Drink_filter);
//            }else{
//                
//            }
//            $http.post(Base_URL+'testapi/getallcity')
//                    .success(function (response) 
//                    {
//            console.log(response);
//            if(response.error == 0){
//                $rootScope.all_city=response.data;
//                console.log($rootScope.all_city);
//            };
//                    });
//       
//                  
//                var userdata = $httpParamSerializer({
//                            id:$rootScope.Userid
//                                })
//                            console.log(userdata);
//                           $http.post(Base_URL+'users/user',userdata)
//                        .success(function (response)
//                        {
//                         console.log(response);
//                         if(response.msg == "Success"){
//                             $ionicLoading.hide();
//                            //  alert("signIn successfull");
//                            console.log(response);
//                            $rootScope.User_data = response.data[0].User;
//                            console.log($rootScope.User_data);
//                            $rootScope.profilepic= $rootScope.User_data.image
//                            console.log($rootScope.profilepic);
//                        }
//                     })  
//                            })
//                              })
//            }else{
//                var myPopup = $ionicPopup.show({
//                          
//                          //  title: 'There are no Boozie venues near you. ',
//                            template: "There are no Boozie venues near you. Soon you will find Boozie venues to a city near you.",
//                            cssClass: 'value_sec',
//                            scope: $scope,
//                            buttons: [
//                            { text: '<span class="oky">Okay</span>',
//                            onTap: function(e) {
//                              $state.go("menu.location");
//                            }}
//                            ]
//                            });
//               // alert("no venues around you" );
//                $ionicLoading.hide();
//                $state.go("menu.location");
//            }
//                    })
//                }, function(err) { 
//                // error
//            }); 
//         }else if($rootScope.searchforfilter==2){
//                  delete $rootScope.formatted_address;
//          // alert("n");
//            var posOptions = {timeout: 10000, enableHighAccuracy: true};
//            $cordovaGeolocation
//            .getCurrentPosition(posOptions)
//           
//            .then(function (position) {
//               // alert("location1");
//            $rootScope.lat = position.coords.latitude;
//            $rootScope.long = position.coords.longitude;
//            //$scope.coords = position.coords;
//            $window.localStorage.setItem('lat',$rootScope.lat);
//            $window.localStorage.setItem('long',$rootScope.long);
//            var loaction = $httpParamSerializer({
//                        latitude: $rootScope.lat, 
//                        longitude: $rootScope.long
//                                });
//                          
//            console.log(loaction);
//            $ionicLoading.show();
//            $http.post(Base_URL+'restaurants/restaurantslist', loaction)
//                    .success(function (response) 
//                    {
//            console.log(response);
//            if(response.isSuccess ==  "true")
//            {
//               // $ionicLoading.hide();
//                $rootScope.resturant_list = response.data.Restaurant;
//                $window.localStorage.setItem('count',JSON.stringify(0));
//                console.log($rootScope.resturant_list);
//                            $rootScope.clat =  $rootScope.lat;
//                            $rootScope.clong = $rootScope.long;
//                                    console.log($rootScope.clat);
//                                    console.log($rootScope.clong);
//			var link = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+$rootScope.clat+','+$rootScope.clong+'&key=AIzaSyBgdQ9h1BXJOBQ2pgMn4eXz_sffMn7vyrE';
//                            $http.post(link).success(function(response) {
//                            console.log(response);
//                            //document.getElementById('place').innerHTML= res[3];
//                             cityname = response.results[0].address_components[3].long_name;
//                        console.log(cityname);
//                         $ionicLoading.hide();
//                    $rootScope.formatted_address =cityname; 
//                    $state.go("menu.nearestRestaurants");
//                     $http.post(Base_URL+'restaurants/getalltype')
//                    .success(function (response) 
//                    {
//            console.log(response);
//            if(response.isSuccess == "true"){
//                $rootScope.Drink_filter= response.data;
//                console.log($rootScope.Drink_filter);
//            }else{
//                
//            }
//            $http.post(Base_URL+'testapi/getallcity')
//                    .success(function (response) 
//                    {
//            console.log(response);
//            if(response.error == 0){
//                $rootScope.all_city=response.data;
//                console.log($rootScope.all_city);
//            };
//                    });
//       
//                  
//                var userdata = $httpParamSerializer({
//                            id:$rootScope.Userid
//                                })
//                            console.log(userdata);
//                           $http.post(Base_URL+'users/user',userdata)
//                        .success(function (response)
//                        {
//                         console.log(response);
//                         if(response.msg == "Success"){
//                             $ionicLoading.hide();
//                            //  alert("signIn successfull");
//                            console.log(response);
//                            $rootScope.User_data = response.data[0].User;
//                            console.log($rootScope.User_data);
//                            $rootScope.profilepic= $rootScope.User_data.image
//                            console.log($rootScope.profilepic);
//                        }
//                     })  
//                            })
//                              })
//            }else{
//                var myPopup = $ionicPopup.show({
//                          
//                          //  title: 'There are no Boozie venues near you. ',
//                            template: "There are no Boozie venues near you. Soon you will find Boozie venues to a city near you.",
//                            cssClass: 'value_sec',
//                            scope: $scope,
//                            buttons: [
//                            { text: '<span class="oky">Okay</span>',
//                            onTap: function(e) {
//                              $state.go("menu.location");
//                            }}
//                            ]
//                            });
//               // alert("no venues around you" );
//                $ionicLoading.hide();
//                $state.go("menu.location");
//            }
//                    })
//                }, function(err) { 
//                // error
//            }); 
//         }else if ($rootScope.searchforfilter==3){
//             alert($rootScope.iddddd) ;
//            alert($rootScope.searchforfilter);
//            $rootScope.searchforfilter=3;
//             console.log($rootScope.searchforfilter);
//            $rootScope.formatted_address="Bars";
//             var loaction = $httpParamSerializer({
//                        latitude: $scope.lat, 
//                        longitude: $scope.long,
//                        catid:$rootScope.iddddd
//                    })
//                    $ionicLoading.show();
//                             
//            console.log(loaction);
//            $http.post(Base_URL+'restaurants/topbar', loaction)
//                    .success(function (response) 
//                    {
//           console.log(response);
//           if(response.isSuccess == "true"){
//               $ionicLoading.hide();
//               $rootScope.resturant_list = response.data.Restaurant;
//                console.log($rootScope.resturant_list);
//                $state.go("menu.nearestRestaurants")
//               $ionicLoading.hide();
//           }else{
//                  var myPopup = $ionicPopup.show({
//                          
//                          //  title: 'Email Address Already exist',
//                           template: response.msg,
//                            cssClass: 'value_sec',
//                            scope: $scope,
//                            buttons: [
//                            { text: '<span class="oky">Okay</span>',
//                            onTap: function(e) {
//                             // $state.go('menu.profile');
//                            }}
//                            ]
//                            });
//              // alert(response.msg)
//               $ionicLoading.hide();
//           }
//                    });
//             
//         }else if ($rootScope.searchforfilter==4){
//              console.log($rootScope.testaddress);
//                    var loaction = $httpParamSerializer({
//                        latitude: $scope.lat, 
//                        longitude: $scope.long,
//                        city:$rootScope.testaddress
//                    });
//                    $ionicLoading.show();
//                             
//            console.log(loaction);
//            $http.post(Base_URL+'restaurants/searchbycity', loaction)
//                    .success(function (response) 
//                    {
//           console.log(response);
//           if(response.isSuccess == "true"){
//               $ionicLoading.hide();
//               $rootScope.resturant_list = response.data.Restaurant;
//                console.log($rootScope.resturant_list);
//                $state.go("menu.nearestRestaurants")
//           }else{
//               $ionicLoading.hide();
//                              var myPopup = $ionicPopup.show({
//                          
//                           // title: 'Your Email Address or Password are incorrect'  ,
//                           template: 'No Bar available... select another city',
//                            cssClass: 'value_sec',
//                            scope: $scope,
//                            buttons: [
//                            { text: '<span class="oky">Okay</span>',
//                            onTap: function(e) {
//                             // $state.go('menu.profile');
//                            }}
//                            ]
//                            });
//
//             //  alert("There are no restaurant available... select another city")
//           }
//                    })
//                    
//         }
//         
                   // $state.go("menu.nearestRestaurants");
                  $scope.modals.hide();
                  
                    });
                
            }else{
                $ionicLoading.hide();
                 if($rootScope.currentLanguage=="English") {
                var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "There is no Venue available",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
               // alert(response.msg)
           }else{
               var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Aktuell keine Venue verfügbar",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
           }
            }
          
       })
     
     }
   
     /////////////////////////////////////////new fliter model/////////////////////////////////////////////
    
$ionicModal.fromTemplateUrl('templates/search.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal = modal;
   });
	
   $scope.openModal = function() {
      $scope.modal.show();
   };
	
   $scope.closeModal = function() {
      $scope.modal.hide();
   };
	
   //Cleanup the modal when we're done with it!
   $scope.$on('$destroy', function() {
      $scope.modal.remove();
   });
	
   // Execute action on hide modal
   $scope.$on('modal.hidden', function() {
      // Execute action
   });
	
   // Execute action on remove modal
   $scope.$on('modal.removed', function() {
      // Execute action
   });
   
   // For Filtr Tab
   $ionicModal.fromTemplateUrl('templates/filter.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal1 = modal;
   });
   
   $scope.closeModal1 = function() {
      $scope.modal1.hide();
   };
      $scope.closeModald = function() {
      $scope.modals.hide();
   };
   $ionicModal.fromTemplateUrl('templates/searchbyname.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal2 = modal;
   });
   
   $scope.closeModal2 = function() {
      $scope.modal2.hide();
   };
})


.controller('searchCtrl',
function ($scope, $stateParams,$http,$rootScope,$ionicLoading,$window,$state,Base_URL,$httpParamSerializer,$ionicPopup) {
$scope.data={};
  $http.get(Base_URL+'restaurants/getallrecommanded')  
            .success(function (resp)
                {
            console.log(resp);
    if(resp.isSuccess == "true"){
     $scope.top_venus = resp.data;
     console.log($scope.top_venus)
    }  else{
       // alert("no data ")
    }      
          
                     });
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $scope.lat =  $window.localStorage.getItem('lat');
             $scope.long =  $window.localStorage.getItem('long');
    $rootScope.search_city =function(name){
        
        console.log($rootScope.searchforfilter);
        if($scope.data.city){
            $rootScope.formatted_address=$scope.data.city;
         console.log($scope.data.city);
         var loaction = $httpParamSerializer({
                        latitude: $scope.lat, 
                        longitude: $scope.long,
                        name:$scope.data.city
                    })
                    $ionicLoading.show();         
            console.log(loaction);
            $http.post(Base_URL+'restaurants/searchbynameresturent', loaction)
                    .success(function (response) 
                    {
           console.log(response);
           if(response.isSuccess == "true"){
               $ionicLoading.hide();
               $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                $state.go("menu.nearestRestaurants")
           }else{
                $ionicLoading.hide();
                 if($rootScope.currentLanguage=="English") {
               var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'No Venue available... select another city',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'Keine Venue vorhanden ... eine andere Stadt auswählen',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
           }
                    })
                }else{
                    $rootScope.formatted_address=name;
                    var loaction = $httpParamSerializer({
                        latitude: $scope.lat, 
                        longitude: $scope.long,
                        city:name
                    })
                    $ionicLoading.show();
                             
            console.log(loaction);
            $http.post(Base_URL+'restaurants/searchbycity', loaction)
                    .success(function (response) 
                    {
           console.log(response);
           if(response.isSuccess == "true"){
               $ionicLoading.hide();
               $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                $state.go("menu.nearestRestaurants")
           }else{
               $ionicLoading.hide();
                if($rootScope.currentLanguage=="English") {
                              var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'No Venue available... select another city',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'Keine Venue vorhanden ... eine andere Stadt auswählen',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }

             //  alert("There are no restaurant available... select another city")
           }
                    })
                    
                }
 };
        $rootScope.top=function(id){
            $rootScope.formatted_address="Bars";
             var loaction = $httpParamSerializer({
                        latitude: $scope.lat, 
                        longitude: $scope.long,
                        catid:id
                    })
                    $ionicLoading.show();
                             
            console.log(loaction);
            $http.post(Base_URL+'restaurants/topbar', loaction)
                    .success(function (response) 
                    {
           console.log(response);
           if(response.isSuccess == "true"){
               $ionicLoading.hide();
               $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                $state.go("menu.nearestRestaurants")
               $ionicLoading.hide();
           }else{
               $ionicLoading.hide();
           }
                    });
            
        }


})
   
.controller('mapCtrl', 
function ($scope, $stateParams,$rootScope,$ionicLoading,$http,Base_URL,$httpParamSerializer,$state,$window,$ionicPopup) {
    $scope.map=function(lat,log){
        $rootScope.Userid = $window.localStorage.getItem("user_id");
        $rootScope.map_details=$rootScope.resturant_list;
        console.log($rootScope.map_details);
        $state.go("menu.map");
    }
    $scope.mapalert=function(event,name,address,id){
        console.log(name);
        console.log(event);
        console.log(id);
        $rootScope.maprest_id=id;
//            var map = $ionicPopup.show({
//                          
//                            title: name,
//                           template: address,
//                            cssClass: 'value_sec',
//                            scope: $scope,
//                            buttons: [
//                            { text: '<span class="oky">Go to profile</span>',
//                            onTap: function(e) {
//                             // $state.go('menu.profile');
//                             $scope.mapdetails();
//                            }}
//                            ]
//                            });
// var confirmPopup = $ionicPopup.confirm({
//       title: name,
//       template: address
//       
//                                });
//     confirmPopup.then(function(res) {
//       if(res) {
//         console.log('You are sure');
//	 $scope.mapdetails();
//       } else {
//         console.log('You are not sure');
//       }
//     });
     
   //  $scope.showPopup = function() {
     
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         //template: name,
         title: name,
         template: address,
         cssClass: 'value_sec font-st',
         
			
         buttons: [
            { text: 'Cancel' }, {
               text: '<b><span class="oky">Go to profile</span></b>',
               type: 'button-positive',
                  onTap: function(e) {
						
                     if (id) {
                         $scope.mapdetails();
                        //don't allow the user to close unless he enters model...
                         //  e.preventDefault();
                     } else {
                        return id;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
  // };

//})
     
     
     
                        }
                        $scope.mapdetails=function(restid,lat,long){
       // alert(restid)
        var restdata = $httpParamSerializer({
            res_id:$rootScope.maprest_id,
            user_id:$rootScope.Userid,
            longitude:$rootScope.long,
            latitude:$rootScope.lat
        })
       
        console.log(restdata);
        $ionicLoading.show();
         $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
         $http.post(Base_URL+'restaurants/restaurantbyid',restdata)
         .success(function (response)
            {
                console.log(response);
                if(response.isSucess == "true"){
                   $ionicLoading.hide();
                   $rootScope.rest_detail=response.data;
                  // console.log($rootScope.rest_detail);
                   $rootScope.rest_id=response.data.id;
                   $rootScope.rest_lat=response.data.latitude;
                    $rootScope.rest_long=response.data.longitude;
                  // console.log($rootScope.rest_id);
                   $window.localStorage.setItem("rest_id", response.data.id);
                        $rootScope.gallery_lenght = response.gallery.length;
                   console.log($rootScope.gallery_lenght)
                     if(response.gallery.length >= 4){ 
                         
                          var gallery_images=[]
                   for(var i=0; i<4 ;i++){
                   gallery_images.push(response.gallery[i]);
                   }
                  $rootScope.gallery_data=gallery_images;
                     }else{
                         $rootScope.gallery_data=response.gallery;
                         
                         //delete $rootScope.gallery_data;
                     }
                        
                   $rootScope.distance=response.distance;
                  // $rootScope.image={"0":response.data.bannerone,"1":response.data.bannertwo,"2":response.data.bannerthree,"3":response.data.bannerfour};
                   
                 //  console.log($rootScope.image)
                   $state.go("menu.restaurantDetails"); 
                }else{
                    
                    $ionicLoading.hide();
                    if($rootScope.currentLanguage=="English") {
                     var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Venue Detail not available",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Venue Detail nicht verfügbar",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                    
                   // alert("no data");
                }
                
                     });
        
        }
                        

})
   
.controller('restaurantDetailsCtrl', 
function ($scope, $stateParams,$cordovaInAppBrowser, $ionicScrollDelegate,$rootScope,$http,Base_URL,$httpParamSerializer,$state,$ionicLoading,$ionicPopup,$window) {
    
     $scope.lat =  $window.localStorage.getItem('lat');
             $scope.long =  $window.localStorage.getItem('long');
    /////////////Navigation//////
      $scope.launchNavigator = function(res_lat,res_long) {
          console.log(res_lat,res_long);
          $rootScope.rest_lat=res_lat;
          $rootScope.rest_long=res_long;
          $state.go("menu.resmap");
   // var destination = [$rootScope.rest_lat, $rootScope.rest_long];
	//var start = [$scope.lat, $scope.long];
    // launchnavigator.navigate(destination, start).then(function() {
     // console.log("Navigator launched");
   // }, function (err) {
    //  console.error(err);
                  //  });
                };
 $scope.mapdirection = function() {
    var destination = [$rootScope.rest_lat, $rootScope.rest_long];
	var start = [$scope.lat, $scope.long];
     launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
                    });
                };
     /////////////////////////
    $scope.product_list=function(rest_id){
       // alert(rest_id);
     var pro_detail = $httpParamSerializer({
                        resid:rest_id
                                });
                          
            console.log(pro_detail);
             //alert("location_2")
             $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'products/productlist', pro_detail)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0){
                $ionicLoading.hide();
                $rootScope.prod_list = response.data;
                console.log($rootScope.prod_list);
                $state.go("menu.mainMenu")
            }else
            {
                $ionicLoading.hide();
                 if($rootScope.currentLanguage=="English") {
                var myPopup = $ionicPopup.show({
                          
                          //  title: 'Email Address Already exist',
                           template: "No drink available",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                            }else{
                                var myPopup = $ionicPopup.show({
                          
                          //  title: 'Email Address Already exist',
                           template: "Kein Getränk vorhanden",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            }); 
                            }
            }
            
        });
    };
    
      $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
   $scope.toggleGroup1 = function(group1) {
    if ($scope.isGroupShown1(group1)) {
      $scope.shownGroup1 = null;
    } else {
      $scope.shownGroup1 = group1;
    }
  };
  $scope.isGroupShown1 = function(group1) {
    return $scope.shownGroup1 === group1;
  };


  var el = document.getElementById("div1");


  $scope.scrollEvent = function() {
	  
  $scope.scrollamount = $ionicScrollDelegate.$getByHandle('scrollHandle').getScrollPosition().top;
  if ($scope.scrollamount > 180) {
    $scope.$apply(function() {
		//el.classList.remove("map_header");
      // console.log('1');
    });
  } else {
    $scope.$apply(function() {
	//	el.className += " map_header";
    //  console.log('2');
    });
  }
};
  
  

// Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('main');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };


//$scope.groups = [];
//  for (var i=0; i<1; i++) {
//    $scope.groups[i] = {
//      name: i,
//      items: [],
//      show: false
//    };
//    for (var j=0; j<3; j++) {
//      $scope.groups[i].items.push(i + '-' + j);
//    }
//  }
//  
//  /*
//   * if given group is the selected group, deselect it
//   * else, select the given group
//   */
//  $scope.toggleGroup = function(group) {
//    group.show = !group.show;
//  };
//  $scope.isGroupShown = function(group) {
//    return group.show;
//  };
/////////////////////////////////////inappbrowser//////////////////
        $scope.openBrowser = function(link) {
            // alert("srishti")
             //alert(link)
               var options = {
                   location: 'yes',
                   clearcache: 'yes',
                   toolbar: 'yes',
                    

               };
            
               $cordovaInAppBrowser.open(link, '_system', options)

                       .then(function(event) {
                         // alert("hello");
                         
                       })

                       .catch(function(event) {
                         //  alert("hii");
                          
                       });
//               $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event) {
//                   if (event.url.match('/confirmation')) {
//                       $cordovaInAppBrowser.close();
//                     
//
//                   }
//               });
    }

})

.controller('galleryCtrl', 
function ($scope, $stateParams,$http,Base_URL,$window,$rootScope,$httpParamSerializer,$state,$ionicLoading,$ionicPopup) {
     
    
     $scope.gallery=function(rest_id){
        // alert(rest_id)
      var gallery = $httpParamSerializer({
                        id:rest_id
                                });
                          
            console.log(gallery);
             //alert("location_2")
             $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'testapi/resgallery', gallery )
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error== 0){
              $ionicLoading.hide();
               $rootScope.gallery_data = response.data;
               
                $rootScope.items = [];
                angular.forEach(response.data, function (value, key) {
                    this.push({src: value.Gallery.image});
                },$rootScope.items);
                
                console.log($rootScope.items);
               $state.go("menu.gallery");
            }else{
                $ionicLoading.hide();
               // alert(response.msg);
               if($rootScope.currentLanguage=="English") {
               var myPopup = $ionicPopup.show({
                          
                          //  title: 'Email Address Already exist',
                           template: "No Images",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                          //  title: 'Email Address Already exist',
                           template: "Keine Bilder",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
            }
            
                    })
                    
     }


})
.controller('galleryFullCtrl', 

function ($scope, $stateParams,$http,Base_URL,$httpParamSerializer,$rootScope,$state) {
    $scope.galley_full=function(id){
       // alert("gallery");
        console.log(id);
     var gallery = $httpParamSerializer({
                        id:id
                                });
                          
            console.log(gallery);
             //alert("location_2")
            // $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'testapi/resgallerybyid', gallery )
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0){
                $rootScope.full_image=response.data.Gallery;
                console.log($rootScope.full_image);
                $state.go("menu.galleryFull");
            }else{
                
            }
            })
        }


})
.controller('paymentconfirmationCtrl', 

function ($scope, $stateParams) {


})


.controller('historyCtrl', 
function ($scope, $stateParams,$rootScope, $ionicLoading,Base_URL,$http,$state,$httpParamSerializer,$window,$ionicPopup) {
 $rootScope.Userid = $window.localStorage.getItem("user_id");
  $scope.history=function(){
      
     var history = $httpParamSerializer({
                        userid:$rootScope.Userid,
                                });
                          
            console.log(history);
             //alert("location_2")
             $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'Testapi/drink_history', history)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0){
                $ionicLoading.hide();
                $rootScope.hist_list = response.data;
                console.log($rootScope.hist_list);
                $state.go("menu.history")
            }else
            {
                $ionicLoading.hide();
                if($rootScope.currentLanguage=="English") {
                var myPopup = $ionicPopup.show({
                          
                           //title: 'Oops',
                           template: "No drink history yet",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           //title: 'Oops',
                           template: "Noch keine eingelösten Getränke",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                
              //  alert(response.msg);
            }
            
        });
    };
$scope.gohistory=function(historyid, lat, lang){
         var restdata = $httpParamSerializer({
            res_id:historyid,
            user_id:$rootScope.Userid,
            longitude:lang,
            latitude:lat
        })
       
        console.log(restdata);
        $ionicLoading.show();
         $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
         $http.post(Base_URL+'restaurants/restaurantbyid',restdata)
         .success(function (response)
            {
                console.log(response);
                if(response.isSucess == "true"){
                   $ionicLoading.hide();
                   $rootScope.rest_detail=response.data;
                  // $rootScope.gallery_data = response.gallery;
                  // console.log($rootScope.gallery_data)
                   
                   $rootScope.gallery_lenght = response.gallery.length;
                   console.log($rootScope.gallery_lenght)
                     if(response.gallery.length >= 4){ 
                         
                          var gallery_images=[]
                   for(var i=0; i<4 ;i++){
                   gallery_images.push(response.gallery[i]);
                   }
                  $rootScope.gallery_data=gallery_images;
                     }else{
                         $rootScope.gallery_data=response.gallery;
                         
                         //delete $rootScope.gallery_data;
                     }
                   $rootScope.rest_id=response.data.id;
                   $rootScope.rest_lat=response.data.latitude;
                    $rootScope.rest_long=response.data.longitude;
                  
                   $window.localStorage.setItem("rest_id", response.data.id);
                        
                   $rootScope.distance=response.distance;
                 //  $rootScope.image={"0":response.data.bannerone,"1":response.data.bannertwo,"2":response.data.bannerthree,"3":response.data.bannerfour};
                   
                 //  console.log($rootScope.image)
                   $state.go("menu.restaurantDetails"); 
                }else{
                    $ionicLoading.hide();
                    if($rootScope.currentLanguage=="English") {
                     var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Bar Detail not available",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Bar Detail nicht verfügbar",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                    
                   // alert("no data");
                }
                
                     });
    
};

})

.controller('discoverCtrl', 
function ($scope, $stateParams, $cordovaSocialSharing,$window,$rootScope,$ionicLoading,$httpParamSerializer,$http,Base_URL,$state,$cordovaClipboard) {
    
    $scope.earn_free=function(){
        //alert("my");
        $rootScope.Userid = $window.localStorage.getItem("user_id");
    
        var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                });
                            console.log(userdata);
                            $ionicLoading.show();
                           $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.msg == "Success"){
                             $ionicLoading.hide();
                            //  alert("signIn successfull");
                            console.log(response);
                             console.log(response.data[0][0].counter);
                             $rootScope.counter_drink=response.data[0][0].counter;
                             if(response.data[0][0].counter>=6){
                                 $rootScope.counter_drink=6;
                             }
                            
                            $rootScope.User_data = response.data[0].User;
                            console.log($rootScope.User_data);
                            
                         $ionicLoading.hide();
                         $state.go("menu.discover");
                     }else{
                      $ionicLoading.hide();
                        // alert("no data")
                     }
                       
                     });
                   
             
    }
    
   $scope.invite_friend=function(code){
       var coupon = code;
        if($rootScope.currentLanguage=="English") {
    //   alert("friends")
//    var demo_link_new = "http://rajdeep.crystalbiltech.com/thoag/signin"
   var test_link = "https://play.google.com/store/apps/details?id=com.boozie.a1421";
//    var test = "thoagapp://signin"
//    var demo_link ="itms-apps://itunes.apple.com/us/app/thoagapp/1187268461"
//    //var message = "Hi, Check "+restaurant_name+" at the following link  "+test+" Check demo link here "+demo_link_new+" "+test_link;
//    var message = "Hi, Check "+restaurant_name+" at the following link  "+test;
    var message = "Install and get Free Drinks " +test_link+  " Use my Referral code after registration at the 'Plans & Billing' Menu: " +coupon ;
   // console.log(message)
     $cordovaSocialSharing
    .share(message) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });
        }else{
             var test_link = "https://play.google.com/store/apps/details?id=com.boozie.a1421";
//    var test = "thoagapp://signin"
//    var demo_link ="itms-apps://itunes.apple.com/us/app/thoagapp/1187268461"
//    //var message = "Hi, Check "+restaurant_name+" at the following link  "+test+" Check demo link here "+demo_link_new+" "+test_link;
//    var message = "Hi, Check "+restaurant_name+" at the following link  "+test;
    var message = "Installieren und Kostenlose Getränke bekommen " +test_link+  " Verwende meinen Empfehlungscode nach der Registrierung im 'Mitgliedschaft & Bezahlung' Menü: " +coupon ;
   // console.log(message)
     $cordovaSocialSharing
    .share(message) // Share via native share sheet
    .then(function(result) {
      // Success!
    }, function(err) {
      // An error occured. Show a message to the user
    });
        }

//  $cordovaSocialSharing
//    .shareViaTwitter(my)
//    .then(function(result) {
//      // Success!
//    }, function(err) {
//      // An error occurred. Show a message to the user
//    });
////
//  $cordovaSocialSharing
//    .shareViaWhatsApp(my)
//    .then(function(result) {
//      // Success!
//    }, function(err) {
//      // An error occurred. Show a message to the user
//    });
//
//  $cordovaSocialSharing
//    .shareViaFacebook(my)
//    .then(function(result) {
//      // Success!
//    }, function(err) {
//      // An error occurred. Show a message to the user
//    });
////
////  // access multiple numbers in a string like: '0612345678,0687654321'
//  $cordovaSocialSharing
//    .shareViaSMS(my)
//    .then(function(result) {
//      // Success!
//    }, function(err) {
//      // An error occurred. Show a message to the user
//    });
////
////// toArr, ccArr and bccArr must be an array, file can be either null, string or array
//  $cordovaSocialSharing
//    .shareViaEmail(my)
//    .then(function(result) {
//      // Success!
//    }, function(err) {
//      // An error occurred. Show a message to the user
//    });
//
//  $cordovaSocialSharing
//    .canShareVia(my)
//    .then(function(result) {
//      // Success!
//    }, function(err) {
//      // An error occurred. Show a message to the user
//    });
//
//  $cordovaSocialSharing
//    .canShareViaEmail()
//    .then(function(result) {
//      // Yes we can
//    }, function(err) {
//      // Nope
//    });

   }
   
   ///////////////////////////////copypaste///////////////////////
//     $cordovaClipboard
//    .copy('text to copy')
//    .then(function () {
//      // success
//    }, function () {
//      // error
//    });
//
//  $cordovaClipboard
//    .paste()
//    .then(function (result) {
//      // success, use result
//    }, function () {
//      // error
//    });

})
.controller('coupanCtrl', 
function ($scope, $stateParams, $ionicLoading,$window,$rootScope,$http,Base_URL,$httpParamSerializer,$ionicPopup,$state) {
$scope.data={};

$scope.referral_code=function(){
    //alert("my")
    if($scope.data.re){
console.log($scope.data.re);
$rootScope.Userid = $window.localStorage.getItem("user_id");
    
        var data = $httpParamSerializer({
                            userid:$rootScope.Userid,
                            coupon_code:$scope.data.re,
                            status:0
                                });
                            console.log(data);
                            $ionicLoading.show();
                           $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                           $http.post(Base_URL+'Testapi/couponapply',data)
                        .success(function (response)
                        {
                         console.log(response);
                         if(response.Status == 5){
                              $ionicLoading.hide();
                              if($rootScope.currentLanguage=="English") {
                                var myPopup = $ionicPopup.show({
                          
                           // title: 'Congratulations!',
                           template: "Your Discount is accepted. Please go to 'Menu > Plans & Billing' to subscribe your membership.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $state.go('menu.location');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           // title: 'Congratulations!',
                           template: "Ihr Rabatt wird akzeptiert. Bitte gehen Sie zu 'Menü> Pläne & Abrechnung', um Ihre Mitgliedschaft zu abonnieren..",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $state.go('menu.location');
                            }}
                            ]
                            });
                        }
                         }
                       else if(response.Status == 4){
                               $ionicLoading.hide();
                             if($rootScope.currentLanguage=="English") {
                            
                                var myPopup = $ionicPopup.show({
                          
                            //title: 'Oops,',
                           template: "Already Used Referral code By You",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            //title: 'Oops,',
                           template: "Dieser Empfehlungscode wurde bereits verwendet",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                         }
                         else if(response.Status == 3){
                             $ionicLoading.hide();
                             if($rootScope.currentLanguage=="English") {
                            
                                var myPopup = $ionicPopup.show({
                          
                            //title: 'Oops,',
                           template: "You can not use own referall code",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            //title: 'Oops,',
                           template: "Du kannst nicht Deinen eigenen Empfehlungscode verwenden",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        } 
                         }
                         else if(response.Status == 2){
                             $ionicLoading.hide();
                             if($rootScope.currentLanguage=="English") {
                            
                                var myPopup = $ionicPopup.show({
                          
                            //title: 'Oops,',
                           template: "Invalid referral code",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            //title: 'Oops,',
                           template: "Ungültiger Empfehlungscode",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        } 
                         }else{
                                                         if($rootScope.currentLanguage=="English") {
                            
                                var myPopup = $ionicPopup.show({
                          
                            //title: 'Oops,',
                           template: "User not found",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            //title: 'Oops,',
                           template: "Benutzer nicht gefunden",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        } 
                         }
                     })
}else{
    if($rootScope.currentLanguage=="English") {
       var myPopup = $ionicPopup.show({
                          
                           // title: 'Oops,',
                           template: "Enter a Referral Code",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                           var myPopup = $ionicPopup.show({
                          
                           // title: 'Oops,',
                           template: "Empfehlungscode eingeben",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            }); 
                        }
    
}
}
$scope.referral_plans=function(){
    //alert("my")
    if( $rootScope.coupanused == 0){
        
        $scope.data.plan_dis='';
        $rootScope.coupan_not_apply==0;    ///coupan already apply
        $ionicLoading.hide();
        if($rootScope.currentLanguage=="English") {
                                var myPopup = $ionicPopup.show({
                          
                            title: 'Oops,',
                           template: "You have already entered a code",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                            title: 'Hoppla,',
                           template: "You have already entered a code",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
    }else{
    if($scope.data.plan_dis){
console.log($scope.data.plan_dis);
$rootScope.Userid = $window.localStorage.getItem("user_id");
    
        var data = $httpParamSerializer({
                            userid:$rootScope.Userid,
                            coupon_code:$scope.data.plan_dis,
                            status:1
                                });
                            console.log(data);
                            $ionicLoading.show();
                           $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                           $http.post(Base_URL+'Testapi/couponapply',data)
                        .success(function (response)
                        {
                         console.log(response);
                         console.log(response.type);
                         if(response.error == 0){
                             $ionicLoading.hide();
                              $rootScope.coupan_used=response.type;
                              console.log($rootScope.coupan_used);
                              $scope.data.plan_dis= '';
                              
                              $rootScope.coupan_code=response.coupon;
                              console.log($rootScope.coupan_code);
                               $rootScope.coupanused=0; ///coupan_applied
                             
                              
                               $rootScope.refe_discount=response.discount;
                               console.log($rootScope.refe_discount);
                               $rootScope.category=response.category;
                               console.log($rootScope.category);
                                 if(response.category==0){
                                $rootScope.cate_monthly=1;  
                                $rootScope.cate_yearly=0; 
                                $rootScope.refe_discount_month = response.discount;
                                $rootScope.refe_discount_year=0;
                             }
                             else if(response.category==1){
                               $rootScope.cate_monthly=0;  
                                    $rootScope.cate_yearly=1;
                                    
                                    $rootScope.refe_discount_year = response.discount;
                                $rootScope.refe_discount_month=0;
                             }
                             else{
                                 $rootScope.cate_monthly=1;  
                                 $rootScope.cate_yearly=1;
                                  $rootScope.refe_discount_year = response.discount;
                                $rootScope.refe_discount_month=response.discount;
                             }
                             
                             console.log($rootScope.cate_yearly,$rootScope.cate_monthly);
                               
                         
                         }else{
                              $ionicLoading.hide();
                              if($rootScope.currentLanguage=="English") {
                                var myPopup = $ionicPopup.show({
                          
                            title: 'Oops,',
                           template: "Invalid referral code",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                            title: 'Oops,',
                           template: "Ungültiger Empfehlungscode",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                             
                         }
                     })
}else{
    if($rootScope.currentLanguage=="English") {
       var myPopup = $ionicPopup.show({
                          
                           // title: 'Oops,',
                           template: "Enter a Referral Code",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                          var myPopup = $ionicPopup.show({
                          
                           // title: 'Oops,',
                           template: "Empfehlungscode eingeben",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });  
                        }
                        }
                    }
                }

           
     
       
            })
.controller('profileCtrl', 
function ($scope, $stateParams,$window,$state,$ionicHistory,$rootScope,$ionicLoading,Base_URL,$http,$httpParamSerializer,$translate) {
    $scope.data={};
 $rootScope.Userid = $window.localStorage.getItem("user_id");
  
 var plan_show = $httpParamSerializer({
                id:$rootScope.Userid
         })
        console.log(plan_show);
        $http.post(Base_URL+'users/user',plan_show)
        .success(function (response)
            {
        console.log(response);
        if(response.msg == "Success"){
            $rootScope.User_data=response.data[0].User;
           
        $ionicLoading.hide();
        console.log(response);
        if(response.data[0].User.language == 0){
           // alert("hhh")
             $scope.data.choice="English";
        }else{
           // alert("hhgg")
             $scope.data.choice="Deutsche";
        }
       console.log($scope.data.choice);
        $rootScope.shw_plan = response.data[0].User.latest_plan;
     
       console.log($rootScope.shw_plan);
       if($rootScope.shw_plan == "0"){
       console.log("trail") 
       if($rootScope.currentLanguage=="English") {
       $scope.status = "No active membership";
   }else{
       $scope.status = "Keine aktive Mitgliedschaft";
   }
       console.log( $scope.trail)
       }else if($rootScope.shw_plan == "2"){
            if($rootScope.currentLanguage=="English") {
            console.log("asd")  
       $scope.status = "Yearly";
   }else{
      $scope.status ="Jährlich";
   }
       }else{
           if($rootScope.currentLanguage=="English") {
          $scope.status = "Monthly"; 
      }else{
           $scope.status = "Monatlich"; 
      }
       }
                           
                      
                        }
                    })
                    
           $scope.setLang_profile = function(langKey,lan_g) {
        // alert(langKey);
    // You can change the language during runtime
    console.log(lan_g);
    $rootScope.change_lang=lan_g;
    console.log($rootScope.change_lang);
    if(langKey == "English"){
       
       $rootScope.select_Language=0;
       $rootScope.sel=0;
    }else if(langKey == "Deutsche"){
        console.log("")
       
       $rootScope.select_Language=1;
       $rootScope.sel=1;
    }else{
        $rootScope.select_Language=lan_g;
    }
    console.log($rootScope.select_Language)
    $rootScope.select_Language=lan_g
    $translate.use(langKey);
    $rootScope.currentLanguage = $translate.use();
    console.log($translate.use())
    
    var editdata=$httpParamSerializer({
            id:$rootScope.Userid,
            name:$rootScope.User_data.name,
            phone:$rootScope.User_data.phone,
            email:$rootScope.User_data.email,
            dob:$rootScope.User_data.dob,
            city:$rootScope.User_data.city,
            gender:$rootScope.User_data.gender,
            country:$rootScope.User_data.country,
            last_name:$rootScope.User_data.last_name,
            language:$rootScope.sel
        })
        console.log(editdata);
         $ionicLoading.show();
         $http.post(Base_URL+'users/editprofile',editdata)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSucess == "true"){
               // $ionicLoading.hide();
                  var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
        $http.post(Base_URL+'users/user',userdata)
            .success(function (response)
                        {
            console.log(response);
                         if(response.msg == "Success"){
                             if(response.data[0].User.language == 0){
           // alert("hhh")
             $scope.data.choice="English";
        }else{
           // alert("hhgg")
             $scope.data.choice="Deutsche";
        }
                            $ionicLoading.hide();
                           // console.log(response);
                          // $rootScope.profilepic =$window.localStorage.getItem('profilepic');
                          //  $rootScope.User_data = response.data[0].User;
                           // console.log($rootScope.User_data);
                            //$rootScope.profilepic= $rootScope.User_data.image
                           // console.log($rootScope.profilepic);
                           
                            if(response.data[0].User.language == 0){
           // alert("hhh")
             $scope.data.choice="English";
        }else{
           // alert("hhgg")
             $scope.data.choice="Deutsche";
        }
       console.log($scope.data.choice);
        $rootScope.shw_plan = response.data[0].User.latest_plan;
     
       console.log($rootScope.shw_plan);
       if($rootScope.shw_plan == "0"){
       console.log("trail") 
       if($rootScope.currentLanguage=="English") {
       $scope.status = "No active membership";
   }else{
       $scope.status = "Keine aktive Mitgliedschaft";
   }
       console.log( $scope.trail)
       }else if($rootScope.shw_plan == "2"){
            if($rootScope.currentLanguage=="English") {
            console.log("asd")  
       $scope.status = "Yearly";
   }else{
      $scope.status ="Jährlich";
   }
       }else{
           if($rootScope.currentLanguage=="English") {
          $scope.status = "Monthly"; 
      }else{
           $scope.status = "Monatlich"; 
      }
       }
                           
                           
                           
                         }
                         else{
                           $ionicLoading.hide();  
                         };
                     });
              
                
            }else{
                $ionicLoading.hide();
                
            };
        })
    
  };         
                    
                    
     $scope.logout=function(){
        $window.localStorage.removeItem("user_id");
        delete $rootScope.User_data;
          $window.localStorage.clear();
          $ionicHistory.clearCache();
           $ionicHistory.clearHistory();
        $state.go("menu.slider",{reload:true});
    };



})
   
.controller('reservationCtrl', ['$scope','$state', '$stateParams', '$ionicScrollDelegate','$ionicPopup', '$timeout', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$state, $stateParams, $ionicScrollDelegate,  $ionicPopup, $timeout) {

  var el = document.getElementById("div2");


  $scope.scrollEvent = function() {
	  
  $scope.scrollamount = $ionicScrollDelegate.$getByHandle('scrollHandle').getScrollPosition().top;
  if ($scope.scrollamount > 180) {
    $scope.$apply(function() {
		el.classList.remove("map_header");
       console.log('1');
    });
  } else {
    $scope.$apply(function() {
		el.className += " map_header";
      console.log('2');
    });
  }
};



   // A confirm dialog
   $scope.showConfirm = function() {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Consume Ice Cream',
       template: 'Are you sure you want to eat this ice cream?'
     });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
		 $state.go('menu.checkout');
       } else {
         console.log('You are not sure');
       }
     });
   };

   // An alert dialog
   $scope.showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Don\'t eat that!',
       template: 'It might taste good'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
   };

}])


.controller('menuFoodCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuFood2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('citylistingCtrl',function ($scope, $stateParams,$http,$rootScope,$ionicLoading,$window,$state,Base_URL,$httpParamSerializer,$ionicPopup) {
$scope.data={};
    $http.get(Base_URL+'restaurants/getallrecommanded')  
            .success(function (resp)
                {
            console.log(resp);
    if(resp.isSuccess == "true"){
     $scope.top_venus = resp.data;
     console.log($scope.top_venus)
    }  else{
       // alert("no data ")
    }      
          
                     });
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    $scope.lat =  $window.localStorage.getItem('lat');
             $scope.long =  $window.localStorage.getItem('long');
                 $rootScope.search_city =function(name){
        $rootScope.searchforfilter=4;
         $rootScope.searchfgfhr=name;
       // alert($rootScope.searchforfilter);
        if($scope.data.city){
            $rootScope.formatted_address=$scope.data.city;
         console.log($scope.data.city);
         var loaction = $httpParamSerializer({
                        latitude: $scope.lat, 
                        longitude: $scope.long,
                        name:$scope.data.city
                    })
                    $ionicLoading.show();         
            console.log(loaction);
            $http.post(Base_URL+'restaurants/searchbynameresturent', loaction)
                    .success(function (response) 
                    {
           console.log(response);
           if(response.isSuccess == "true"){
               $ionicLoading.hide();
               $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                $state.go("menu.nearestRestaurants")
           }else{
                $ionicLoading.hide();
                if($rootScope.currentLanguage=="English") {
               var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'No Venue available... select another city',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'Keine Venue vorhanden ... eine andere Stadt auswählen',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
           }
                    })
                }else{
                    $rootScope.formatted_address=name;
                    $rootScope.searchfgfhr=name;
                    
                    var loaction = $httpParamSerializer({
                        latitude: $scope.lat, 
                        longitude: $scope.long,
                        city:name
                    })
                    $ionicLoading.show();
                             
            console.log(loaction);
            $http.post(Base_URL+'restaurants/searchbycity', loaction)
                    .success(function (response) 
                    {
           console.log(response);
           if(response.isSuccess == "true"){
               $ionicLoading.hide();
               $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                $state.go("menu.nearestRestaurants")
           }else{
               $ionicLoading.hide();
               if($rootScope.currentLanguage=="English") {
                              var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'No Venue available... ',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                            }else{
                               var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'Keine Venue vorhanden ... ',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            }); 
                            }
             //  alert("There are no restaurant available... select another city")
           }
                    })
                    
                }
 };
    $rootScope.search_city1 =function(name){
      //alert("searh");
        $rootScope.searchforfilter=0;
        //alert($rootScope.searchforfilter);
        if($scope.data.city){
            $rootScope.formatted_address=$scope.data.city;
         console.log($scope.data.city);
         $rootScope.searchbynamer=$scope.data.city;
         var loaction = $httpParamSerializer({
                        latitude: $scope.lat, 
                        longitude: $scope.long,
                        name:name
                    })
                    $ionicLoading.show();         
            console.log(loaction);
            $http.post(Base_URL+'restaurants/searchbynameresturent', loaction)
                    .success(function (response) 
                    {
           console.log(response);
           if(response.isSuccess == "true"){
               $ionicLoading.hide();
               $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                $scope.data.city="";
                $state.go("menu.nearestRestaurants")
           }else{
                $ionicLoading.hide();
                if($rootScope.currentLanguage=="English") {
               var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'No Venue available... select another city',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                           var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'Keine Venue vorhanden ... eine andere Stadt auswählen',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });  
                        }
           }
                    })
                }else{
                    $rootScope.formatted_address=name;
                    var loaction = $httpParamSerializer({
                        latitude: $scope.lat, 
                        longitude: $scope.long,
                        city:name
                    })
                    $ionicLoading.show();
                             
            console.log(loaction);
            $http.post(Base_URL+'restaurants/searchbycity', loaction)
                    .success(function (response) 
                    {
           console.log(response);
           if(response.isSuccess == "true"){
               $ionicLoading.hide();
               $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                $state.go("menu.nearestRestaurants")
           }else{
               $ionicLoading.hide();
                if($rootScope.currentLanguage=="English") {
                              var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'No Venue available... select another city',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: 'Keine Venue vorhanden ... eine andere Stadt auswählen',
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }

             //  alert("There are no restaurant available... select another city")
           }
                    })
                    
                }
 };
        $rootScope.top=function(id){
           // alert(id);
       $rootScope.iddddd= id;
       console.log(id);
           // alert($rootScope.searchforfilter);
            $rootScope.searchforfilter=3;
             console.log($rootScope.searchforfilter);
            $rootScope.formatted_address="Bars";
             var loaction = $httpParamSerializer({
                        latitude: $scope.lat, 
                        longitude: $scope.long,
                        catid:id
                    })
                    $ionicLoading.show();
                             
            console.log(loaction);
            $http.post(Base_URL+'restaurants/topbar', loaction)
                    .success(function (response) 
                    {
           console.log(response);
           if(response.isSuccess == "true"){
               $ionicLoading.hide();
               $rootScope.resturant_list = response.data.Restaurant;
                console.log($rootScope.resturant_list);
                $state.go("menu.nearestRestaurants")
               $ionicLoading.hide();
           }else{
                $ionicLoading.hide();
                  if($rootScope.currentLanguage=="English") {
                var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "There is no Venue available",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
               // alert(response.msg)
           }else{
               var myPopup = $ionicPopup.show({
                          
                           // title: 'Your Email Address or Password are incorrect'  ,
                           template: "Aktuell keine Venue verfügbar",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
           }
       }
                    });
            
        }


})
   
.controller('mainMenuCtrl', 
function ($scope, $stateParams,$http,$rootScope,$state,Base_URL,$httpParamSerializer,$ionicLoading,$ionicPopup,$ionicModal,$window) {
 $ionicModal.fromTemplateUrl('templates/filterdrink.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal5 = modal;
       $http.post(Base_URL+'testapi/getalldrink')
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error== 0){
                $rootScope.darru_filter= response.data;
            }
                    })
   });
   $scope.closeModal5 = function() {
      $scope.modal5.hide();
   };
   $scope.data={};
    $rootScope.restid = $window.localStorage.getItem("rest_id");
 $scope.filter_drinkkk=function(){
    // console.log($scope.data.drink);
     
          var drink = "";
  console.log($scope.data.drinkk);
  angular.forEach($scope.data.drinkk,function(key,value){
      if(key == true){
      
      drink+='---'+value;
    }
  },drink);
  console.log(drink);
  var pro_detail = $httpParamSerializer({
                        resid: $rootScope.restid,
                        category:drink
                                });
                          
            console.log(pro_detail);
             //alert("location_2")
             $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'products/productlist', pro_detail)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0){
                $ionicLoading.hide();
                $rootScope.prod_list = response.data;
                console.log($rootScope.prod_list);
                $state.go("menu.mainMenu")
                 $scope.modal5.hide();
            }else
            {
                $ionicLoading.hide();
                if($rootScope.currentLanguage=="English") {
                var myPopup = $ionicPopup.show({
                          
                          //  title: 'Email Address Already exist',
                           template: "No drink available. Select another",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                          //  title: 'Email Address Already exist',
                           template: "Kein Getränk vorhanden Wähle einen anderen",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
            }
                    })
     
 }
 
  
    $scope.single_prodetail=function(pro_id){
       // alert(pro_id);
     var prodetail = $httpParamSerializer({
                        id:pro_id
                                });
                          
            console.log(prodetail);
             $ionicLoading.show();
             //alert("location_2")
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'products/getdrinkdetailbyid', prodetail)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0){
                 $ionicLoading.hide();
                $rootScope.productDetail = response.data;
                console.log($rootScope.productDetail);
                $rootScope.Product_quantity =parseInt(response.data.Product.quantity); 
                console.log($rootScope.Product_quantity);
                 $rootScope.Product_sell = parseInt(response.data.Product.selldrink);
                 console.log($rootScope.Product_sell);
                $state.go("menu.mainMenu2");
            }else{
                 $ionicLoading.hide();
            }
            
        });
    };


})
.controller('mainMenu2Ctrl', 
function ($scope, $stateParams,$http,Base_URL,$rootScope,$state,$window,$httpParamSerializer,$ionicLoading,$ionicPopup) {
     $rootScope.Userid = $window.localStorage.getItem("user_id");
    $scope.startTimer=function(pro_id){
        console.log(pro_id);
        var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                });
                            console.log(userdata);
                            $ionicLoading.show();
                           $http.post(Base_URL+'users/user',userdata)
                        .success(function (response)
                        {
                             $ionicLoading.hide();
                         console.log(response);
                         console.log(response.data[0].User.today_freedrink);
                         if(response.data[0].User.today_freedrink == 1){
                             $ionicLoading.hide();
                          //  $scope.$broadcast('timer-start');
                           // $scope.timerRunning = true;
//                             var myPopup = $ionicPopup.show({
//                          
//                          title: 'ready to redeem your free drink?<span class="cross55"><i class="ion-close-circled" ></i></span>',
//                           template: "Make sure you are near by the bar tender or server. You have 3 Minutes to show the screen to the bartender or server.",
//                            cssClass: 'value_sec',
//                            scope: $scope,
//                            buttons: [
//                            { text: '<span class="oky">Okay</span>',
//                            onTap: function(e) {
//                             $state.go("menu.confirmation",{'pro_id':pro_id},{reload:true});
//                            }}
//                            ]
//                            });
                       if($rootScope.currentLanguage=="English") {     
     var confirmPopup = $ionicPopup.confirm({
       title: 'Ready to redeem your free drink?',
       template: "Make sure you are near by the bar tender or server. You have 3 Minutes to show the screen to the bartender or server."
       
                                });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
	 $state.go("menu.confirmation",{'pro_id':pro_id},{reload:true});
       } else {
         console.log('You are not sure');
       }
     });
 }else{
      var confirmPopup = $ionicPopup.confirm({
       title: 'Bereit ihr kostenloses Getränk einzulösen?',
       template: "Stelle sicher, dass Du in der Nähe des Barkeeper oder Kellner bist. Du hast 3 Minuten, um Dein Handy Bildschirm den Barkeeper oder Kellner zu zeigen."
       
                                });
     confirmPopup.then(function(res) {
       if(res) {
         console.log('You are sure');
	 $state.go("menu.confirmation",{'pro_id':pro_id},{reload:true});
       } else {
         console.log('You are not sure');
       }
     });
 }

        }
    else if(response.data[0].User.today_freedrink == 0 && response.data[0].User.total_freedrink == 0 && response.data[0].User.redeem_freedrink == 0) {
         $ionicLoading.hide();
         if($rootScope.currentLanguage=="English") {     
                                 var myPopup = $ionicPopup.show({
                          
                            title: 'Oops,',
                           template: " Sorry but you don’t have an active membership. Please subscribe to a plan and start free drinking",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title: 'Oops,',
                           template: "Sorry, aber du hast keine aktive Mitgliedschaft. Bitte abonnieren Sie einen Plan und starten Sie kostenloses Trinken",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                            
                        }
                            } else{
                                $ionicLoading.hide();
                                 if($rootScope.currentLanguage=="English") {     
                                 var myPopup = $ionicPopup.show({
                          
                            title: 'Oops,',
                           template: "Sorry but you have redeemed your daily free drink already. Please come back tomorrow to claim your next free drink.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title: 'Hoppla,',
                           template: "Tut mir leid, aber du hast Dein tägliches freies Getränk schon eingelöst. Komme bitte morgen zurück, um Dein nächstes kostenloses Getränk einzulösen.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
                            };
                     });
                   
                };
    
    
    
//    

})
.controller('filterdrinknewCtrl', 
function ($scope, $stateParams,$http,Base_URL,$state,$ionicLoading,$httpParamSerializer) {
//$scope.drinknew_fliter = function(){
//$scope.data={}
//    alert("drink fliter")
//       $http.get(Base_URL+'testapi/getalldrink')  
//            .success(function (resp)
//                {
//            console.log(resp);
//    if(resp.error == 0){
//     $scope.filterdata = resp.data;
//     console.log($scope.filterdata)
//     $state.go("menu.filterdrinknew")
//    }  else{
//       alert("no data ")
//   }      
//          
//                     });
//     /////////////////filter/////////////////////////
//   
//     $scope.drinkfilter_list=function(){
//         alert("apply")
//     var drinkcat = "";
//  console.log($scope.data.drinkcat);
//  angular.forEach($scope.data.drinkcat,function(key,value){
//      
//      console.log(value);
// 
//      
//      if(key == true){
//      
//      drinkcat+=value+'--';
//    
//    }
//  },drinkcat);
//    console.log(drinkcat);
//    var loaction = $httpParamSerializer({
//                        latitude: $scope.lat, 
//                        longitude: $scope.long,
//                        drinkcat:drinkcat
//                                });
//                          
//            console.log(loaction);
//           //  $ionicLoading.show();
//             //alert("location_2")
//            $http.post(Base_URL+'restaurants/restaurantslist', loaction)
//                    .success(function (response) 
//                    {
//            console.log(response);
//          //   $ionicLoading.hide();
////            if(response.isSuccess ==  "true")
////            {
////               
////                $rootScope.resturant_list = response.data.Restaurant;
////                console.log($rootScope.resturant_list);
////                            $rootScope.clat =  $rootScope.lat;
////                            $rootScope.clong = $rootScope.long;
////                            //  $rootScope.favrest = response.data.favrest;
////                           
////                                    console.log($rootScope.clat);
////                                    console.log($rootScope.clong);
////			var link = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+$rootScope.clat+','+$rootScope.clong+'&key=AIzaSyBgdQ9h1BXJOBQ2pgMn4eXz_sffMn7vyrE';
////                            $http.post(link).success(function(response) {
////                            console.log(response);
////                            //document.getElementById('place').innerHTML= res[3];
////                             cityname = response.results[0].address_components[3].long_name;
////                        console.log(cityname);
////                         $ionicLoading.hide();
////                    $rootScope.formatted_address =cityname; 
////                   // $state.go("menu.nearestRestaurants");
////                     $scope.modal1.hide();
////                  
////                    })
////                
////            }else{
////                $ionicLoading.hide();
////                var myPopup = $ionicPopup.show({
////                          
////                           // title: 'Your Email Address or Password are incorrect'  ,
////                           template: response.msg,
////                            cssClass: 'value_sec',
////                            scope: $scope,
////                            buttons: [
////                            { text: '<span class="oky">Okay</span>',
////                            onTap: function(e) {
////                             // $state.go('menu.profile');
////                            }}
////                            ]
////                            });
////               // alert(response.msg)
////            }
//          
//       })
//     
//     }

})

.controller('menuItemsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('menuItems2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])




.controller('cartCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('cart2Ctrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('checkoutCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('paymentCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('confirmationCtrl', 
function ($scope, $stateParams,$ionicLoading,$http,Base_URL,$state,$rootScope,$httpParamSerializer,$window,$ionicPopup,$timeout) {
$scope.data={};
      $rootScope.Userid = $window.localStorage.getItem("user_id");
     $rootScope.restid = $window.localStorage.getItem("rest_id");
      $scope.timerRunning = false;
                    $scope.startTimer = function (){
                        $scope.$broadcast('timer-start');
                        $scope.timerRunning = true;
                    };
                    $scope.$on('timer-stopped', function (event, args) {
                        console.log('timer-stopped args = ', args);
                    });
                    var mybutton = angular.element(document.querySelector('#timer'));
                    console.log(mybutton[0])
                  
                  $scope.$watch(function(scope) { return mybutton[0].textContent },
              function() {
                 if(mybutton[0].textContent=="00:00"){
                      $scope.$broadcast('timer-stop');
                     $scope.timerRunning = false;
                     angular.element( document.querySelector( '#confimation_button')).remove()
                     
                            var Free_drink = $httpParamSerializer({
                        userid:$rootScope.Userid,
                        resid:"",
                        drinkid:""
                                });
                          
            console.log(Free_drink);
             //alert("location_2")
             
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'Testapi/drinkbuy', Free_drink)
                    .success(function (response) 
                    {
            console.log(response);
        });
        if($rootScope.currentLanguage=="English") {
        var myPopup = $ionicPopup.show({
                          
                            title:" Oops,",
                            template: " Time expired.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                                $state.go("menu.nearestRestaurants");
                             
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title:" Hoppla,",
                            template: "Zeit abgelaufen.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                                $state.go("menu.nearestRestaurants");
                             
                            }}
                            ]
                            }); 
                        }
                 }            
              }
             );

    $rootScope.Userid = $window.localStorage.getItem("user_id");
     $rootScope.restid = $window.localStorage.getItem("rest_id");
     $scope.product_id=$stateParams.pro_id;
     console.log($scope.product_id);
     console.log($stateParams);
     $scope.Drinks=function(){
      //  alert(Drink_id);
     var Free_drink = $httpParamSerializer({
                        userid:$rootScope.Userid,
                        resid:$rootScope.restid,
                        drinkid:$scope.product_id
                                });
                          
            console.log(Free_drink);
             //alert("location_2")
             $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'Testapi/drinkbuy', Free_drink)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0){
                $ionicLoading.hide();
                $scope.$broadcast('timer-stop');
                  $scope.timerRunning = false;
                  if($rootScope.currentLanguage=="English") {
                 var myPopup = $ionicPopup.show({
                          
                            title:" Congratulations!",
                            template: "Enjoy your Free Drink & Tip Your Bartender.  See you tomorrow for another Free Drink!",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $state.go("menu.nearestRestaurants");
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title:" Glückwünsch!",
                            template: "Genieße Dein kostenloses Getränk & gebe gerne Trinkgeld. Wir sehen uns morgen für ein weiteres kostenloses Getränk!",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             $state.go("menu.nearestRestaurants");
                            }}
                            ]
                            });
                        }
              //  $rootScope.productDetail = response.data[0];
              //  console.log($rootScope.productDetail);
                //$state.go("menu.confirmation")
          }else
           {
               $ionicLoading.hide();
               if($rootScope.currentLanguage=="English") {
               var myPopup = $ionicPopup.show({
                          
                            title:" Oops,",
                            template: "You have no more Free Drink",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title:" Hoppla,",
                            template: "Du kannst Heute kein kostenloses Getränk mehr einlösen.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
           }
            
        });
    };
$scope.Stop_time=function(){
    $scope.$broadcast('timer-stop');
                  $scope.timerRunning = false;
                  
                   var Free_drink = $httpParamSerializer({
                        userid:$rootScope.Userid,
                        resid:$rootScope.restid,
                        drinkid:$scope.product_id
                                });
                          
            console.log(Free_drink);
             //alert("location_2")
             $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'Testapi/drinkbuy', Free_drink)
                    .success(function (response) 
                    {
            console.log(response);
            $ionicLoading.hide();
            $state.go("menu.nearestRestaurants");
          });

}


})
.controller('contactCtrl',
function ($scope, $stateParams,$httpParamSerializer,$rootScope,$ionicLoading,$http,Base_URL,$ionicPopup,$window) {
    $scope.data={};
   
      $http.get(Base_URL+'testapi/version')  
            .success(function (resp)
                {
            console.log(resp);
    if(resp.error == 0){
     $scope.messahge = resp.data;
     console.log($scope.messahge)
    }  else{
        alert("no data ")
    } 
})
   $rootScope.Userid = $window.localStorage.getItem("user_id");
 //////////////////  start show user_detail///////////////////  
 var user_data = $httpParamSerializer({
                id:$rootScope.Userid
         })
        console.log(user_data);
        $http.post(Base_URL+'users/user',user_data)
        .success(function (response)
            {
        console.log(response);
        if(response.msg == "Success"){
        $ionicLoading.hide();
        console.log(response);
        $rootScope.User_data = response.data[0].User;
       $scope.data.custname =  $rootScope.User_data.name;
       $scope.data.custemail = $rootScope.User_data.email;
        console.log($rootScope.User_data);
                           
                      
                        }
                    })
 ////////////////////////end user_detail///////////////////////                   
$scope.contactus=function(){
    console.log($scope.data.reason)
    if($scope.data.reason){
     var contact = $httpParamSerializer({
                       reason:$scope.data.reason,
                       name:$scope.data.custname,
                       email:$scope.data.custemail,
                       message:$scope.data.message,
                       version:$scope.messahge.name
                                });
                          
            console.log(contact);
            // alert(contact);
            $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
            $http.post(Base_URL+'testapi/contactus', contact)
                 .success(function (response)
                     {
                     //    alert(JSON.stringify(response));
            $ionicLoading.hide();
            console.log(response);
           if(response.error==0){
               if($rootScope.currentLanguage=="English") {
               var myPopup = $ionicPopup.show({
                          
                           // title:" Oops,",
                            template: "Message send successfully",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                                $scope.home_page();
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                          var myPopup = $ionicPopup.show({
                          
                           // title:" Oops,",
                            template: "Nachricht erfolgreich gesendet",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                                $scope.home_page();
                             // $state.go('menu.profile');
                            }}
                            ]
                            }); 
                        }
                            
                            
                            
                            
       
            
           }else{
               if($rootScope.currentLanguage=="English") {
                var myPopup = $ionicPopup.show({
                          
                           // title:" Oops,",
                            template: "Something going wrong",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                                
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                             var myPopup = $ionicPopup.show({
                          
                           // title:" Oops,",
                            template: "Etwas ist schiefgelaufen",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                                
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
           }
            
        });
    }else{
         if($rootScope.currentLanguage=="English") {
          var myPopup = $ionicPopup.show({
                          
                           // title:" Oops,",
                            template: "Select the reason",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                           // title:" Oops,",
                            template: "Wählen Sie den Grund aus",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
    }
                    
}

})

.controller('resmapCtrl', 
function ($scope, $stateParams,$rootScope,$window) {
    $scope.lat =  $window.localStorage.getItem('lat');
             $scope.long =  $window.localStorage.getItem('long');
    $scope.mapdirection = function() {
    var destination = [$rootScope.rest_lat, $rootScope.rest_long];
	var start = [$scope.lat, $scope.long];
     launchnavigator.navigate(destination, start).then(function() {
      console.log("Navigator launched");
    }, function (err) {
      console.error(err);
                    });
                };


})


.controller('notificationCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])


.controller('privacyCtrl', 
function ($scope, $stateParams,$http,$ionicLoading,Base_URL,$rootScope,$state,$httpParamSerializer) {
 $scope.privacy=function(){
               // alert("forgot_password");
                // $rootScope.Userid = $window.localStorage.getItem("user_id");
           var view= $httpParamSerializer({
                id:"3"
                })
            $ionicLoading.show();
            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';  
            $http.post(Base_URL+"staticpages/view", view).then(function (response){
            
            console.log(response.data);
            if(response.data.isSucess == "true"){
                $rootScope.privacypolicy=response.data.data.Staticpage
                console.log($rootScope.privacypolicy);
                
            $ionicLoading.hide();   
         
            $state.go("menu.privacy");
         }else{
            $ionicLoading.hide();  
            
          }
        });
    }
})
.controller('editfacebookCtrl', 
function ($scope, $stateParams,$http,Base_URL,$rootScope,$window,$httpParamSerializer,$ionicLoading,$state,$ionicPopup,$translate) {
    $scope.data={};
        $http.get(Base_URL+'users/countryall')  
                        .success(function (response)
                        {
                         console.log(response);
            $scope.countrylist = response.country;
            console.log($scope.countrylist)
                     });
          
   
      console.log($window.localStorage.getItem('face_book'));
     $http.post(Base_URL+'testapi/background')
                        .success(function (response)
                        {
                         console.log(response);
                         $rootScope.Dynam_image=response.data.name;
                         console.log($rootScope.Dynam_image);
                     });
     $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
       $rootScope.profilepic =$window.localStorage.getItem('profilepic');
            //$rootScope.User_data = response.data[0].User;
             console.log($rootScope.User_data);
             $rootScope.currentLanguage='English';
             $scope.data.editname=$rootScope.User_data.name;
             $scope.data.phn=$rootScope.User_data.phone;
             $scope.data.email=$rootScope.User_data.email;
             $scope.data.lastname=$rootScope.User_data.last_name;
             $scope.data.dob=new Date($rootScope.User_data.dob);
             $scope.data.City=$rootScope.User_data.city;
             $scope.data.gender=$rootScope.User_data.gender;
             $scope.data.country=$rootScope.User_data.country;
            console.log($scope.data.country);
     console.log($scope.data);
     $rootScope.sel_Language=0
      $rootScope.Userid = $window.localStorage.getItem("user_id");
      $scope.setLang_facebook = function(langKey,lan_g) {
        // alert(langKey);
    // You can change the language during runtime
    console.log(lan_g);
    $rootScope.change_lang=lan_g;
    console.log($rootScope.change_lang);
    if(langKey == "English"){
       $rootScope.sel_Language=0;
    }else if(langKey == "Deutsche"){
        console.log("")
       $rootScope.sel_Language=1;
    }else{
        $rootScope.sel_Language=lan_g;
    }
    console.log($rootScope.select_Language)
    $rootScope.sel_Language=lan_g
    $translate.use(langKey);
    $rootScope.currentLanguage = $translate.use();
    console.log($translate.use())
  };
      
  
      
            $scope.editfacebook=function(){
                if($scope.data.lang=="Deutsche"){
             $rootScope.sel_Language=1;
        }else{
           $rootScope.sel_Language=0;  
        }
                var userAge = new Date($scope.data.dob);
                  var today = new Date();
                  var age = today.getFullYear() - userAge.getFullYear();
                  var month = today.getMonth() - userAge.getMonth();

                  if (month < 0 || (month === 0 && today.getDate() < userAge.getDate())) {
                      age--;
                   } //this condition checks the month/date difference of both the dates 
                  console.log(age);
        
                  if(age > 18 || age == 18){
                
                 var editdata=$httpParamSerializer({
            id:$rootScope.Userid ,
            email:$scope.data.email
        })
        console.log(editdata);
         $ionicLoading.show();
         $http.post(Base_URL+'users/emailmatch',editdata)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.error == 0)
            {
                delete $rootScope.User_data;
                 console.log($scope.data.email);
        console.log($scope.data);
        var editdata=$httpParamSerializer({
            id:$rootScope.Userid,
            name:$scope.data.editname,
            phone:$scope.data.phn,
            email:$scope.data.email,
            dob:$scope.data.dob,
            city:$scope.data.City,
            gender:$scope.data.gender,
            country:$scope.data.country,
            last_name:$scope.data.lastname,
            language:$rootScope.sel_Language
        })
        console.log(editdata);
         $ionicLoading.show();
         $http.post(Base_URL+'users/editprofile',editdata)
                    .success(function (response) 
                    {
            console.log(response);
            if(response.isSucess == "true"){
               // $ionicLoading.hide();
                  var userdata = $httpParamSerializer({
                            id:$rootScope.Userid
                                })
                            console.log(userdata);
        $http.post(Base_URL+'users/user',userdata)
            .success(function (response)
                        {
            console.log(response);
                         if(response.msg == "Success"){
                            $ionicLoading.hide();
                           // console.log(response);
                           $rootScope.profilepic =$window.localStorage.getItem('profilepic');
                            $rootScope.User_data = response.data[0].User;
                            console.log($rootScope.User_data);
                            //$rootScope.profilepic= $rootScope.User_data.image
                           // console.log($rootScope.profilepic);
                           
                            $state.go("menu.location")
                         }
                         else{
                           $ionicLoading.hide();  
                         };
                     });
              
                
            }else{
                $ionicLoading.hide();
                
            };
        })
    }else{
         $ionicLoading.hide();
        if($rootScope.currentLanguage=="English") {
       
         var myPopup = $ionicPopup.show({
                                         
        title: 'Email Id already exist',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }else{
        var myPopup = $ionicPopup.show({
                                         
        title: 'E-Mail-ID existiert bereits',
        cssClass: 'value_sec',
        scope: $scope,
        buttons: [
        { text: '<span class="oky">Okay</span>',
        onTap: function(e) {
         // $state.go('menu.profile');
        }}
        ]
        });
    }
    }
    })
    }else{
        if($rootScope.currentLanguage=="English") {
        var myPopup = $ionicPopup.show({
                          
                            title: 'Birthday Error',
                            template: "You must be 18 or older to use Boozie.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }else{
                            var myPopup = $ionicPopup.show({
                          
                            title: 'Fehler Geburtsdatum',
                            template: "Du musst 18 oder älter sein, um Boozie zu benutzen.",
                            cssClass: 'value_sec',
                            scope: $scope,
                            buttons: [
                            { text: '<span class="oky">Okay</span>',
                            onTap: function(e) {
                             // $state.go('menu.profile');
                            }}
                            ]
                            });
                        }
        
    }
}
    
}
)



// "EnvironmentProduction": "AWgr0H6Hx20slED3E1XLsPDNLQGNN3Ob5CM5ixAhjZyB7L0urzxFYlk_EkEBLarZCPX920X1mrcKPGGL",
// "EnvironmentSandbox": "ASUcMLBF2-CbGzsrE0mjyaI-NpdOtmzaZ4hGx7NodaUkDLO10xnwt2Z_ZyinpZBURl7pHzIedESyp9mc"
  



 
 

 