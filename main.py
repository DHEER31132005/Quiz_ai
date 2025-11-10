from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AnswerIn(BaseModel):
    answer: str

# Hardcoded quiz for demo
QUIZ = {
    "question": "Who is known as the father of computing?",
    "options": ["A. Charles Babbage", "B. Alan Turing", "C. Ada Lovelace", "D. John von Neumann"],
    "answer": "A",
    "explanation": "Charles Babbage is widely considered the father of computing for his design of the Analytical Engine."
}

@app.get("/quiz")
def quiz():
    return {
        "question": QUIZ["question"],
        "options": QUIZ["options"]
    }

@app.post("/quiz/answer")
def quiz_answer(ans: AnswerIn):
    correct = ans.answer.upper() == QUIZ['answer']
    result = {
        "correct": correct
    }
    if correct:
        result["message"] = "Correct!"
    else:
        result["message"] = f"Wrong. Correct answer: {QUIZ['answer']}. {QUIZ['explanation']}"
    return result
