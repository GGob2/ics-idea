// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.7.0;

contract Command_1 {
    
    struct verifying {
        string verifyingGroupEmpName;
        uint verifyingGroupEmpScore;
        uint verifyingGroupEmpTrustScore;
    }
    
    // 명령 3번의 점수
    uint public cmdScore = 5;

    //  검증 그룹이 검증 해야 할 점수 (명령점수 * 2)
    uint public doubleOfCmdScore = 10;
    
    // 랜덤리스트 생성을 위한 랜덤넘버 리스트
    uint[] public randomNumList = [0,1,2,3,4,5,6,7,8,9];

    // 검증 그룹 점수 모으기
    uint public sumOfVerifyingGroupScore;

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
    
    // 정상적으로 작동
    uint public empScoreTest = _emp.getEmpScore(0);

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

        for(uint i = 0; i < 10; i++) {
            sumOfVerifyingGroupScore += _emp.getEmp(randomNumList[i]);
            
            if(sumOfVerifyingGroupScore >= doubleOfCmdScore) {
                lastOfVerifyingGroup = i;
                break;
            }
        }        

    }
    
    // 검증 그룹이 명령을 검증하는 function --> 검증 그룹의 index를 파라미터로 사용
    function verify(uint _numOfVerifyingGroup) public payable returns (bool) {
        // 검증 그룹 점수의 합 초기화
        sumOfVerifyingGroupScore = 0;

        sumOfVerifyingGroupScore += _emp.getEmpScore(_numOfVerifyingGroup);
        sumOfVerifyingGroupTrustScore += _emp.getEmpTrustScore(_numOfVerifyingGroup);

        if(sumOfVerifyingGroupTrustScore >= doubleOfCmdScore && trustScoreAdapted == false) {
            sumOfVerifyingGroupScore += 1;
            trustScoreAdapted = true;
        }

        if(sumOfVerifyingGroupScore >= cmdScore) {
            isVerified = true;
        }
        return isVerified;
    }

    function trustScoreFeedback() public payable {
        if(isVerified == true) {
            for(uint t = 0; t < lastOfVerifyingGroup-1; t++) {
                _emp.updateEmpTrustScore(randomNumList[t], true);
            }
        } else {
            for(uint t = 0; t < lastOfVerifyingGroup-1; t++) {
                _emp.updateEmpTrustScore(randomNumList[t], false);
            }
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
    
    // 파라미터로 넘겨준 번호에 해당하는 직원의 점수를 가져오는 함수
    function getEmpScore(uint _empNum) public view returns(uint) {
        return employees[_empNum].empScore;
    }
    
    // 파라미터로 넘겨준 번호에 해당하는 직원의 신뢰점수를 가져오는 함수
    function getEmpTrustScore(uint _empNum) public view returns(uint) {
        return employees[_empNum].empTrustScore;
    }

    // 검증 과정이 끝난 후, 신뢰 점수를 증감하는 함수
    function updateEmpTrustScore(uint _empNum, bool _issuedStatus) public {
        if(_issuedStatus == true) {
            employees[_empNum].empTrustScore += 1;
        } else {
            employees[_empNum].empTrustScore -= 1;
        }
    }


    
}

