require "gemini-ai"

GeminiAi.configure do |config|
  config.service = 'vertex-ai-api'
  config.region = 'asia-southeast1'
  config.file_path = Rails.root.join('google-credentials.json') 
end