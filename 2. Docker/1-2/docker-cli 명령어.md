# command

```bash
docker network ls
```

## prune은 정지되거나 사용하고있지 않는 네트워크를 삭제하는 명령어
<br>

네트워크 삭제
```bash
docker network prune
```

컨테이너 삭제
```bash
docker container prune
```

도커 파일 모두 멈추기
```bash
docker stop $(docker ps -aq)
```