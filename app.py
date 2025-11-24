from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
import requests
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'

ROLE_CONFIGS = {
    'software-engineer': {
        'name': 'Software Engineer',
        'topics': ['algorithms', 'data structures', 'system design', 'coding challenges', 'problem-solving'],
        'question_types': ['technical', 'behavioral', 'system design']
    },
    'sales': {
        'name': 'Sales Representative',
        'topics': ['customer relationships', 'negotiation', 'closing deals', 'objection handling', 'product knowledge'],
        'question_types': ['situational', 'behavioral', 'role-play']
    },
    'retail-associate': {
        'name': 'Retail Associate',
        'topics': ['customer service', 'product knowledge', 'teamwork', 'handling difficult situations', 'sales techniques'],
        'question_types': ['situational', 'behavioral', 'customer service scenarios']
    },
    'product-manager': {
        'name': 'Product Manager',
        'topics': ['product strategy', 'user research', 'prioritization', 'cross-functional collaboration', 'metrics'],
        'question_types': ['product thinking', 'behavioral', 'case studies']
    },
    'data-scientist': {
        'name': 'Data Scientist',
        'topics': ['statistics', 'machine learning', 'data analysis', 'problem-solving', 'modeling'],
        'question_types': ['technical', 'statistical', 'case studies']
    },
    'marketing': {
        'name': 'Marketing Specialist',
        'topics': ['campaigns', 'analytics', 'brand management', 'digital marketing', 'content strategy'],
        'question_types': ['strategic', 'analytical', 'creative']
    }
}

def call_openai_api(messages, temperature=0.7, max_tokens=500):
    headers = {
        'Authorization': f'Bearer {OPENAI_API_KEY}',
        'Content-Type': 'application/json'
    }
    
    data = {
        'model': 'gpt-4.1-mini',
        'messages': messages,
        'temperature': temperature,
        'max_tokens': max_tokens
    }
    
    try:
        response = requests.post(OPENAI_API_URL, headers=headers, json=data, timeout=30)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"OpenAI API Error: {e}")
        return None


INTERVIEWER_BEHAVIOR_PROMPT = """
You are a professional AI interviewer. You must simulate a realistic interview and handle ALL user behavior types.

Personality:
- Friendly, patient, and professional
- Never breaks interview mode

====================================================================
BEHAVIOR RULES
====================================================================

1. ALWAYS stay in interview mode.
2. Ask exactly ONE interview question at a time.
3. Never provide answers, hints, corrections, or explanations.
4. When user responds normally → continue with the next interview question.

====================================================================
SMART OFF-TOPIC DETECTION (STRICT)
====================================================================

Classify the user's response as OFF-TOPIC if it matches ANY of:

- very short: “ok”, “lol”, “k”, “bruh”, “haha”, “yes”, “no”
- “idk”
- emojis: 😂😭🔥💀🙏😅 etc.
- random symbols: “????”, “…..”
- nonsense text: “asdf”, “aaah”, “dfgdfg”
- meme/joke words: “sigma”, “rizz”, “skibidi”, “meow”, “bro wtf”
- unrelated conversation: “how are you”, “do you like cats”
- derail attempts: “tell me a joke”, “stop”, “sing for me”

If OFF-TOPIC:
1. DO NOT answer the user message.
2. Use *one* of these redirect lines:
   - “No problem — let’s get back to the interview.”
   - “Let’s stay on track and continue the interview.”
   - “Returning to the interview now.”
   - “Let’s remain focused — continuing with the interview.”

3. Immediately follow with the next interview question.

====================================================================
CONFUSED USER HANDLING
====================================================================
If the user expresses confusion (“idk”, “I don’t know”, “I’m confused”, “not sure”):

1. Do NOT classify this as off-topic.
2. Respond with:
   - a brief reassurance (“No worries, take your time.”)
   - a **simpler restated version** of the question.

Example:
“No worries — I’ll rephrase simply. [simplified question].”

====================================================================
INTERVIEW FLOW
====================================================================
- Ask 5–7 questions in total.
- Keep questions short, direct, and role-specific.
- Never ask two questions at once.
- Finish with a short polite conclusion.

====================================================================
OUTPUT
====================================================================
Return ONLY the interviewer message.
"""


def generate_initial_question(role_config):
    system_prompt = f"""
{INTERVIEWER_BEHAVIOR_PROMPT}

Role: {role_config['name']}
Topics: {', '.join(role_config['topics'])}
Question types: {', '.join(role_config['question_types'])}

Start the interview with:
1. a warm greeting
2. the first relevant question
"""

    messages = [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': 'Please start the interview.'}
    ]
    
    result = call_openai_api(messages, temperature=0.8, max_tokens=300)

    if result and 'choices' in result:
        return result['choices'][0]['message']['content']

    return f"Hello! Welcome to the interview for the {role_config['name']} role. Can you tell me a bit about yourself?"


def generate_followup_question(user_response, conversation_history, role_config, question_count):
    system_prompt = f"""
{INTERVIEWER_BEHAVIOR_PROMPT}

Role: {role_config['name']}
Topics: {', '.join(role_config['topics'])}
Question types to mix: {', '.join(role_config['question_types'])}
Current question number: {question_count}
"""

    messages = [{'role': 'system', 'content': system_prompt}]

    for msg in conversation_history[-6:]:
        messages.append({'role': msg['role'], 'content': msg['content']})

    messages.append({'role': 'user', 'content': user_response})

    result = call_openai_api(messages, temperature=0.8, max_tokens=300)

    if result and 'choices' in result:
        text = result['choices'][0]['message']['content']
        done = question_count >= 6 or "thank you" in text.lower()
        return {'message': text, 'isComplete': done}

    return {
        'message': "No worries — let's continue. Can you give an example from your past experience?",
        'isComplete': question_count >= 6
    }



def generate_feedback(conversation_history, role_config):
    system_prompt = f"""You are an expert interview coach providing feedback on a mock interview for a {role_config['name']} role.

Provide:
- overall score (0–100)
- communication score
- technical score
- 3–5 strengths
- 3–5 improvements
- detailed feedback paragraph

Format:
{{
  "overallScore": 0,
  "communicationScore": 0,
  "technicalScore": 0,
  "strengths": [],
  "improvements": [],
  "detailedFeedback": ""
}}
"""

    transcript = "\n".join([f"{msg['role'].upper()}: {msg['content']}" for msg in conversation_history])

    messages = [
        {'role': 'system', 'content': system_prompt},
        {'role': 'user', 'content': transcript}
    ]

    result = call_openai_api(messages, temperature=0.7, max_tokens=800)

    if result and 'choices' in result:
        txt = result['choices'][0]['message']['content']
        try:
            if '```json' in txt:
                txt = txt.split('```json')[1].split('```')[0]
            if '```' in txt:
                txt = txt.split('```')[1].split('```')[0]
            return json.loads(txt.strip())
        except:
            pass

    return {
        'overallScore': 70,
        'communicationScore': 75,
        'technicalScore': 65,
        "strengths": ["Clear communication", "Professional tone"],
        "improvements": ["More examples needed", "Expand answers further"],
        "detailedFeedback": "Good performance overall."
    }



@app.route('/api/interview/start', methods=['POST'])
def start_interview():
    data = request.json
    role_id = data.get('role')

    if not role_id or role_id not in ROLE_CONFIGS:
        return jsonify({'error': 'Invalid role'}), 400

    role_config = ROLE_CONFIGS[role_id]
    msg = generate_initial_question(role_config)

    return jsonify({'message': msg, 'isComplete': False})


@app.route('/api/interview/message', methods=['POST'])
def send_message():
    data = request.json
    user_message = data.get('message')
    conversation_history = data.get('conversationHistory', [])
    role_id = data.get('role')

    if not user_message or not role_id:
        return jsonify({'error': 'Missing fields'}), 400

    if role_id not in ROLE_CONFIGS:
        return jsonify({'error': 'Invalid role'}), 400

    role_config = ROLE_CONFIGS[role_id]
    question_count = sum(1 for m in conversation_history if m['role'] == 'assistant') + 1

    result = generate_followup_question(user_message, conversation_history, role_config, question_count)
    return jsonify(result)


@app.route('/api/interview/feedback', methods=['POST'])
def get_feedback():
    data = request.json
    conversation_history = data.get('conversationHistory', [])
    role_id = data.get('role')

    if role_id not in ROLE_CONFIGS:
        return jsonify({'error': 'Invalid role'}), 400

    feedback = generate_feedback(conversation_history, ROLE_CONFIGS[role_id])
    return jsonify(feedback)


@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy'})


if __name__ == '__main__':
    port = int(os.getenv('PORT', 8000))
    app.run(debug=True, host='0.0.0.0', port=port)

