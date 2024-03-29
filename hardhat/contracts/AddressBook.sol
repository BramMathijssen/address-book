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
    mapping(address => mapping(address => string))
        public s_addressToAliasesMapping;

    // -- FUNCTIONS -- //
    // Function to retrieve all the addresses from the address book
    function getAddresses(
        address _address
    ) public view returns (address[] memory) {
        return s_addressToAddressArray[_address];
    }

    // Function to add new addresses to address book
    // adding data to nested mapping: https://www.alchemy.com/overviews/solidity-mapping
    function addAddressToAddressBook(
        address _address,
        string memory _name
    ) public {
        string memory addressName = s_addressToAliasesMapping[msg.sender][
            _address
        ];
        bytes memory addressNameBytes = bytes(addressName);

        if (addressNameBytes.length == 0) {
            s_addressToAliasesMapping[msg.sender][_address] = _name;
            s_addressToAddressArray[msg.sender].push(_address);
        }
    }

    // function to edit the name of an address
    function editAddress(address _address, string memory _name) public {
        s_addressToAliasesMapping[msg.sender][_address] = _name;
    }

    // Function to remove an specific address from the address books
    function deleteAdddress(address _address) public {
        uint length = s_addressToAddressArray[msg.sender].length;

        for (uint256 i = 0; i < length; i++) {
            if (s_addressToAddressArray[msg.sender][i] == _address) {
                if (1 < length && i < length - 1) {
                    s_addressToAddressArray[msg.sender][i] = s_addressToAddressArray[msg.sender][length - 1]; 
                }
                delete s_addressToAddressArray[msg.sender][length - 1];
                s_addressToAddressArray[msg.sender].pop();
                delete s_addressToAliasesMapping[msg.sender][_address];
                break;
            }
        }
    }

    // ! Not recommended for large Arrays
    // Function which Gets the alias for your address
    function getAlias(address _address) public view returns (string memory) {
        return s_addressToAliasesMapping[msg.sender][_address];
    }
}
