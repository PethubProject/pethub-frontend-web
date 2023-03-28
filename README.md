# PET HUB WEB APPLCATIONTION

---

비대면 반려 동물 진료 웹 어플리케이션

## 개발 환경 설정 및 구동 방법

---

### 1. 준비

- node.js 설치 : https://nodejs.org/ko
- ngrok 설치 : https://ngrok.com/download
- git 설치 : https://git-scm.com/downloads

### 2. 코드 내려 받기

```
git clone https://github.com/PethubProject/pethub-frontend-web.git
cd pethub-frontend-web
```

### 3. Dependency 설치

```
npm install
```

### 4. Development 시작

```
npm run start
```

---

### 5. 외부 접속 url 생성 [*Options]

- ngrok 로그인 : https://dashboard.ngrok.com/login

<p align="center"><img src="document/Cap 2023-03-28 14-00-00-898.jpg"></p>

- ngrok zip 파일 다운로드

<p align="center"><img src="document/Cap 2023-03-28 14-00-17-234.jpg"></p>

- zip 파일 압출 풀기
- 디렉토리 이동
- ngrok.exe 실행

<p align="center"><img src="document/Cap 2023-03-28 14-01-29-272.jpg"></p>
<p align="center"><img src="document/Cap 2023-03-28 14-07-13-949.jpg"></p>

- 토큰 입력 : 처음만 입력하면 됨

<p align="center"><img src="document/Cap 2023-03-28 14-02-07-672.jpg"></p>

- 실행 : npm run start 또는 serve -s build 로 localhost 서버 실행
- port 번호에 맞춰 명령어 실행 (default port : 3000)

```
ngrok http 3000
```
