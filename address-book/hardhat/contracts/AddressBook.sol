// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "hardhat/console.sol";

contract AddressBook {
    // -- MAPPINGS -- //
    // maps an address to an address array
    // As an example your address to a list of addresses you are interested in. This supports multiple people having an address book
    mapping(address => address[]) public s_addressToAddressArray;

    // maps an address to another map of address to a string
    // example - your address mapped to a mapping of your address book to its alias
    mapping(address => mapping(address => string)) public s_addressToAliasesMapping;

    // -- FUNCTIONS -- //
    // Function to retrieve all the addresses from the address book
    function getAddresses(address _address) public view returns(address[] memory){
        return s_addressToAddressArray[_address];
    }

    // Function to add new addresses to address book
    // adding data to nested mapping: https://www.alchemy.com/overviews/solidity-mapping 
    function addAddressToAddressBook(address _address, string memory _name) public {
        s_addressToAliasesMapping[msg.sender][_address] = _name;
        s_addressToAddressArray[msg.sender].push(_address);
    }

    // Function to remove an specific address from the address books
    function deleteAdddress(address _address) public{
        address[] memory addressArray = s_addressToAddressArray[msg.sender];

        for(uint256 i = 0; i < addressArray.length; i++){
            console.log(addressArray[i]);
            if(addressArray[i] == _address){
                delete addressArray[i];
            }
        }
        s_addressToAddressArray[msg.sender] = addressArray;
    }

    // ! Not recommended for large Arrays
    // Function which Gets the alias for your address 
    function getAlias(address _address) public view returns(string memory){
        return s_addressToAliasesMapping[msg.sender][_address];
    }
}
