


import  Peer from "peerjs";
import { uid } from 'uid';
import $ from "jquery";
const openStream = require('./openStream');
const playVideo = require('./playVideo');

const config = {host: 'stream88.onrender.com', port: 443,secure: true, key: 'peerjs'};

// const config = {host: 'localhost', port: 443,secure: true, key: 'peerjs'};

function getPeer(){
    const id = uid(10);
    $ ('#peer-id').append(id);
    return id;
}


const peer = new Peer(getPeer(),config);

console.log(peer);

$('#btnCall').click(() => {
    const friendId = $('#txtFriendId').val();
    openStream(stream => {
        playVideo(stream, 'localStream');
        const call = peer.call(friendId,stream);
        call.on('stream', remoteStream => playVideo(remoteStream,'friendStream'));
    });
});