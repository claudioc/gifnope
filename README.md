# Gifnope

Chrome extension which tries to pause the gifs that nag you. I found it useful when I am reading a document which contains some funny GIFs. By the way, authors: what about not using gifs inside a documents which is supposed to be read?

To pause the GIF(s) you have some option:

- Use the contextual menu on a gif and select "Pause animation"
- Use the contextual menu anywhere except on a gif a select "Pause all animations"
- Press the esc key and then click on the target GIF
- Press the esc key _twice_ to pause all GIFs in the document

Click on a paused gif to un-pause the animation.

How it works
---

Unfortunately it's impossible for an extension to natively stop a gif to be rendered or changed at a low level. We can only act via JavaScript on an image which is already in the DOM and do what we can with JavaScript and CSS. The extension will take the target gif, copy it over a canvas and swap the canvas with the picture. The nice side effect of this operation is that only the first frame of the animated gif will be copied onto the canvas, so that the gif will appear as... paused.

This technique is of course not perfect (gif inside iframes? Nope), but it works pretty well in the majority of the cases.

Written by Claudio Cicali (claudio.cicali@gmail.com), distributed according to the MIT license.

Follow the author on [twitter](http://twitter.com/caludio).