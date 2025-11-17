import pytest
from httpx import AsyncClient, ASGITransport
from backend.main import app


@pytest.mark.anyio("asyncio")
async def test_post_message():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:

        payload = {"email": "test@example.com", "message": "Hello"}
        response = await client.post("/messages", json=payload)

        assert response.status_code == 200
        data = response.json()
        assert data["email"] == "test@example.com"
        assert data["message"] == "Hello"


@pytest.mark.anyio("asyncio")
async def test_get_messages():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as client:

        response = await client.get("/messages")

        assert response.status_code == 200
        assert isinstance(response.json(), list)
