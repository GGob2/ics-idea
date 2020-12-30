// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.7.0;

// 1번 명령에 대한 컨트랙트
contract Command_1 {
    
    // 명령 3번의 점수
    uint public cmdScore = 5;

    //  검증 그룹이 검증 해야 할 점수 (명령점수 * 2)
    uint public doubleOfCmdScore = 10;
    
    // 랜덤리스트 생성을 위한 랜덤넘버 리스트
    uint[] public randomNumList = [0,1,2,3,4,5,6,7,8,9];

    // 검증 그룹 점수 모으기 --> 검증 그룹 선정 시 사용
    uint public sumOfVerifyingGroupScore;

    // 검증 그룹 점수 모으기 --> 검증 시 사용
    uint public sumOfVerifyingScore;

    // randomNumList에서 검증 그룹 마지막 번호 저장하기
    uint public lastOfVerifyingGroup;
    
    // 검증 그룹 신뢰 점수 모으기
    uint public sumOfVerifyingGroupTrustScore;
    
    // TrustScore로 sumOfVerifyingGroupScore에 점수가 더해졌는지 확인
    bool public trustScoreAdapted = false;

    // 검증 결과 저장
    bool public isVerified = false;


    // Emp 컨트랙트 객체 생성
    Emp public _emp = new Emp(); 
    
    constructor() public {    
        issueCmd_1(3); // 3번 emp가 실행
    }

    function issueCmd_1(uint _empNum) payable public {
        
        // shuffle() - 랜덤리스트 생성
        for (uint256 i = 0; i < randomNumList.length; i++) {
            uint256 n = i + uint256(keccak256(abi.encodePacked(now))) % (randomNumList.length - i);
            uint256 temp = randomNumList[n];
            randomNumList[n] = randomNumList[i];
            randomNumList[i] = temp;
        }

        _emp.setIssuingEmp(_empNum-1);

        // 시간이 제일 오래걸리는 부분
        for(uint j = 0; j < 10; j++) {
            sumOfVerifyingGroupScore += _emp.getEmpScore(randomNumList[j]);
            
            if(sumOfVerifyingGroupScore >= doubleOfCmdScore) {
                lastOfVerifyingGroup = j;
                break;
            }
        }        
    }
    
    // 검증 그룹이 명령을 검증하는 function --> 검증 그룹의 index를 파라미터로 사용
    function verify(uint _numOfVerifyingGroup) public payable returns (bool) {
        // 검증 그룹 점수의 합 초기화
        sumOfVerifyingGroupScore = 0;

        sumOfVerifyingScore += _emp.getEmpScore(randomNumList[_numOfVerifyingGroup]);
        sumOfVerifyingGroupTrustScore += _emp.getEmpTrustScore(randomNumList[_numOfVerifyingGroup]);

        if(sumOfVerifyingGroupTrustScore >= doubleOfCmdScore && trustScoreAdapted == false) {
            sumOfVerifyingScore += 1;
            trustScoreAdapted = true;
        }

        if(sumOfVerifyingScore >= cmdScore) {
            isVerified = true;
        }
        
        return isVerified;
    }

    // TODO : 2개의 함수로 분리
    // 검증 과정 후, 신뢰 점수 피드백
    function trustScoreFeedback() public payable {
        if(isVerified == true) {
            trustScorePlusFeedback();
        } else {
            trustScoreMinusFeedback();
        }
    }

    function trustScorePlusFeedback() public payable {
        for(uint t = 0; t < lastOfVerifyingGroup; t++) {
            _emp.plusEmpTrustScore(randomNumList[t]);
        }
    }
    
    function trustScoreMinusFeedback() public payable {
        for(uint g = 0; g < lastOfVerifyingGroup; g++) {
            _emp.minusEmpTrustScore(randomNumList[t]);
        }
    }
    


}

contract Emp {
    constructor() public {
        setEmp();
    }

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
    
    // 명령 내린 직원의 점수를 0으로 바꾸는 함수
    function setIssuingEmp(uint _issuingCmdEmpNum) public {
        employees[_issuingCmdEmpNum].empScore = 0;
        employees[_issuingCmdEmpNum].empTrustScore = 0;
    }

    // 파라미터로 넘겨준 번호에 해당하는 직원의 점수를 가져오는 함수
    function getEmpScore(uint _empNum) public view returns(uint) {
        return employees[_empNum].empScore;
    }
    
    // 파라미터로 넘겨준 번호에 해당하는 직원의 신뢰점수를 가져오는 함수
    function getEmpTrustScore(uint _empNum) public view returns(uint) {
        return employees[_empNum].empTrustScore;
    }

    // TODO : 2개의 function으로 바꾸기
    // 검증 과정이 끝난 후, 신뢰 점수를 증감하는 함수
    function plusEmpTrustScore(uint _empNum) public {
        employees[_empNum].empTrustScore += 1;
    }

    function minusEmpTrustScore(uint _empNum) public {
        employees[_empNum].empTrustScore -= 1;
    }
}




/* 12.24 --> 기능 작동 여부: 

1. 랜덤리스트 생성 o
2. 직원 정보 컨트랙트 생성자 o

*/
                             
