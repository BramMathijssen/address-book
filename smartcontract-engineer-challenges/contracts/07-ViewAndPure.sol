// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/*
Q1: Write function addToNum, takes a single input x of type uint and returns num + x.
This function must be external
Is this function view or pure? Declare it appropriately.

Q2: Write function add, takes two inputs x and y, both having the type uint and returns the sum of x + y.
This function must be external
Is this function view or pure? Declare it appropriately.
*/

contract ViewAndPureFunctions {
    uint public num;

    // This is a view function. It reads the state variable "num"
    function viewFunc() external view returns (uint) {
        return num;
    }

    // This is a pure function. It does not read any state or global variables.
    function pureFunc() external pure returns (uint) {
        return 1;
    }
    
    function addToNum(uint x) external view returns(uint){
        return num + x;
    }
    
    function add(uint x, uint y) external pure returns(uint){
        return x + y;
    }
}
