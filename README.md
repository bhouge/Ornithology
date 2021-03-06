# Ornithology
A musical setting of Elisa Gabbert's "Ornithological Blogpoem" for choir and audience mobile devices.
This system includes the following features:
playing sounds on audience mobile devices
coordinating the independent parts of each choir member via a web app score
recording audio and posting to a server

Premiered at the Vox Festival, Valencia, Spain, June 4, 2015, by the composer with the Berklee Valencia App Choir.
US Premiere at the 2nd Web Audio Conference, Georgia Tech, Atlanta, GA, April 5, 2016, by the composer with members of the Georgia Tech Choirs, led by Timothy Hsu and Jerry Ulrich.

In many ways, this piece is similar to my earlier composition "The Tomb of the Grammarian Lysias,"
a setting of a poem by Constantine Cavafy for voice and audience mobile devices.
https://github.com/bhouge/Lysias

For more of Elisa Gabbert's fantastic poetry, check out http://thefrenchexit.blogspot.com.es/

This project incorporates the amazing Recorderjs library by Matt Diamond, which can be found here:
https://github.com/mattdiamond/Recorderjs

I made a few small tweaks to support mono recording.

I'm also using Boris Smus's BufferLoader, slightly modified from the tutorial he presents here:
http://www.html5rocks.com/en/tutorials/webaudio/intro/?redirect_from_locale=es

Thanks to Matt and Boris for sharing their brilliant work!

I'm also using socket.io, which replaces the php of the original version. God bless socket.io!
http://socket.io

The following copyright notice and permission notice pertains to Matt Diamond's Recorderjs library
(in my project, this library is contained in scripts/recorder.js and scripts/recorderWorker.js):

Copyright � 2013 Matt Diamond

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

