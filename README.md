# Testosterone framework
Very simple web framework that does almost everything you would need without hurting your head
I was gonna write a joke about the name but i forgot what i was gonna write, and so now the name doesnt make sense but uhhhhhhhhh

How to use:
First edit the 404 page in ./servershit/404.html to your liking
Then for binary files, simply upload them to servershit, if you want them to be under a subdirectory like example.com/directory/file.png it would be servershit/directory/file.png
For actual pages whenever a request is made it first checks if there is a folder with the path name with an index.js in it, if so it runs it (example index.js files in the template folder), if not it looks if there is a file in that path, if so it returns it, if not it errors

==Addendum==
You can place an index.php file instead of index.js, this makes it a php script
In order to use php, you need to:
A: Have php-fpm service installed and running
B: Have php-fpm socket on /run/php-fpm/php-fpm.sock

Supported features:
* Static pages
* Dynamic pages
* Url parameters
* PHP support, simultaneously with js (this is cursed)

Unsupported features:
* i forgor the name of it but like when a new post is made on a forum, it gets its own id, uh you cant do that without actually creating a file for its id, this is never coming
* Do not show tag (users can view the index.js of webpages, dont put anything secret in there, this is coming eventually but a temporary workaround would be to just load a file from outside of servershit inside of that index.js so people cant view it)
* The root page can only be an index.js, this isnt a technical limitation or anything but this code is a fucking mess and that makes it worse, no workers or php there i guess (if it really matters that much you can just make it a redirect to /home or something)
* idk anything else

This web framework has not had a security audit, and likely never will, i tried some basic shit at it and i dont see any vulnerabilities, but please dont use this in anything critical (i am not setting a good example of this)

i hate this project so fucking much why did i do this to myself