pragma solidity >=0.4.22 < 0.7.0;

/* 
    1. 중요한 명령과 중요하지 않은 명령으로 구분할 것 
    (중요한 명령들을 배열에 넣는다고 생각했을 때, 점수를 어떻게 관리할 것인지 생각해야함)
    
    2. 명령 내리는 과정을 event로 진행할 것인지, 그냥 컨트랙트로만 진행할 지 생각해야함
     2-1. for문 사용해서 if( 내려진 명령이 중요한 명령 리스트에 있으면 ) --> 검증 컨트랙트 시작 

    3. verify 과정 시작할 때  

    * 현재 발견한 문제점 : solidity는 int, uint만 지원.. score 할 때 소수점 사용 못함.. --> ?

      아이디어 변경: 직원 검증 신뢰도 도입.
      검증 그룹에 속한 직원은 명령이 실행된 다음, 피드백에 의해 정상적인 검증 / 비정상적인 검증 으로 분류됨.
      정상적으로 검증했으면 직원 검증 신뢰도 1점 부여, 비정상적으로 검증했으면 -2점 부여

    09/22 발견 문제점: for문 속에서 random 값이 바뀌지 않는다. 이유 --> ? 너무 빨리 for문이 돌아버리기 때문..

    10/09 발견 문제점: 명령을 내린사람은 검증그룹에 포함되서는 안됨.

    

  */

contract Command {    
    
    // event issueCmd(address _issuer, uint _cmdNumber);
    // event verifyCmd(

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
        uint empTrustScore;
    }

    // 검증그룹에서 직원들의 이름과 trust score
    struct verifying{
        string verifyingGroupEmpName;
        uint verifyingTrustScore;
    }

    // 직원이 실행한 명령의 점수를 담을 변수
    uint public issuedCmdScore;

    // 중요한 명령들의 array
    sigCommand[] public sigCommands;
    
    // 직원 정보들의 array
    employee[] public employees;
 
    // 검증 그룹의 array
    verifying[] public verifyingGroup;

    // 중요하지 않은 명령들의 array
    string[] public unSigCommands;

    // 검증할 명령의 점수 * 2 
    uint public verifyingScore;
    
    // 검증그룹에서 검증했을 때, 총 점수
    uint public sumOfVerifyingScore;

    // 검증 그룹을 선정할 랜덤 넘버
    uint public randomNum = 0;
    
    // 검증 과정에서 사용하는 검증 점수
    uint public verifyingGroupScore = 0;    

    // 검증 과정에서 사용하는 직원 검증 신뢰도
    uint public verifyingGroupTrustScore = 0;

    // TrustScore로 검증 과정에 점수가 더해졌는지 확인
    bool public trustScoreAdapted = false;

    // 실제로 검증에 참여한 사람들의 번호
    uint[] public candidatedList;
    
    // 무작위 수가 들어가있는 리스트
    uint[] public randomNumList;

    // 검증 그룹에 속해있는지 확인하는 변수
    bool public existed = false;

    // 검증이 완료되었는지 확인하기 위한 변수
    bool public isVerified = false;

    // 중요한 명령들 입력하기
    function setSigCmd(string memory _sigCmdName, uint _sigCmdScore) public {
        sigCommands.push(sigCommand(sigCommands.length+1 ,_sigCmdName, _sigCmdScore));
    }


    // 직원 정보 입력하기
    function setEmp(string memory _empName, uint _empScore, uint _empTrustScore) public {
        employees.push(employee(employees.length+1, _empName, _empScore, _empTrustScore));
    }


    // 중요하지 않은 명령들 입력하기 
    function setUnSigCmd(string memory _unSigCmdName) public {
        unSigCommands.push(_unSigCmdName);    
    }


    // get a significant commands's score
    // * -> 솔리디티 에서는 문자열 비교가 불가능하다.
    // sigCommands[0].score로 하니, 정상적으로 값이 출력됨을 알 수 있음. 
    function issueSigCmd(uint _cmdNum, bool _sig) public returns (uint) {

        // 중요한 명령인지 판단 ?
        if(_sig == true) {
            require(sigCommands.length > 0);
            
            for(uint i = 0; i < sigCommands.length; i++ ) {
                issuedCmdScore = sigCommands[_cmdNum-1].cmdScore;
                return issuedCmdScore;
            }
       } 
       else {
           issuedCmdScore = 0;
           return issuedCmdScore;
       }
    }  


    // 명령 검증을 위해 검증 그룹을 형성하는 function
    // random() 함수를 먼저 한번 실행해야 함
    function selectVerifyingGroup(uint _verifyingCmdNum) public payable returns (uint) {
        require(_verifyingCmdNum > 0 && employees.length > 0);
        
        // 명령 번호를 받아와서 점수의 2배수만큼을 verifyingScore에 집어넣음
        verifyingScore = (sigCommands[_verifyingCmdNum-1].cmdScore) * 2;   // 정상적으로 작동

        // 랜덤 넘버가 중복되는 경우를 생각해야함.
        for(uint j = 0; j < employees.length; j++) {
            if (sumOfVerifyingScore >= verifyingScore) {
                break;
            }
            else {
                verifyingGroup.push(verifying(employees[randomNumList[j]].empName, employees[randomNumList[j]].empTrustScore));
                sumOfVerifyingScore += employees[randomNumList[j]].empScore;
                candidatedList.push(randomNumList[j]);        
            }
        }
        
    }


    // 검증 그룹이 명령을 검증하는 function
    function verify(uint __empNum) public payable returns (uint) {
        verifyingGroupScore += employees[__empNum].empScore;
        verifyingGroupTrustScore += employees[__empNum].empTrustScore;

        if(verifyingGroupTrustScore >= verifyingScore && trustScoreAdapted == false) {
            verifyingGroupScore += 1;
            trustScoreAdapted = true;
        }
        return 0;
    }


    // 명령 실행 결과에 따라 직원 검증 신뢰도에 +1 or -2 적용 함수
    function trustScoreFeedback(bool _executedWell) public payable {
        if(_executedWell == true) {
            for(uint g = 0; g < candidatedList.length; g++) {
                employees[candidatedList[g]].empTrustScore += 1;
            }
        }
        else {
            for(uint t = 0; t < candidatedList.length; t++) {
                employees[candidatedList[g]].empTrustScore -= 2;
            }
        }
    }


    // 랜덤 숫자를 구하는 함수
    function random() public  {
        // employees.length == 10 가정
        for(uint i = 0; i < 10; i++) {
            
            // randomNum = uint8(uint256(keccak256(abi.encodePacked(block.timestamp+i, block.difficulty-i))) % 10);
            
            existed = false;
            
            exam(uint8(uint256(keccak256(abi.encodePacked(block.timestamp+i, block.difficulty+i))) % 10));
            
            if(existed == true){
                continue;
            }
            
            if(existed == false) {
                randomNumList.push(uint8(uint256(keccak256(abi.encodePacked(block.timestamp+i, block.difficulty+i))) % 10));
            }
        }
    }
    

    //검증 그룹에 해당 직원이 속해있는지 확인하는 함수
    function exam(uint _randomNum) public  {
        for(uint j = 0; j < randomNumList.length; j++) {
            if(randomNumList[j] == _randomNum){
                existed = true;
                break;
            } else {
                existed = false;
                
            }
        }
    }

    // 해당 명령어 김증되었는지 확인하는 함수
    function isVerified() public returns(bool) {
        if(verifyingGroup >= verifyingScore) {
            return true;
        } else {
            return false;
        }
    }
}

