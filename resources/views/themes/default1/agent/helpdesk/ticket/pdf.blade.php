<!DOCTYPE html>
<?php
$lang = \Lang::getLocale();
$class = $lang == 'ar' ? "ar": "nonar";
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    	<style type="text/css">
			.ar {
				direction: rtl;
				text-align: right;
				font-family: 'dejavu sans, arial', sans-serif;
			}

			.nonar{
				font-family: 'dejavu sans, arial,', sans-serif;
				font-size: small;
			}

			.info-row{
				border-top: 1px solid #f4f4f4;
				padding: 10px;
				box-sizing: border-box;
				font-family: 'dejavu sans, arial', sans-serif;
			}

			img {
				max-width: 500px !important;
			}

            .twemoji { width: 20px;height: 20px; }
		</style>
    </head>
	<body class="{!! $class !!}}">
        <?php $ticketDetails =  $ticketDetails->getData(); $ticketDetails = $ticketDetails->data->ticket; ?>
    	<h2 style="text-align: center"><u>{!! "#".$ticketDetails->ticket_number."" !!}</u></h2>
        <br>
        <table class="result_table">
            <tr class="info-row">
                <td><b>{{trans('lang.created_at')}}:</b></td><td>&nbsp;&nbsp;{!! faveoDate($ticketDetails->created_at)  !!}</td>
            </tr>
            <tr class="info-row">
                <td><b>{{trans('lang.subject')}}:</b></td><td>&nbsp;&nbsp;{!! $ticketDetails->title  !!}</td>
            </tr>
            <tr class="info-row">
                <td><b>{{trans('lang.departments')}}:</b></td><td>&nbsp;&nbsp;{!! $ticketDetails->departments->name  !!}</td>
            </tr>
            <tr class="info-row">
                <td><b>{{trans('lang.help_topic')}}:</b></td><td>&nbsp;&nbsp;{!! $ticketDetails->helptopic->name !!}</td>
            </tr>
            @if($allTicketDetails)
            @if ($ticketDetails->updated_at)
            <tr class="info-row">
                <td><b>{{trans('lang.updated_at')}}:</b></td><td>&nbsp;&nbsp;{!! faveoDate($ticketDetails->updated_at)  !!}</td>
            </tr>    
            @endif
            @if ($ticketDetails->status->name)
            <tr class="info-row">
                <td><b>{{trans('lang.status')}}:</b></td><td>&nbsp;&nbsp;{!! $ticketDetails->status->name  !!}</td>
            </tr>    
            @endif
            @if ($ticketDetails->last_replier)
            <tr class="info-row">
                <td><b>{{trans('lang.last_replier')}}:</b></td><td>&nbsp;&nbsp;
                    @if ($ticketDetails->last_replier->first_name)
                        {!! $ticketDetails->last_replier->first_name  !!}    
                    @endif
                    @if ($ticketDetails->last_replier->last_name)
                        {!! $ticketDetails->last_replier->last_name  !!}
                    @endif
                </td>                        
            </tr>    
            @endif
            @if ($ticketDetails->user)
            <tr class="info-row">
                <td><b>{{trans('lang.requester')}}:</b></td><td>&nbsp;&nbsp;
                    @if ($ticketDetails->user->first_name)
                        {!! $ticketDetails->user->first_name  !!}    
                    @endif
                    @if ($ticketDetails->user->last_name)
                        {!! $ticketDetails->user->last_name  !!}
                    @endif
                </td>                     
            </tr>
            @endif
            @if ($ticketDetails->user)
            <tr class="info-row">
                <td><b>{{trans('lang.creator')}}:</b></td><td>&nbsp;&nbsp;
                    @if ($ticketDetails->user->first_name)
                        {!! $ticketDetails->user->first_name  !!}    
                    @endif
                    @if ($ticketDetails->user->last_name)
                        {!! $ticketDetails->user->last_name  !!}   
                    @endif
                </td>
            </tr>    
            @endif
            @if ($ticketDetails->assignee)
            <tr class="info-row">
                <td><b>{{trans('lang.assignee')}}:</b></td><td>&nbsp;&nbsp;
                    @if ($ticketDetails->assignee->first_name)
                        {!! $ticketDetails->assignee->first_name  !!}    
                    @endif
                    @if ($ticketDetails->assignee->last_name)
                        {!! $ticketDetails->assignee->last_name  !!}   
                    @endif
                </td>
            </tr>    
            @endif
            @if ($ticketDetails->source)
            <tr class="info-row">
                <td><b>{{trans('lang.source')}}:</b></td><td>&nbsp;&nbsp;{!! $ticketDetails->source->name  !!}</td>
            </tr>    
            @endif
            @if ($ticketDetails->type)
            <tr class="info-row">
                <td><b>{{trans('lang.type')}}:</b></td><td>&nbsp;&nbsp;{!! $ticketDetails->type->name  !!}</td>
            </tr>
            @endif
            @if ($ticketDetails->priority)
            <tr class="info-row">
                <td><b>{{trans('lang.priority')}}:</b></td><td>&nbsp;&nbsp;{!! $ticketDetails->priority->name  !!}</td>
            </tr>
            @endif
            @if ($ticketDetails->sla_plan)
            <tr class="info-row">
                <td><b>{{trans('lang.sla_plans')}}:</b></td><td>&nbsp;&nbsp;{!! $ticketDetails->sla_plan->name  !!}</td>
            </tr>
            @endif            
            @if($ticketDetails->location)
            <tr class="info-row">
                <td><b>{{trans('lang.location')}}:</b></td><td>&nbsp;&nbsp;{!! $ticketDetails->location->name  !!}</td>
            </tr>
            @endif
            <?php if(count($ticketDetails->custom_field_values) > 0){ $customFields = $ticketDetails->custom_field_values; ?>
                @foreach ($customFields as $customField)
                <tr class="info-row">
                    <td><b>{{ $customField->label }}  :</b></td>
                    <td>
                        &nbsp;&nbsp;
                        @if (gettype($customField->value) == 'string')
                            {{ $customField->value }}
                        @endif
                        @if (gettype($customField->value) == 'array')
                            {{ implode(', ', $customField->value) }}
                        @endif
                    </td>
                </tr>   
                @endforeach
            <?php } ?>
            @endif
        </table>
        <br>
        <h3>{!! trans("lang.ticket-conversation-title") !!}</h3>
        <ul>
            @foreach ($ticketConversations as $ticketConversation)
                <?php
                    $name = $ticketConversation->first_name ? $ticketConversation->first_name.' '.$ticketConversation->last_name: "System";
                ?>
                <li>
                    <div style="margin-top:-2px">{!! trans("lang.posted_by_on", ["user"=> "<strong>".htmlentities($name)."</strong>", "time"=> faveoDate($ticketConversation->created_at)]) !!}
                    @if ($ticketConversation->is_internal)
                        ({!! trans("lang.as_internal_note") !!})
                    @endif
                    </div>
                    <div style="background-color: rgba(0,0,0,0.04); padding: 5px;" class="{!! $class !!}">{!! $ticketConversation->formatted_body !!}</div>
                    <br>
                </li>
            @endforeach
        </ul>
	</body>
</html>
