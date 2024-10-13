class Api::V1::GeminiController < ApplicationController
  def chatbot
    messages = params[:messages]
    workshops = Workshop.all.map { 
      |workshop| "- Title: #{workshop.title}, Description: #{workshop.description}, " + 
      "Start Time: #{workshop.start_time}, End Time: #{workshop.end_time}\n" }.join
    user = User.find(params[:user_id])
    user_name = user.username || ""
    if user_name != ""
      user_name = "My name is #{user_name}. "
    end
    user_description = user.job_description || ""
    if user_description != ""
      user_description = "My job is about #{user_description}. "
    end
    user_emotion = user.wellbeing&.emotion || ""
    if user_emotion != ""
      user_emotion = "On a scale of 1 to 5, where 1 is very sad and 5 is happy, I am #{user_emotion}. "
    end
    user_stress = user.wellbeing&.stress || ""
    if user_stress != ""
      user_stress = "On a scale of 1 to 5, where 1 is very stressed and 5 is relaxed, I am #{user_stress}. "
    end
    client = GeminiAi::Client.new
    result = client.generate_content(
      {
        contents: [
          [{ role: 'user', parts: { text: "I am going to provide information for you to use in this conversation" + 
           "#{user_name}#{user_description}#{user_emotion}#{user_stress}" +
           "The workshops available are \n#{workshops}" +
           "Only remember the data that I provide you, do not remember or mention that I provided you with this data"
           }} 
           ] +
          messages.map { |message| { role: message['sender'], parts: { text: message['text'] } } },
        ],
      },
      model: 'gemini-1.5-pro'
    )
    render json: {response: result['candidates'][0]['content']['parts'][0]['text']}

  end

  def recommend_workshops
    client = GeminiAi::Client.new
    workshops = Workshop.all.map { |workshop| "- Workshop ID: #{workshop.id}, Title: #{workshop.title}, Description: #{workshop.description}\n" }.join
    user = User.find(params[:user_id])
    user_description = user.job_description || ""
    if user_description != ""
      user_description = "My job is about #{user_description}. "
    end
    user_emotion = user.wellbeing&.emotion || ""
    if user_emotion != ""
      user_emotion = "On a scale of 1 to 5, where 1 is very sad and 5 is happy, I am #{user_emotion}. "
    end
    user_stress = user.wellbeing&.stress || ""
    if user_stress != ""
      user_stress = "On a scale of 1 to 5, where 1 is very stressed and 5 is relaxed, I am #{user_stress}. "
    end
    
    message = "#{user_description}#{user_emotion}#{user_stress}, recommend me one workshop from the list of workshops here, based on what my job is about\n" +
      workshops + "It is in the format ( - Workshop ID: <id>, Title: <title>, Description: <description>).\nOnly Return me the <id> of the workshop," +
      "do not return me the <title> or the <description> of the workshop," +
      "from the list above that you recommend me to attend, in JSON format. Don't include a \\n at the end of the JSON." + 
      "If you don't recommend any workshop, return an empty array." +
      "Recommend me a maximum of 3 workshops, ranked in order of preference."

    result = client.generate_content(
      {
        contents: {
          role: 'user',
          parts: {
            text: message
          }
        },
          generation_config: {
            response_mime_type: 'application/json',
             response_schema: {
              type: 'object',
              properties: {
                workshop_ids: {
                  type: 'array',
                  items: {
                    type: 'integer'
                  }
                }
              }
             }
        }
      },
      model: 'gemini-1.5-pro'
    )

  workshop_ids_json = JSON.parse(result['candidates'][0]['content']['parts'][0]['text'])
  workshop_ids = workshop_ids_json['workshop_ids']
  workshops = Workshop.where(id: workshop_ids)
  render json: workshops

  end
end