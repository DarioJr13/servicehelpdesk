<!DOCTYPE html>
<html lang="en">

<head>
    
    <meta charset="utf-8">
    
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <title>Maintenance Mode</title>

    <!-- Font Awesome Icons -->
    <link href="{{assetLink('css','font-awesome-5')}}" rel="stylesheet" type="text/css" />

    <link href="{{assetLink('css','adminlte-3')}}" rel="stylesheet" type="text/css" />

    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">
    
    <style>
        
        .lockscreen-wrapper {
            max-width: initial !important;
        }
    </style>
</head>

<body class="hold-transition lockscreen">

    <div class="lockscreen-wrapper">
        
        <div class="lockscreen-logo">
            
            <a href="javascript:;"><i class="fas fa-wrench fa-2x" aria-hidden="true"></i><i class="fas fa-cog" aria-hidden="true"></i></a>
        </div>

        <div class="lockscreen-name text-xl">{!! Lang::get('lang.please_wait_for_few_minutes') !!} &nbsp;

            <i class="fas fa-spinner fa-pulse"></i>
        </div>

        <div class="help-block text-center mt-3 text-md">{!! Lang::get('lang.system_under_maintenance_mode') !!}</div> 
    </div>
</body>

</html>
<script>
    setTimeout(() => location.reload(), 20000);
</script>