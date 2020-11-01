pragma solidity >=0.4.22 < 0.7.0;

/* 

    논문 CounterPart 구현체
    
    1. 명령들과, 직원들 정보 설정
    2. 명령을 내림
    3. 검증그룹 선정 과정 없이 employees에게 검증 요청
    4. employees 순서대로 검증
    5. 끝.
    
    11/01. 명령을 내리면 --> 명령을 내린 직원을 제외하고 
        employees에게 검증 요청 --> 아무나 검증해서 명령 점수를 만족하면 --> 명령 수행  
  */


contract Command {    
    
    // 중요한 명령을 담을 구조체
    struct sigCommand {
        uint cmdNum;
        string cmdName;
        uint cmdScore;        
    }

    // 직원들의 정보를 담을 구조체
    struct employee {
        uint empNum;
        string empName;
        uint empScore;
    }

    // 직원이 실행한 명령의 점수를 담을 변수
    uint public issuedCmdScore;

    // 중요한 명령들의 array
    sigCommand[] public sigCommands;
    
    // 직원 정보들의 array
    employee[] public employees;

    // 중요하지 않은 명령들의 array
    string[] public unSigCommands;

    // 검증할 명령의 점수 * 2 
    uint public verifyingScore;

    // 명령을 내린 직원
    uint public issuingCmdEmp;
    
    
    bool public isCmdVerified;



    // 중요한 명령들 입력하기
    function setSigCmd(string memory _sigCmdName, uint _sigCmdScore) public {
        sigCommands.push(sigCommand(sigCommands.length+1 ,_sigCmdName, _sigCmdScore));
    }


    // 직원 정보 입력하기
    function setEmp(string memory _empName, uint _empScore) public {
        employees.push(employee(employees.length+1, _empName, _empScore));
    }


    // 중요하지 않은 명령들 입력하기 
    function setUnSigCmd(string memory _unSigCmdName) public {
        unSigCommands.push(_unSigCmdName);    
    }


    // get a significant commands's score
    // * -> 솔리디티 에서는 문자열 비교가 불가능하다.
    // sigCommands[0].score로 하니, 정상적으로 값이 출력됨을 알 수 있음. 
    function issueSigCmd(uint _cmdNum, bool _sig, uint _empNum) public {
        
        issuingCmdEmp = _empNum;

        // 중요한 명령인지 판단 ?
        if(_sig == true) {
            require(sigCommands.length > 0);
            issuedCmdScore = sigCommands[_cmdNum-1].cmdScore;
            
       } 
       else {
           issuedCmdScore = 0;
       }

    }  




    // 검증 그룹이 명령을 검증하는 function
    function verify(uint __empNum) public payable returns (bool) {
        
        require(__empNum != issuingCmdEmp);
        
        verifyingScore += employees[__empNum].empScore;
        
        
        if(verifyingScore >= issuedCmdScore) {
            isCmdVerified = true;
        } else {
            isCmdVerified = false;
        }
        
        return isCmdVerified;
    }


/*
    
    // 해당 명령어 김증되었는지 확인하는 함수
    function isVerified() public returns(bool) {
        
    }
*/
}

