<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Telkom Digital Solution Care Center</title>
        <script src="{{ mix('js/app.js') }}" defer></script>
    
        <link rel="apple-touch-icon" sizes="180x180" href="{{asset('images/icons')}}/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="{{asset('images/icons')}}/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="{{asset('images/icons')}}/favicon-16x16.png">
      
         <link rel="mask-icon" href="{{asset('images/icons')}}/safari-pinned-tab.svg" color="#ff0b0b">

        <meta name="msapplication-TileColor" content="#da532c">
        <meta name="theme-color" content="#ffffff">

       
        <link rel="manifest" href="{{asset('manifest.json')}}">
        <script>
            if ('serviceWorker' in navigator ) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                        console.log('ServiceWorker registration successful with scope: ', registration.scope);
                    }, function(err) {
                        console.log('ServiceWorker registration failed: ', err);
                    });
                });
            }
        </script>

    </head>
    <body>
        <noscript>
            <h2 style="margin:0">
            Please enable javascript to use this website !
            </h2>
            <br>
            <h2 style="margin:0">
            Silahkan hidupkan fitur javascript pada browser anda untuk membuka website ini 
            </h2>
            <br>
            <a href="https://id.wikihow.com/Mengaktifkan-JavaScript-di-Ponsel-Android" 
            target="_blank" rel="noopener noreferrer">
                Enable javascript
            </a>
        </noscript>
        <div id="root">
        </div>
    </body>
</html>
