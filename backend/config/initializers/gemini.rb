require "gemini-ai"

GeminiAi.configure do |config|
  config.service = 'vertex-ai-api'
  config.region = 'asia-southeast1'
  config.file_path = File.join(__dir__, '../google-credentials.json')
end