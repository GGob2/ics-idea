// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.7.0;

// 1번 명령에 대한 컨트랙트
contract Command_1 {
    
    // 명령 3번의 점수
    uint public cmdScore = 5;

    // 검증에 사용 할 변수
    uint public sumOfVerifyingScore = 0;

    // 검증 여부를 알려줌
    bool public isVerified = false;

    bool public exsited;

    struct employee {
        uint empNum;
        string empName;
        uint empScore;
        uint empTrustScore;
    }

    // 직원 정보들의 array
    employee[] public employees;

    constructor() public {    
        issueCmd_1(3); // 3번 emp가 실행
    }

    function issueCmd_1(uint _empNum) payable public {
        setEmp();   
        setIssuingEmp(_empNum-1);        
    }

    // 검증 버튼을 눌렀을 때 자동으로 검증이 되는 시스템처럼 구현을 해야할 듯 .. 

    function verify() public payable returns (bool) {
        // 검증 그룹 점수의 합 초기화
        sumOfVerifyingScore += getEmpScore(uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 10));
        zeroScoreToEmp(uint8(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty))) % 10));

        if (sumOfVerifyingScore >= cmdScore) {
            isVerified = true;
        }

        return isVerified;
    }

    // 직원 정보 입력하기 - test data
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

    function zeroScoreToEmp(uint __empNum) public {
        employees[__empNum].empScore = 0;
        employees[__empNum].empTrustScore = 0;
    }
}