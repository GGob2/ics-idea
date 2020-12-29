# ics-idea
access control in ics with smart contract, blockchain (idea) + new trust score system in each rank

based paper: 스마트 컨트랙트 기반의 산업제어시스템 접근 제어 메커니즘 [dbpia](https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE08746293)

### ics-idea는 기존 논문에서 보안성을 더욱 강화한 스마트 컨트랙트를 활용한 접근 제어 메커니즘을 구현한 내용입니다. 
 - 기존 논문의 취약점으로, 공격자가 팀을 꾸려 공격한다면 막을 수 없는 치명적인 결함이 존재한다. 즉, 보안 측면에서 보완해야 할 점이 존재합니다.
 - ics-idea는 랜덤으로 선택한 검증 그룹을 구성 해, 팀을 꾸려 공격하는 공격자에도 대처 할 수 있는 ics 환경을 구성합니다.
 

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
geth --networkid "10" --nodiscover --datadir C:\private_net\ics-idea --rpc --rpcaddr "localhost" --rpcport "8545" --rpccorsdomain "*" --rpcapi "eth, net, web3, personal" --targetgaslimit "2000000" console 2>> C:\private_net\ics-idea\error.log
```

