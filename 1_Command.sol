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

    10/13 발견 문제점: 검증 과정에서 검증그룹의 정보를 가져오는 것이 아니라, employees의 정보를 가져옴.. 
                       --> 검증그룹을 선정할 때, Employees의 정보들을 같이 가져온다.
    
    11/2 발견 문제점: randomList가 employees의 길이만큼 생성되어야 하는데 (검증그룹 선정 중) 그렇지 못함..

    11/24 개선 : 1. shuffle 부분 issueSigCmd 부분과 합칠 것 -->완료
                 2. employee 관리 부분 따로 Contract로 작성할 것  --> 완료
                 3. 컨트랙트당 명령 1개 사용 --> Constructor 이용해서 issueSigCmd 수행 --> 검증 그룹을 따로 index로 저장하거나 하지 않아도 됨

  */

contract Command_1 {

    // 중요한 명령을 담을 구조체
    struct sigCommand {
        uint cmdNum;
        string cmdName;
        uint cmdScore;
    }

    // 검증그룹에서 직원들의 이름과 trust score
    struct verifying{
        string verifyingGroupEmpName;
        uint verifyingEmpScore;
        uint verifyingTrustScore;
    } 
    
    // 직원이 실행한 명령의 점수를 담을 변수
    uint public issuedCmdScore;

    // 중요한 명령들의 array
    sigCommand[] public sigCommands;

    // 검증 그룹의 array
 //    employee[] public verifyingGroup;   --> 어떻게 할건지 다시 구상.

/* // 중요하지 않은 명령들의 array
    string[] public unSigCommands;  */

    // 검증할 명령의 점수 * 2 
    uint public verifyingScore;
    
    // 검증그룹에서 검증했을 때, 총 점수
    uint public sumOfVerifyingScore;

    // 검증 그룹을 선정할 랜덤 넘버 --> nonUse
    // uint public randomNum = 0;
    
    // 검증 과정에서 사용하는 검증 점수
    uint public verifyingGroupScore = 0;    

    // 검증 과정에서 사용하는 직원 검증 신뢰도
    uint public verifyingGroupTrustScore = 0;

    // TrustScore로 검증 과정에 점수가 더해졌는지 확인
    bool public trustScoreAdapted = false;

    // 실제로 검증에 참여한 사람들의 번호
    uint[] public candidateList;

    // 검증 그룹에 속해있는지 확인하는 변수
    bool public existed = false;

    // 검증이 완료되었는지 확인하기 위한 변수
    bool public isCmdVerified = false;

    // 명령을 내린 직원
    uint public empIssuedCmd;

    // 새로운 랜덤 리스트
    uint[] public randomNumList = [0,1,2,3,4,5,6,7,8,9];

    uint public empLen;

    Emp public _emp = new Emp() ;

   constructor() public {

       empLen = _emp.setEmp();

       issueSigCmd(2);
}


    // 명령 정보 입력하기
   function setSigCmd() public {
       
        sigCommands.push(sigCommand(sigCommands.length+1 , "명령1", 3));
        sigCommands.push(sigCommand(sigCommands.length+1 , "명령2", 6));
        sigCommands.push(sigCommand(sigCommands.length+1 , "명령3", 10));
        sigCommands.push(sigCommand(sigCommands.length+1 , "명령4", 7));
        sigCommands.push(sigCommand(sigCommands.length+1 , "명령5", 4));
    }

    // 명령 내리는 transaction
    function issueSigCmd(uint _empNum) payable public {

        // shuffle() - 랜덤리스트 생성
        for (uint256 i = 0; i < randomNumList.length; i++) {
            uint256 n = i + uint256(keccak256(abi.encodePacked(now))) % (randomNumList.length - i);
            uint256 temp = randomNumList[n];
            randomNumList[n] = randomNumList[i];
            randomNumList[i] = temp;
        }

        // 1번 명령
        issuedCmdScore = 3;
        verifyingScore = 6;

        empIssuedCmd = _empNum-1;

        // 문제점(11.24) --> 누구까지가 검증그룹에 속해있는지 판별할 수 없음
        for(uint j = 0; j < 10; j++) {

            // 검증그룹에 속한 직원들의 직원 점수의 합 >= (명령 실행 점수 * 2) 만족하는지를 위해
            sumOfVerifyingScore += _emp.employees[0].empScore;
            
            // 신뢰도를 증/감 할때 사용 --> verify 끝날 때 return bool 받아서 실행할때
            // candidateList.push(randomNumList[j]);
            
            if (sumOfVerifyingScore >= verifyingScore) {
                break;
            }
            
        }
    }  

    /*// 검증 그룹이 명령을 검증하는 function --> 검증 그룹의 index로 검증.
    function verify(uint __empNum) public payable returns (bool) {
        
        // 검증 과정
        verifyingGroupScore += verifyingGroup[__empNum-1].empScore;
        verifyingGroupTrustScore += verifyingGroup[__empNum-1].empTrustScore;

        if(verifyingGroupTrustScore >= verifyingScore && trustScoreAdapted == false) {
            verifyingGroupScore += 1;
            trustScoreAdapted = true;
        }

        if(verifyingGroupScore >= issuedCmdScore) {
            return true;
        } else {
            return false;
        }
        
    }

    // 명령 실행 결과에 따라 직원 검증 신뢰도에 +1 or -2 적용 함수
    function trustScoreFeedback(bool _executedWell) public payable {
        if(_executedWell == true) {
            for(uint g = 0; g < candidateList.length; g++) {
                employees[candidateList[g]].empTrustScore += 1;
            }
        }
        else {
            for(uint t = 0; t < candidateList.length; t++) {
                employees[candidateList[t]].empTrustScore -= 1;
            }
        }
    }
    */
}

contract Emp {
    // 직원들의 정보를 담을 구조체
    struct employee {
        uint empNum;
        string empName;
        uint empScore;
        uint empTrustScore;
    }

    // 직원 정보들의 array
    employee[] public employees;

    // 직원 정보 입력하기
    function setEmp() public returns (uint) {
        employees.push(employee(employees.length+1, "사원1", 1, 0));
        employees.push(employee(employees.length+1, "사원2", 2, 1));
        employees.push(employee(employees.length+1, "대리1", 2, 2));
        employees.push(employee(employees.length+1, "대리2", 3, 2));
        employees.push(employee(employees.length+1, "차장1", 3, 3));
        employees.push(employee(employees.length+1, "차장2", 4, 3));
        employees.push(employee(employees.length+1, "과장", 5, 3));
        employees.push(employee(employees.length+1, "팀장", 6, 5));
        employees.push(employee(employees.length+1, "부사장", 7, 4));
        employees.push(employee(employees.length+1, "사장", 9, 8));

        return employees.length;
    }
}
