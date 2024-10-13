# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Category.create!([{
    name: "Wellbeing & Mental Health",
    desc: "Discussions around managing stress, work-life balance, and mental health resources."
}, {
    name: "Career Growth & Development",
    desc: "Topics related to skill-building, career advancement, and learning opportunities."
}, {
    name: "Workplace Tips & Productivity",
    desc: "Sharing productivity hacks, time management strategies, and workplace advice."
}, {
    name: "Events & Workshops",
    desc: "Announcements, feedback, and discussions about upcoming workshops and events."
}, {
    name: "Team & Collaboration",
    desc: "Improving teamwork and communication within the workplace."
}, {
    name: "Daily Wins & Motivation",
    desc: "A space to celebrate small victories and share motivational stories."
}, {
    name: "Feedback & Suggestions",
    desc: "Share thoughts on how to improve the app or workplace environment."
}, {
    name: "Hobbies & Interests",
    desc: "Bond over shared interests outside of work, such as sports, music, or travel."
}, {
    name: "General Discussion",
    desc: "Open-ended conversations on various topics that don't fit into other categories."
}])

User.create!([{
    username: "Admin",
    email: "admin@test.com",
    password: "admin",
    admin: true
}])


Workshop.create!([{
  title: "Mindfulness & Meditation",
  host_id: 1,
  venue: "Online - Zoom",
  description: "Learn mindfulness techniques to reduce stress and enhance focus. Suitable for all experience levels.",
  start_time: DateTime.new(2024, 10, 15, 9, 0, 0),
  end_time: DateTime.new(2024, 10, 15, 10, 30, 0),
}, {
  title: "Effective Communication Skills",
  host_id: 1,
  venue: "Conference Room B",
  description: "A workshop on improving verbal and non-verbal communication skills for workplace effectiveness.",
  start_time: DateTime.new(2024, 10, 16, 14, 0, 0),
  end_time: DateTime.new(2024, 10, 16, 16, 0, 0),
}, {
  title: "Stress Management Techniques",
  host_id: 1,
  venue: "Online - Microsoft Teams",
  description: "Practical strategies to manage stress and maintain work-life balance.",
  start_time: DateTime.new(2024, 10, 18, 11, 0, 0),
  end_time: DateTime.new(2024, 10, 18, 12, 30, 0),
}, {
  title: "Time Management for Busy Professionals",
  host_id: 1,
  venue: "Room 101, Office Building A",
  description: "Learn time management techniques to boost productivity and prioritize tasks effectively.",
  start_time: DateTime.new(2024, 10, 20, 13, 0, 0),
  end_time: DateTime.new(2024, 10, 20, 15, 0, 0),
}, {
  title: "Building Resilience at Work",
  host_id: 1,
  venue: "Online - Zoom",
  description: "Develop resilience to thrive during challenging times and adapt to change.",
  start_time: DateTime.new(2024, 10, 22, 10, 0, 0),
  end_time: DateTime.new(2024, 10, 22, 12, 0, 0),
}, {
  title: "Career Development Workshop",
  host_id: 1,
  venue: "Conference Room C",
  description: "Explore career advancement strategies and set achievable career goals.",
  start_time: DateTime.new(2024, 10, 25, 10, 0, 0),
  end_time: DateTime.new(2024, 10, 25, 12, 0, 0),
}, {
  title: "Leadership Essentials",
  host_id: 1,
  venue: "Online - Microsoft Teams",
  description: "Learn essential leadership skills for managing teams and driving performance.",
  start_time: DateTime.new(2024, 10, 30, 9, 30, 0),
  end_time: DateTime.new(2024, 10, 30, 11, 0, 0),
}])