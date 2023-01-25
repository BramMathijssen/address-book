// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract AddressBook {
    uint256 public s_myFavoriteNumber;

    event changedNumber(address indexed _from, uint256 indexed _newNumber);

    function newNumber(uint256 _number) public {
        s_myFavoriteNumber = _number;
        emit changedNumber(msg.sender, _number);
    }
}
