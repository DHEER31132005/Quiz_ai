import os
from typing import Dict
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import PromptTemplate
from langchain.output_parsers.json import JsonOutputParser

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

prompt_template = """
Given the following Wikipedia article content, generate a quiz with 5-10 multiple-choice questions (A, B, C, D), difficulty level, explanation, and suggest related topics for extra reading. 
Extract these also: article summary, key entities (people/places/organizations), and section names.
Response format:
{format_instructions}

ARTICLE TITLE: {title}

CONTENT:
{content}
"""

def generate_quiz_with_llm(title: str, url: str, content: str) -> Dict:
    parser = JsonOutputParser()
    prompt = PromptTemplate.from_template(
        prompt_template,
        partial_variables={
            "format_instructions": parser.get_format_instructions(),
        },
    )
    model = ChatGoogleGenerativeAI(
        model="gemini-1.5-flash",
        temperature=0.2,
        google_api_key=GEMINI_API_KEY,
    )
    chain = prompt | model | parser
    response = chain.invoke({"title": title, "content": content})
    response['url'] = url
    response['title'] = title or response.get('title', '')
    return response
