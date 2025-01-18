// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Inbox {

    string public message;

    constructor (string memory initialMessage)  {
        require(bytes(initialMessage).length > 0, "Message cannot be empty");
        message=initialMessage;
    }

    function setMessage(string calldata newMessage) external  {
        message=newMessage;
    }
}