angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu.slider', {
    url: '/slider',
    views: {
      'side-menu21': {
        templateUrl: 'templates/slider.html',
        controller: 'sliderCtrl'
      }
    }
  })

  
  
  .state('menu.login', {
       cache:false,
    url: '/Login',
    views: {
      'side-menu21': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('menu.signup', {
       cache:false,
    url: '/Signup',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })
  
  .state('menu.forgotPassword', {
    url: '/forgotPassword',
    views: {
      'side-menu21': {
        templateUrl: 'templates/forgotPassword.html',
        controller: 'forgotPasswordCtrl'
      }
    }
  })

  .state('menu.createProfile', {
    url: '/signup',
    views: {
      'side-menu21': {
        templateUrl: 'templates/createProfile.html',
        controller: 'createProfileCtrl'
      }
    }
  })
.state('menu.location', {  
    cache:false,
    url: '/location',
    views: {
      'side-menu21': {
        templateUrl: 'templates/location.html',
        controller: 'locationCtrl'
      }
    }
  })
  .state('menu.step1', {
    url: '/step',
    views: {
      'side-menu21': {
        templateUrl: 'templates/step1.html',
        controller: 'step1Ctrl'
      }
    }
  })

  .state('menu.finalStep', {
    url: '/finalstep',
    views: {
      'side-menu21': {
        templateUrl: 'templates/finalStep.html',
        controller: 'finalStepCtrl'
      }
    }
  })

  .state('menu', {
      cache: false,
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.nearestRestaurants', {
          cache: false,
    url: '/nearestRestaurants',
    views: {
      'side-menu21': {
        templateUrl: 'templates/nearestRestaurants.html',
        controller: 'nearestRestaurantsCtrl'
      }
    }
  })

  .state('menu.favorites', {
      cache:false,
    url: '/favorites',
    views: {
      'side-menu21': {
        templateUrl: 'templates/favorites.html',
        controller: 'favoritesCtrl'
      }
    }
  })
  
  .state('menu.gallery', {
      cache:false,
    url: '/gallery',
    views: {
      'side-menu21': {
        templateUrl: 'templates/gallery.html',
        controller: 'galleryCtrl'
      }
    }
  })
  
  .state('menu.galleryFull', {
    url: '/galleryFull',
    views: {
      'side-menu21': {
        templateUrl: 'templates/galleryFull.html',
        controller: 'galleryFullCtrl'
      }
    }
  })
   .state('menu.filterdrinknew', {
    url: '/filterdrinknew',
    views: {
      'side-menu21': {
        templateUrl: 'templates/filterdrinknew.html',
        controller: 'filterdrinknewCtrl'
      }
    }
  })
  .state('menu.history', {
    url: '/history',
    views: {
      'side-menu21': {
        templateUrl: 'templates/history.html',
        controller: 'historyCtrl'
      }
    }
  })
  
  .state('menu.discover', {
    url: '/discover',
    views: {
      'side-menu21': {
        templateUrl: 'templates/discover.html',
        controller: 'discoverCtrl'
      }
    }
  })
  .state('menu.profile', {
      cache:false,
    url: '/profile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/profile.html',
        controller: 'profileCtrl'
      }
    }
  })
  .state('menu.map', {
    url: '/map',
    views: {
      'side-menu21': {
        templateUrl: 'templates/map.html',
        controller: 'mapCtrl'
      }
    }
  })

  .state('menu.restaurantDetails', {
      cache:false,
    url: '/restaurantDetails',
    views: {
      'side-menu21': {
        templateUrl: 'templates/restaurantDetails.html',
        controller: 'restaurantDetailsCtrl'
      }
    }
  })

  .state('menu.reservation', {
    url: '/reservation',
    views: {
      'side-menu21': {
        templateUrl: 'templates/reservation.html',
        controller: 'reservationCtrl'
      }
    }
  })
  .state('menu.splitbill', {
    url: '/splitbill',
    views: {
      'side-menu21': {
        templateUrl: 'templates/splitbill.html',
        controller: 'splitbillCtrl'
      }
    }
  })

//---------------------//

.state('menu.menuItems', {
    url: '/menuItems',
    views: {
      'side-menu21': {
        templateUrl: 'templates/menuItems.html',
        controller: 'menuItemsCtrl'
      }
    }
  })
.state('menu.menuItems2', {
    url: '/menuItems2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/menuItems2.html',
        controller: 'menuItems2Ctrl'
      }
    }
  })
.state('menu.mainMenu', {
    cache:false,
    url: '/mainMenu',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mainMenu.html',
        controller: 'mainMenuCtrl'
      }
    }
  })
.state('menu.mainMenu2', {
    url: '/mainMenu2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mainMenu2.html',
        controller: 'mainMenu2Ctrl'
      }
    }
  })
.state('menu.menuFood', {
    url: '/menuFood',
    views: {
      'side-menu21': {
        templateUrl: 'templates/menuFood.html',
        controller: 'menuFoodCtrl'
      }
    }
  })
.state('menu.menuFood2', {
    url: '/menuFood2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/menuFood2.html',
        controller: 'menuFood2Ctrl'
      }
    }
  })
.state('menu.cart', {
    url: '/cart',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cart.html',
        controller: 'cartCtrl'
      }
    }
  })
.state('menu.cart2', {
    url: '/cart2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cart2.html',
        controller: 'cart2Ctrl'
      }
    }
  })
  
.state('menu.checkout', {
    url: '/checkout',
    views: {
      'side-menu21': {
        templateUrl: 'templates/checkout.html',
        controller: 'checkoutCtrl'
      }
    }
  })
.state('menu.payment', {
    url: '/payment',
    views: {
      'side-menu21': {
        templateUrl: 'templates/payment.html',
        controller: 'paymentCtrl'
      }
    }
  })
.state('menu.confirmation', {
    url: '/confirmation/:pro_id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/confirmation.html',
        controller: 'confirmationCtrl'
      }
    }
  })
    .state('menu.changepassword', {
    url: '/changepassword',
    views: {
      'side-menu21': {
        templateUrl: 'templates/changepassword.html',
        controller: 'changepasswordCtrl'
      }
    }
  })
   .state('menu.editinfo', {
       cache:false,
    url: '/editinfo',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editinfo.html',
        controller: 'editinfoCtrl'
      }
    }
  })
  
      .state('menu.terms', {
    url: '/terms',
    views: {
      'side-menu21': {
        templateUrl: 'templates/terms.html',
        controller: 'termsCtrl'
      }
    }
  })
  
        .state('menu.FAQ', {
    url: '/FAQ/:idd',
    views: {
      'side-menu21': {
        templateUrl: 'templates/FAQ.html',
        controller: 'FAQCtrl'
      }
    }
  }) 
.state('menu.selectOption', {
    url: '/selectOption',
    views: {
      'side-menu21': {
        templateUrl: 'templates/selectOption.html',
        controller: 'selectOptionCtrl'
      }
    }
  })
  .state('menu.search', {
      cache:false,
    url: '/search',
    views: {
      'side-menu21': {
        templateUrl: 'templates/search.html',
        controller: 'searchCtrl'
      }
    }
  })
    .state('menu.coupan', {
    url: '/coupan',
    views: {
      'side-menu21': {
        templateUrl: 'templates/coupan.html',
        controller: 'coupanCtrl'
      }
    }
  })
  
   .state('menu.paymentInformations', {
    url: '/paymentInformations',
    views: {
      'side-menu21': {
        templateUrl: 'templates/paymentInformations.html',
        controller: 'paymentInformationsCtrl'
      }
    }
  })
  .state('menu.paymentconfirmation', {
    url: '/paymentconfirmation',
    views: {
      'side-menu21': {
        templateUrl: 'templates/paymentconfirmation.html',
        controller: 'paymentconfirmationCtrl'
      }
    }
  })
   .state('menu.citylisting', {
        cache:false,
    url: '/citylisting',
    views: {
      'side-menu21': {
        templateUrl: 'templates/citylisting.html',
        controller: 'citylistingCtrl'
      }
    }
  })
  .state('menu.resmap', {
    url: '/resmap',
    views: {
      'side-menu21': {
        templateUrl: 'templates/resmap.html',
        controller: 'resmapCtrl'
      }
    }
  })
 
   .state('menu.notification', {
    url: '/notification',
    views: {
      'side-menu21': {
        templateUrl: 'templates/notification.html',
        controller: 'notificationCtrl'
      }
    }
  })
  
 .state('menu.contact', {
     cache:false,
    url: '/contact',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contact.html',
        controller: 'contactCtrl'
      }
    }
  })
  .state('menu.privacy', {
    url: '/privacy',
    views: {
      'side-menu21': {
        templateUrl: 'templates/privacy.html',
        controller: 'privacyCtrl'
      }
    }
  })
   .state('menu.editfacebook', {
    url: '/editfacebook',
    views: {
      'side-menu21': {
        templateUrl: 'templates/editfacebook.html',
        controller: 'editfacebookCtrl'
      }
    }
  })
$urlRouterProvider.otherwise('/side-menu21/slider')

  

});