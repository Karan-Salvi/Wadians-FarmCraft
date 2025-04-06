import autogen
import sqlite3
import openai
import logging
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor

# --- Logging Setup ---
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# --- Configuration ---
OLLAMA_BASE_URL = "http://localhost:11434/v1"
MODELS_TO_TRY = ["tinyllama", "phi", "mistral", "gemma:2b", "neural-chat"]

# --- Model Setup ---
def ping_model(model):
    try:
        client = openai.OpenAI(base_url=OLLAMA_BASE_URL, api_key="ollama")
        client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": "Ping"}],
            max_tokens=1
        )
        logging.info(f"{model} is available ✅")
        return model
    except Exception as e:
        logging.warning(f"{model} not available ⚠ — {str(e)}")
        return None

def setup_models():
    with ThreadPoolExecutor() as executor:
        results = list(executor.map(ping_model, MODELS_TO_TRY))

    available_models = [model for model in results if model]
    if not available_models:
        raise RuntimeError("No Ollama models available. Please install at least one model.")

    return [{
        "model": model,
        "base_url": OLLAMA_BASE_URL,
        "api_key": "ollama",
        "api_type": "openai",
        "price": [0.0, 0.0]
    } for model in available_models]

logging.info("=== Model Verification ===")
config_list = setup_models()
primary_model = config_list[0]["model"]

# --- Database Setup ---
def init_db():
    conn = sqlite3.connect("farm_data.db")
    cursor = conn.cursor()

    cursor.execute("DROP TABLE IF EXISTS crop_properties")
    cursor.execute("""
    CREATE TABLE crop_properties (
        crop TEXT PRIMARY KEY,
        ideal_ph_min REAL,
        ideal_ph_max REAL,
        water_needs TEXT,
        sustainability_score INTEGER,
        region TEXT,
        season TEXT
    )""")

    cursor.executemany(
        "INSERT INTO crop_properties VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            ("Barley", 6.0, 7.5, "Low", 8, "California", "Spring"),
            ("Quinoa", 6.0, 7.0, "Very Low", 9, "Nevada", "Fall"),
            ("Wheat", 6.0, 7.0, "Medium", 6, "Texas", "Winter"),
            ("Corn", 5.8, 7.0, "High", 5, "Iowa", "Summer")
        ]
    )
    conn.commit()
    conn.close()

init_db()

# --- Agent Factory ---
def create_agent(name, system_message, preferred_model):
    model = preferred_model if any(cfg["model"] == preferred_model for cfg in config_list) else primary_model
    return autogen.AssistantAgent(
        name=name,
        system_message=system_message,
        llm_config={"config_list": [cfg for cfg in config_list if cfg["model"] == model]},
        human_input_mode="NEVER"
    )

# --- Agents ---
farmer_advisor = create_agent(
    name="Farmer_Advisor",
    system_message="""Provide crop recommendations considering:
    - Water efficiency (query DB for water_needs)
    - Soil pH compatibility
    - Sustainability scores
    - Match with region and season
    Always check the database first.
    Format:
    Crop: <name>
    pH: <min> - <max>
    Water: <need>
    Sustainability: <score>/10
    Region: <region>
    Season: <season>
    """,
    preferred_model="tinyllama"
)

soil_expert = create_agent(
    name="Soil_Health_Monitor",
    system_message="""You are a soil scientist. Provide:
    - Ideal pH ranges for crops (query crop_properties)
    - Soil amendment suggestions
    - pH adjustment methods
    Example: "For barley, ideal pH is 6.0-7.5. If acidic, add lime at 2 tons/acre." 
    Always cite data from the database.""",
    preferred_model="phi"
)

market_researcher = create_agent(
    name="Market_Researcher",
    system_message="""You are a market analyst. Provide market demand insights for crops by:
    - Season
    - Region
    - Price fluctuation trends
    Recommend high-demand, sustainable crops for better yield and profit.""",
    preferred_model="tinyllama"
)

# --- User Proxy ---
user_proxy = autogen.UserProxyAgent(
    name="Farmer_User",
    human_input_mode="ALWAYS",
    max_consecutive_auto_reply=1,
    is_termination_msg=lambda x: "TERMINATE" in x.get("content", ""),
    code_execution_config=False,
    default_auto_reply="Please continue the conversation.",
    system_message="You are a farmer seeking advice. Provide location, soil type, and ask crop-related questions."
)

# --- Group Chat Setup ---
agents = [user_proxy, farmer_advisor, soil_expert, market_researcher]
groupchat = autogen.GroupChat(
    agents=agents,
    messages=[],
    max_round=3,
    speaker_selection_method="round_robin",
    allow_repeat_speaker=False
)

manager = autogen.GroupChatManager(
    groupchat=groupchat,
    llm_config={"config_list": config_list}
)

# --- Main Execution ---
if __name__ == "__main__":
    logging.info("🌱 Sustainable Farming Advisor Starting... 🌱")
    logging.info(f"Primary active model: {primary_model}")

    location = input("📍 Enter your region/state (e.g., California): ")
    soil_type = input("🌾 Enter your soil type (e.g., sandy, clay, loamy): ")

    start_message = f"I'm a farmer in {location} with {soil_type} soil. What's the best water-efficient crop and its ideal pH range?"

    user_proxy.initiate_chat(
        manager,
        message=start_message
    )






