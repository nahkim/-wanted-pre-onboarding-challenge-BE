## cli 사용 방법

### 1. [레지스트리에서 이미지 다운로드](https://docs.docker.com/engine/reference/commandline/pull/)
- 명령어
```shell
 docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```
- 예제
```shell
docker pull httpd
```

### 2. [이미지 리스트 확인](https://docs.docker.com/engine/reference/commandline/images/)
- 명령어
```shell
 docker images [OPTIONS] [REPOSITORY[:TAG]]
```
- 예제
```shell
 docker images
```

### 3. [이미지를 이용하여 새 컨테이너 생성 및 실행](https://docs.docker.com/engine/reference/commandline/run/)
- 명령어
```shell
 docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```
- 예제
```shell
 docker run httpd
 docker run --name secondContainer httpd
 docker run -p 8888:80 -v ~/wanted/pre-mission/docker-pro-wanted/lecture-material:/usr/local/apache2/htdocs httpd

```

### 4. [실행중인 컨테이너 중지](https://docs.docker.com/engine/reference/commandline/stop/)
- 명령어
```shell
 docker stop [OPTIONS] CONTAINER [CONTAINER...]
```
- 예제
```shell
 docker stop 9b0f49de746c
 docker stop -a
```

### 5. [컨테이너 로그 가져오기](https://docs.docker.com/engine/reference/commandline/logs/)
- 명령어
```shell
 docker logs [OPTIONS] CONTAINER
```
- 예제
```shell
docker logs second
docker logs second -f
```

### 6. [컨테이너 삭제](https://docs.docker.com/engine/reference/commandline/rm/)
- 명령어
```shell
 docker rm [OPTIONS] CONTAINER [CONTAINER...]
```
- 예제
```shell
docker rm 6026ab9b44cc
docker rm second -f
```

### 7. [이미지 삭제](https://docs.docker.com/engine/reference/commandline/rmi/)
- 명령어
```shell
 docker rmi [OPTIONS] IMAGE [IMAGE...]
```
- 예제
```shell
docker rmi 6026ab9b44cc
```

## Dockerfile 활용
1. Dockerfile 예제
```Dockerfile
# Docker 이미지를 빌드할때 사용할 기존 이미지 지정, 이 이미지의 최신 버전을 사용
FROM httpd:latest

# 현재 디렉토리에 있는 index.html 파일을 httpd 이미지 내부의 경로로 복사
COPY  index.html /usr/local/apache2/htdocs/index.html

# Docker 컨테이너가 실행될 때 해당 컨테이너에서 사용할 포트 지정 : 컨테이너 내부의 웹 서버가 80번 포트에서 실행
EXPOSE 80
```


2. 이미지 만들기

```shell
# Dockerfile을 기반으로 새로운 이미지를 빌드
# t옵션 : 빌드한 이미지에 태그를 지정
# . : Dockerfile이 위치한 경로
docker build -t my-httpd .
```


3. 도커파일로 생성된 이미지로 컨테이너 실행하기

```shell
# Docker 이미지를 사용하여 새로운 컨테이너를 실행
# d옵션 : 컨테이너를 백그라운드에서 실행
# p옵션 : 호스트의 8888포트와 컨테이너의 80 포트를 연결하는 옵션 : 호스트의 8888 포트로 들어온 요청을 컨테이너의 80포트로 전달
docker run -d -p 8888:80 my-httpd
```
