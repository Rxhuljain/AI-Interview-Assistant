# AI Voice Interview Bot

A sophisticated voice-enabled chatbot designed to conduct AI assistant interviews. Built with React, Node.js, and OpenAI API.

## 🎯 Features

- **Voice Input**: Speech-to-text functionality using Web Speech API
- **Voice Output**: Text-to-speech responses
- **Real-time Chat**: Instant messaging interface
- **AI Responses**: Powered by OpenAI GPT models
- **Interview Ready**: Pre-configured responses for common interview questions
- **Responsive Design**: Works on desktop and mobile devices
- **Professional Interface**: Modern, clean UI design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- OpenAI API key
- Modern web browser with speech API support

### Installation

1. **Clone and setup**:
```bash
git clone <your-repo>
cd ai-voice-interview-bot



```bash
# Create test script
cat > test-setup.sh << 'EOF'
#!/bin/bash

echo "🧪 Testing setup..."

# Check Node.js version
echo "Node.js version:"
node --version

# Check if all required files exist
echo "Checking required files..."
files=(
    "backend/package.json"
    "backend/server.js" 
    "backend/routes/chat.js"
    "frontend/package.json"
    "frontend/src/App.tsx"
    "frontend/src/App.css"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
    fi
done

# Check if .env exists
if [ -f "backend/.env" ]; then
    echo "✅ Environment file exists"
else
    echo "⚠️ Create backend/.env with your OpenAI API key"
fi

echo "📋 Next steps:"
echo "1. Add your OpenAI API key to backend/.env"
echo "2. Run: ./deploy.sh"
echo "3. Run: cd backend && npm start"
echo "4. Open: http://localhost:3001"
EOF

chmod +x test-setup.sh

# Create environment example
cat > backend/.env.example << 'EOF'
# OpenAI API Configuration
# Get your API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-openai-api-key-here

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF

# Create final setup script
cat > setup.sh << 'EOF'
#!/bin/bash

echo "🎉 AI Voice Interview Bot Setup"
echo "================================"

# Run the deployment
echo "Running deployment..."
./deploy.sh

echo ""
echo "🔑 IMPORTANT: Configure your OpenAI API key"
echo "1. Get your API key from: https://platform.openai.com/api-keys"
echo "2. Edit backend/.env and replace 'your_openai_api_key_here' with your actual key"
echo ""
echo "🚀 To start the application:"
echo "   cd backend && npm start"
echo ""
echo "🌐 Then open: http://localhost:3001"
echo ""
echo "✨ Features:"
echo "   - Voice input (click microphone)"
echo "   - Voice output (automatic speech)"
echo "   - Text chat interface"
echo "   - Interview question responses"
echo ""
echo "📱 For best experience:"
echo "   - Use Chrome browser"
echo "   - Allow microphone permissions"
echo "   - Use headphones to prevent echo"
EOF

chmod +x setup.sh

# Run test setup
./test-setup.sh

ai-voice-interview-bot/
├── backend/
│   ├── routes/
│   │   └── chat.js
│   ├── public/ (will be created during build)
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── types/
│   │   │   └── speech.d.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── index.tsx
│   │   └── index.css
│   ├── public/
│   └── package.json
├── docker-compose.yml
├── Dockerfile
├── netlify.toml
├── vercel.json
├── README.md
├── package.json
├── deploy.sh
├── setup.sh
├── test-setup.sh
└── .gitignore
