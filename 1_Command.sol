pragma solidity >=0.4.22 < 0.7.0;

/* 
    1. 중요한 명령과 중요하지 않은 명령으로 구분할 것 
    (중요한 명령들을 배열에 넣는다고 생각했을 때, 점수를 어떻게 관리할 것인지 생각해야함)
    
    2. 명령 내리는 과정을 event로 진행할 것인지, 그냥 컨트랙트로만 진행할 지 생각해야함
     2-1. for문 사용해서 if( 내려진 명령이 중요한 명령 리스트에 있으면 ) --> 검증 컨트랙트 시작 

    3. verify 과정 시작할 때  

  */

contract Command {    
    
    struct sigCommand {
        string name;
        uint score;        
    }

    sigCommand[] public sigCommands;
    
    string[] public unSigCommand;
    
    // significant commands
    function setSIgCmd(string memory _sigCmdName, uint _sigCmdScore) public {
        sigCommands.push(sigCommand(_sigCmdName, _sigCmdScore));
    }

    function setUnSigCmd(string memory _unSigCmdName) public {
        unSigCommand.push(_unSigCmdName);    
    }
    
    

    // function getCmd(uint _num) public view returns (string memory getCmdName, uint getCmdScore, bool getCmdSig) {
    //     getCmdName = commands[_num].name;
    //     getCmdScore = commands[_num].score;
    //     getCmdSig = commands[_num].sig;
    // } 

}