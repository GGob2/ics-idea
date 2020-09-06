pragma solidity >=0.4.22 < 0.7.0;

contract Cmd {
    
    struct Command {
        
        string name;
        uint score;
        bool sig;
    }

    Command[] public commands;
    
    function setCmd(string memory _cmdName, uint _cmdScore, bool _cmdSig) public {
        commands.push(Command(_cmdName, _cmdScore, _cmdSig));
    }

    function getCmd(uint _num) public view returns (string memory getCmdName, uint getCmdScore, bool getCmdSig) {
        getCmdName = commands[_num].name;
        getCmdScore = commands[_num].score;
        getCmdSig = commands[_num].sig;
    } 

}