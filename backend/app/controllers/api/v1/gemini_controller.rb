class Api::V1::GeminiController < ApplicationController

  def recommend_workshops
    client = GeminiAi::Client.new
    workshops = Workshop.all.map { |workshop| "- Workshop ID: #{workshop.id}, Title: #{workshop.title}, Description: #{workshop.description}\n" }.join
    user_description = User.find(params[:user_id]).job_description
    message = "My job is about" + user_description + ", recommend me one workshop from the list of workshops here\n" +
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