pragma solidity >=0.4.22 < 0.7.0;

contract Command_1 {

    uint[] public randomNumList = [0,1,2,3,4,5,6,7,8,9];

    constructor() public {
        issueCmd(3, 5);
    }




    function issueCmd(uint _empNum, uint cmdScore) payable public {
        
        // shuffle() - 랜덤리스트 생성
        for (uint256 i = 0; i < randomNumList.length; i++) {
            uint256 n = i + uint256(keccak256(abi.encodePacked(now))) % (randomNumList.length - i);
            uint256 temp = randomNumList[n];
            randomNumList[n] = randomNumList[i];
            randomNumList[i] = temp;
        }






    }


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

