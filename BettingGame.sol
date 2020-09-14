pragma solidity ^0.4.21;

contract BettingGame {
  address public admin;
  address[] public players;

  constructor() public {
    admin = msg.sender;
  }

  function betting() public payable { // 배팅최소금액
    require(msg.value >= 1 ether);

    players.push(msg.sender); // 배열에 참가자들을 넣는다.
  }

  function random() private view returns (uint) {  // random값을 뽑아준다.
    return uint(keccak256(abi.encodePacked(block.difficulty, now, players)));
  }

  function pickWinner() public restricted { // random값과 배열길이만큼 모듈러 한 나머지 값으로 당첨자를 뽑는다.
    uint index = random() % players.length;

    players[index].transfer(address(this).balance); // 당첨된 배열 인덱스의 계좌로 송금

    players = new address[](0); // 게임이 끝나면 배열 초기화
  }

  function getPlayers() public view returns (address[]) { // 게임 참가자를 보여준다.
    return players;
  }

  modifier restricted() { // 게임 진행자를 설정한다.
    require(msg.sender == admin);
    _;
  }
}