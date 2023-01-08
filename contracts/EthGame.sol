// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

/// @title EthGame
/// @author Bram Mathijssen
/// @notice A game where the 14th person that deposit ether wins all the ether in the contract
/// the winner can claim the 14 ether
/// @dev All function calls are currently implemented without side effects
contract EthGame{

    uint256 public s_playerCounter;
    uint256 public ETH_AMOUNT = 0.1 ether;


    function deposit() public payable {
        require(msg.value == ETH_AMOUNT, "Need to send atleast 0.1 ETH");
        if(s_playerCounter == 14){
            console.log("You won the game!");
            s_playerCounter = 0;
        }
        else{
            console.log("You didnt win the game yet");
            s_playerCounter++;
        }
    }
}


