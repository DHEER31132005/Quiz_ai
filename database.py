import os
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.orm import declarative_base, sessionmaker
from datetime import datetime

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./quiz_history.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Quiz(Base):
    __tablename__ = "quiz"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    url = Column(String, unique=True, index=True, nullable=False)
    title = Column(String)
    date_generated = Column(DateTime, default=datetime.utcnow)
    scraped_content = Column(Text)  # Save raw HTML/text for bonus
    full_quiz_data = Column(Text)   # JSON-serialized

Base.metadata.create_all(bind=engine)
