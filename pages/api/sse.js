// pages/api/sse.js

export default async function handler(req, res) {
    // Server-Sent Events (SSE)에 대한 헤더 설정
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 클라이언트에 메시지 보내기
    res.write(`data: ${JSON.stringify({ message: 'Hello, world!' })}\n\n`);

    // 연결 유지
    // 실제 로직으로 업데이트를 보내는 대체 로직으로 이 부분을 대체할 수 있습니다.
    setInterval(() => {
        res.write(`data: ${JSON.stringify({ message: 'Still connected' })}\n\n`);
    }, 5000);
}
