# Change Logs

## v4.8.1

### Bug fixes
- Fixed issue in Lime Survey plugin activation

### Change Log
v4.8.1 updates the system to force HTTPS scheme and restricts system to only work on server which has valid SSL installed and can only be opened secruly over HTTPS.

> Note: As this update restricts the server from opening over http so we recommend to install SSL on the server before updating to this version.

## v4.8.0

### Updates
- Fixes #6470
- Fixes #9981
- Fixes #9860
- Fixes #10087
- Fixes #9940
- Fixes #9964
- New LM integration and localized licence support

### Bug fixes
- Fixes #7651
- Fixes #8222
- Fixes #8612
- Fixes #10136
- Fixes #9729
- Fixes #10021
- Fixes #10066
- Fixes #7706
- Fixes #7928
- Fixes #10097
- Fixes #9861
- Fixes #9666
- Fixes #10137
- Fixes #10161
- Fixes #9964
- Fixes #10188
- Fixes #9815
- Fixes #10080
- Fixes #10090
- Fixes #10089
- Fixes #10105
- Fixes #10061
- Fixes #8039
- Fixes #10234
- Fixes #10161
- Fixes #9720
- Fixes #5038
- Fixes #7212
- Fixes #10065
- Fixes #10190

### Change Log
 - Added check for SSL certificate in probe and autoupdate
 - Added support for custom port for database server
 - License checking URL are updated to new routes of LM 

## v4.7.3

### Bug fixes
- Webhook CSRF token issue
- Ticket conversion from FB, WhatsApp, and Telephony channels

### Change Log
- Webhooks routes called from different applications like Twillio, FB, etc should not checked for CSRF tokens. Modified ExtendServiceProvider class to accommodate URLs which should not checked for CSRF token hence should not be passed through the "web" middleware. Since it's a temporary fix for hotfix do not recommend to rely on these changes and should implement correct fix for such routes.
- Updated PHPUnit.xml to maintain clean test suites for plugins and modules. As currently all devs are not maintaining these so all new tests for plugins and modules do not run on our Jenkins Pipeline. Now we have added plugins and modules testsuites which will run all new plugins tests automatically along with current missing tests on Jenkins.
- Updated composer.json to remove garbage commands which are not used in the system.

## v4.7.2

### Bug fixes
- Fixed unable to create tickets when ticket form has attachments fields.
- Fixed unable to edit or fork tickets when ticket form has attachments fields.
- Fixed ticket collaborators do not receive email notifications for replies made on the tickets
- Fixed 10110, in client panel Knowledge base search popup is not visible completely

## v4.7.1

### Bug fixes
Fixed seeders for handling exception and large number of records

## v4.7.0

### Updates
- Admin Panel module Vue Conversion
  - Priority Settings
  - Location Settings
  - HelpTopic Settings
  - Ticket Type settings
  - Billing settings
  - Admin Panel main settings page
  - Security settings
  - Template settings
- Email notification template style updated
- Added new language packages
- Support for using remote Redis server as cache

### Bug fixes
- Fixes #9897
- Fixes #10058
- Fixes #9844
- Fixes #9660
- Fixes #9951
- Fixes #9901
- Fixes #9721
- Fixes #9842
- Fixes #9669
- Fixes #9086
- Fixes #9717
- Fixes #9408
- Fixes #9676
- Fixes #9821
- Fixes #9819
- Fixes #9822
- Fixes #9846
- Fixes #9852
- Fixes #9870
- Fixes #9879
- Fixes #9880
- Fixes #9895
- Fixes #9896
- Fixes #9985
- Fixes #9688
- Fixes #9812
- Fixes #9871
- Fixes #9948
- Fixes #8740
- Fixes #8832
- Fixes #8740
- Fixes #8994
- Fixes #9613
- Fixes #9689
- Fixes #9892
- Fixes #7717
- Fixes #7721
- Fixes #7714
- Fixes #7716

### Change Log
- Ticket Create/Edit API validation updated
  Now the params for resources like department, source, etc on ticket create/edit API will respect the presence of resource. If the given resource ID is not present then the API will throw a validation error. Eg: If we pass department id as 6 and there is no department in the database with id 6 then a validation error will be thrown.
- Laravel framework version bumped to v6.20.30
- V3 API support added for various Plugins
- Username validation updated to accommodate usernames from AD which may have different speacial characters.
- The color combination of the layout has been changed to use the default Admin LTE theme color scheme.
- Template releated models and controllers moved to notification package
- Old template models and code removed


## v4.6.2

### Bug fixes
- Fixes #9921


## v4.6.1

### Bug fixes
- Fixes #9798
- Fixes #9800
- Fixes #9805
- Fixes #9801
- Fixes #9791
- Fixes #9787
- Other UI issues

## v4.6.0

### Updates
* Agent Panel SPA conversion
* Added Login logs and alerts for login attempts
* Added Popular articles section in KB
* Adhoc Approval improvements
* Ticket PDF generation corrections
* Vue Conversion
  - Custom JS plugin
  - Error and debugging
  - Department
  - Module page
  - Source settings page
  - Queue driver settings

### Bug fixes
- Fixes #9552
- Fixes #8796
- Fixes #9287
- Fixes #9229
- Fixes #9612
- Fixes #9106
- Fixes #9557
- Fixes #9634
- Fixes #9611
- Fixes #9656
- Fixes #9575
- Fixes #9574
- Fixes #8006
- Fixes #9625
- Fixes #9714
- Fixes #9707
- Fixes #7996
- Fixes #9723
- Fixes #7706
- Fixes #7945
- Fixes #7996
- Fixes #9556
- Fixes #7718
- Fixes #7706
- Fixes #8958
- Fixes #9767
- Fixes #9769
- Fixes #9781

### Change Log
- Added authentcation logs table
- Added notify_unrecognized_login in users table
- Altered visible_to column in labels table set default as agent
- Indexed ticket_id in ticket_activity_log for performance optimization
- Altered filter tables to use relation ids of tags/labels instead of their string value
- Renamed different columns in department table which store ids
    type -> type_id
    outgoing_email -> outgoing_email_id
    business_hour -> business_hour_id
- Now after the update, if you delete linked resource then it will be replaced with the default value for that resource in all the dependencies.
- Created a generic deletion module job to handle deletion of linked modules

## v4.5.0

### Updates
* Changed edit task page save button language to update
* Added view icon in edit task page
* Changed edit button language to update in my filters
* Enhanced HelpSection module functionality
* Enhanced ticket filter of client panel
* Added strict search functionality in user list API
* Can handle error if too many requests are sent within short span
* Changed CC field place holder language in client panel 
* Enhanced Label Visibility functionality
  - It has 3 visibilities: agents, team lead, department manager
  - While creating label visibility could be defined, So, that only restricted user will be able to see label applied on ticket
  - By default, agents visibility will be set for label
* Revamped SMS Plugin
* Revamped templates
* Added support for new bulk SMS provider named ???Gupshup???
* Removed non working plugins
  - Reseller
  - Migration
  - Envato
* Admin panel Vue conversion (partially)
  - Label module converted to Vue
  - Tag module converted to Vue
  - Social Login module converted to Vue
  - Language module converted to Vue
  - CRON module converted to Vue
  
### Bug fixes and other issue Ids
- Fixes #7706
- Fixes #7732
- Fixes #7943
- Fixes #8345
- Fixes #8495
- Fixes #8548
- Fixes #8798
- Fixes #8801
- Fixes #8858
- Fixes #8861
- Fixes #8893
- Fixes #8957
- Fixes #8978
- Fixes #8979
- Fixes #8980
- Fixes #8988
- Fixes #9030
- Fixes #9035
- Fixes #9037
- Fixes #9045
- Fixes #9049
- Fixes #9051
- Fixes #9084
- Fixes #9093
- Fixes #9107
- Fixes #9117
- Fixes #9163
- Fixes #9164
- Fixes #9176
- Fixes #9191
- Fixes #9198
- Fixes #9205
- Fixes #9209
- Fixes #9210
- Fixes #9217
- Fixes #9218
- Fixes #9226
- Fixes #9288
- Fixes #9321
- Fixes #9322
- Fixes #9409
- Fixes #9430
- Fixes #9449

### Change Log
- Added ???third_party_apps??? table to store third party app authentication related data
- Changed data type of ???status??? column to boolean in ???labels??? table
- Changed ???visible_to??? column data type ???varchar??? in ???labels??? table
- Added ???visible_to??? column  and made ???all_users??? as default in ???tags??? table
- Added index to ???name??? and ???description??? columns in ???tags??? table
- Added ???show_description_under_form_field??? column in ???form_fields??? table
- Added ???is_visible??? column in ???approval_workflows??? table
- Added index for ???ticket_id??? column in ???ticket_activity_logs??? table
- Added column ???summary??? and associated index in ???kb_article??? table
- Added ???user_import_maps??? table
- Added ???chat_ended???, ???email???, ???name???, ???subject???, ???event???, ???help_topic???, and ???department??? columns in ???tawk_chats??? table in Chat Plugin
- Added ???customcss??? table to manage custom css event based operations in Custom CSS Plugin
- Added ???mobile_otp_verification_codes??? table to link OTP and User Id in SMS Plugin
- Added ???required_sms_otp??? table to manage OTP required or optional for User in SMS Plugin


## v4.4.5

### Bug fixes
- Issue fixed for Mobile app during login
- File manager pagination issue fixed

## v4.4.4

### Updates
- Implemented pagination in file manager

### Bug fixes
- Fixes #8963
- Fixes #9008
- Fixes #9002
- Fixes #9023
- Fixes #8995
- Fixes #8989
- Fixes #8988
- Fixes #8954
- Fixes #8951
- Fixes #7404

### Change log
- Updated Laravel version to v6.20.16 which invalidates all the old sessions and cookies.

## v4.4.3

### Bug fixes
- Fixes failure cases of autoupdate possibly occuring due to opcache enabled on the servers.
- Fixed File manager UI for disabled options

## v4.4.2

### Bug fixes
- Fixes issue in auto updating system to v4.4.0

### Change log
- Set default permissions for files to (0664) and directories(0775) in storage directory

## v4.4.0

### Updates
* Fixed KB publish time and SEO overwrite issues
* Added Article comment enable/disable feature
* Dashboard Statistics module removed from admin panel
* Add and Delete functionality removed from Plugin and Language modules
* Showing member count in organization index page
* Added Ticket parent-child relationship
* Website and Author columns removal from plugins index page
* Increased ticket number prefix size to 8 from 4 characters
* Added Amazon S3 storage in File Manager
* Admin panel Vue conversion (partially)
 - API setting
 - System Setting 
 - Webhook
  


### Bug fixes
- Fixes #8141
- Fixes #8503
- Fixes #8391
- Fixes #8384
- Fixes #7061
- Fixes #8440
- Fixes #8538
- Fixes #8462
- Fixes #8363
- Fixes #8766
- Fixes #8253
- Fixes #8568
- Fixes #8534
- Fixes #8815
- Fixes #8532 
- Fixes #8567
- Fixes #8563
- Fixes #8818
- Fixes #8771
- Fixes #8086
- Fixes #8852
- Fixes #8586
- Fixes #8836
- Fixes #8533
- Fixes #8638
- Fixes #8830
- Fixes #8330
- Fixes #7936
- Fixes #8643
- Fixes #8608
- Fixes #8426
- Fixes #7865
- Fixes #6784
- Fixes #7839
- Fixes #8850
- Fixes #8833
- Fixes #8907

### Change log
User and Permission linking is stored in ???user_permission??? table instead of ???permision??? table
Renamed columns of ???settings_sytem??? table
Added columns in ???time_format??? table
Added column in ???date_format??? table
Added ???parent_ticket_id??? column in ???tickets??? table
Added ???is_comment_enabled??? column in ???kb_settings??? table
Added ???is_comment_enabled??? in ???kb_article??? table
Added ???is_comment_enabled??? in ???system_portal??? table
Added ???files_moved_from_old_private_disk??? column in ???settings_filesystem??? table
Added ???hidden??? column in ???file_manager_acl_rules??? table
Added ???profile_pic_driver??? column in ???users??? table
Added ???logo_driver??? column in ???organization??? table
Added ???logo_driver??? column in ???settings_company??? table
Added ???logo_icon_driver??? column in ???system_portal??? table
Added ???is_comment_enabled??? column in ???kb_settings??? table
Added ???is_comment_enabled??? column in ???kb_article??? table
Added ???is_enabled_breadcrumb??? column in ???system_portal??? table

## v4.3.1

### Bug fixes
- Fixed issue in Workflow, SLA and listeners occurred after releasing in v4.3.0

### changelog
- Installed myclabs/deep-copy as required package

## v4.3.0

### Updates
* Form renderer changes
* New File manager
* Settings URL redirection removal
* New Activity Logs
* Admin panel Vue conversion (partially)
  - Auto assign settings
  - Close workflow settings
  - Ticket settings
  - Email settings index page and email diagnostic page
  - User option settings

### Bug fixes
- Fixes #8092
- Fixes #8262
- Fixes #8459
- Fixes #8458
- Fixes #7949
- Fixes #8405
- Fixes #8155
- Fixes #7951
- Fixes #8421
- Fixes #8418
- Fixes #8395
- Fixes #8373
- Fixes #8406
- Fixes #8317
- Fixes #8408
- Fixes #5972
- Fixes #3749
- Fixes #8372
- Fixes #7847
- Fixes #8205
- Fixes #7956
- Fixes #8342
- Fixes #8344
- Fixes #8336
- Fixes #8358
- Fixes #7836
- Fixes #7861
- Fixes #7852
- Fixes #7853
- Fixes #7864
- Fixes #8366
- Fixes #8370
- Fixes #8340
- Fixes #8307
- Fixes #7160
- Fixes #8269
- Fixes #8326
- Fixes #8327
- Fixes #6824
- Fixes #6776
- Fixes #3476
- Fixes #7866

### Changelog
- Added new APIs for admin panel settings page and updated response of exisiting APIs to support Admin panel Vue conversion
- Changed response of Form builder and Form renderer APIs
- Renamed `activity_logs` table to `ticket_activity_logs`
- Renamed and removed columns from `ticket_activity_logs`
- Updated media uploads and attachment file handling APIs

## v4.2.0

### Updates
- TinyMCE Editor added
- Active Directory location mapping
- CRTWorkflow Plugin

### Bug fixes
- Fixes #7255
- Fixes #7231
- Fixes #8159
- Fixes #8144
- Fixes #7878
- Fixes #7881
- Fixes #7876
- Fixes #8182
- Fixes #8161
- Fixes #7758
- Fixes #8154
- Fixes #7931
- Fixes #8087
- Fixes #8133
- Fixes #8162
- Fixes #6463
- Fixes #7742
- Fixes #8172
- Fixes #7933
- Fixes #6982

### Changelog
- Allowed to set Session cockie "path" and "secure" flags using environement variables "SESSION_COOKIE_PATH" and "SESSION_COOKIE_SECURE" in .env file.
- Changed WYSIWYG editor from CKEdiror to TinyMCE

## v4.1.1

### Bug fixes
- Fixes #7982
- Fixes #7912
- Fixes #7941
- Fixes #8061
- Fixes #8023
- Fixes #8025
- Fixes #8071
- Fixes #7662


## v4.1.0

### Updates
- New look for admin and agent panel
- Update tags/labels and requester via workflow
- Search requester with organisation name
- Attach Assets on ticket creation
- Reply to tweets

### Bug fixes
- Fixes #7964
- Fixes #7953
- Fixes #7960
- Fixes #7879
- Fixes #7952
- Fixes #7884
- Fixes #7894
- Fixes #7938
- Fixes #7381
- Fixes #7828

### Changelog
- AdminLTE theme updated
- Bootstrap version updates
- Parameters in user create API has been updated (breaking change)

## v4.0.1

### Change logs
Downgraded Laravel back to v6.18.26 due to breaking changes in the implementaion of cookies for security updates in the framework. Also see composer-comments.md file in root directory to additional information and
development tasks.

For more informations about the issues checkout the links below
#### Issues
- https://github.com/laravel/framework/pull/33662
- https://github.com/laravel/framework/issues/33743

#### Taylor's article
- https://blog.laravel.com/laravel-cookie-security-releases

## v4.0.0

### Updates
- Updated Facebook plugin
- reCaptcha v3 support added
- Azure AD support added
- Ambiguity in account activation and verification logic removed
- Telephony Plugin v3
- User account deactivation and added user account deletion

### Bug fixes
- Fixes #7648
- Fixes #7579
- Fixes #7561
- Fixes #7339
- Fixes #7683
- Fixes #6232
- Fixes #7671
- Fixes #7138
- Fixes #7070
- Fixes #7664
- Fixes #7705
- Fixes #7689
- Fixes #7707
- Fixes #7702
- Fixes #7360
- Fixes #7650
- Fixes #7415

### Change logs
- Vue datatable versio updated to 2.0.32
- Laravel updated to v6.18.34
- Login process changed. Added login_restiction in common settings for checking verfication entity for login.
 Login event listeners check the entity during login and throws RequiredVerificationException if the enityt is 
 required for login and is not verified.
- Method which handles the login process has been changed, resulting in the reduction of the code blocks in other controllers calling the postRegister method for user creation.
- Added Laravel websocket package which allows to run a socket webserver on the same app server. Without installing any other dependencies.


## v3.5.0

### Updates
- Added multiple AD support in LDAP
- Added support to import users via CSV files
- Task plugin reminder notifications added
- Date time format settings updated

### Bug fixes
- Fixes #7307
- Fixes #7342
- Fixes #7246
- Fixes #6718
- Fixes #7424
- Fixes #7422
- Fixes #7486
- Fixes #6980
- Fixes #7491
- Fixes #7518
- Fixes #7499
- Fixes #7530
- Fixes #7110
- Fixes #7509
- Fixes #6910
- Fixes #7309
- Fixes #7310
- Fixes #7641
- Fixes #7643
- Fixes #7567
- Fixes #7628


### Change logs
- errorResponse() method not will now send FAVEO_ERROR_CODE as HTTP status if exception is thrown with status code 0. 
- Replaced "Group" term for permission classes to "Permission"
- Added `registerMiddlewareOfPackage` to allow registration of custom plugin's middleware 

## v3.4.1

### Bug fixes
- Fixes #7378
- Fixes #7367
- Fixes #7355
- Fixes #7088
- Fixes #7087
- Fixes #6972
- Fixes #7333
- Fixes #7378
- Fixes #7388

## v3.4.0

### Updates
- Added attachment support in Facebook and WhatsApp plugin
- Dashboard UI and widgets update
- Added single APIn for adding reply and internal notes by all user irrespective of their role
- Made drop down list scrollable
- Widget settings page in VUE

### Bug fixes
- Fixes #7253
- Fixes #7267
- Fixes #7180
- Fixes #7277
- Fixes #7143
- Fixes #6758
- Fixes #6893
- Fixes #7154
- Fixes #7197
- Fixes #7078
- Fixes #4599
- Fixes #6980
- Fixes #7241
- Fixes #7250
- Fixes #7211
- Fixes #7109
- Fixes #7196
- Fixes #7147
- Fixes #7146
- Fixes #7102
- Fixes #6449
- Fixes #6981
- Fixes #6839
- Fixes #7145
- Fixes #7205
- Fixes #7088
- Fixes #4396
- Fixes #4663
- Fixes #7068
- Fixes #7123
- Fixes #7047
- Fixes #7150
- Fixes #7160
- Fixes #7164
- Fixes #7155
- Fixes #6711
- Fixes #6901
- Fixes #6999
- Fixes #6862
- Fixes #6735
- Fixes #6950
- Fixes #7053
- Fixes #7064
- Fixes #6927
- Fixes #6996
- Fixes #6261
- Fixes #7046
- Fixes #6884
- Fixes #7008
- Fixes #7027
- Fixes #6907
- Fixes #6903

### Change logs
- Added v3 support for APIs of custom plugins and modules
- Removed URL cron support
- Snapshot job disabled when queue driver is not redis
- Index and caching added in the database queries
- Removed v1 API support
- deprecated following routes
  - thread/reply
  - internal/note/{id}
  - post/reply/{id}
  - chart-range/{date1}/{date2}
  - agen1
  - chart-range
  - user-chart-range/{id}/{date1}/{date2}
  - user-agen/{id}/{team?}
  - user-agen1
  - user-chart-range
  - genereate-pdf/{threadid}
  - api/agent/ticket-threads/{ticketId}


## v3.3.0

### Updates
- Implemented dashboard feedback
- New inbox components
- Added tawk integration in chat plugin
- Client panel status working updated

### Bug fixes
- Fixes #6773
- Fixes #6792
- Fixes #6790
- Fixes #6791
- Fixes #6804
- Fixes #3804
- Fixes #3904
- Fixes #6786
- Fixes #6812
- Fixes #6840
- Fixes #6826
- Fixes #6852
- Fixes #6859
- Fixes #6875
- Fixes #6809
- Fixes #6456

### Change logs
- Removed sending error/exception notification via mails
- handling certifcate check for connecting to EWS and other mails servers based on available certificate file
- Fixed SD factories to use str_random instead of faker
- babel-jest updated
- removed unused dynamic dependecies
- ModelNotFound exception handled in Handler.php generically to use route model binding feature of Laravel for development

## v3.2.0

### Updates

- New dashbard layout
- Tags in KB
- Improved logs
- Autoupdate refinements
- Installer refinements

### Bug fixes
- Fixes #6126
- Fixes #6525
- Fixes #6526
- Fixes #6550
- Fixes #6560
- Fixes #6447
- Fixes #6440
- Fixes #4548
- Fixes #6005
- Fixes #5310
- Fixes #5924
- Fixes #6558
- Fixes #4250
- Fixes #5326
- Fixes #5324
- Fixes #6408
- Fixes #6631
- Fixes #6638
- Fixes #6602
- Fixes #6617
- Fixes #6618
- Fixes #5658
- Fixes #6626
- Fixes #6552
- Fixes #6401
- Fixes #5833
- Fixes #6614
- Fixes #6252
- Fixes #3762
- Fixes #6569
- Fixes #6497
- Fixes #6627
- Fixes #3681
- Fixes #6161
- Fixes #6656
- Fixes #6647
- Fixes #3662
- Fixes #6136
- Fixes #6469
- Fixes #6672
- Fixes #6688
- Fixes #6703
- Fixes #6651
- Fixes #6537
- Fixes #6712
- Fixes #6596
- Fixes #5399
- Fixes #6708
- Fixes #5133
- Fixes #6739
- Fixes #5972
- Fixes #6170
- Fixes #5127
- Fixes #6694
- Fixes #6742
- Fixes #6587
- Fixes #6689


### Change logs
- Removed old inbox, ban user, close approval workflow
- Set minimum required PHP version to 7.3
- Deprecated old Dashboard and releated APIs
- API api/dependency/statuses has been updated to return intesection of allowed override statuses 

## v3.1.1

### Bug fixes

- Fixes #6540
- Fixes #6281
- Fixes #4467
- Fixes #5136
- Fixes #6520
- Fixes #4533
- Fixes #4133

### Change logs

- last_login column has been added in the users table to log login time for the user account
- Removed duplicate keys from English language translation files
- Changed CKEditor UI
- User model will throw DuplicateUserException while creating user with existing email/username in the users table

## v3.1.0

### Updates

- Added filters in reports
- Save custom reports with filters
- Added WhatsApp plugin
- Improved UX for custom form builder

### Bug fixes

- Fixes #6305
- Fixes #5513
- Fixes #5354
- Fixes #3931
- Fixes #6381
- Fixes #6411
- Fixes #6488
- Fixes #6421
- Fixes #6455
- Fixes #6448
- Fixes #6450
- Fixes #6440
- Fixes #6494
- Fixes #4867

### Changes

- Reopen consideration for status change has been changed, now ticket will only be considered reopen when it's actually being reopened from closed status.

## v3.0.3

### Updates

- Added CC user column in mail logs which will show the list of CC emails that received the emails from the system.

### Bug fixes

- Fixes #6055
- Fixes #6362
- Fixes #6359
- Fixes #3755
- Fixes #5110
- Fixes #5875
- Fixes #6330
- Fixes #6395
- Fixes #6396
- Fixes #6329
- Fixes #6403
- Fixes #6361
- Fixes #6358
- Fixes #6326
- Fixes #6464
- Fixes #6320
- Fixes #6306
- Fixes #6394
- Fixes #1074
- Fixes #6400
- Fixes #6407
- Fixes #4664
- Fixes #6149
- Fixes #6416

### Changes

- 2FA check added for v3, now if you are login using v3 and if 2FA for the account is enabled you will receive different responses.
- Redis extension installation check added in Horizon's snapshot command

## v3.0.2

### Updates

- Compacted ticket timeline view

### Bug fixes

- Fixed user email/mobile not showing verified
- CSS fonts content URL updated from HTTP to HTTPS

## v3.0.1

### Updates

- Added created at a column in system backup table

### Bug fixes

- email address as TO are not being added as Cc #6242
- Fixed test cases in ApiMailControllerTest.php and BaseMailController.php #5994
- Mail fetch issue due to deprecations in strpos of PHP7.3 #6231
- Task plugin migration issue fixed
- Prevent logging of RouteCollection exception which is being logged and flooding the exception logs
- Unable to select nondefault business hours in SLA #6234
- Remember me functionality does not work while 2FA is enabled #6237

### Changes

- Updated Handler.php for handling exception correctly
  - Not logging NotFoundHttpException exception in database
  - Redirecting to 404 if NotFoundHttpException occurs
  - Added 500 error component
  - Debug mode now only considers APP_DEBUG

## v3.0.0

### Updates

- Organization view page is implemented in Vue.js
- Added new task plugin with the project, tasklist
- 2FA in Login module
- CC option in client panel

### Bug fixes

- UI issues introduced due to bootstrap updates
- Fixes #5993
- Fixes #6105
- Fixes #6030
- Fixes #6144
- Fixes #5911
- Bugsnag reported issues

### Changes

- SLA module has been rewritten completely
- Adding and generating APP_KEY and JWT_SECRET
