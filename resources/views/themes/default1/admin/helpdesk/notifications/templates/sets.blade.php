@extends('themes.default1.admin.layout.admin')

@section('Emails')
active
@stop

@section('emails-bar')
active
@stop

@section('template')
class="active"
@stop

@section('PageHeader')
<h1>{!! Lang::get('lang.template_set') !!}</h1>
@stop

@section('custom-css')
    <link href="{{assetLink('css','dataTables-bootstrap')}}" rel="stylesheet" type="text/css" media="none" onload="this.media='all';">
@stop

@section('content')
    <div id="app-admin">
        <template-index></template-index>
    </div>
@stop