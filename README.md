# AI Wiki Quiz Generator

## Backend Setup
cd backend/
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Place API key in .env
uvicorn main:app --reload

## Frontend Setup
cd frontend/
npm install
npm run dev

# Access on http://localhost:5173
