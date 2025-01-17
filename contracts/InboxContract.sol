// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Inbox {

    string public message;

    constructor (string memory initialMessage)  {
        message=initialMessage;
    }

    function setMessage(string calldata newMessage) external  {
        message=newMessage;
    }

    function getMessage() external view returns (string memory) {
        return message;
    }
}