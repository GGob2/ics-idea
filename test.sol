pragma solidity >=0.4.22 < 0.7.0;

contract Command_test {    
    
    uint[] public randomNumList;

    bool public existed = false;
    
    uint public randomNum;
    
    // 랜덤 숫자를 구하는 함수
    function random() public  {
        // employees.length == 10
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
}
