pragma solidity >=0.4.22 < 0.7.0;

/* 
    1. 중요한 명령과 중요하지 않은 명령으로 구분할 것 
    (중요한 명령들을 배열에 넣는다고 생각했을 때, 점수를 어떻게 관리할 것인지 생각해야함)
    
    2. 명령 내리는 과정을 event로 진행할 것인지, 그냥 컨트랙트로만 진행할 지 생각해야함
     2-1. for문 사용해서 if( 내려진 명령이 중요한 명령 리스트에 있으면 ) --> 검증 컨트랙트 시작 

    3. verify 과정 시작할 때  

    * 현재 발견한 문제점 : solidity는 int, uint만 지원.. score 할 때 소수점 사용 못함.. --> ?

      아이디어 변경 할 수 있나? --> 직원에게 스택을 쌓아서, verify 할 때 스택이 몇스택 이상 쌓이면 추가적으로 점수를 쳐주는 식으로 생각..?
      ex) 5점이 필요한 명령 & 10점의 검증 그룹 선정 || 검증 그룹 중, 스택이 1스택 이상 있는 사람이 4명 & 추가점수 부여 조건 :
          스택이 1스택 이상인 사람이 3명이상 검증했을 경우 전체 verify 과정에 1점 부여...?
  */

contract Command {    
    
    // event issueCmd(address _issuer, uint _cmdNumber);
    // event verifyCmd(

    // structure for sigCommand
    struct sigCommand {
        uint cmdNum;
        string cmdName;
        uint cmdScore;        
    }

    // structure for employee
    struct employee {
        uint empNum;
        string empName;
        uint empScore;
    }

    uint public issuedCmdScore;

    // an array for significant commands
    sigCommand[] public sigCommands;
    
    // an array for information about employees
    employee[] public employees;
 
    // an array for un significant commands
    string[] public unSigCommands;

    // an array for vefifying group
    string[] public verifyingGroup;
    
    // an array for verifying score
    uint public verifyingScore;
    

    // set a significant commands 
    function setSigCmd(string memory _sigCmdName, uint _sigCmdScore) public {
        sigCommands.push(sigCommand(sigCommands.length+1 ,_sigCmdName, _sigCmdScore));
    }

    // set an employee information
    function setEmp(string memory _empName, uint _empScore) public {
        employees.push(employee(employees.length+1, _empName, _empScore));
    }

    // set an un significant commands
    function setUnSigCmd(string memory _unSigCmdName) public {
        unSigCommands.push(_unSigCmdName);    
    }

    // get a significant commands's score
    // * -> 솔리디티 에서는 문자열 비교가 불가능하다.
    // sigCommands[0].score로 하니, 정상적으로 값이 출력됨을 알 수 있음. 
    function getSigCmd(uint _cmdNum) public returns (uint) {

        require(sigCommands.length > 0);
        
        for(uint i = 0; i < sigCommands.length; i++ ) {
               issuedCmdScore = sigCommands[_cmdNum-1].cmdScore;
               return issuedCmdScore;
        }
    }  

    // function selectVerifyingGroup() public {}
}

// contract for verifing command (when the command is significant in system)
/*
contract Verify {
    // new 
    Command c = new Command();
    
    uint public verifyingScore;
    string[] public verifyingGroup;

    verifyingGroup = 
    function selectVerifyingGroup(c.issuedCmdScore) public {
        c.
    }
    
    
}
*/