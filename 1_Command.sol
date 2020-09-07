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
        uint cmdNum;

        string name;
        uint score;        
    }

    sigCommand[] public sigCommands;
    
    string[] public unSigCommand;
    
    // set a significant commands 
    function setSigCmd(string memory _sigCmdName, uint _sigCmdScore) public {
        sigCommands.push(sigCommand(sigCommands.length+1 ,_sigCmdName, _sigCmdScore));
    }

    // set an un significant commands
    function setUnSigCmd(string memory _unSigCmdName) public {
        unSigCommand.push(_unSigCmdName);    
    }

    // get a significant commands's score
    // * -> 솔리디티 에서는 문자열 비교가 불가능하다.
    // sigCommands[0].score로 하니, 정상적으로 값이 출력됨을 알 수 있음. 
    function getSigCmd(uint _cmdNum) public returns (uint) {
        for(uint i = 0; i < sigCommands.length; i++ ) {
               return sigCommands[_cmdNum-1].score;
        }
    }  
}

contract Verify {
    // new 
    Command c = new Command();
}