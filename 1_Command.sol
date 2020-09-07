pragma solidity >=0.4.22 < 0.7.0;





/* 
    1. 중요한 명령과 중요하지 않은 명령으로 구분할 것 
    (중요한 명령들을 배열에 넣는다고 생각했을 때, 점수를 어떻게 관리할 것인지 생각해야함)
    
    2. 명령 내리는 과정을 event로 진행할 것인지, 그냥 컨트랙트로만 진행할 지 생각해야함
     2-1. for문 사용해서 if( 내려진 명령이 중요한 명령 리스트에 있으면 ) --> 검증 컨트랙트 시작 

    3. verify 과정 시작할 때  

  */
  
contract Cmd {    
    struct Command {
        
        string name;
        uint score;
        
    }

    Command[] public commands;
    
    string[] public names;
    
    // significant commands
    function setName(string memory _cmdd) public {
        names.push(string('1'));    
        names.push('2');
    }
    
    function setCmd(string memory _cmdName, uint _cmdScore) public {
        commands.push(Command(_cmdName, _cmdScore, _cmdSig));
    }

    function getCmd(uint _num) public view returns (string memory getCmdName, uint getCmdScore, bool getCmdSig) {
        getCmdName = commands[_num].name;
        getCmdScore = commands[_num].score;
        getCmdSig = commands[_num].sig;
    } 

}