alertrocket
===========

alertrocket api interface


This is a simple script written for our needs that can easily be adapted by others for yours. It has been written to serve as a alerting tool that when called with different parameters will raise alerts of different status. You can call it directly from the commandline or via a sensu's monitoring app, if you use sensu then you should set the handler as a pipe and pass echo the status message to xargs before passing them to this script.


==========

Command example:

./alertrocket.js -g -c tag_or_banner -u url_to_direct_users_at -k api_key -s api_secret -- 'message' 

The following options set a status flag for the message:
* -g = support
* -e = emergency
* if either -g or -e is not set then the message will be tagged systems.



