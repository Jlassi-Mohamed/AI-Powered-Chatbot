
# AI-Powered Chatbot

This is a modern AI-powered chat application that allows users to interact with multiple AI models (OpenAI GPT-4, LLaMA 3, DeepSeek) in real time. It supports multilingual functionality (English and Arabic) and provides conversation management, user profile, and interest tracking features.

**Tech Stack:**
- **Frontend:** React (Vite) + MUI
- **Backend:** Django REST Framework
- **AI Integration:** OpenAI, HuggingFace endpoints for LLaMA and DeepSeek

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- Git

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/Jlassi-Mohamed/AI-Powered-Chatbot.git
cd AI-Powered-Chatbot
```

#### 2. Backend Setup

Navigate to the backend directory and create a virtual environment:

```bash
cd backend
python -m venv venv
```

Activate the virtual environment:

**On Linux/macOS:**
```bash
source venv/bin/activate
```

**On Windows:**
```bash
venv\Scripts\activate
```

Install Python dependencies:

```bash
pip install -r requirements.txt
```

#### 3. Environment Configuration

Copy the example environment file:

**On Linux/macOS:**
```bash
cp .env.example .env
```

**On Windows:**
```bash
copy .env.example .env
```

Edit the `.env` file and add your API keys and secrets:

```env
SECRET_KEY=<your-django-secret-key>
OPENAI_API_KEY=<your-openai-api-key>
HUGGINGFACE_API_KEY=<your-huggingface-api-key>
```

#### 4. Database Migration

Run Django migrations to set up the database:

```bash
python manage.py migrate
```

#### 5. Start the Backend Server

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

#### 6. Frontend Setup

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

Install Node.js dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend application will be available at `http://localhost:5173`

### Accessing the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:8000
- **API Documentation:** http://localhost:8000/api/docs/ (if configured)

### Troubleshooting

#### Common Issues

**Virtual environment not activating:**
- Make sure you're in the correct directory
- Try using `python3` instead of `python` on Linux/macOS

**Module not found errors:**
- Ensure virtual environment is activated
- Run `pip install -r requirements.txt` again

**Port already in use:**
- Backend: Use `python manage.py runserver 8001` for a different port
- Frontend: Use `npm run dev -- --port 5174` for a different port

### Next Steps

After successful setup:
1. Create a superuser account: `python manage.py createsuperuser`
2. Access the Django admin panel at http://localhost:8000/admin
3. Start building and testing your chatbot!
## Usage Guide

### Getting Started

#### 1. Register or Login

- Navigate to the application homepage
- Click on **Register** to create a new account or **Login** if you already have one
- Fill in your credentials (email, username, and password for registration)
- Upon successful login, you'll be redirected to the chat interface

#### 2. Language Selection

The application supports both English and Arabic languages:

- **At Login Page:** Use the language dropdown menu to select your preferred language
- **In Application:** Access the language switcher in the navigation bar to change languages at any time
- All interface elements will update to reflect your language choice

#### 3. Starting a Chat

To begin a conversation with the AI:

1. Select your preferred AI model from the available options:
   - **OpenAI GPT-4** - Advanced conversational AI
   - **LLaMA** - Meta's open-source language model
   - **DeepSeek** - Specialized AI model

2. Type your message in the chat input field
3. Press **Enter** or click the **Send** button
4. The AI will respond based on the selected model

#### 4. Managing Conversations

##### Continue Existing Conversations
- View your conversation history in the sidebar
- Click on any previous conversation to resume where you left off
- All messages are preserved and can be accessed anytime

##### Start New Conversations
- Click the **New Chat** button to begin a fresh conversation
- Each conversation maintains its own context and history
- You can switch between multiple conversations seamlessly

#### 5. User Profile and Interests

The application automatically analyzes your conversations to personalize your experience:

##### View Your Profile
- Click on your username or profile icon in the navigation bar
- Access your account settings and personal information

##### Automatic Interest Detection
- The system automatically generates interest tags based on your conversation topics
- Examples of interests include: "football", "politics", "technology", "health", etc.
- These interests help personalize your AI interactions
- View your interests by navigating to the **Interests** section in your profile

### Tips for Better Conversations

- **Be specific:** Clear and detailed questions get better responses
- **Provide context:** Help the AI understand your needs by giving relevant background
- **Try different models:** Each AI model has unique strengths
- **Use follow-ups:** Continue the conversation to dive deeper into topics

### Privacy and Data

- All conversations are securely stored and linked to your account
- Only you can access your conversation history
- Interest tags are generated automatically and privately
- You can delete conversations at any time
## API Documentation

### Authentication Endpoints

#### Register a new user
```http
POST /auth/register/
```

| Parameter | Type   | Description           |
|-----------|--------|-----------------------|
| email     | string | Required. User email  |
| username  | string | Required. Username    |
| password  | string | Required. Password    |

#### Obtain JWT token
```http
POST /auth/token/
```

| Parameter | Type   | Description        |
|-----------|--------|--------------------|
| username  | string | Required. Username |
| password  | string | Required. Password |

#### Refresh JWT token
```http
POST /auth/token/refresh/
```

| Parameter | Type   | Description             |
|-----------|--------|-------------------------|
| refresh   | string | Required. Refresh token |

#### Logout (Blacklist token)
```http
POST /auth/token/logout/
```

| Parameter | Type   | Description             |
|-----------|--------|-------------------------|
| refresh   | string | Required. Refresh token |

#### Get user info
```http
GET /auth/user_info/
```

Requires authentication (JWT). Returns user profile details.


Requires authentication (JWT). Returns a list of tags like "football", "politics", etc.

### Chat Endpoints

#### Send a chat message
```http
POST /chat/
```

| Parameter       | Type   | Description                                          |
|-----------------|--------|------------------------------------------------------|
| query           | string | Required. User message                               |
| model_name      | string | Optional. AI model to use (openai, llama, deepseek) |
| conversation_id | string | Optional. To continue an existing conversation       |
| language        | string | Optional. "en" or "ar"                              |

#### List conversations
```http
GET /chat/conversations/
```

Requires authentication (JWT). Returns all conversations of the current user.

#### Get messages for a conversation
```http
GET /chat/messages/${conversation_id}/
```

Requires authentication (JWT). Returns all messages in a conversation.

#### Delete a conversation
```http
DELETE /chat/conversations/${conversation_id}/
```

Requires authentication (JWT). Deletes a conversation and all its messages.

#### Get user interests
```http
GET /chat/interests/
```

Requires authentication (JWT). Returns tags about user interests
## Technical Documentation

### Internationalization (i18n) Implementation

#### Configuration

The application uses `react-i18next` for internationalization, configured in `i18n.js`.

#### Supported Languages

- **English** (`en`) - Default language
- **Arabic** (`ar`) - Full RTL (Right-to-Left) support

#### Translation File

Translation file is stored as JSON in the `src` directory:

```
src/
├── i18n.js
```

It contains key-value pairs for all UI text elements.

#### Usage in Components

Import and use the translation hook in your React components:

```javascript
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <p>{t('login')}</p>
      <p>{t('welcome_message')}</p>
    </div>
  );
}
```

#### Text Directionality

Components automatically detect the current language and apply appropriate text direction:

```javascript
const { i18n } = useTranslation();
const isRTL = i18n.language === 'ar';

<div dir={isRTL ? 'rtl' : 'ltr'}>
  {/* Content */}
</div>
```

This ensures proper layout and text flow for Arabic content.

### AI Models Integration

The application integrates multiple AI models to provide diverse conversational experiences:

#### OpenAI GPT-4o-mini

- **Purpose:** General conversation and question-answering
- **Provider:** OpenAI API
- **Use Cases:** 
  - Natural language understanding
  - Complex reasoning tasks
  - Creative content generation
  - General knowledge queries

#### LLaMA 3.1 (via HuggingFace)

- **Purpose:** User interest tag generation
- **Provider:** HuggingFace Inference API
- **Use Cases:**
  - Analyzing conversation content
  - Extracting topics and themes
  - Generating personalized interest tags
  - Content categorization

#### DeepSeek V3.2 (via HuggingFace)

- **Purpose:** Alternative AI model for specialized responses
- **Provider:** HuggingFace Inference API
- **Use Cases:**
  - Domain-specific queries
  - Alternative perspective generation
  - Specialized topic discussions
  - Technical conversations

### System Architecture Notes

#### Interest Tag Management

- **Storage:** User interests are stored as tag entries in the database
- **Limit:** Maximum of 1000 tags per user
- **Purpose:** Optimize query complexity and maintain performance
- **Generation:** Automatically created from conversation analysis
- **Updates:** Continuously refined based on new conversations

#### Database Configuration

- **Default Database:** SQLite
- **Purpose:** Lightweight, file-based storage for development
- **Storage Includes:**
  - User accounts and profiles
  - Conversation history
  - Chat messages
  - Interest tags
- **Production Note:** Consider migrating to PostgreSQL or MySQL for production deployments

#### Frontend Technology Stack

- **Framework:** React 18+
- **Build Tool:** Vite
- **Benefits:**
  - ⚡ Lightning-fast hot module replacement (HMR)
  - 🚀 Optimized build performance
  - 📦 Efficient code splitting
  - 🔧 Modern development experience
  - 💨 Instant server start

#### Development Features

- **Hot Reloading:** Changes reflect instantly without full page reload
- **Fast Refresh:** Preserves component state during updates
- **ES Modules:** Native ESM support for faster loading
- **Optimized Builds:** Production builds are highly optimized and minified

### Performance Considerations

#### Tag Limit Rationale

The 1000-tag limit per user serves multiple purposes:
- Prevents database bloat
- Maintains fast query performance
- Ensures relevant and current interests
- Optimizes memory usage

#### Database Optimization

- Indexed fields for faster queries
- Efficient relationship management
- Pagination for large datasets
- Optimized conversation retrieval

#### API Response Times

- Cached responses where appropriate
- Asynchronous AI model calls
- Progressive loading for better UX
- Request throttling to prevent abuse
