<!DOCTYPE html>

<html>
  
  <?php
    $segment = "";
    $company = App\Model\helpdesk\Settings\Company::where('id', '=', '1')->first();
    $portal = App\Model\helpdesk\Theme\Portal::where('id', '=', 1)->first();
    $title = App\Model\helpdesk\Settings\System::where('id', '=', '1')->value('name');
    $title_name = isset($title) ? $title : "SUPPORT CENTER";
    $rtl_class = "";

    if (str_contains($portal->agent_header_color, 'skin')) {
       
      $portal->agent_sidebar_color = str_replace("skin","sidebar-dark", $portal->agent_header_color); 
    } else {
        
      $portal->agent_sidebar_color = $portal->agent_sidebar_color;
    }

    $portal->agent_header_color = $portal->agent_header_color ? str_replace("skin","navbar-dark navbar", $portal->agent_header_color) : 'navbar-light';
    ?>

  <head>
  
    <meta charset="UTF-8">
  
    <base href="{{url('/panel/')}}">
  
    @yield('meta-tags')
    
    <title> {!! strip_tags($title_name) !!} </title>

    <meta content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' name='viewport'>
    
    <meta name="_token" content="{!! csrf_token() !!}"/>
    
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <meta name="api-base-url" content="{{ url('/') }}" />

    <link href="{{$portal->icon}}" rel="shortcut icon">

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

     <?php
        $lang = App::getLocale();
        if($lang == 'ar'){
          $rtl_class = "rtl";
        $adminRTLPath = assetLink('css','adminlte-3-rtl');
        echo "<link href=$adminRTLPath rel='stylesheet' type='text/css'/>";
        } else {
           $rtl_class = "";
          $adminLTRPath = assetLink('css','adminlte-3');
          echo "<link href=$adminLTRPath rel='stylesheet' type='text/css'/>";
        }
      ?>

    <link href="{{assetLink('css','font-awesome-5')}}" rel="stylesheet" type="text/css" />

    <!-- Ionicons -->
    <link href="{{assetLink('css','ionicons')}}" rel="stylesheet"  type="text/css" />

    <link href="{{assetLink('css','jquery-rating')}}" rel="stylesheet" type="text/css" />
  
   <link href="{{assetLink('css','daterangepicker')}}"  rel="stylesheet" type="text/css" />
  
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <link href="{{assetLink('css','nprogress')}}" rel="stylesheet" type="text/css"/>
    
    <link href="{{assetLink('css','select2')}}" rel="stylesheet" type="text/css"  media="none" onload="this.media='all';"/>
    
    <!-- <link rel="stylesheet" href="{{assetLink('css','new-overlay')}}"> -->

    <link rel="stylesheet" href="{{assetLink('css','pagination')}}">

    <link rel="stylesheet" href="{{assetLink('css','glyphicon')}}">

    <link href="{{assetLink('css','intlTelInput')}}" rel="stylesheet" type="text/css" media="none" onload="this.media='all';">

    <style>

      .form-control { font-size: inherit !important; }

      .sidebar { overflow-y: hidden; }

      .sidebar:hover { overflow-y: auto !important; }

      #scroll-bar::-webkit-scrollbar-track
      {
        border-radius:10px;
      }

      #scroll-bar::-webkit-scrollbar
      {
        width: 6px;
      }

      #scroll-bar::-webkit-scrollbar-thumb
      {
        background-color: #7e7e7e;
        border-radius: 10px;
      }

      .sidebar-dark-black .nav-sidebar>.nav-item>.nav-link.active, .sidebar-light-black .nav-sidebar>.nav-item>.nav-link.active {
        background-color: #6c757d;
        color: #fff;
      }

      .navbar-light { background-color: #fff !important; }

      .font-1, .font-1 i { font-size: 1rem !important; }
    </style>

    <style>

      .main-header { border-bottom: unset !important;}
    </style>
    <!-- Browser Notification -->
    <?php
        use App\Model\helpdesk\Settings\Alert;
        $browser_status = false;
        $alert =  new Alert;
        $enabled = $alert->where('key', 'browser_notification_status')->value('value');
        $app_id = $alert->where('key', 'api_id')->value('value');
        $in_app_notification = $alert->where('key', 'browser-notification-status-inbuilt')->value('value');
        $in_app_notification_status = false;
        if($enabled == 1)
            $browser_status = 0;
        if($in_app_notification == 1)
            $in_app_notification_status = 1;
    ?>

    @if($enabled == 1)
    <link rel="manifest" href="/manifest.json">
    <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script>
    <script type="text/javascript">
        // in app notification

        // in app notification ends
        var user =  "{{Auth::guest()}}";
        var OneSignal = window.OneSignal || [];
        OneSignal.push(["init", {
            appId: "<?php echo $app_id; ?>",
            autoRegister: false,
            notifyButton: {
                enable: "{{$browser_status}}" /* Set to false to hide */
            }
        }]);

        if(!user){
            var user_id = "<?php if(Auth::user()){ echo Auth::user()->hash_ids;} ?>";
            var user_role = "<?php if(Auth::user()){ echo Auth::user()->role;} ?>";
            var user_name = "<?php if(Auth::user()){ echo Auth::user()->user_name;} ?>";
            OneSignal.push(function() {
                //These examples are all valid
                OneSignal.sendTag("user_name",user_name);
                OneSignal.sendTag("user_id", user_id);
                OneSignal.sendTag("user_role", user_role);
            });
        }

    </script>
    @endif

    <script type="text/javascript" src="{{asset('browser-detect.min.js')}}" async></script>

    <script src="{{assetLink('js','jquery-3')}}" type="text/javascript" media="none" onload="this.media='all';">
        
    </script>

    <!-- for recaptcha session storage we are using this file-->
    @include('themes.default1.common.recaptcha')

    <script src="{{assetLink('js','polyfill')}}"></script>

    <script src="{{assetLink('js','select2')}}" type="text/javascript"></script>

    <!-- check if lanuage is RTL, if yes, inject bootstrap-RTL -->

    <?php
      try {
        
        $authController = new App\Http\Controllers\Auth\AuthController();

        // auth user data
        $authInfo = $authController->getLoggedInClientInfo();

        $whiteLabel = (\Event::dispatch('helpdesk.apply.whitelabel')) ? true : false;

        $tag = Config::get('app.tags');

        $version = Config::get('app.version');

      } catch(\Exception $e) {
        // ignore exception
      }
    ?>

    @yield('custom-css')

    <?php \Event::dispatch('customcss-event', [['fired_at' => 'agentlayout','request' => Request()]]); ?>

  </head>
  
  <body id="agent_body" class="sidebar-mini layout-fixed layout-navbar-fixed text-sm {{$rtl_class}}">
  

    <script type="text/javascript">
      @php
          $user = Auth::user();
      @endphp
      sessionStorage.setItem('full_name', '{{ $user->full_name }}');
      sessionStorage.setItem('profile_pic', '{!! $user->profile_pic !!}');
      sessionStorage.setItem('user_id', '{{ $user->id }}');
      sessionStorage.setItem('is_rtl', '{{ App::getLocale() == "ar" ? 1 : 0}}');
      sessionStorage.setItem('header_color', '{{ $portal->agent_header_color }}');
      sessionStorage.setItem('data_time_format', '{{ dateTimeFormat() }}');
      sessionStorage.setItem('date_format', '{{ dateFormat() }}');
      sessionStorage.setItem('timezone', '{{ agentTimeZone() }}');
      sessionStorage.setItem('user_role', '{{ $user->role }}');
    </script>

    <div id="app-agent">

      <agent-panel-renderer :auth-info="{{ json_encode($authInfo) }}" :company-info="{{ json_encode($company) }}" :version="{{ json_encode($version) }}"
        :portal-info="{{ json_encode($portal) }}" :white-label="{{ json_encode($whiteLabel) }}" :tag="{{ json_encode($tag) }}" 
        :dummy-install="{{ json_encode($dummy_installation) }}" :is-mail-configured="{{ json_encode($is_mail_conigured) }}">
          
      </agent-panel-renderer>
    </div>

    <script type="text/javascript" src="{{ bundleLink('js/lang' ) }}"></script>

    <script type="text/javascript" src="{{ bundleLink('js/common.js') }}"></script>

    <script type="text/javascript" src="{{ bundleLink('js/agent.js') }}"></script>
    
    <script type="text/javascript" src="{{assetLink('js','popper')}}"></script>
    <!-- Bootstrap 4. JS -->
    <script src="{{assetLink('js','bootstrap-4')}}" type="text/javascript"></script>
    <!-- Slimscroll -->
    <script src="{{assetLink('js','nprogress')}}" type="text/javascript"></script>
    <!-- full calendar-->

    <script src="{{assetLink('js','moment')}}" type="text/javascript"></script>

    <script src="{{assetLink('js','adminlte-3')}}" type="text/javascript"></script>
    
    <script src="{{assetLink('js','daterangepicker-min')}}" type="text/javascript" ></script>
    
    <script src="{{assetLink('js','moment')}}"></script>
    
    <script src="{{assetLink('js','moment-timezone')}}"></script>
    
    <script type="text/javascript" src="{{assetLink('js','moment-timezone-with-data')}}"></script>
    
    <!-- <script src="{{assetLink('js','new-overlay')}}" type="text/javascript"></script> -->

    <?php
      // plugins can add inject scripts or bundles by listening to this event in agent panel.
      Event::dispatch('agent-panel-scripts-dispatch');
    ?>

    <?php Event::dispatch('show.calendar.script', array()); ?>
    
    <?php Event::dispatch('load-calendar-scripts', array()); ?>
    
    <?php \Event::dispatch('timeline-customjs', [['fired_at' => 'agentlayout','request' => Request()]]); ?>
    
    @stack('scripts')
  </body>
</html>