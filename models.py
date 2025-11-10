from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: str
    difficulty: str
    explanation: str

class QuizOutput(BaseModel):
    id: Optional[int]
    url: str
    title: str
    summary: str
    key_entities: Dict[str, List[str]]
    sections: List[str]
    quiz: List[QuizQuestion]
    related_topics: List[str]
