<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>News edit</title>
        <!-- Scripts -->
        @include('layouts.script')
    </head>
    <body>
        <div class="container mt-3 mb-3">
            <h2>Edit news</h2>
            <div class="row mb-5">
                <div class="col">
                    <a href="{{route('home')}}">
                        <button class="btn btn-primary">Kembali ke dashboard</button>
                    </a>
                </div>
                <div class="col">
                    @if ($message = Session::get('success'))
                    <div class="alert alert-success alert-block">
                        <button type="button" class="close" data-dismiss="alert">×</button>	
                        <strong>{{ $message }}</strong>
                    </div>
                    @endif


                    @if ($message = Session::get('error'))
                    <div class="alert alert-danger alert-block">
                        <button type="button" class="close" data-dismiss="alert">×</button>	
                            <strong>{{ $message }}</strong>
                    </div>
                    @endif
                </div>
            </div>

            <form class="mt-3" method="POST" enctype="multipart/form-data" action="/data/news/{{$data['news_id']}}">
                @csrf
                <div class="mb-5">
                  <label for="inputName" class="form-label">Name</label>
                  <input type="text" 
                        value="{{$data['name']}}" 
                        class="form-control" 
                        id="inputName" 
                        name="name" 
                        placeholder="Name">

                </div>

                <div class="mb-5">
                    
                      <div class="row">
                        <div class="col-sm">
                          <img style="max-height: 400px" class="img-fluid rounded shadow" src="{{url('/')}}/storage/files/{{ $data['file'] }}" />
                        </div>
                        <div class="col-sm">
                          <label for="inputFile" class="form-label">News Thumbnail</label>
                          <input type="file" 
                                class="form-control" 
                                id="inputFile" 
                                name="file">
                        </div>
                    
                      </div>
               
                  
                </div>

                <textarea name="text" id="editor1" rows="10" cols="80">
                    {{$data['text']}}
                </textarea>

                <script>
                    CKEDITOR.replace( 'editor1', {

                        filebrowserUploadUrl: '/data/ckupload'
                    });
                    CKEDITOR.config.height = 500;
                </script>

                <button class="btn btn-primary mt-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
       	
    </body>
</html>
