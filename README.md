# ics-idea
access control in ics with smart contract, blockchain (idea) + new trust score system in each rank

based paper: [스마트 컨트랙트 기반의 산업제어시스템 접근 제어 메커니즘](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE08746293)

***

### ics-idea는 기존 논문에서 보안성을 더욱 강화한 스마트 컨트랙트를 활용한 접근 제어 메커니즘을 구현한 내용입니다. 
 - 기존 논문의 취약점으로, 공격자가 팀을 꾸려 공격한다면 막을 수 없는 치명적인 결함이 존재한다. 즉, 보안 측면에서 보완해야 할 점이 존재합니다.
 - ics-idea는 랜덤으로 선택한 검증 그룹을 구성 해, 팀을 꾸려 공격하는 공격자에도 대처 할 수 있는 ics 환경을 구성합니다.
 
<div>
  <img width="850" src="https://user-images.githubusercontent.com/59510222/103611837-77cb4200-4f66-11eb-9c76-4411ee780c66.png">
</div>

### 해결해야 하는 점 
(01/04/21)
  - 기존 시스템(2_New_CounterCommand.sol)과 제안 시스템(1_New_Command.sol)을 [Remix](https://remix.ethereum.org)에서 컴파일하여 실행했을 때
    시간이 약 3초 정도가 더 걸리는 현상이 발생
  - 하지만, [Remix](https://remix.ethereum.org)에서는, 정확한 Timestamp를 비교하기 어렵기 때문에, `web3`를 이용해 `Javascript Timer`를 구현해야 함

(01/18/21)
  - web3를 이용한 실험환경 구성 중.. 컨트랙트를 node에 배포할 경우 address 관련 에러가 지속적으로 발생하는 중. 해결 방법을 아직 찾지 못함

  

***
### Proposed System Architecture
<div>
  <img width="750" src="https://user-images.githubusercontent.com/59510222/103141113-e0c6e480-4732-11eb-8446-8ace1ff65863.png">
</div>

***
### Proposed System Command Execution Process 
<div>
  <img width="600" src="https://user-images.githubusercontent.com/59510222/103154513-158e7680-47db-11eb-8e2c-cdd1ed9b89a8.png">
</div>

***
### Geth console
```
geth --networkid "10" --nodiscover --allow-insecure-unlock --datadir "C:\Users\MyungJoe Kang\Desktop\private_net\ics-idea" --rpc --rpcaddr "localhost" --rpcport "8545" --rpccorsdomain "*" --rpcapi "eth, net, web3, personal" --targetgaslimit "2000000" console 2>> C:\private_net\ics-idea\error.log
```

### `solc.exe`을 이용한 컴파일로 abi, bin 얻기
```
private_net\ics-idea>solc.exe --bin -o bin --overwrite --combined-json abi, bin <File>
```
