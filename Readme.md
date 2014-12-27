Overview

This application is a simple login web application, it checks with the database if you
exist in it and then redirects you to a simple page indicating that you have successfully logged
in. On this page you will be able to delete the user.

Installation

Please install all the modules written in the JSON, please do not take into account the versions
for the modules to install except for the module leveldown where you have to take the version 0.10.0.
Otherwise we will have compatibility problems with the module levelup.
If you cannot install the module, first check if you have written the right module, then type the following
command in nodejs command prompt(if you use windows)
set MSVS_VERSION="the version of your visual studio"

Use

To add users, you have to add them in the code directly, you have an example at the beginning of lib/DataBaseDir/mydb.js
line 18 to 37. If you already have a file, just execute the command addUsers in app.js
