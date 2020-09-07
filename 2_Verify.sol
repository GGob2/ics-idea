pragma solidity >=0.4.22 <0.7.0;

import "1_Command.sol";

contract Vefify {
    
    Command _cmd;

    constructor() {
        _cmd = new Command();
    }
    
}