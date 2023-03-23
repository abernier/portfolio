#!/bin/sh

ffmpeg -i loreal-screencast.mp4 -c:v libx264 -preset medium -crf 18 -x264-params keyint=1:min-keyint=1 -an loreal-screencast-001.mp4

# what is important here is `keyint=1:min-keyint=1` which forces the encoder to create a keyframe every frame, in order the seek to be fast, see https://greensock.com/forums/topic/12771-animating-the-playhead-of-element-is-it-possible/page/2/#comment-177471


#ffmpeg -i loreal-screencast.mp4 -force_key_frames "expr:gte(t,n_forced*1)" loreal-screencast-002.mp4